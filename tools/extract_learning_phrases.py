import re
import json

def extract_phrases():
    phrases = set()

    # 1. vietnamese.js
    with open('js/vietnamese.js', 'r', encoding='utf-8') as f:
        vn = f.read()

    # Tones list
    tones_say = [
        'Tiếng Cá có dấu sắc', 'Tiếng Bà có dấu huyền', 'Tiếng Thỏ có dấu hỏi',
        'Tiếng Ngựa có dấu nặng', 'Tiếng Sữa có dấu ngã', 'Tiếng Lá có dấu sắc',
        'Tiếng Gà có dấu huyền', 'Tiếng Hổ có dấu hỏi', 'Tiếng Mẹ có dấu nặng',
        'Tiếng Mũ có dấu ngã', 'Tiếng Bé có dấu sắc', 'Tiếng Cờ có dấu huyền',
        'Tiếng Cỏ có dấu hỏi', 'Tiếng Gỗ có dấu ngã', 'Tiếng Vịt có dấu nặng'
    ]
    tones_words = ['CÁ', 'BÀ', 'THỎ', 'NGỰA', 'SỮA', 'LÁ', 'GÀ', 'HỔ', 'MẸ', 'MŨ', 'BÉ', 'CỜ', 'CỎ', 'GỖ', 'VỊT']
    for s in tones_say:
        phrases.add(f"Đúng rồi bé ơi! {s} nhé!")
    for w in tones_words:
        phrases.add(f"Tiếng {w} mang dấu thanh nào vậy bé?")
    phrases.add("Chưa đúng dấu rồi bé ơi, bé nhìn kỹ lại nhé!")

    # Spelling rules
    spelling_items = [
        ('k', 'Cây kem', "Đứng trước chữ 'e' thì bé điền 'c' hay 'k' nè?"),
        ('c', 'Con cá', "Đứng trước chữ 'a' thì bé điền 'c' hay 'k' nè?"),
        ('k', 'Cái kính', "Đứng trước chữ 'i' thì bé điền 'c' hay 'k' nè?"),
        ('k', 'Con kiến', "Đứng trước chữ 'i' thì bé điền 'c' hay 'k' nè?"),
        ('c', 'Quả cam', "Đứng trước chữ 'a' thì bé điền 'c' hay 'k' nè?"),
        ('gh', 'Cái ghế', "Đứng trước chữ 'ê' thì bé điền 'g' hay 'gh' nè?"),
        ('g', 'Con gà', "Đứng trước chữ 'a' thì bé điền 'g' hay 'gh' nè?"),
        ('gh', 'Ghi bài', "Đứng trước chữ 'i' thì bé điền 'g' hay 'gh' nè?"),
        ('gh', 'Con ghẹ', "Đứng trước chữ 'e' thì bé điền 'g' hay 'gh' nè?"),
        ('ngh', 'Củ nghệ', "Đứng trước chữ 'ê' thì bé điền 'ng' hay 'ngh' nè?"),
        ('ng', 'Con ngựa', "Đứng trước chữ 'ư' thì bé điền 'ng' hay 'ngh' nè?"),
        ('ngh', 'Bé nghe', "Đứng trước chữ 'e' thì bé điền 'ng' hay 'ngh' nè?")
    ]
    for ans, full, hint in spelling_items:
        phrases.add(hint)
        phrases.add(f"Chính xác rồi! Điền chữ {ans} tạo thành từ {full} nhé!")
    phrases.add("Chưa đúng quy tắc rồi bé ơi, bé chọn lại nhé!")

    # Compounds
    compounds = [
        ('th', 'Chú thỏ', 'Chú thỏ có âm thờ'),
        ('ch', 'Con chim', 'Con chim có âm chờ'),
        ('kh', 'Cây khế', 'Cây khế có âm khờ'),
        ('nh', 'Ngôi nhà', 'Ngôi nhà có âm nhờ'),
        ('ph', 'Phố cổ', 'Phố cổ có âm phờ'),
        ('qu', 'Quả quýt', 'Quả quýt có âm quờ'),
        ('tr', 'Cây tre', 'Cây tre có âm trờ'),
        ('gi', 'Giỏ hoa', 'Giỏ hoa có âm gi'),
        ('gh', 'Ghế gỗ', 'Ghế gỗ có âm gờ kép'),
        ('ng', 'Con ngựa', 'Con ngựa có âm ngờ'),
        ('ngh', 'Củ nghệ', 'Củ nghệ có âm ngờ kép'),
        ('tr', 'Con trâu', 'Con trâu có âm trờ'),
        ('kh', 'Khỉ con', 'Khỉ con có âm khờ')
    ]
    for ans, full, say in compounds:
        phrases.add(f"Hình {full} nè bé. Âm ghép nào còn thiếu vậy ta?")
        phrases.add(f"Đúng rồi bé ơi! {say} nhé!")
    phrases.add("Chưa đúng âm ghép rồi, bé chọn lại nhé!")

    # Quiz letters
    # 29 letters sound
    letter_sounds = [
        ('A', 'Con Gà'), ('Á', 'Mặt Trăng'), ('Ớ', 'Cây Nấm'), ('Bờ', 'Quả Bóng'),
        ('Cờ', 'Con Cá'), ('Dờ', 'Dưa Hấu'), ('Đờ', 'Đồng Hồ'), ('E', 'Em Bé'),
        ('Ê', 'Con Ếch'), ('Gờ', 'Ghế Gỗ'), ('Hờ', 'Bông Hoa'), ('I', 'Viên Bi'),
        ('Cờ', 'Cây Kem'), ('Lờ', 'Chiếc Lá'), ('Mờ', 'Con Mèo'), ('Nờ', 'Nụ Hoa'),
        ('O', 'Con Ong'), ('Ô', 'Cái Ô'), ('Ơ', 'Lá Cờ'), ('Pờ', 'Đèn Pin'),
        ('Quờ', 'Quả Quýt'), ('Rờ', 'Con Rùa'), ('Sờ', 'Ngôi Sao'), ('Tờ', 'Con Tôm'),
        ('U', 'Búp Bê'), ('Ư', 'Con Hươu'), ('Vờ', 'Con Vịt'), ('Xờ', 'Xe Đạp'),
        ('I', 'Chim Yến')
    ]
    for sound, word in letter_sounds:
        phrases.add(f"Bé hãy tìm chữ {sound} của từ {word} nhé!")
        phrases.add(f"Chính xác rồi nè! Chữ {sound} giỏi quá!")
    phrases.add("Bé chọn lại với cô nhé!")

    # Rhyme
    rhymes = [
        ('CÁ', 'Con cá'), ('GÀ', 'Con gà'), ('BÓNG', 'Quả bóng'), ('MÈO', 'Con mèo'),
        ('RÙA', 'Con rùa'), ('HOA', 'Bông hoa'), ('NẤM', 'Cây nấm'), ('BÚP BÊ', 'Búp bê'),
        ('LÁ CỜ', 'Lá cờ'), ('CON VỊT', 'Con vịt'), ('CÂY KEM', 'Cây kem'), ('XE ĐẠP', 'Xe đạp'),
        ('ĐỒNG HỒ', 'Đồng hồ'), ('MẶT TRĂNG', 'Mặt trăng')
    ]
    for full, say in rhymes:
        phrases.add(f"Đây là hình {say} nè. Còn thiếu chữ cái nào vậy bé ơi?")
        phrases.add(f"Đúng rồi nè! Bé ghép được từ {say} giỏi quá!")
    phrases.add("Chưa đúng chữ rồi bé ơi, bé thử lại nhé!")

    # Sentences
    sentences = [
        "Bé đi học chăm chỉ", "Bầu trời có mây xanh", "Em yêu quý mẹ cha",
        "Đàn gà con theo mẹ", "Mặt trời mọc buổi sáng", "Bé yêu trường lớp của bé",
        "Hoa sen nở thơm ngát dưới hồ", "Cô giáo dạy bé tập đọc chữ"
    ]
    phrases.add("Bé hãy xếp các từ thành câu hoàn chỉnh nhé!")
    phrases.add("Thứ tự các từ chưa đúng rồi, bé xếp lại với cô nhé!")
    for s in sentences:
        phrases.add(f"Hoan hô! Bé đã ghép thành công câu: {s} nhé!")

    # Reading comprehension explanations
    reading_praises = [
        "Đúng rồi bé ơi! Sóc Nâu đã mang hạt dẻ sang chia sẻ với Thỏ Trắng trong ngày mưa.",
        "Đúng rồi bé ơi! Câu chuyện dạy chúng mình phải biết yêu thương, chia sẻ và giúp đỡ bạn bè.",
        "Đúng rồi bé ơi! Thỏ Trắng cảm thấy ấm áp và xúc động trước tấm lòng của bạn Sóc Nâu.",
        "Đúng rồi bé ơi! Chú Gà Trống gáy vang 'Ò ó o' gọi ông mặt trời thức dậy.",
        "Đúng rồi bé ơi! Tiếng gáy của Gà Trống giúp mọi người và các loài hoa thức giấc đón ngày mới.",
        "Đúng rồi bé ơi! Chú Gà Trống rất chăm chỉ, luôn dậy sớm báo thức mỗi ngày.",
        "Đúng rồi bé ơi! Bạn Ong Nâu chăm chỉ bay đi tìm hoa hút mật ngọt từ sáng sớm.",
        "Đúng rồi bé ơi! Những giọt mật hoa được Ong Nâu mang về tổ để luyện thành mật ong ngọt lịm.",
        "Đúng rồi bé ơi! Ong Nâu dạy chúng mình đức tính chăm chỉ, cần cù lao động.",
        "Đúng rồi bé ơi! Bé Bông luôn giúp mẹ quét nhà, gấp quần áo và cất đồ chơi gọn gàng.",
        "Đúng rồi bé ơi! Mẹ ôm Bông vào lòng và khen Bông là cô bé ngoan, hiếu thảo.",
        "Đúng rồi bé ơi! Bài học nhắc nhở bé chăm ngoan, biết yêu thương và giúp đỡ bố mẹ việc nhà."
    ]
    for p in reading_praises:
        phrases.add(p)
    phrases.add("Chưa đúng rồi bé ơi, bé suy nghĩ và chọn lại nhé!")
    phrases.add("Hoan hô! Bé đã tìm hiểu xong toàn bộ câu chuyện rồi, bé giỏi lắm!")

    # 2. science.js
    with open('js/science.js', 'r', encoding='utf-8') as f:
        sci = f.read()
    
    # Extract exp from science.js
    exp_matches = re.findall(r"exp:\s*[\"'](.*?)[\"']", sci)
    for exp in exp_matches:
        phrases.add(f"Chính xác rồi bé ơi! {exp}")
    
    q_matches = re.findall(r"q:\s*[\"'](.*?)[\"']", sci)
    for q in q_matches:
        phrases.add(q)
    phrases.add("Chưa đúng rồi nè! Bé thử lại nhé!")

    # 3. english.js
    eng_vocab = [
        ('Cat', 'Con mèo'), ('Dog', 'Con chó'), ('Bird', 'Con chim'), ('Fish', 'Con cá'),
        ('Duck', 'Con vịt'), ('Rabbit', 'Con thỏ'), ('Monkey', 'Con khỉ'), ('Elephant', 'Con voi'),
        ('Red', 'Màu đỏ'), ('Blue', 'Màu xanh dương'), ('Yellow', 'Màu vàng'), ('Green', 'Màu xanh lá'),
        ('Orange', 'Màu cam'), ('Pink', 'Màu hồng'), ('Purple', 'Màu tím'), ('White', 'Màu trắng'),
        ('Apple', 'Quả táo'), ('Banana', 'Quả chuối'), ('Orange', 'Quả cam'), ('Mango', 'Quả xoài'),
        ('Watermelon', 'Quả dưa hấu'), ('Strawberry', 'Quả dâu tây'), ('Grape', 'Quả nho'), ('Pineapple', 'Quả dứa'),
        ('Teddy bear', 'Gấu bông'), ('Car', 'Xe ô tô'), ('Ball', 'Quả bóng'), ('Kite', 'Con diều'),
        ('Top', 'Con quay'), ('Robot', 'Người máy'), ('Bike', 'Xe đạp'), ('Boat', 'Thuyền buồm')
    ]
    for w, vn in eng_vocab:
        phrases.add(f"Tuyệt vời! {w} nghĩa là {vn} nhé bé!")

    # 4. math.js
    # Counting 1 to 20
    phrases.add("Bé hãy đếm xem có bao nhiêu hình ở đây nhé!")
    for i in range(1, 21):
        phrases.add(f"Chính xác rồi nè! Có tất cả {i} hình nè bé ơi!")
        phrases.add(f"Đúng rồi nè! Số còn thiếu là số {i} nhé!")
    
    # Liền trước & liền sau
    for n in range(2, 21):
        phrases.add(f"Số liền trước của số {n} là số mấy vậy bé yêu?")
        phrases.add(f"Giỏi quá! Số liền trước của số {n} là số {n-1} nè!")
    for n in range(1, 20):
        phrases.add(f"Số liền sau của số {n} là số mấy vậy bé yêu?")
        phrases.add(f"Chính xác rồi nè! Số liền sau của số {n} là số {n+1} nhé!")

    # Split
    for total in range(3, 11):
        for partA in range(1, total):
            partB = total - partA
            phrases.add(f"Gộp {partA} và {partB} được mấy hả bé yêu?")
            phrases.add(f"Số {total} gồm {partA} và mấy vậy bé?")
            phrases.add(f"Rất chính xác! Gộp {partA} và {partB} được {total} nè!")
            phrases.add(f"Chuẩn luôn nè bé! {total} gồm {partA} và {partB} nhé!")

    # Clock & Calendar
    for h in range(1, 13):
        phrases.add(f"Đồng hồ đang chỉ mấy giờ vậy bé ơi? Kim ngắn màu đỏ chỉ số mấy nè?")
        phrases.add(f"Chính xác rồi nè! Đồng hồ chỉ đúng {h} giờ nhé!")
    phrases.add("Một tuần lễ có bao nhiêu ngày hả bé?")
    phrases.add("Giỏi quá! Một tuần lễ có đúng 7 ngày bé nhé!")
    phrases.add("Các ngày em đi học là từ Thứ mấy đến Thứ mấy nè?")
    phrases.add("Rất chính xác! Bé đi học từ Thứ Hai đến Thứ Sáu, Thứ Bảy và Chủ Nhật được nghỉ ở nhà nhé!")

    # Word problems praises
    word_prob_praises = [
        "Tuyệt vời quá chừng! Phép tính là 5 + 3 = 8, đáp số là 8 nè!",
        "Tuyệt vời quá chừng! Phép tính là 7 - 2 = 5, đáp số là 5 nè!",
        "Tuyệt vời quá chừng! Phép tính là 6 + 4 = 10, đáp số là 10 nè!",
        "Tuyệt vời quá chừng! Phép tính là 9 - 4 = 5, đáp số là 5 nè!",
        "Tuyệt vời quá chừng! Phép tính là 10 + 5 = 15, đáp số là 15 nè!",
        "Tuyệt vời quá chừng! Phép tính là 8 - 2 = 6, đáp số là 6 nè!",
        "Tuyệt vời quá chừng! Phép tính là 5 + 3 = 8, đáp số là 8 nè!",
        "Tuyệt vời quá chừng! Phép tính là 12 - 2 = 10, đáp số là 10 nè!",
        "Tuyệt vời quá chừng! Phép tính là 6 + 4 = 10, đáp số là 10 nè!",
        "Tuyệt vời quá chừng! Phép tính là 9 - 3 = 6, đáp số là 6 nè!",
        "Tuyệt vời quá chừng! Phép tính là 7 + 3 = 10, đáp số là 10 nè!",
        "Tuyệt vời quá chừng! Phép tính là 8 + 4 = 12, đáp số là 12 nè!",
        "Tuyệt vời quá chừng! Phép tính là 15 - 5 = 10, đáp số là 10 nè!",
        "Tuyệt vời quá chừng! Phép tính là 7 + 3 = 10, đáp số là 10 nè!",
        "Tuyệt vời quá chừng! Phép tính là 18 - 6 = 12, đáp số là 12 nè!",
        "Tuyệt vời quá chừng! Phép tính là 11 - 4 = 7, đáp số là 7 nè!",
        "Tuyệt vời quá chừng! Phép tính là 3 + 4 = 7, đáp số là 7 nè!"
    ]
    for wpp in word_prob_praises:
        phrases.add(wpp)

    # Comparison
    for n1 in range(0, 11):
        for n2 in range(0, 11):
            if n1 > n2: comp = 'lớn hơn'
            elif n1 < n2: comp = 'bé hơn'
            else: comp = 'bằng'
            phrases.add(f"Giỏi quá nè! Số {n1} {comp} số {n2} nhé!")

    # Addition
    for a in range(0, 11):
        for b in range(0, 11):
            s = a + b
            phrases.add(f"Giỏi quá bé ơi! {a} cộng {b} bằng {s} nè!")

    # Subtraction
    for t in range(3, 11):
        for sub in range(1, t):
            diff = t - sub
            phrases.add(f"Đúng rồi nè! {t} trừ {sub} còn lại {diff} nhé!")

    for t in range(12, 20):
        units = t % 10
        for sub in range(1, max(1, units) + 1):
            diff = t - sub
            phrases.add(f"Đúng rồi nè! {t} trừ {sub} còn lại {diff} nhé!")

    # Shapes
    for pos in ['Bên trái', 'Bên phải', 'Bên trên', 'Bên dưới']:
        phrases.add(f"Chính xác rồi nè! Đáp án đúng là {pos} nhé!")

    for sh in ['Hình tròn', 'Hình vuông', 'Hình tam giác', 'Hình chữ nhật']:
        phrases.add(f"Giỏi quá! Đây đúng là {sh} rồi nè!")

    # Calendar
    phrases.add("Đúng rồi! Thứ Bảy và Chủ Nhật là ngày cuối tuần bé được nghỉ ngơi vui vẻ bên gia đình!")
    phrases.add("Chính xác! Sau Thứ Ba là đến Thứ Tư bé nhé!")
    phrases.add("Giỏi quá! Ngày trước Thứ Bảy chính là Thứ Sáu nè!")
    phrases.add("Rất đúng! Thứ Hai là ngày đầu tuần mở đầu một tuần học mới tràn đầy niềm vui!")

    # 5. games.js
    for i in range(1, 11):
        phrases.add(f"Bé hãy bấm vào bóng số {i} nhé!")

    phonics_map = {
        'A': 'A', 'Ă': 'Á', 'Â': 'Ớ',
        'B': 'Bờ', 'C': 'Cờ', 'D': 'Dờ', 'Đ': 'Đờ',
        'E': 'E', 'Ê': 'Ê', 'G': 'Gờ', 'H': 'Hờ',
        'I': 'I', 'K': 'Cờ', 'L': 'Lờ', 'M': 'Mờ',
        'N': 'Nờ', 'O': 'O', 'Ô': 'Ô', 'Ơ': 'Ơ',
        'P': 'Pờ', 'Q': 'Quờ', 'R': 'Rờ', 'S': 'Sờ',
        'T': 'Tờ', 'U': 'U', 'Ư': 'Ư', 'V': 'Vờ',
        'X': 'Xờ', 'Y': 'I'
    }
    for c, p in phonics_map.items():
        phrases.add(f"Bé hãy bấm vào bóng chữ {p} nhé!")

    animals = ['Mèo con', 'Cún con', 'Thỏ trắng', 'Gấu trúc', 'Sư tử', 'Chú voi']
    for a in animals:
        phrases.add(f"Tìm thấy một cặp {a} rồi nè bé ơi!")
    phrases.add("Hoan hô! Bé đã tìm đủ hết tất cả các cặp con vật rồi nè! Bé giỏi quá chừng luôn!")

    # General praises
    general_praises = [
        "Chính xác rồi bé ơi!", "Giỏi quá bé ơi!", "Bé trả lời xuất sắc quá chừng!",
        "Hoan hô bé yêu!", "Đúng rồi nè bé ơi!", "Tuyệt vời quá bé ơi!",
        "Bé làm đúng rồi, cô khen bé nhé!"
    ]
    for gp in general_praises:
        phrases.add(gp)

    return sorted(list(phrases))

if __name__ == '__main__':
    all_p = extract_phrases()
    print(f"Total phrases extracted: {len(all_p)}")
    with open('tools/extracted_phrases.json', 'w', encoding='utf-8') as f:
        json.dump(all_p, f, ensure_ascii=False, indent=2)
    print("Saved to tools/extracted_phrases.json")
