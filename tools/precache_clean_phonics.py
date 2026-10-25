"""
Precache Clean Phonic Sounds (Chuẩn BGD&ĐT, KHÔNG CÓ TỪ 'ÂM', Ă đọc là Á, Â đọc là Ớ)
Zero Latency - Save directly to audio_cache/ with both hash variants.
"""
import os
import sys
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
os.makedirs(CACHE_DIR, exist_ok=True)

VOICE = "vi-VN-HoaiMyNeural"

# Pure phonic sounds without 'Âm'
SOUNDS_LIST = [
    # 29 chữ cái chính thức
    ("A", "A. Con Gà!"),
    ("Á", "Á. Mặt Trăng!"),
    ("Ớ", "Ớ. Cây Nấm!"),
    ("Bờ", "Bờ. Quả Bóng!"),
    ("Cờ", "Cờ. Con Cá!"),
    ("Dờ", "Dờ. Dưa Hấu!"),
    ("Đờ", "Đờ. Đồng Hồ!"),
    ("E", "E. Em Bé!"),
    ("Ê", "Ê. Con Ếch!"),
    ("Gờ", "Gờ. Ghế Gỗ!"),
    ("Hờ", "Hờ. Bông Hoa!"),
    ("I", "I. Viên Bi!"),
    ("Cờ", "Cờ. Cây Kem!"),
    ("Lờ", "Lờ. Chiếc Lá!"),
    ("Mờ", "Mờ. Con Mèo!"),
    ("Nờ", "Nờ. Nụ Hoa!"),
    ("O", "O. Con Ong!"),
    ("Ô", "Ô. Cái Ô!"),
    ("Ơ", "Ơ. Lá Cờ!"),
    ("Pờ", "Pờ. Đèn Pin!"),
    ("Quờ", "Quờ. Quả Quýt!"),
    ("Rờ", "Rờ. Con Rùa!"),
    ("Sờ", "Sờ. Ngôi Sao!"),
    ("Tờ", "Tờ. Con Tôm!"),
    ("U", "U. Búp Bê!"),
    ("Ư", "Ư. Con Hươu!"),
    ("Vờ", "Vờ. Con Vịt!"),
    ("Xờ", "Xờ. Xe Đạp!"),
    ("I", "I. Chim Yến!"),
    
    # 11 Phụ âm ghép
    ("Chờ", "Chờ. Con Chim!"),
    ("Gờ", "Gờ kép. Ghế Gỗ!"),
    ("Gờ kép", "Gờ kép. Ghế Gỗ!"),
    ("Gi", "Gi. Giỏ Hoa!"),
    ("Khờ", "Khờ. Cây Khế!"),
    ("Ngờ", "Ngờ đơn. Con Ngựa!"),
    ("Ngờ đơn", "Ngờ đơn. Con Ngựa!"),
    ("Ngờ kép", "Ngờ kép. Con Nghé!"),
    ("Nhờ", "Nhờ. Ngôi Nhà!"),
    ("Phờ", "Phờ. Phố Cổ!"),
    ("Thờ", "Thờ. Chú Thỏ!"),
    ("Trờ", "Trờ. Cây Tre!"),
    
    # 3 Nguyên âm đôi
    ("Ia", "Ia. Cây Mía!"),
    ("Ua", "Ua. Con Cua!"),
    ("Ưa", "Ưa. Cơn Mưa!"),
]

EXTRA_PROMPTS = [
    # Balloon game prompts without 'Âm'
    "Bé hãy bấm vào bóng chữ A nhé!",
    "Bé hãy bấm vào bóng chữ Á nhé!",
    "Bé hãy bấm vào bóng chữ Ớ nhé!",
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
    "Bé hãy bấm vào bóng chữ I nhé!",
    "Chữ A", "Chữ Á", "Chữ Ớ", "Chữ Bờ", "Chữ Cờ", "Chữ Dờ", "Chữ Đờ",
    "Chữ E", "Chữ Ê", "Chữ Gờ", "Chữ Hờ", "Chữ I", "Chữ Lờ", "Chữ Mờ",
    "Chữ Nờ", "Chữ O", "Chữ Ô", "Chữ Ơ", "Chữ Pờ", "Chữ Quờ", "Chữ Rờ",
    "Chữ Sờ", "Chữ Tờ", "Chữ U", "Chữ Ư", "Chữ Vờ", "Chữ Xờ",
]

async def synthesize_text(text: str):
    text = text.strip()
    if not text:
        return
    
    h1 = hashlib.md5(f"{text}_{VOICE}_+0%".encode("utf-8")).hexdigest()
    h2 = hashlib.md5(f"{text}_{VOICE}".encode("utf-8")).hexdigest()
    
    p1 = os.path.join(CACHE_DIR, f"{h1}.mp3")
    p2 = os.path.join(CACHE_DIR, f"{h2}.mp3")
    
    # If both exist and valid, skip
    if os.path.exists(p1) and os.path.getsize(p1) > 1000 and os.path.exists(p2) and os.path.getsize(p2) > 1000:
        return
    
    tmp_path = p1 if not os.path.exists(p1) or os.path.getsize(p1) <= 1000 else p2
    try:
        comm = edge_tts.Communicate(text, VOICE)
        await comm.save(tmp_path)
        
        # Copy to the other hash file as well for instant resolution
        with open(tmp_path, "rb") as f:
            content = f.read()
        
        with open(p1, "wb") as f:
            f.write(content)
        with open(p2, "wb") as f:
            f.write(content)
            
        print(f"[OK] '{text}' -> {h1[:8]} / {h2[:8]} ({len(content)} bytes)")
    except Exception as e:
        print(f"[ERR] '{text}': {e}")

async def main():
    print("=== TẠO TOÀN BỘ FILE ÂM THANH BẢNG CHỮ CÁI KHÔNG TỪ 'ÂM' & Ă/Â CHUẨN ===")
    
    tasks = []
    # 1. Phonic sounds
    for sound, example in SOUNDS_LIST:
        await synthesize_text(sound)
        await synthesize_text(example)
        
    # 2. Extra prompts
    for p in EXTRA_PROMPTS:
        await synthesize_text(p)
        
    print("\n[HOÀN TẤT TẤT CẢ FILE AUDIO CHUẨN 0MS]")

if __name__ == "__main__":
    asyncio.run(main())
