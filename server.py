"""
High-Performance Local Educational Server with Live Vietnamese Neural TTS
- ThreadingHTTPServer for concurrent non-blocking requests
- Multi-tier in-memory RAM cache & disk cache
- Edge Neural TTS (vi-VN-HoaiMyNeural, vi-VN-NamMinhNeural)
- Ultra-Fast Google Translate TTS engine (~0.15s response)
- Multi-tier cache resolution for 0ms replay
"""
import os
import sys
import hashlib
import asyncio
import urllib.parse
import urllib.request
import json
import socket
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

try:
    if sys.stdout.encoding != 'utf-8':
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

PORT = 8000
DEFAULT_VOICE = "vi-VN-HoaiMyNeural"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CACHE_DIR = os.path.join(BASE_DIR, "audio_cache")

os.makedirs(CACHE_DIR, exist_ok=True)

# In-memory RAM audio cache for sub-millisecond response
_MEM_CACHE = {}

AVAILABLE_VOICES = [
    {
        "id": "vi-VN-HoaiMyNeural",
        "name": "Cô giáo Hoài My (Nữ miền Bắc - Dịu dàng, chuẩn sư phạm)",
        "desc": "Giọng cô giáo Hà Nội dịu dàng, phát âm chuẩn ngữ âm tiếng Việt phổ thông, rất dễ nghe cho bé lớp 1",
        "badge": "🌟 Chuẩn Neural AI",
        "type": "neural",
        "preview": "Cô giáo chào các em học sinh yêu quý! Chúc các em một ngày học tập thật vui và đạt nhiều điểm mười nhé!",
        "default": True
    },
    {
        "id": "vi-VN-NamMinhNeural",
        "name": "Thầy giáo Nam Minh (Nam miền Bắc - Rõ ràng, trầm ấm)",
        "desc": "Giọng thầy giáo Hà Nội trầm ấm, phát âm rành mạch từng phụ âm và nguyên âm, chuẩn mực ngữ âm",
        "badge": "🌟 Chuẩn Neural AI",
        "type": "neural",
        "preview": "Thầy giáo chào các em học sinh lớp một thân mến! Hôm nay thầy trò mình cùng học thật vui nhé!",
        "default": False
    },
    {
        "id": "google-fast",
        "name": "Google Tiếng Việt Siêu Tốc (Nữ nhanh 0.1s)",
        "desc": "Tốc độ phản hồi cực nhanh ~0.1s, mượt mà, không độ trễ, bấm chữ nào nghe ngay",
        "badge": "⚡ Siêu Tốc 0.1s",
        "type": "fast",
        "preview": "Chào bé yêu! Giọng siêu tốc phát âm cực nhanh, giúp bé bấm chữ nào nghe ngay chữ đó nhé!",
        "default": False
    },
    {
        "id": "browser",
        "name": "Giọng Thiết Bị (Hỗ trợ giọng miền Nam trên iOS/Mac)",
        "desc": "Chạy bằng Web Speech API của máy. Đặc biệt trên iPhone, iPad và Mac sẽ phát giọng Nữ miền Nam (Cô Linh)",
        "badge": "📱 Thiết Bị / iOS Nam",
        "type": "browser",
        "preview": "Chào bé! Đây là giọng đọc thiết bị trên trình duyệt của bé.",
        "default": False
    }
]

def fetch_google_tts(text):
    """Fetch Vietnamese speech audio from Google Translate TTS in ~150ms"""
    encoded = urllib.parse.quote(text)
    url = f"https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q={encoded}"
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    })
    with urllib.request.urlopen(req, timeout=2.5) as resp:
        if resp.status == 200:
            return resp.read()
    return None

class EduTTSHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        
        # API: Real-time Vietnamese TTS with Voice & Speed Rate
        if parsed.path == "/api/tts":
            query = urllib.parse.parse_qs(parsed.query)
            text = query.get("text", [""])[0].strip()
            voice = query.get("voice", [DEFAULT_VOICE])[0].strip() or DEFAULT_VOICE
            rate = query.get("rate", ["+0%"])[0].strip() or "+0%"
            
            if not text:
                self.send_error(400, "Missing 'text' query parameter")
                return
            
            # Primary cache key
            primary_key = f"{text}_{voice}_{rate}"
            primary_hash = hashlib.md5(primary_key.encode("utf-8")).hexdigest()
            cache_file = os.path.join(CACHE_DIR, f"{primary_hash}.mp3")

            # Check RAM cache first (< 0.1ms)
            if primary_key in _MEM_CACHE:
                content = _MEM_CACHE[primary_key]
                self._send_audio(content)
                return

            # Check multi-tier disk cache
            found_content = None
            if os.path.exists(cache_file) and os.path.getsize(cache_file) > 0:
                with open(cache_file, "rb") as f:
                    found_content = f.read()
            else:
                # Fallback candidate 2: text + voice
                k2 = f"{text}_{voice}"
                h2 = hashlib.md5(k2.encode("utf-8")).hexdigest()
                f2 = os.path.join(CACHE_DIR, f"{h2}.mp3")
                if os.path.exists(f2) and os.path.getsize(f2) > 0:
                    with open(f2, "rb") as f:
                        found_content = f.read()
                elif voice == "vi-VN-HoaiMyNeural" or voice == "default":
                    # Fallback candidate 3: legacy cache by plain text
                    h3 = hashlib.md5(text.encode("utf-8")).hexdigest()
                    f3 = os.path.join(CACHE_DIR, f"{h3}.mp3")
                    if os.path.exists(f3) and os.path.getsize(f3) > 0:
                        with open(f3, "rb") as f:
                            found_content = f.read()

            if found_content:
                _MEM_CACHE[primary_key] = found_content
                self._send_audio(found_content)
                return

            # Generate on cache miss
            content = None

            # Mode A: Google Ultra-Fast TTS requested
            if voice in ("google-fast", "google", "fast"):
                try:
                    content = fetch_google_tts(text)
                except Exception as e:
                    print(f"[Google TTS Error] {e}", file=sys.stderr)

            # Mode B: Neural Edge TTS requested (HoaiMy or NamMinh)
            if not content:
                edge_voice = voice if voice in ("vi-VN-NamMinhNeural", "vi-VN-HoaiMyNeural") else DEFAULT_VOICE
                try:
                    import edge_tts
                    async def fetch_edge():
                        comm = edge_tts.Communicate(text, edge_voice, rate=rate)
                        await comm.save(cache_file)
                    
                    # 1.6s timeout: if Edge TTS is fast, use it. Otherwise fallback to Google immediately
                    asyncio.run(asyncio.wait_for(fetch_edge(), timeout=1.6))
                    if os.path.exists(cache_file) and os.path.getsize(cache_file) > 0:
                        with open(cache_file, "rb") as f:
                            content = f.read()
                except Exception as e:
                    # Edge TTS timed out or failed, fallback to Google Fast immediately
                    pass

            # Mode C: Fallback to Google Fast if Edge TTS timed out or failed
            if not content:
                try:
                    content = fetch_google_tts(text)
                except Exception as e:
                    print(f"[Google Fallback Error] {e}", file=sys.stderr)

            if not content:
                self.send_error(500, "Unable to synthesize Vietnamese audio")
                return

            # Persist to disk and RAM
            try:
                with open(cache_file, "wb") as f:
                    f.write(content)
            except Exception:
                pass
            _MEM_CACHE[primary_key] = content

            self._send_audio(content)
            return
        
        # API: Available voices list
        elif parsed.path == "/api/voices":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            data = json.dumps({"voices": AVAILABLE_VOICES}, ensure_ascii=False)
            self.wfile.write(data.encode("utf-8"))
            return

        # API: Voice Status Check
        elif parsed.path == "/api/voice-status":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            data = json.dumps({
                "status": "ready",
                "defaultVoice": DEFAULT_VOICE,
                "cachedCount": len(os.listdir(CACHE_DIR)),
                "voices": AVAILABLE_VOICES
            }, ensure_ascii=False)
            self.wfile.write(data.encode("utf-8"))
            return

        # API: Health check
        elif parsed.path == "/api/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(b'{"status":"ok","app":"Vuon Tuoi Tho - Lop 1","version":"2.1"}')
            return
        
        # Static files
        return super().do_GET()

    def end_headers(self):
        # Prevent browser from serving stale JS/CSS during local development
        if self.path.endswith('.html') or self.path.endswith('.js') or self.path.endswith('.css'):
            self.send_header("Cache-Control", "no-cache, must-revalidate")
        super().end_headers()

    def address_string(self):
        # Return IP directly without blocking reverse DNS lookup
        return str(self.client_address[0])

    def _send_audio(self, content):
        """Send audio bytes with optimal caching headers"""
        self.send_response(200)
        self.send_header("Content-Type", "audio/mpeg")
        self.send_header("Content-Length", str(len(content)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "public, max-age=31536000, immutable")
        self.send_header("Accept-Ranges", "bytes")
        self.end_headers()
        self.wfile.write(content)

class DualStackServer(ThreadingHTTPServer):
    address_family = socket.AF_INET6
    def server_bind(self):
        try:
            self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        except Exception:
            pass
        super().server_bind()

def run_server():
    server_address = ("::", PORT)
    try:
        httpd = DualStackServer(server_address, EduTTSHandler)
    except Exception:
        httpd = ThreadingHTTPServer(("", PORT), EduTTSHandler)
    print(f"[OK] Vuon Tuoi Tho Server 2.1 (DualStack IPv4/IPv6 + Threading) running at http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")

if __name__ == "__main__":
    run_server()


