"""
High-Performance Local Educational Server with Live Vietnamese Neural TTS
Powered by edge-tts (Voice: vi-VN-HoaiMyNeural - Female Southern Vietnamese & vi-VN-NamMinhNeural)
with Instant Google Translate TTS fallback and audio caching.
"""
import os
import sys
import hashlib
import asyncio
import urllib.parse
import urllib.request
import json
from http.server import HTTPServer, SimpleHTTPRequestHandler

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

AVAILABLE_VOICES = [
    {
        "id": "vi-VN-HoaiMyNeural",
        "name": "Cô giáo Hoài My (Nữ miền Nam)",
        "region": "Miền Nam",
        "gender": "Female",
        "default": True
    },
    {
        "id": "vi-VN-NamMinhNeural",
        "name": "Thầy giáo Nam Minh (Nam miền Bắc)",
        "region": "Miền Bắc",
        "gender": "Male",
        "default": False
    }
]

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
            
            # Hash text + voice + rate
            cache_key = f"{text}_{voice}_{rate}"
            text_hash = hashlib.md5(cache_key.encode("utf-8")).hexdigest()
            cache_file = os.path.join(CACHE_DIR, f"{text_hash}.mp3")
            
            # Generate if not in cache or empty
            if not os.path.exists(cache_file) or os.path.getsize(cache_file) == 0:
                success = False
                
                # Method 1: Edge Neural TTS (HoaiMy or NamMinh)
                try:
                    import edge_tts
                    async def fetch_edge():
                        comm = edge_tts.Communicate(text, voice, rate=rate)
                        await comm.save(cache_file)
                    
                    asyncio.run(asyncio.wait_for(fetch_edge(), timeout=4.0))
                    if os.path.exists(cache_file) and os.path.getsize(cache_file) > 0:
                        success = True
                except Exception as e:
                    # Fallback on error
                    pass
                
                # Method 2: Google Translate Vietnamese TTS Fallback (Ultra Fast)
                if not success:
                    try:
                        encoded = urllib.parse.quote(text)
                        url = f"https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q={encoded}"
                        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
                        with urllib.request.urlopen(req, timeout=3.5) as resp:
                            if resp.status == 200:
                                with open(cache_file, "wb") as f:
                                    f.write(resp.read())
                                success = True
                    except Exception as e:
                        print(f"[TTS Fallback Error] {e}", file=sys.stderr)
                
                if not success:
                    self.send_error(500, "Unable to synthesize Vietnamese audio")
                    return
            
            # Serve audio file
            try:
                with open(cache_file, "rb") as f:
                    content = f.read()
                
                self.send_response(200)
                self.send_header("Content-Type", "audio/mpeg")
                self.send_header("Content-Length", str(len(content)))
                self.send_header("Access-Control-Allow-Origin", "*")
                self.send_header("Cache-Control", "public, max-age=604800")
                self.end_headers()
                self.wfile.write(content)
                return
            except Exception as e:
                self.send_error(500, str(e))
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
                "voice": DEFAULT_VOICE,
                "name": "Cô giáo Hoài My (Nữ miền Nam)",
                "neural": True
            }, ensure_ascii=False)
            self.wfile.write(data.encode("utf-8"))
            return

        # API: Health check
        elif parsed.path == "/api/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(b'{"status":"ok","app":"Vuon Tuoi Tho - Lop 1","version":"2.0"}')
            return
        
        # Static files
        return super().do_GET()

def run_server():
    server_address = ("", PORT)
    httpd = HTTPServer(server_address, EduTTSHandler)
    print(f"[OK] Vuon Tuoi Tho Server 2.0 running at http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")

if __name__ == "__main__":
    run_server()

