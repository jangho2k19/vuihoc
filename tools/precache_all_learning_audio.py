"""
Precache All Learning Phrases (Vietnamese, Math, English, Science, Rewards)
Saves audio directly to audio_cache/ with hashes for +0%, +10%, -15%, and unrated.
Generates js/audio_manifest.js for 100% zero-latency GitHub Pages playback.
"""
import os
import sys
import json
import hashlib
import asyncio
import edge_tts

try:
    if sys.stdout.encoding != 'utf-8':
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE_DIR = os.path.join(BASE_DIR, "audio_cache")
MANIFEST_FILE = os.path.join(BASE_DIR, "js", "audio_manifest.js")
os.makedirs(CACHE_DIR, exist_ok=True)

VOICE = "vi-VN-HoaiMyNeural"
SEMAPHORE = asyncio.Semaphore(6)

def get_hashes(text: str):
    h_0 = hashlib.md5(f"{text}_{VOICE}_+0%".encode("utf-8")).hexdigest()
    h_fast = hashlib.md5(f"{text}_{VOICE}_+10%".encode("utf-8")).hexdigest()
    h_slow = hashlib.md5(f"{text}_{VOICE}_-15%".encode("utf-8")).hexdigest()
    h_raw = hashlib.md5(f"{text}_{VOICE}".encode("utf-8")).hexdigest()
    return [h_0, h_fast, h_slow, h_raw]

async def process_phrase(text: str, idx: int, total: int):
    text = text.strip()
    if not text:
        return
    
    hashes = get_hashes(text)
    paths = [os.path.join(CACHE_DIR, f"{h}.mp3") for h in hashes]
    
    # If primary exists and is valid
    if os.path.exists(paths[0]) and os.path.getsize(paths[0]) > 1000:
        # Ensure all other hash variants exist
        with open(paths[0], "rb") as f:
            data = f.read()
        for p in paths[1:]:
            if not os.path.exists(p) or os.path.getsize(p) <= 1000:
                with open(p, "wb") as f:
                    f.write(data)
        return
    
    async with SEMAPHORE:
        for attempt in range(3):
            try:
                comm = edge_tts.Communicate(text, VOICE)
                await comm.save(paths[0])
                
                with open(paths[0], "rb") as f:
                    data = f.read()
                
                for p in paths[1:]:
                    with open(p, "wb") as f:
                        f.write(data)
                
                print(f"[{idx+1}/{total}] OK: '{text[:40]}...' ({len(data)} bytes)")
                return
            except Exception as e:
                if attempt == 2:
                    print(f"[{idx+1}/{total}] FAIL: '{text[:40]}...': {e}")
                await asyncio.sleep(1.0)

def generate_manifest():
    print("=== TẠO AUDIO_CACHE_MANIFEST DÀNH CHO GITHUB PAGES ===")
    all_files = [f for f in os.listdir(CACHE_DIR) if f.endswith(".mp3")]
    hashes = [os.path.splitext(f)[0] for f in all_files]
    hashes.sort()
    
    js_content = "// Auto-generated Audio Cache Manifest for 100% Zero-Latency & Offline GitHub Pages\n"
    js_content += "// Generated: " + str(len(hashes)) + " cached neural AI audio files\n"
    js_content += "window.AUDIO_CACHE_MANIFEST = new Set([\n"
    for h in hashes:
        js_content += f'  "{h}",\n'
    js_content += "]);\n"
    
    with open(MANIFEST_FILE, "w", encoding="utf-8") as f:
        f.write(js_content)
    
    print(f"-> Đã ghi thành công {len(hashes)} mã hash vào: {MANIFEST_FILE}")

async def main():
    phrases_path = os.path.join(os.path.dirname(__file__), "extracted_phrases.json")
    if not os.path.exists(phrases_path):
        print("Không tìm thấy extracted_phrases.json!")
        return
    
    with open(phrases_path, "r", encoding="utf-8") as f:
        phrases = json.load(f)
    
    total = len(phrases)
    print(f"=== BẮT ĐẦU TỔNG HỢP {total} CÂU HỌI & CÂU KHEN CHO TOÀN BỘ ỨNG DỤNG ===")
    
    tasks = [process_phrase(p, i, total) for i, p in enumerate(phrases)]
    await asyncio.gather(*tasks)
    
    print("=== HOÀN TẤT TỔNG HỢP ÂM THANH ===")
    generate_manifest()

if __name__ == '__main__':
    asyncio.run(main())
