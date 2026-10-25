"""
Generate full Vietnamese Educational Phonics Audio Cache (Chuẩn Bộ Giáo Dục & KidsUP)
Uses Edge TTS vi-VN-HoaiMyNeural with Google Translate TTS fallback.
"""
import os
import sys
import hashlib
import asyncio
import urllib.parse
import urllib.request
import edge_tts

try:
    if sys.stdout.encoding != 'utf-8':
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
except Exception:
    pass

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE_DIR = os.path.join(BASE_DIR, "audio_cache")
os.makedirs(CACHE_DIR, exist_ok=True)

VOICE = "vi-VN-HoaiMyNeural"

# Danh sách phát âm âm vị học theo chuẩn Bộ GD&ĐT & KidsUP
PHONIC_ITEMS = [
    # 29 Chữ cái cơ bản
    ("A", "Con Gà", "A", "Âm A. Chữ A trong từ Con Gà!"),
    ("Ă", "Mặt Trăng", "Ă", "Âm Ă. Chữ Ă trong từ Mặt Trăng!"),
    ("Â", "Cây Nấm", "Â", "Âm Â. Chữ Â trong từ Cây Nấm!"),
    ("B", "Quả Bóng", "Bờ", "Âm Bờ. Chữ Bờ trong từ Quả Bóng!"),
    ("C", "Con Cá", "Cờ", "Âm Cờ. Chữ Cờ trong từ Con Cá!"),
    ("D", "Dưa Hấu", "Dờ", "Âm Dờ. Chữ Dờ trong từ Dưa Hấu!"),
    ("Đ", "Đồng Hồ", "Đờ", "Âm Đờ. Chữ Đờ trong từ Đồng Hồ!"),
    ("E", "Em Bé", "E", "Âm E. Chữ E trong từ Em Bé!"),
    ("Ê", "Con Ếch", "Ê", "Âm Ê. Chữ Ê trong từ Con Ếch!"),
    ("G", "Ghế Gỗ", "Gờ", "Âm Gờ. Chữ Gờ trong từ Ghế Gỗ!"),
    ("H", "Bông Hoa", "Hờ", "Âm Hờ. Chữ Hờ trong từ Bông Hoa!"),
    ("I", "Viên Bi", "I", "Âm I. Chữ I trong từ Viên Bi!"),
    ("K", "Cây Kem", "Cờ", "Âm Cờ. Chữ Ca trong từ Cây Kem!"),
    ("L", "Chiếc Lá", "Lờ", "Âm Lờ. Chữ Lờ trong từ Chiếc Lá!"),
    ("M", "Con Mèo", "Mờ", "Âm Mờ. Chữ Mờ trong từ Con Mèo!"),
    ("N", "Nụ Hoa", "Nờ", "Âm Nờ. Chữ Nờ trong từ Nụ Hoa!"),
    ("O", "Con Ong", "O", "Âm O. Chữ O trong từ Con Ong!"),
    ("Ô", "Cái Ô", "Ô", "Âm Ô. Chữ Ô trong từ Cái Ô!"),
    ("Ơ", "Lá Cờ", "Ơ", "Âm Ơ. Chữ Ơ trong từ Lá Cờ!"),
    ("P", "Đèn Pin", "Pờ", "Âm Pờ. Chữ Pờ trong từ Đèn Pin!"),
    ("Q", "Quả Quýt", "Quờ", "Âm Quờ. Chữ Quờ trong từ Quả Quýt!"),
    ("R", "Con Rùa", "Rờ", "Âm Rờ. Chữ Rờ trong từ Con Rùa!"),
    ("S", "Ngôi Sao", "Sờ", "Âm Sờ uốn lưỡi. Chữ Sờ trong từ Ngôi Sao!"),
    ("T", "Con Tôm", "Tờ", "Âm Tờ. Chữ Tờ trong từ Con Tôm!"),
    ("U", "Búp Bê", "U", "Âm U. Chữ U trong từ Búp Bê!"),
    ("Ư", "Con Hươu", "Ư", "Âm Ư. Chữ Ư trong từ Con Hươu!"),
    ("V", "Con Vịt", "Vờ", "Âm Vờ. Chữ Vờ trong từ Con Vịt!"),
    ("X", "Xe Đạp", "Xờ", "Âm Xờ nhẹ. Chữ Xờ trong từ Xe Đạp!"),
    ("Y", "Chim Yến", "I", "Âm I, chữ Y dài trong từ Chim Yến!"),

    # 11 Phụ âm ghép
    ("CH", "Con Chim", "Chờ", "Âm Chờ. Âm Chờ trong từ Con Chim!"),
    ("GH", "Ghế Gỗ", "Gờ", "Âm Gờ kép. Âm Gờ trong từ Ghế Gỗ!"),
    ("GI", "Giỏ Hoa", "Gi", "Âm Gi. Âm Gi trong từ Giỏ Hoa!"),
    ("KH", "Cây Khế", "Khờ", "Âm Khờ. Âm Khờ trong từ Cây Khế!"),
    ("NG", "Con Ngựa", "Ngờ", "Âm Ngờ đơn. Âm Ngờ trong từ Con Ngựa!"),
    ("NGH", "Con Nghé", "Ngờ", "Âm Ngờ kép. Âm Ngờ trong từ Con Nghé!"),
    ("NH", "Ngôi Nhà", "Nhờ", "Âm Nhờ. Âm Nhờ trong từ Ngôi Nhà!"),
    ("PH", "Phố Cổ", "Phờ", "Âm Phờ. Âm Phờ trong từ Phố Cổ!"),
    ("QU", "Quả Quýt", "Quờ", "Âm Quờ. Âm Quờ trong từ Quả Quýt!"),
    ("TH", "Chú Thỏ", "Thờ", "Âm Thờ. Âm Thờ trong từ Chú Thỏ!"),
    ("TR", "Cây Tre", "Trờ", "Âm Trờ. Âm Trờ trong từ Cây Tre!"),

    # 3 Nguyên âm đôi
    ("IA", "Cây Mía", "I-a", "Vần I-a. Trong từ Cây Mía!"),
    ("UA", "Con Cua", "U-a", "Vần U-a. Trong từ Con Cua!"),
    ("ƯA", "Cơn Mưa", "Ư-a", "Vần Ư-a. Trong từ Cơn Mưa!")
]

EXTRA_PROMPTS = [
    # Game bóng bay
    "Bé hãy bấm vào bóng chữ A nhé!",
    "Bé hãy bấm vào bóng chữ Ă nhé!",
    "Bé hãy bấm vào bóng chữ Â nhé!",
    "Bé hãy bấm vào bóng chữ Bờ nhé!",
    "Bé hãy bấm vào bóng chữ Cờ nhé!",
    "Bé hãy bấm vào bóng chữ Dờ nhé!",
    "Bé hãy bấm vào bóng chữ Đờ nhé!",
    "Bé hãy bấm vào bóng chữ E nhé!",
    "Bé hãy bấm vào bóng chữ Ê nhé!",
    "Bé hãy bấm vào bóng chữ Gờ nhé!",
    "Bé hãy bấm vào bóng chữ Hờ nhé!",
    "Bé hãy bấm vào bóng chữ I nhé!",
    "Bé hãy bấm vào bóng chữ Ca nhé!",
    "Bé hãy bấm vào bóng chữ Lờ nhé!",
    "Bé hãy bấm vào bóng chữ Mờ nhé!",
    "Bé hãy bấm vào bóng chữ Nờ nhé!",
    "Bé hãy bấm vào bóng chữ O nhé!",
    "Bé hãy bấm vào bóng chữ Ô nhé!",
    "Bé hãy bấm vào bóng chữ Ơ nhé!",
    "Bé hãy bấm vào bóng chữ Pờ nhé!",
    "Bé hãy bấm vào bóng chữ Quờ nhé!",
    "Bé hãy bấm vào bóng chữ Rờ nhé!",
    "Bé hãy bấm vào bóng chữ Sờ nhé!",
    "Bé hãy bấm vào bóng chữ Tờ nhé!",
    "Bé hãy bấm vào bóng chữ U nhé!",
    "Bé hãy bấm vào bóng chữ Ư nhé!",
    "Bé hãy bấm vào bóng chữ Vờ nhé!",
    "Bé hãy bấm vào bóng chữ Xờ nhé!",
    "Bé hãy bấm vào bóng chữ Y dài nhé!",

    # Lời khen & phản hồi
    "Đúng rồi bé ơi! Bé giỏi quá!",
    "Chưa đúng rồi bé ơi, bé thử lại nhé!",
    "Hoan hô! Bé làm bài rất xuất sắc!"
]

def get_hash(text, voice, rate="+0%"):
    key = f"{text}_{voice}_{rate}"
    return hashlib.md5(key.encode("utf-8")).hexdigest()

def fetch_google(text, out_path):
    encoded = urllib.parse.quote(text)
    url = f"https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q={encoded}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=4.0) as resp:
        if resp.status == 200:
            with open(out_path, "wb") as f:
                f.write(resp.read())
            return True
    return False

async def precache_text(text):
    h = get_hash(text, VOICE, "+0%")
    path = os.path.join(CACHE_DIR, f"{h}.mp3")
    if os.path.exists(path) and os.path.getsize(path) > 500:
        return True
    try:
        await edge_tts.Communicate(text, VOICE).save(path)
        print(f"[OK Edge] {text[:35]}")
        return True
    except Exception as e:
        print(f"[Fallback Google] {text[:35]}: {e}")
        try:
            return fetch_google(text, path)
        except Exception:
            return False

async def main():
    print("=== BẮT ĐẦU TẠO AUDIO CHUẨN ÂM VỊ HỌC BỘ GIÁO DỤC ===")
    count = 0
    
    # 1. Âm riêng & câu mẫu cho các âm vị
    for item in PHONIC_ITEMS:
        # text 1: chỉ âm ("Bờ", "Hờ", "Chờ"...)
        sound_text = f"Âm {item[2]}!"
        if await precache_text(sound_text):
            count += 1
            
        # text 2: câu mẫu đầy đủ
        example_text = item[3]
        if await precache_text(example_text):
            count += 1

        # text 3: phát âm ngắn âm ("Hờ", "Bờ")
        if item[2] not in ["A", "Ă", "Â", "E", "Ê", "I", "O", "Ô", "Ơ", "U", "Ư"]:
            if await precache_text(item[2]):
                count += 1

    # 2. Extra prompts
    for p in EXTRA_PROMPTS:
        if await precache_text(p):
            count += 1

    print(f"\n[HOÀN TẤT] Đã tạo và kiểm tra thành công các file audio âm vị học chuẩn!")

if __name__ == "__main__":
    asyncio.run(main())
