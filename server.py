"""
High-Performance Local Educational Server with Live Vietnamese Neural TTS
Powered by edge-tts (Voice: vi-VN-HoaiMyNeural - Female Southern Vietnamese)
with Instant Google Translate TTS fallback.
"""
import os
import sys
import hashlib
import asyncio
import urllib.parse
import urllib.request
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = 8000
VOICE = "vi-VN-HoaiMyNeural"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CACHE_DIR = os.path.join(BASE_DIR, "audio_cache")

os.makedirs(CACHE_DIR, exist_ok=True)

class EduTTSHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        
        # API: Real-time Vietnamese TTS
        if parsed.path == "/api/tts":
            query = urllib.parse.parse_qs(parsed.query)
            text = query.get("text", [""])[0].strip()
            
            if not text:
                self.send_error(400, "Missing 'text' query parameter")
                return
            
            text_hash = hashlib.md5(text.encode("utf-8")).hexdigest()
            cache_file = os.path.join(CACHE_DIR, f"{text_hash}.mp3")
            
            # Generate if not in cache
            if not os.path.exists(cache_file) or os.path.getsize(cache_file) == 0:
                success = False
                
                # Method 1: Edge Neural TTS (Natural Southern Female)
                try:
                    import edge_tts
                    async def fetch_edge():
                        comm = edge_tts.Communicate(text, VOICE)
                        await comm.save(cache_file)
                    
                    asyncio.run(asyncio.wait_for(fetch_edge(), timeout=3.5))
                    if os.path.exists(cache_file) and os.path.getsize(cache_file) > 0:
                        success = True
                except Exception as e:
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
        
        # API: Voice Status Check
        elif parsed.path == "/api/voice-status":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            data = '{"status":"ready","voice":"vi-VN-HoaiMyNeural","name":"Cô giáo Hoài My (Nữ miền Nam)","neural":true}'
            self.wfile.write(data.encode("utf-8"))
            return
        
        # Static files
        return super().do_GET()

def run_server():
    server_address = ("", PORT)
    httpd = HTTPServer(server_address, EduTTSHandler)
    print(f"Server running at http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")

if __name__ == "__main__":
    run_server()
