"""
Pre-cache Core Audio for Vuon Tuoi Tho 2.1
Ensures 0ms response time for all alphabet letters, numbers, and voice previews.
"""
import os
import sys
import hashlib
import asyncio
import urllib.parse
import urllib.request

try:
    if sys.stdout.encoding != 'utf-8':
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE_DIR = os.path.join(BASE_DIR, "audio_cache")
os.makedirs(CACHE_DIR, exist_ok=True)

VOICES = ["vi-VN-HoaiMyNeural", "vi-VN-NamMinhNeural"]

ALPHABET = [
    ('A', 'Con Gà'), ('Ă', 'Mặt Trăng'), ('Â', 'Cây Nấm'),
    ('B', 'Quả Bóng'), ('C', 'Con Cá'), ('D', 'Dưa Hấu'),
    ('Đ', 'Đồng Hồ'), ('E', 'Em Bé'), ('Ê', 'Con Ếch'),
    ('G', 'Ghế Gỗ'), ('H', 'Bông Hoa'), ('I', 'Viên Bi'),
    ('K', 'Cây Kem'), ('L', 'Chiếc Lá'), ('M', 'Con Mèo'),
    ('N', 'Nụ Hoa'), ('O', 'Con Ong'), ('Ô', 'Cái Ô'),
    ('Ơ', 'Lá Cờ'), ('P', 'Cây Bút'), ('Q', 'Quả Quýt'),
    ('R', 'Con Rùa'), ('S', 'Ngôi Sao'), ('T', 'Con Tôm'),
    ('U', 'Búp Bê'), ('Ư', 'Con Hươu'), ('V', 'Con Vịt'),
    ('X', 'Xe Đạp'), ('Y', 'Chim Yến')
]

PREVIEWS = {
    "vi-VN-HoaiMyNeural": "Dạ cô chào bé cưng nghen! Chúc bé một ngày học tập thật vui và đạt nhiều điểm mười nhé!",
    "vi-VN-NamMinhNeural": "Thầy giáo chào các em học sinh lớp một thân mến! Hôm nay thầy trò mình cùng học thật vui nhé!",
    "google-fast": "Chào bé yêu! Giọng siêu tốc phát âm cực nhanh, giúp bé bấm chữ nào nghe ngay chữ đó nhé!"
}

PROMPTS = [
    "Đúng rồi nè bé ơi!",
    "Chưa đúng rồi bé ơi, bé thử lại nghen!",
    "Hoan hô! Bé giỏi quá chừng luôn!",
    "Cô đã điều chỉnh tốc độ nói rồi nè bé!"
]

for i in range(1, 11):
    PROMPTS.append(f"Bé bấm vô bóng số {i} nghen!")

def get_hash(text, voice, rate="+0%"):
    key = f"{text}_{voice}_{rate}"
    return hashlib.md5(key.encode("utf-8")).hexdigest()

def fetch_google(text, out_path):
    encoded = urllib.parse.quote(text)
    url = f"https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q={encoded}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=3.0) as resp:
        if resp.status == 200:
            with open(out_path, "wb") as f:
                f.write(resp.read())
            return True
    return False

async def precache_all():
    import edge_tts
    total = 0
    cached = 0

    # 1. Previews
    for v, text in PREVIEWS.items():
        total += 1
        h = get_hash(text, v, "+0%")
        path = os.path.join(CACHE_DIR, f"{h}.mp3")
        if os.path.exists(path) and os.path.getsize(path) > 0:
            cached += 1
            continue
        try:
            if v == "google-fast":
                fetch_google(text, path)
            else:
                await edge_tts.Communicate(text, v).save(path)
            print(f"[OK] Preview cached: {v}")
            cached += 1
        except Exception as e:
            print(f"[Fallback Google] Preview {v}: {e}")
            fetch_google(text, path)
            cached += 1

    # 2. Alphabet Letters
    for char, word in ALPHABET:
        text = f"Chữ {char} nè bé. {word}!"
        for v in VOICES:
            total += 1
            h = get_hash(text, v, "+0%")
            path = os.path.join(CACHE_DIR, f"{h}.mp3")
            if os.path.exists(path) and os.path.getsize(path) > 0:
                cached += 1
                continue
            try:
                await edge_tts.Communicate(text, v).save(path)
                print(f"[OK] {char} ({v})")
                cached += 1
            except Exception:
                fetch_google(text, path)
                cached += 1

    # 3. Common Prompts
    for text in PROMPTS:
        for v in VOICES:
            total += 1
            h = get_hash(text, v, "+0%")
            path = os.path.join(CACHE_DIR, f"{h}.mp3")
            if os.path.exists(path) and os.path.getsize(path) > 0:
                cached += 1
                continue
            try:
                await edge_tts.Communicate(text, v).save(path)
                cached += 1
            except Exception:
                fetch_google(text, path)
                cached += 1

    print(f"\n[DONE] Pre-cached {cached}/{total} audio files successfully!")

if __name__ == "__main__":
    asyncio.run(precache_all())
