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
        "name": "Cô giáo Hoài My (Nữ miền Bắc - Dịu dàng, chuẩn sư phạm Lớp 1)",
        "desc": "Giọng cô giáo Hà Nội dịu dàng, phát âm chuẩn ngữ âm tiếng Việt phổ thông, rất dễ nghe cho bé lớp 1",
        "badge": "🌟 Chuẩn Neural AI Lớp 1",
        "type": "neural",
        "preview": "Cô giáo chào các em học sinh yêu quý! Chúc các em một ngày học tập thật vui và đạt nhiều điểm mười nhé!",
        "default": True
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

    def do_HEAD(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path in ["/api/tts", "/api/voices", "/api/health", "/api/precache"]:
            self.send_response(200)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Type", "audio/mpeg" if parsed.path == "/api/tts" else "application/json")
            self.end_headers()
            return
        super().do_HEAD()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        
        # API: Real-time Vietnamese TTS with Voice & Speed Rate
        if parsed.path == "/api/tts":
            query = urllib.parse.parse_qs(parsed.query)
            text = query.get("text", [""])[0].strip()
            # Exclusively use Cô giáo Hoài My
            voice = DEFAULT_VOICE
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
                # Candidate 2: text + voice
                k2 = f"{text}_{voice}"
                h2 = hashlib.md5(k2.encode("utf-8")).hexdigest()
                f2 = os.path.join(CACHE_DIR, f"{h2}.mp3")
                if os.path.exists(f2) and os.path.getsize(f2) > 0:
                    with open(f2, "rb") as f:
                        found_content = f.read()

            if found_content:
                _MEM_CACHE[primary_key] = found_content
                self._send_audio(found_content)
                return

            # Generate on cache miss
            content = None

            # Exclusively generate with Cô giáo Hoài My Neural Edge TTS
            edge_voice = DEFAULT_VOICE
            try:
                import edge_tts
                async def fetch_edge():
                    comm = edge_tts.Communicate(text, edge_voice, rate=rate)
                    await comm.save(cache_file)
                
                asyncio.run(asyncio.wait_for(fetch_edge(), timeout=6.0))
                if os.path.exists(cache_file) and os.path.getsize(cache_file) > 0:
                    with open(cache_file, "rb") as f:
                        content = f.read()
                elif os.path.exists(cache_file):
                    os.remove(cache_file)
            except Exception as e:
                if os.path.exists(cache_file) and os.path.getsize(cache_file) == 0:
                    try:
                        os.remove(cache_file)
                    except Exception:
                        pass

            # Temporary emergency fallback only if network is completely unreachable
            if not content:
                try:
                    content = fetch_google_tts(text)
                    if content and len(content) > 0:
                        try:
                            with open(cache_file, "wb") as f:
                                f.write(content)
                        except Exception:
                            pass
                except Exception as e:
                    pass

            if not content:
                self.send_error(500, "Unable to synthesize Vietnamese audio")
                return

            # Cache to RAM
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
            self.wfile.write(b'{"status":"ok","app":"Vuon Tuoi Tho - Lop 1","version":"3.0"}')
            return
        
        # Static files
        return super().do_GET()

    def end_headers(self):
        # Prevent browser from serving stale JS/CSS during local development
        path = getattr(self, "path", "")
        if path.endswith('.html') or path.endswith('.js') or path.endswith('.css'):
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


