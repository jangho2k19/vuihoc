/* ========================================================
   VIETNAMESE MODULE - BÁM SÁT CHƯƠNG TRÌNH TIẾNG VIỆT LỚP 1
   Bảng chữ cái, 5 Dấu thanh, Quy tắc chính tả (c/k, g/gh, ng/ngh),
   Âm ghép (ch, nh, th...), Đố chữ, Ghép vần, Xếp từ thành câu
   ======================================================== */

class VietnameseApp {
  constructor() {
    // 1. 29 CHỮ CÁI TIẾNG VIỆT CHÍNH THỨC (Chuẩn âm vị học BGD&ĐT - KHÔNG CÓ TỪ 'ÂM', Ă đọc là Á, Â đọc là Ớ)
    this.alphabetData = [
      { upper: 'A', lower: 'a', sound: 'A', letterName: 'A', ipa: '/a/', category: 'vowel', categoryName: 'Nguyên âm đơn', word: 'Con Gà', icon: '🐔', spelling: 'A - Con Gà', sentence: 'Chữ A trong từ Con Gà', sayPhonic: 'A', sayExample: 'A. Con Gà!' },
      { upper: 'Ă', lower: 'ă', sound: 'Á', letterName: 'Ă (Á)', ipa: '/ă/', category: 'vowel', categoryName: 'Nguyên âm đơn', word: 'Mặt Trăng', icon: '🌙', spelling: 'Á - Mặt Trăng', sentence: 'Chữ Ă phát âm là Á trong từ Mặt Trăng', sayPhonic: 'Á', sayExample: 'Á. Mặt Trăng!' },
      { upper: 'Â', lower: 'â', sound: 'Ớ', letterName: 'Â (Ớ)', ipa: '/ɤ̆/', category: 'vowel', categoryName: 'Nguyên âm đơn', word: 'Cây Nấm', icon: '🍄', spelling: 'Ớ - Cây Nấm', sentence: 'Chữ Â phát âm là Ớ trong từ Cây Nấm', sayPhonic: 'Ớ', sayExample: 'Ớ. Cây Nấm!' },
      { upper: 'B', lower: 'b', sound: 'Bờ', letterName: 'Bê (Bờ)', ipa: '/b/', category: 'consonant', categoryName: 'Phụ âm đầu', word: 'Quả Bóng', icon: '⚽', spelling: 'Bờ - Quả Bóng', sentence: 'Chữ Bờ trong từ Quả Bóng', sayPhonic: 'Bờ', sayExample: 'Bờ. Quả Bóng!' },
      { upper: 'C', lower: 'c', sound: 'Cờ', letterName: 'Cờ (Xê)', ipa: '/k/', category: 'consonant', categoryName: 'Phụ âm đầu', word: 'Con Cá', icon: '🐟', spelling: 'Cờ - a - ca - sắc - cá', sentence: 'Chữ Cờ trong từ Con Cá', sayPhonic: 'Cờ', sayExample: 'Cờ. Con Cá!' },
      { upper: 'D', lower: 'd', sound: 'Dờ', letterName: 'Dê (Dờ)', ipa: '/z/', category: 'consonant', categoryName: 'Phụ âm đầu', word: 'Dưa Hấu', icon: '🍉', spelling: 'Dờ - ưa - dưa', sentence: 'Chữ Dờ trong từ Dưa Hấu', sayPhonic: 'Dờ', sayExample: 'Dờ. Dưa Hấu!' },
      { upper: 'Đ', lower: 'đ', sound: 'Đờ', letterName: 'Đê (Đờ)', ipa: '/d/', category: 'consonant', categoryName: 'Phụ âm đầu', word: 'Đồng Hồ', icon: '⏰', spelling: 'Đờ - Đồng Hồ', sentence: 'Chữ Đờ trong từ Đồng Hồ', sayPhonic: 'Đờ', sayExample: 'Đờ. Đồng Hồ!' },
      { upper: 'E', lower: 'e', sound: 'E', letterName: 'E', ipa: '/ε/', category: 'vowel', categoryName: 'Nguyên âm đơn', word: 'Em Bé', icon: '👶', spelling: 'E - Em Bé', sentence: 'Chữ E trong từ Em Bé', sayPhonic: 'E', sayExample: 'E. Em Bé!' },
      { upper: 'Ê', lower: 'ê', sound: 'Ê', letterName: 'Ê', ipa: '/e/', category: 'vowel', categoryName: 'Nguyên âm đơn', word: 'Con Ếch', icon: '🐸', spelling: 'Ê - Con Ếch', sentence: 'Chữ Ê trong từ Con Ếch', sayPhonic: 'Ê', sayExample: 'Ê. Con Ếch!' },
      { upper: 'G', lower: 'g', sound: 'Gờ', letterName: 'Gờ (Giê)', ipa: '/ɣ/', category: 'consonant', categoryName: 'Phụ âm đầu', word: 'Ghế Gỗ', icon: '🪑', spelling: 'Gờ - Ghế Gỗ', sentence: 'Chữ Gờ trong từ Ghế Gỗ', sayPhonic: 'Gờ', sayExample: 'Gờ. Ghế Gỗ!' },
      { upper: 'H', lower: 'h', sound: 'Hờ', letterName: 'Hờ', ipa: '/h/', category: 'consonant', categoryName: 'Phụ âm đầu', word: 'Bông Hoa', icon: '🌸', spelling: 'Hờ - oa - hoa', sentence: 'Chữ Hờ trong từ Bông Hoa', sayPhonic: 'Hờ', sayExample: 'Hờ. Bông Hoa!' },
      { upper: 'I', lower: 'i', sound: 'I', letterName: 'I (i ngắn)', ipa: '/i/', category: 'vowel', categoryName: 'Nguyên âm đơn', word: 'Viên Bi', icon: '🔮', spelling: 'Bờ - i - bi', sentence: 'Chữ I trong từ Viên Bi', sayPhonic: 'I', sayExample: 'I. Viên Bi!' },
      { upper: 'K', lower: 'k', sound: 'Cờ', letterName: 'Ca (ghi âm Cờ)', ipa: '/k/', category: 'consonant', categoryName: 'Phụ âm đầu', word: 'Cây Kem', icon: '🍦', spelling: 'Cờ - em - kem', sentence: 'Chữ Ca ghi âm Cờ trong Cây Kem', sayPhonic: 'Cờ', sayExample: 'Cờ. Cây Kem!' },
      { upper: 'L', lower: 'l', sound: 'Lờ', letterName: 'Lờ', ipa: '/l/', category: 'consonant', categoryName: 'Phụ âm đầu', word: 'Chiếc Lá', icon: '🍃', spelling: 'Lờ - a - la - sắc - lá', sentence: 'Chữ Lờ trong từ Chiếc Lá', sayPhonic: 'Lờ', sayExample: 'Lờ. Chiếc Lá!' },
      { upper: 'M', lower: 'm', sound: 'Mờ', letterName: 'Mờ', ipa: '/m/', category: 'consonant', categoryName: 'Phụ âm đầu', word: 'Con Mèo', icon: '🐱', spelling: 'Mờ - eo - meo - huyền - mèo', sentence: 'Chữ Mờ trong từ Con Mèo', sayPhonic: 'Mờ', sayExample: 'Mờ. Con Mèo!' },
      { upper: 'N', lower: 'n', sound: 'Nờ', letterName: 'Nờ', ipa: '/n/', category: 'consonant', categoryName: 'Phụ âm đầu', word: 'Nụ Hoa', icon: '🌷', spelling: 'Nờ - u - nu - nặng - nụ', sentence: 'Chữ Nờ trong từ Nụ Hoa', sayPhonic: 'Nờ', sayExample: 'Nờ. Nụ Hoa!' },
      { upper: 'O', lower: 'o', sound: 'O', letterName: 'O', ipa: '/ɔ/', category: 'vowel', categoryName: 'Nguyên âm đơn', word: 'Con Ong', icon: '🐝', spelling: 'O - Con Ong', sentence: 'Chữ O trong từ Con Ong', sayPhonic: 'O', sayExample: 'O. Con Ong!' },
      { upper: 'Ô', lower: 'ô', sound: 'Ô', letterName: 'Ô', ipa: '/o/', category: 'vowel', categoryName: 'Nguyên âm đơn', word: 'Cái Ô', icon: '☂️', spelling: 'Ô - Cái Ô', sentence: 'Chữ Ô trong từ Cái Ô', sayPhonic: 'Ô', sayExample: 'Ô. Cái Ô!' },
      { upper: 'Ơ', lower: 'ơ', sound: 'Ơ', letterName: 'Ơ', ipa: '/ɤ/', category: 'vowel', categoryName: 'Nguyên âm đơn', word: 'Lá Cờ', icon: '🚩', spelling: 'Cờ - ơ - cơ - huyền - cờ', sentence: 'Chữ Ơ trong từ Lá Cờ', sayPhonic: 'Ơ', sayExample: 'Ơ. Lá Cờ!' },
      { upper: 'P', lower: 'p', sound: 'Pờ', letterName: 'Pê (Pờ)', ipa: '/p/', category: 'consonant', categoryName: 'Phụ âm đầu', word: 'Đèn Pin', icon: '🔦', spelling: 'Pờ - in - pin', sentence: 'Chữ Pờ trong từ Đèn Pin', sayPhonic: 'Pờ', sayExample: 'Pờ. Đèn Pin!' },
      { upper: 'Q', lower: 'q', sound: 'Quờ', letterName: 'Quy (Quờ)', ipa: '/k/', category: 'consonant', categoryName: 'Phụ âm đầu', word: 'Quả Quýt', icon: '🍊', spelling: 'Quờ - yt - quyt - sắc - quýt', sentence: 'Chữ Quờ trong từ Quả Quýt', sayPhonic: 'Quờ', sayExample: 'Quờ. Quả Quýt!' },
      { upper: 'R', lower: 'r', sound: 'Rờ', letterName: 'Rờ', ipa: '/ʐ/', category: 'consonant', categoryName: 'Phụ âm đầu', word: 'Con Rùa', icon: '🐢', spelling: 'Rờ - ua - rua - huyền - rùa', sentence: 'Chữ Rờ trong từ Con Rùa', sayPhonic: 'Rờ', sayExample: 'Rờ. Con Rùa!' },
      { upper: 'S', lower: 's', sound: 'Sờ', letterName: 'Sờ (uốn lưỡi)', ipa: '/ʂ/', category: 'consonant', categoryName: 'Phụ âm đầu', word: 'Ngôi Sao', icon: '⭐', spelling: 'Sờ - ao - sao', sentence: 'Chữ Sờ trong từ Ngôi Sao', sayPhonic: 'Sờ', sayExample: 'Sờ. Ngôi Sao!' },
      { upper: 'T', lower: 't', sound: 'Tờ', letterName: 'Tê (Tờ)', ipa: '/t/', category: 'consonant', categoryName: 'Phụ âm đầu', word: 'Con Tôm', icon: '🦐', spelling: 'Tờ - ôm - tôm', sentence: 'Chữ Tờ trong từ Con Tôm', sayPhonic: 'Tờ', sayExample: 'Tờ. Con Tôm!' },
      { upper: 'U', lower: 'u', sound: 'U', letterName: 'U', ipa: '/u/', category: 'vowel', categoryName: 'Nguyên âm đơn', word: 'Búp Bê', icon: '🪆', spelling: 'Bờ - up - bup - sắc - búp', sentence: 'Chữ U trong từ Búp Bê', sayPhonic: 'U', sayExample: 'U. Búp Bê!' },
      { upper: 'Ư', lower: 'ư', sound: 'Ư', letterName: 'Ư', ipa: '/ɯ/', category: 'vowel', categoryName: 'Nguyên âm đơn', word: 'Con Hươu', icon: '🦌', spelling: 'Hờ - ươu - hươu', sentence: 'Chữ Ư trong từ Con Hươu', sayPhonic: 'Ư', sayExample: 'Ư. Con Hươu!' },
      { upper: 'V', lower: 'v', sound: 'Vờ', letterName: 'Vê (Vờ)', ipa: '/v/', category: 'consonant', categoryName: 'Phụ âm đầu', word: 'Con Vịt', icon: '🦆', spelling: 'Vờ - it - vit - nặng - vịt', sentence: 'Chữ Vờ trong từ Con Vịt', sayPhonic: 'Vờ', sayExample: 'Vờ. Con Vịt!' },
      { upper: 'X', lower: 'x', sound: 'Xờ', letterName: 'Xờ (xờ nhẹ)', ipa: '/s/', category: 'consonant', categoryName: 'Phụ âm đầu', word: 'Xe Đạp', icon: '🚲', spelling: 'Xờ - e - xe', sentence: 'Chữ Xờ trong từ Xe Đạp', sayPhonic: 'Xờ', sayExample: 'Xờ. Xe Đạp!' },
      { upper: 'Y', lower: 'y', sound: 'I', letterName: 'I dài (y)', ipa: '/i/', category: 'vowel', categoryName: 'Bán nguyên âm', word: 'Chim Yến', icon: '🐦', spelling: 'I - ên - yên - sắc - yến', sentence: 'Chữ Y dài trong Chim Yến', sayPhonic: 'I', sayExample: 'I. Chim Yến!' },

      // 2. 11 PHỤ ÂM GHÉP CHUẨN ÂM VỊ HỌC BỘ GIÁO DỤC
      { upper: 'CH', lower: 'ch', sound: 'Chờ', letterName: 'Chờ', ipa: '/c/', category: 'compound', categoryName: 'Phụ âm ghép', word: 'Con Chim', icon: '🐦', spelling: 'Chờ - im - chim', sentence: 'Chờ trong từ Con Chim', sayPhonic: 'Chờ', sayExample: 'Chờ. Con Chim!' },
      { upper: 'GH', lower: 'gh', sound: 'Gờ', letterName: 'Gờ kép (gh)', ipa: '/ɣ/', category: 'compound', categoryName: 'Phụ âm ghép', word: 'Ghế Gỗ', icon: '🪑', spelling: 'Gờ - ê - gê - sắc - ghế', sentence: 'Gờ kép trong Ghế Gỗ (đi với e, ê, i)', sayPhonic: 'Gờ', sayExample: 'Gờ kép. Ghế Gỗ!' },
      { upper: 'GI', lower: 'gi', sound: 'Gi', letterName: 'Gi', ipa: '/z/', category: 'compound', categoryName: 'Phụ âm ghép', word: 'Giỏ Hoa', icon: '🧺', spelling: 'Gi - o - gio - hỏi - giỏ', sentence: 'Gi trong từ Giỏ Hoa', sayPhonic: 'Gi', sayExample: 'Gi. Giỏ Hoa!' },
      { upper: 'KH', lower: 'kh', sound: 'Khờ', letterName: 'Khờ', ipa: '/χ/', category: 'compound', categoryName: 'Phụ âm ghép', word: 'Cây Khế', icon: '⭐', spelling: 'Khờ - ê - khê - sắc - khế', sentence: 'Khờ trong từ Cây Khế', sayPhonic: 'Khờ', sayExample: 'Khờ. Cây Khế!' },
      { upper: 'NG', lower: 'ng', sound: 'Ngờ', letterName: 'Ngờ đơn (ng)', ipa: '/ŋ/', category: 'compound', categoryName: 'Phụ âm ghép', word: 'Con Ngựa', icon: '🐴', spelling: 'Ngờ - ưa - ngưa - nặng - ngựa', sentence: 'Ngờ đơn trong từ Con Ngựa', sayPhonic: 'Ngờ', sayExample: 'Ngờ đơn. Con Ngựa!' },
      { upper: 'NGH', lower: 'ngh', sound: 'Ngờ', letterName: 'Ngờ kép (ngh)', ipa: '/ŋ/', category: 'compound', categoryName: 'Phụ âm ghép', word: 'Con Nghé', icon: '🐃', spelling: 'Ngờ - e - nge - sắc - nghé', sentence: 'Ngờ kép trong Con Nghé (đi với e, ê, i)', sayPhonic: 'Ngờ', sayExample: 'Ngờ kép. Con Nghé!' },
      { upper: 'NH', lower: 'nh', sound: 'Nhờ', letterName: 'Nhờ', ipa: '/ɲ/', category: 'compound', categoryName: 'Phụ âm ghép', word: 'Ngôi Nhà', icon: '🏠', spelling: 'Nhờ - a - nha - huyền - nhà', sentence: 'Nhờ trong từ Ngôi Nhà', sayPhonic: 'Nhờ', sayExample: 'Nhờ. Ngôi Nhà!' },
      { upper: 'PH', lower: 'ph', sound: 'Phờ', letterName: 'Phờ', ipa: '/f/', category: 'compound', categoryName: 'Phụ âm ghép', word: 'Phố Cổ', icon: '🏮', spelling: 'Phờ - ô - phô - sắc - phố', sentence: 'Phờ trong từ Phố Cổ', sayPhonic: 'Phờ', sayExample: 'Phờ. Phố Cổ!' },
      { upper: 'QU', lower: 'qu', sound: 'Quờ', letterName: 'Quờ', ipa: '/kʷ/', category: 'compound', categoryName: 'Phụ âm ghép', word: 'Quả Quýt', icon: '🍊', spelling: 'Quờ - yt - quyt - sắc - quýt', sentence: 'Quờ trong từ Quả Quýt', sayPhonic: 'Quờ', sayExample: 'Quờ. Quả Quýt!' },
      { upper: 'TH', lower: 'th', sound: 'Thờ', letterName: 'Thờ', ipa: '/tʼ/', category: 'compound', categoryName: 'Phụ âm ghép', word: 'Chú Thỏ', icon: '🐰', spelling: 'Thờ - o - tho - hỏi - thỏ', sentence: 'Thờ trong từ Chú Thỏ', sayPhonic: 'Thờ', sayExample: 'Thờ. Chú Thỏ!' },
      { upper: 'TR', lower: 'tr', sound: 'Trờ', letterName: 'Trờ', ipa: '/ʈ/', category: 'compound', categoryName: 'Phụ âm ghép', word: 'Cây Tre', icon: '🎋', spelling: 'Trờ - e - tre', sentence: 'Trờ trong từ Cây Tre', sayPhonic: 'Trờ', sayExample: 'Trờ. Cây Tre!' },

      // 3. 3 NGUYÊN ÂM ĐÔI (Chuẩn KidsUP & Bộ Giáo Dục)
      { upper: 'IA - IÊ', lower: 'ia - iê', sound: 'Ia', letterName: 'Vần ia / iê', ipa: '/ie/', category: 'diphthong', categoryName: 'Nguyên âm đôi', word: 'Cây Mía', icon: '🎋', spelling: 'Mờ - ia - mia - sắc - mía', sentence: 'Vần ia trong từ Cây Mía (iê trong con kiến)', sayPhonic: 'Ia', sayExample: 'Ia. Cây Mía!' },
      { upper: 'UA - UÔ', lower: 'ua - uô', sound: 'Ua', letterName: 'Vần ua / uô', ipa: '/uo/', category: 'diphthong', categoryName: 'Nguyên âm đôi', word: 'Con Cua', icon: '🦀', spelling: 'Cờ - ua - cua', sentence: 'Vần ua trong từ Con Cua (uô trong quả chuối)', sayPhonic: 'Ua', sayExample: 'Ua. Con Cua!' },
      { upper: 'ƯA - ƯƠ', lower: 'ưa - ươ', sound: 'Ưa', letterName: 'Vần ưa / ươ', ipa: '/ɯɤ/', category: 'diphthong', categoryName: 'Nguyên âm đôi', word: 'Cơn Mưa', icon: '🌧️', spelling: 'Mờ - ưa - mưa', sentence: 'Vần ưa trong từ Cơn Mưa (ươ trong con hươu)', sayPhonic: 'Ưa', sayExample: 'Ưa. Cơn Mưa!' }
    ];

    this.isUppercase = true;
    this.currentCategory = 'all'; // 'all', 'vowel', 'consonant', 'compound', 'diphthong'
    this.pronounceMode = 'phonic'; // 'phonic' (chuẩn BGD: Bờ, Cờ...) hoặc 'letter_name' (Bê, Xê...)
    this.selectedLetter = this.alphabetData[0];

    // Scores
    this.quizScore = 0;
    this.rhymeScore = 0;
    this.tonesScore = 0;
    this.spellingScore = 0;
    this.compoundsScore = 0;
    this.sentenceScore = 0;
    this.readingScore = 0;
    this.currentStoryIndex = 0;
    this.currentStoryQuestionIndex = 0;
    this.isReadingFullStory = false;
    this.readingTimer = null;

    this.initElements();
    this.attachEvents();
    this.renderAlphabetGrid();
    this.showLetterDetail(this.selectedLetter);
  }

  initElements() {
    this.gridEl = document.getElementById('alphabetGrid');
    this.btnUpper = document.getElementById('btnLetterUpper');
    this.btnLower = document.getElementById('btnLetterLower');
    this.btnPronouncePhonic = document.getElementById('btnPronouncePhonic');
    this.btnPronounceName = document.getElementById('btnPronounceName');
    this.filterChips = document.querySelectorAll('#alphabetFilterChips .filter-chip');

    // Detail card elements (Phonics Flashcard)
    this.detailLetterBox = document.getElementById('detailLetterBox');
    this.detailCategoryBadge = document.getElementById('detailCategoryBadge');
    this.detailIpaBadge = document.getElementById('detailIpaBadge');
    this.detailIllustration = document.getElementById('detailIllustration');
    this.detailWord = document.getElementById('detailWord');
    this.detailSoundPreview = document.getElementById('detailSoundPreview');
    this.detailPhonicBadge = document.getElementById('detailPhonicBadge');
    this.detailLetterNameBadge = document.getElementById('detailLetterNameBadge');
    this.detailSpellingText = document.getElementById('detailSpellingText');
    this.detailSentence = document.getElementById('detailSentence');
    this.btnPlayPhonicSound = document.getElementById('btnPlayPhonicSound');
    this.btnPlayPhonicLabel = document.getElementById('btnPlayPhonicLabel');
    this.btnPlayExampleSound = document.getElementById('btnPlayExampleSound');
    this.btnPlayLetterSound = document.getElementById('btnPlayLetterSound'); // alias

    // Quiz elements
    this.quizQArea = document.getElementById('vnQuizQuestionArea');
    this.quizAArea = document.getElementById('vnQuizAnswersArea');
    this.quizFeedback = document.getElementById('vnQuizFeedbackBox');
    this.quizScoreEl = document.getElementById('vnQuizScore');
    this.btnQuizNew = document.getElementById('btnVnQuizNew');

    // Rhyme elements
    this.rhymeQArea = document.getElementById('vnRhymeQuestionArea');
    this.rhymeAArea = document.getElementById('vnRhymeAnswersArea');
    this.rhymeFeedback = document.getElementById('vnRhymeFeedbackBox');
    this.rhymeScoreEl = document.getElementById('vnRhymeScore');
    this.btnRhymeNew = document.getElementById('btnVnRhymeNew');

    // Tones elements
    this.tonesQArea = document.getElementById('vnTonesQuestionArea');
    this.tonesAArea = document.getElementById('vnTonesAnswersArea');
    this.tonesFeedback = document.getElementById('vnTonesFeedbackBox');
    this.tonesScoreEl = document.getElementById('vnTonesScore');
    this.btnTonesNew = document.getElementById('btnVnTonesNew');

    // Spelling rules elements
    this.spellingQArea = document.getElementById('vnSpellingQuestionArea');
    this.spellingAArea = document.getElementById('vnSpellingAnswersArea');
    this.spellingFeedback = document.getElementById('vnSpellingFeedbackBox');
    this.spellingScoreEl = document.getElementById('vnSpellingScore');
    this.btnSpellingNew = document.getElementById('btnVnSpellingNew');

    // Compounds elements
    this.compoundsQArea = document.getElementById('vnCompoundsQuestionArea');
    this.compoundsAArea = document.getElementById('vnCompoundsAnswersArea');
    this.compoundsFeedback = document.getElementById('vnCompoundsFeedbackBox');
    this.compoundsScoreEl = document.getElementById('vnCompoundsScore');
    this.btnCompoundsNew = document.getElementById('btnVnCompoundsNew');

    // Sentence elements
    this.sentenceQArea = document.getElementById('vnSentenceQuestionArea');
    this.sentenceAArea = document.getElementById('vnSentenceAnswersArea');
    this.sentenceFeedback = document.getElementById('vnSentenceFeedbackBox');
    this.sentenceScoreEl = document.getElementById('vnSentenceScore');
    this.btnSentenceNew = document.getElementById('btnVnSentenceNew');

    // Reading & Story elements
    this.storyChipsList = document.getElementById('storyChipsList');
    this.storyTopicBadge = document.getElementById('storyTopicBadge');
    this.storyTitle = document.getElementById('storyTitle');
    this.storyContentBox = document.getElementById('storyContentBox');
    this.btnPlayFullStory = document.getElementById('btnPlayFullStory');
    this.btnStopFullStory = document.getElementById('btnStopFullStory');
    this.storyQuestionText = document.getElementById('storyQuestionText');
    this.storyOptionsGrid = document.getElementById('storyOptionsGrid');
    this.storyFeedbackBox = document.getElementById('storyFeedbackBox');
    this.readingScoreEl = document.getElementById('vnReadingScore');
    this.btnPrevStory = document.getElementById('btnPrevStory');
    this.btnNextStory = document.getElementById('btnNextStory');
    this.storyCounterLabel = document.getElementById('storyCounterLabel');
  }

  switchSubView(subId, updateRoute = true) {
    if (!subId) subId = 'vn-alphabet';
    const subBtns = document.querySelectorAll('#tab-vietnamese .sub-btn');
    const subViews = document.querySelectorAll('.vn-sub-view');

    subBtns.forEach(b => b.classList.toggle('active', b.dataset.sub === subId));
    subViews.forEach(v => v.classList.toggle('active', v.id === ('sub-' + subId)));

    if (window.soundSys) window.soundSys.stop();
    this.stopFullStory();

    switch (subId) {
      case 'vn-tones':
        this.loadTonesQuestion();
        break;
      case 'vn-spelling':
        this.loadSpellingQuestion();
        break;
      case 'vn-compounds':
        this.loadCompoundsQuestion();
        break;
      case 'vn-quiz':
        this.loadQuizQuestion();
        break;
      case 'vn-rhyme':
        this.loadRhymeQuestion();
        break;
      case 'vn-sentence':
        this.loadSentenceQuestion();
        break;
      case 'vn-reading':
        this.initReadingView();
        break;
      case 'vn-alphabet':
      default:
        break;
    }

    localStorage.setItem('vuon_tuoi_tho_sub_tab-vietnamese', subId);

    if (updateRoute && window.app && typeof window.app.updateCurrentRoute === 'function') {
      window.app.updateCurrentRoute('tab-vietnamese', subId);
    }
  }

  attachEvents() {
    // Sub tabs
    const subBtns = document.querySelectorAll('#tab-vietnamese .sub-btn');
    subBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchSubView(btn.dataset.sub, true);
      });
    });

    // Phonics Category Filter Chips
    if (this.filterChips) {
      this.filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
          this.filterChips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          this.currentCategory = chip.dataset.cat || 'all';
          this.renderAlphabetGrid();
        });
      });
    }

    // Pronunciation Mode Toggles (Phonics vs Letter Name)
    if (this.btnPronouncePhonic && this.btnPronounceName) {
      this.btnPronouncePhonic.addEventListener('click', () => {
        this.pronounceMode = 'phonic';
        this.btnPronouncePhonic.classList.add('active');
        this.btnPronounceName.classList.remove('active');
        this.showLetterDetail(this.selectedLetter);
        window.soundSys.speak("Bé đã chọn chế độ phát âm âm vị học chuẩn Bộ Giáo Dục nhé!");
      });
      this.btnPronounceName.addEventListener('click', () => {
        this.pronounceMode = 'letter_name';
        this.btnPronounceName.classList.add('active');
        this.btnPronouncePhonic.classList.remove('active');
        this.showLetterDetail(this.selectedLetter);
        window.soundSys.speak("Bé đã chọn chế độ đọc theo tên chữ cái nhé!");
      });
    }

    // Upper/Lower toggle
    if (this.btnUpper && this.btnLower) {
      this.btnUpper.addEventListener('click', () => {
        this.isUppercase = true;
        this.btnUpper.classList.add('active');
        this.btnLower.classList.remove('active');
        this.renderAlphabetGrid();
      });

      this.btnLower.addEventListener('click', () => {
        this.isUppercase = false;
        this.btnLower.classList.add('active');
        this.btnUpper.classList.remove('active');
        this.renderAlphabetGrid();
      });
    }

    // Buttons on Letter Detail Flashcard
    if (this.btnPlayPhonicSound) {
      this.btnPlayPhonicSound.addEventListener('click', () => {
        this.speakPhonicSound();
      });
    }
    if (this.btnPlayExampleSound) {
      this.btnPlayExampleSound.addEventListener('click', () => {
        this.speakExampleSound();
      });
    }
    if (this.btnPlayLetterSound) {
      this.btnPlayLetterSound.addEventListener('click', () => {
        this.speakCurrentLetter();
      });
    }

    if (this.btnTonesNew) this.btnTonesNew.addEventListener('click', () => this.loadTonesQuestion());
    if (this.btnSpellingNew) this.btnSpellingNew.addEventListener('click', () => this.loadSpellingQuestion());
    if (this.btnCompoundsNew) this.btnCompoundsNew.addEventListener('click', () => this.loadCompoundsQuestion());
    if (this.btnQuizNew) this.btnQuizNew.addEventListener('click', () => this.loadQuizQuestion());
    if (this.btnRhymeNew) this.btnRhymeNew.addEventListener('click', () => this.loadRhymeQuestion());
    if (this.btnSentenceNew) this.btnSentenceNew.addEventListener('click', () => this.loadSentenceQuestion());

    // Reading Story events
    if (this.btnPlayFullStory) {
      this.btnPlayFullStory.addEventListener('click', () => this.playFullStory());
    }
    if (this.btnStopFullStory) {
      this.btnStopFullStory.addEventListener('click', () => this.stopFullStory());
    }
    if (this.btnPrevStory) {
      this.btnPrevStory.addEventListener('click', () => {
        this.stopFullStory();
        const total = this.getReadingStories().length;
        this.currentStoryIndex = (this.currentStoryIndex - 1 + total) % total;
        this.currentStoryQuestionIndex = 0;
        this.renderStoryView();
      });
    }
    if (this.btnNextStory) {
      this.btnNextStory.addEventListener('click', () => {
        this.stopFullStory();
        const total = this.getReadingStories().length;
        this.currentStoryIndex = (this.currentStoryIndex + 1) % total;
        this.currentStoryQuestionIndex = 0;
        this.renderStoryView();
      });
    }
  }

  renderAlphabetGrid() {
    if (!this.gridEl) return;
    this.gridEl.innerHTML = '';

    // Filter items based on selected category
    let items = this.alphabetData;
    if (this.currentCategory === 'all') {
      // 29 main letters
      items = this.alphabetData.filter(i => i.category === 'vowel' || i.category === 'consonant');
    } else if (this.currentCategory === 'vowel') {
      // 11 single vowels
      items = this.alphabetData.filter(i => i.category === 'vowel' && !i.categoryName.includes('Bán'));
    } else if (this.currentCategory === 'consonant') {
      // 17 single consonants
      items = this.alphabetData.filter(i => i.category === 'consonant');
    } else if (this.currentCategory === 'compound') {
      // 11 compound consonants
      items = this.alphabetData.filter(i => i.category === 'compound');
    } else if (this.currentCategory === 'diphthong') {
      // 3 diphthongs
      items = this.alphabetData.filter(i => i.category === 'diphthong');
    }

    if (!items.includes(this.selectedLetter) && items.length > 0) {
      this.selectedLetter = items[0];
      this.showLetterDetail(this.selectedLetter);
    }

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'letter-card';
      if (this.selectedLetter === item) card.classList.add('active-selected');

      const char = this.isUppercase ? item.upper : item.lower;
      card.innerHTML = `
        <span class="letter-phonic-badge">${item.sound}</span>
        <span class="letter-main">${char}</span>
        <span class="letter-sub-word">${item.icon}</span>
      `;

      card.addEventListener('click', () => {
        document.querySelectorAll('.letter-card').forEach(c => c.classList.remove('active-selected'));
        card.classList.add('active-selected');
        this.selectedLetter = item;
        this.showLetterDetail(item);
        this.speakCurrentLetter();
      });

      this.gridEl.appendChild(card);
    });
  }

  showLetterDetail(item) {
    if (!item) return;
    if (this.detailLetterBox) {
      this.detailLetterBox.textContent = `${item.upper} ${item.lower}`;
    }
    if (this.detailCategoryBadge) {
      this.detailCategoryBadge.textContent = item.categoryName || 'Âm vị học';
    }
    if (this.detailIpaBadge) {
      this.detailIpaBadge.textContent = `IPA: ${item.ipa}`;
    }
    if (this.detailIllustration) {
      this.detailIllustration.textContent = item.icon;
    }
    if (this.detailWord) {
      this.detailWord.textContent = `${item.word} ${item.icon}`;
    }
    if (this.detailSoundPreview) {
      this.detailSoundPreview.textContent = item.sound;
    }
    if (this.detailPhonicBadge) {
      this.detailPhonicBadge.innerHTML = `Phát âm: <strong>${item.sound}</strong>`;
    }
    if (this.detailLetterNameBadge) {
      this.detailLetterNameBadge.innerHTML = `Tên chữ: <strong>${item.letterName}</strong>`;
    }
    if (this.detailSpellingText) {
      this.detailSpellingText.textContent = item.spelling;
    }
    if (this.detailSentence) {
      this.detailSentence.textContent = item.sentence;
    }
    if (this.btnPlayPhonicLabel) {
      this.btnPlayPhonicLabel.textContent = `Nghe Phát Âm "${item.sound}"`;
    }
  }

  // Nghe chỉ riêng âm vị học chuẩn của chữ (ví dụ: "Bờ", "Hờ", "Á", "Ớ", "Cờ")
  speakPhonicSound() {
    if (!this.selectedLetter) return;
    window.soundSys.speak(this.selectedLetter.sound);
  }

  // Nghe đánh vần và câu ví dụ theo chuẩn Bộ Giáo Dục
  speakExampleSound() {
    if (!this.selectedLetter) return;
    window.soundSys.speak(this.selectedLetter.sayExample);
  }

  // Phát âm chữ cái khi click vào ô: phát âm trực tiếp âm của chữ (ví dụ: bấm A đọc "a", B đọc "bờ", Ă đọc "á", Â đọc "ớ")
  speakCurrentLetter() {
    if (!this.selectedLetter) return;
    if (this.pronounceMode === 'letter_name') {
      window.soundSys.speak(`Chữ ${this.selectedLetter.letterName}`);
    } else {
      window.soundSys.speak(this.selectedLetter.sound);
    }
  }

  // ================= 2. BÀI TẬP 5 DẤU THANH (SGK LỚP 1) =================
  loadTonesQuestion() {
    this.tonesFeedback.className = 'feedback-box';
    this.tonesFeedback.textContent = '';
    this.tonesAArea.innerHTML = '';
    this.tonesQArea.innerHTML = '';

    const tonesList = [
      { word: 'CÁ', icon: '🐟', tone: 'Dấu sắc (/)', say: 'Tiếng Cá có dấu sắc' },
      { word: 'BÀ', icon: '👵', tone: 'Dấu huyền (\\)', say: 'Tiếng Bà có dấu huyền' },
      { word: 'THỎ', icon: '🐰', tone: 'Dấu hỏi (?)', say: 'Tiếng Thỏ có dấu hỏi' },
      { word: 'NGỰA', icon: '🐴', tone: 'Dấu nặng (.)', say: 'Tiếng Ngựa có dấu nặng' },
      { word: 'SỮA', icon: '🥛', tone: 'Dấu ngã (~)', say: 'Tiếng Sữa có dấu ngã' },
      { word: 'LÁ', icon: '🍃', tone: 'Dấu sắc (/)', say: 'Tiếng Lá có dấu sắc' },
      { word: 'GÀ', icon: '🐔', tone: 'Dấu huyền (\\)', say: 'Tiếng Gà có dấu huyền' },
      { word: 'HỔ', icon: '🐯', tone: 'Dấu hỏi (?)', say: 'Tiếng Hổ có dấu hỏi' },
      { word: 'MẸ', icon: '👩‍👧', tone: 'Dấu nặng (.)', say: 'Tiếng Mẹ có dấu nặng' },
      { word: 'MŨ', icon: '🧢', tone: 'Dấu ngã (~)', say: 'Tiếng Mũ có dấu ngã' },
      { word: 'BÉ', icon: '👶', tone: 'Dấu sắc (/)', say: 'Tiếng Bé có dấu sắc' },
      { word: 'CỜ', icon: '🚩', tone: 'Dấu huyền (\\)', say: 'Tiếng Cờ có dấu huyền' },
      { word: 'CỎ', icon: '🌱', tone: 'Dấu hỏi (?)', say: 'Tiếng Cỏ có dấu hỏi' },
      { word: 'GỖ', icon: '🪵', tone: 'Dấu ngã (~)', say: 'Tiếng Gỗ có dấu ngã' },
      { word: 'VỊT', icon: '🦆', tone: 'Dấu nặng (.)', say: 'Tiếng Vịt có dấu nặng' }
    ];

    const q = tonesList[Math.floor(Math.random() * tonesList.length)];
    const allToneChoices = ['Dấu sắc (/)', 'Dấu huyền (\\)', 'Dấu hỏi (?)', 'Dấu ngã (~)', 'Dấu nặng (.)'];

    this.tonesQArea.innerHTML = `
      <div style="font-size: 5rem; margin-bottom: 10px;">${q.icon}</div>
      <div class="math-question-text" style="font-size: 3rem; color: #d90429; letter-spacing: 2px;">"${q.word}"</div>
      <div class="math-prompt-hint">Bé hãy cho cô biết: Tiếng <strong>"${q.word}"</strong> mang dấu thanh nào?</div>
    `;

    window.soundSys.preloadAudio(`Đúng rồi bé ơi! ${q.say} nhé!`);

    allToneChoices.forEach(t => {
      const btn = document.createElement('button');
      btn.className = 'answer-choice-btn';
      btn.style.fontSize = '1.85rem';
      btn.style.minWidth = '160px';
      btn.style.padding = '14px 24px';
      btn.textContent = t;
      btn.addEventListener('click', () => {
        const isCorrect = (t === q.tone);
        const allBtns = this.tonesAArea.querySelectorAll('.answer-choice-btn');
        allBtns.forEach(b => b.disabled = true);

        if (isCorrect) {
          btn.classList.add('correct');
          window.soundSys.playCorrect();
          this.tonesFeedback.className = 'feedback-box correct';
          this.tonesFeedback.textContent = `🎉 Hoan hô! ${q.say} là chính xác rồi nè!`;
          this.tonesScore += 1;
          this.tonesScoreEl.textContent = this.tonesScore;
          window.rewards.addStars(1, "Bé nhận diện dấu thanh chuẩn quá!");
          const praiseMsg = `Đúng rồi bé ơi! ${q.say} nhé!`;
          window.soundSys.speakThen(praiseMsg, () => this.loadTonesQuestion(), 700);
        } else {
          btn.classList.add('wrong');
          window.soundSys.playWrong();
          this.tonesFeedback.className = 'feedback-box wrong';
          this.tonesFeedback.textContent = `Chưa đúng dấu rồi bé ơi! Bé nhìn kỹ lại dấu trên chữ nhé!`;
          window.soundSys.speak("Chưa đúng dấu rồi bé ơi, bé nhìn kỹ lại nhé!");
          setTimeout(() => {
            allBtns.forEach(b => { b.disabled = false; b.classList.remove('wrong'); });
          }, 1800);
        }
      });
      this.tonesAArea.appendChild(btn);
    });

    setTimeout(() => {
      window.soundSys.speak(`Tiếng ${q.word} mang dấu thanh nào vậy bé?`);
    }, 200);
  }

  // ================= 3. QUY TẮC CHÍNH TẢ LỚP 1 (c/k, g/gh, ng/ngh) =================
  loadSpellingQuestion() {
    this.spellingFeedback.className = 'feedback-box';
    this.spellingFeedback.textContent = '';
    this.spellingAArea.innerHTML = '';
    this.spellingQArea.innerHTML = '';

    const rules = [
      {
        rule: "k đứng trước e, ê, i; c đứng trước a, o, ô, u...",
        word: "Cây _em",
        ans: "k",
        full: "Cây kem",
        icon: "🍦",
        options: ["c", "k"],
        hint: "Đứng trước chữ 'e' thì bé điền 'c' hay 'k' nè?"
      },
      {
        rule: "k đứng trước e, ê, i; c đứng trước a, o, ô, u...",
        word: "Con _á",
        ans: "c",
        full: "Con cá",
        icon: "🐟",
        options: ["c", "k"],
        hint: "Đứng trước chữ 'a' thì bé điền 'c' hay 'k' nè?"
      },
      {
        rule: "k đứng trước e, ê, i; c đứng trước a, o, ô, u...",
        word: "Cái _ính",
        ans: "k",
        full: "Cái kính",
        icon: "🥽",
        options: ["c", "k"],
        hint: "Đứng trước chữ 'i' thì bé điền 'c' hay 'k' nè?"
      },
      {
        rule: "k đứng trước e, ê, i; c đứng trước a, o, ô, u...",
        word: "Con _iến",
        ans: "k",
        full: "Con kiến",
        icon: "🐜",
        options: ["c", "k"],
        hint: "Đứng trước chữ 'i' thì bé điền 'c' hay 'k' nè?"
      },
      {
        rule: "k đứng trước e, ê, i; c đứng trước a, o, ô, u...",
        word: "Quả _am",
        ans: "c",
        full: "Quả cam",
        icon: "🍊",
        options: ["c", "k"],
        hint: "Đứng trước chữ 'a' thì bé điền 'c' hay 'k' nè?"
      },
      {
        rule: "gh đứng trước e, ê, i; g đứng trước a, o, ô, u...",
        word: "Cái _ế",
        ans: "gh",
        full: "Cái ghế",
        icon: "🪑",
        options: ["g", "gh"],
        hint: "Đứng trước chữ 'ê' thì bé điền 'g' hay 'gh' nè?"
      },
      {
        rule: "gh đứng trước e, ê, i; g đứng trước a, o, ô, u...",
        word: "Con _à",
        ans: "g",
        full: "Con gà",
        icon: "🐔",
        options: ["g", "gh"],
        hint: "Đứng trước chữ 'a' thì bé điền 'g' hay 'gh' nè?"
      },
      {
        rule: "gh đứng trước e, ê, i; g đứng trước a, o, ô, u...",
        word: "_i bài",
        ans: "gh",
        full: "Ghi bài",
        icon: "📝",
        options: ["g", "gh"],
        hint: "Đứng trước chữ 'i' thì bé điền 'g' hay 'gh' nè?"
      },
      {
        rule: "gh đứng trước e, ê, i; g đứng trước a, o, ô, u...",
        word: "Con _ẹ",
        ans: "gh",
        full: "Con ghẹ",
        icon: "🦀",
        options: ["g", "gh"],
        hint: "Đứng trước chữ 'e' thì bé điền 'g' hay 'gh' nè?"
      },
      {
        rule: "ngh đứng trước e, ê, i; ng đứng trước a, o, ô, u...",
        word: "Củ _ệ",
        ans: "ngh",
        full: "Củ nghệ",
        icon: "🍠",
        options: ["ng", "ngh"],
        hint: "Đứng trước chữ 'ê' thì bé điền 'ng' hay 'ngh' nè?"
      },
      {
        rule: "ngh đứng trước e, ê, i; ng đứng trước a, o, ô, u...",
        word: "Con _ựa",
        ans: "ng",
        full: "Con ngựa",
        icon: "🐴",
        options: ["ng", "ngh"],
        hint: "Đứng trước chữ 'ư' thì bé điền 'ng' hay 'ngh' nè?"
      },
      {
        rule: "ngh đứng trước e, ê, i; ng đứng trước a, o, ô, u...",
        word: "Con _é",
        ans: "ngh",
        full: "Con nghé",
        icon: "🐃",
        options: ["ng", "ngh"],
        hint: "Đứng trước chữ 'e' thì bé điền 'ng' hay 'ngh' nè?"
      },
      {
        rule: "ngh đứng trước e, ê, i; ng đứng trước a, o, ô, u...",
        word: "Cá _ừ",
        ans: "ng",
        full: "Cá ngừ",
        icon: "🐟",
        options: ["ng", "ngh"],
        hint: "Đứng trước chữ 'ư' thì bé điền 'ng' hay 'ngh' nè?"
      }
    ];

    const q = rules[Math.floor(Math.random() * rules.length)];

    this.spellingQArea.innerHTML = `
      <div style="font-size: 4.8rem; margin-bottom: 8px;">${q.icon}</div>
      <div class="math-question-text" style="font-size: 2.8rem; color:#4361ee;">${q.word}</div>
      <div class="math-prompt-hint">${q.hint} <br><em>(Mẹo: ${q.rule})</em></div>
    `;

    window.soundSys.preloadAudio(`Chính xác rồi! Điền chữ ${q.ans} tạo thành từ ${q.full} nhé!`);

    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'answer-choice-btn';
      btn.style.fontSize = '2.6rem';
      btn.style.minWidth = '130px';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        const isCorrect = (opt === q.ans);
        const allBtns = this.spellingAArea.querySelectorAll('.answer-choice-btn');
        allBtns.forEach(b => b.disabled = true);

        if (isCorrect) {
          btn.classList.add('correct');
          window.soundSys.playCorrect();
          this.spellingFeedback.className = 'feedback-box correct';
          this.spellingFeedback.textContent = `🎉 Hoan hô! Điền đúng là: "${q.full}" nhé!`;
          this.spellingScore += 1;
          this.spellingScoreEl.textContent = this.spellingScore;
          window.rewards.addStars(1, "Bé thuộc quy tắc chính tả rất cừ!");
          const praiseMsg = `Chính xác rồi! Điền chữ ${q.ans} tạo thành từ ${q.full} nhé!`;
          window.soundSys.speakThen(praiseMsg, () => this.loadSpellingQuestion(), 700);
        } else {
          btn.classList.add('wrong');
          window.soundSys.playWrong();
          this.spellingFeedback.className = 'feedback-box wrong';
          this.spellingFeedback.textContent = `Chưa đúng quy tắc rồi bé ơi! Nhớ quy tắc: k, gh, ngh đứng trước e, ê, i nhé!`;
          window.soundSys.speak("Chưa đúng quy tắc rồi bé ơi, bé chọn lại nhé!");
          setTimeout(() => {
            allBtns.forEach(b => { b.disabled = false; b.classList.remove('wrong'); });
          }, 1800);
        }
      });
      this.spellingAArea.appendChild(btn);
    });

    setTimeout(() => {
      window.soundSys.speak(q.hint);
    }, 200);
  }

  // ================= 4. ÂM ĐÔI & ÂM GHÉP (ch, nh, th, kh, ph, tr...) =================
  loadCompoundsQuestion() {
    this.compoundsFeedback.className = 'feedback-box';
    this.compoundsFeedback.textContent = '';
    this.compoundsAArea.innerHTML = '';
    this.compoundsQArea.innerHTML = '';

    const list = [
      { full: 'Chú thỏ', missing: '_ _ ỏ', ans: 'th', icon: '🐰', choices: ['th', 'ch', 'nh', 'kh'], say: 'Chú thỏ có âm thờ' },
      { full: 'Con chim', missing: '_ _ im', ans: 'ch', icon: '🐦', choices: ['ch', 'tr', 'nh', 'ph'], say: 'Con chim có âm chờ' },
      { full: 'Cây khế', missing: '_ _ ế', ans: 'kh', icon: '⭐', choices: ['kh', 'th', 'ph', 'gh'], say: 'Cây khế có âm khờ' },
      { full: 'Ngôi nhà', missing: '_ _ à', ans: 'nh', icon: '🏠', choices: ['nh', 'ng', 'ch', 'th'], say: 'Ngôi nhà có âm nhờ' },
      { full: 'Phố cổ', missing: '_ _ ố', ans: 'ph', icon: '🏮', choices: ['ph', 'th', 'qu', 'kh'], say: 'Phố cổ có âm phờ' },
      { full: 'Quả quýt', missing: '_ _ ýt', ans: 'qu', icon: '🍊', choices: ['qu', 'cu', 'kh', 'ph'], say: 'Quả quýt có âm quờ' },
      { full: 'Cây tre', missing: '_ _ e', ans: 'tr', icon: '🎋', choices: ['tr', 'ch', 'th', 'nh'], say: 'Cây tre có âm trờ' },
      { full: 'Giỏ hoa', missing: '_ _ ỏ', ans: 'gi', icon: '🧺', choices: ['gi', 'd', 'r', 'g'], say: 'Giỏ hoa có âm gi' },
      { full: 'Ghế gỗ', missing: '_ _ ế', ans: 'gh', icon: '🪑', choices: ['gh', 'g', 'kh', 'ngh'], say: 'Ghế gỗ có âm gờ kép' },
      { full: 'Con ngựa', missing: '_ _ ựa', ans: 'ng', icon: '🐴', choices: ['ng', 'ngh', 'nh', 'm'], say: 'Con ngựa có âm ngờ' },
      { full: 'Củ nghệ', missing: '_ _ ệ', ans: 'ngh', icon: '🍠', choices: ['ngh', 'ng', 'gh', 'nh'], say: 'Củ nghệ có âm ngờ kép' },
      { full: 'Con trâu', missing: '_ _ âu', ans: 'tr', icon: '🐃', choices: ['tr', 'ch', 'th', 'ph'], say: 'Con trâu có âm trờ' },
      { full: 'Khỉ con', missing: '_ _ ỉ', ans: 'kh', icon: '🐵', choices: ['kh', 'th', 'ph', 'ch'], say: 'Khỉ con có âm khờ' }
    ];

    const q = list[Math.floor(Math.random() * list.length)];

    this.compoundsQArea.innerHTML = `
      <div style="font-size: 5rem; margin-bottom: 8px;">${q.icon}</div>
      <div class="math-question-text" style="font-size: 3rem; color: #7209b7;">${q.missing}</div>
      <div class="math-prompt-hint">Hình ảnh: <strong>${q.full}</strong>. Bé hãy chọn âm ghép thích hợp điền vào nhé:</div>
    `;

    window.soundSys.preloadAudio(`Đúng rồi bé ơi! ${q.say} nhé!`);

    q.choices.sort(() => Math.random() - 0.5).forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'answer-choice-btn';
      btn.style.fontSize = '2.5rem';
      btn.style.minWidth = '110px';
      btn.textContent = c;
      btn.addEventListener('click', () => {
        const isCorrect = (c === q.ans);
        const allBtns = this.compoundsAArea.querySelectorAll('.answer-choice-btn');
        allBtns.forEach(b => b.disabled = true);

        if (isCorrect) {
          btn.classList.add('correct');
          window.soundSys.playCorrect();
          this.compoundsFeedback.className = 'feedback-box correct';
          this.compoundsFeedback.textContent = `🎉 Hoan hô! Ghép đúng âm "${q.ans}" thành từ "${q.full}" rồi!`;
          this.compoundsScore += 1;
          this.compoundsScoreEl.textContent = this.compoundsScore;
          window.rewards.addStars(1, "Bé nhớ âm ghép rất giỏi!");
          const praiseMsg = `Đúng rồi bé ơi! ${q.say} nhé!`;
          window.soundSys.speakThen(praiseMsg, () => this.loadCompoundsQuestion(), 700);
        } else {
          btn.classList.add('wrong');
          window.soundSys.playWrong();
          this.compoundsFeedback.className = 'feedback-box wrong';
          this.compoundsFeedback.textContent = `Chưa đúng âm ghép rồi bé ơi! Bé thử lại nhé!`;
          window.soundSys.speak("Chưa đúng âm ghép rồi, bé chọn lại nhé!");
          setTimeout(() => {
            allBtns.forEach(b => { b.disabled = false; b.classList.remove('wrong'); });
          }, 1800);
        }
      });
      this.compoundsAArea.appendChild(btn);
    });

    setTimeout(() => {
      window.soundSys.speak(`Hình ${q.full} nè bé. Âm ghép nào còn thiếu vậy ta?`);
    }, 200);
  }

  // ================= 5. ĐỐ CHỮ QUA HÌNH ẢNH =================
  loadQuizQuestion() {
    this.quizFeedback.className = 'feedback-box';
    this.quizFeedback.textContent = '';
    this.quizAArea.innerHTML = '';
    this.quizQArea.innerHTML = '';

    const target = this.alphabetData[Math.floor(Math.random() * this.alphabetData.length)];
    const choices = [target];
    while (choices.length < 4) {
      const randomItem = this.alphabetData[Math.floor(Math.random() * this.alphabetData.length)];
      if (!choices.includes(randomItem)) choices.push(randomItem);
    }
    choices.sort(() => Math.random() - 0.5);

    this.currentQuiz = { target: target, choices: choices };

    this.quizQArea.innerHTML = `
      <div class="math-visual-items">
        <span style="font-size: 5rem;">${target.icon}</span>
      </div>
      <div class="math-question-text">Bé hãy bấm vào chữ cái: <strong>"${target.upper}"</strong> nhé!</div>
      <div class="math-prompt-hint">Từ mẫu: ${target.word}</div>
    `;

    window.soundSys.preloadAudio(`Chính xác rồi nè! Chữ ${target.sound || target.upper} giỏi quá!`);

    choices.forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'answer-choice-btn';
      btn.style.fontSize = '2.6rem';
      btn.textContent = `${item.upper} ${item.lower}`;
      btn.addEventListener('click', () => {
        const isCorrect = (item === this.currentQuiz.target);
        const allBtns = this.quizAArea.querySelectorAll('.answer-choice-btn');
        allBtns.forEach(b => b.disabled = true);

        if (isCorrect) {
          btn.classList.add('correct');
          window.soundSys.playCorrect();
          this.quizFeedback.className = 'feedback-box correct';
          this.quizFeedback.textContent = `🎉 Hoan hô! Đây đúng là chữ "${item.upper}" rồi nè!`;
          this.quizScore += 1;
          this.quizScoreEl.textContent = this.quizScore;
          window.rewards.addStars(1, "Bé nhận biết chữ cái rất chuẩn nè!");
          window.rewards.recordActivity('vnScore', 1);
          const praiseMsg = `Chính xác rồi nè! Chữ ${item.sound || item.upper} giỏi quá!`;
          window.soundSys.speakThen(praiseMsg, () => this.loadQuizQuestion(), 700);
        } else {
          btn.classList.add('wrong');
          window.soundSys.playWrong();
          this.quizFeedback.className = 'feedback-box wrong';
          this.quizFeedback.textContent = `Chưa đúng rồi! Bé thử nhìn lại hình và chọn nhé!`;
          window.soundSys.speak("Bé chọn lại với cô nhé!");
          setTimeout(() => {
            allBtns.forEach(b => { b.disabled = false; b.classList.remove('wrong'); });
          }, 1600);
        }
      });
      this.quizAArea.appendChild(btn);
    });

    setTimeout(() => {
      window.soundSys.speak(`Bé hãy tìm chữ ${target.sound || target.upper} của từ ${target.word} nhé!`);
    }, 200);
  }

  // ================= 6. GHÉP VẦN & ĐIỀN TIẾNG =================
  loadRhymeQuestion() {
    this.rhymeFeedback.className = 'feedback-box';
    this.rhymeFeedback.textContent = '';
    this.rhymeAArea.innerHTML = '';
    this.rhymeQArea.innerHTML = '';

    const rhymeWords = [
      { full: 'CÁ', missing: '_ Á', answer: 'C', icon: '🐟', choices: ['C', 'B', 'M', 'D'], say: 'Con cá' },
      { full: 'GÀ', missing: '_ À', answer: 'G', icon: '🐔', choices: ['G', 'L', 'H', 'N'], say: 'Con gà' },
      { full: 'BÓNG', missing: '_ Ó N G', answer: 'B', icon: '⚽', choices: ['B', 'P', 'V', 'T'], say: 'Quả bóng' },
      { full: 'MÈO', missing: '_ È O', answer: 'M', icon: '🐱', choices: ['M', 'N', 'D', 'K'], say: 'Con mèo' },
      { full: 'RÙA', missing: '_ Ù A', answer: 'R', icon: '🐢', choices: ['R', 'S', 'G', 'C'], say: 'Con rùa' },
      { full: 'HOA', missing: 'H _ A', answer: 'O', icon: '🌸', choices: ['O', 'U', 'A', 'E'], say: 'Bông hoa' },
      { full: 'NẤM', missing: 'N _ M', answer: 'Â', icon: '🍄', choices: ['Â', 'A', 'Ă', 'Ơ'], say: 'Cây nấm' },
      { full: 'BÚP BÊ', missing: 'B _ P B Ê', answer: 'Ú', icon: '🪆', choices: ['Ú', 'Ó', 'Á', 'É'], say: 'Búp bê' },
      { full: 'LÁ CỜ', missing: 'L Á C _', answer: 'Ờ', icon: '🚩', choices: ['Ờ', 'À', 'Ò', 'Ơ'], say: 'Lá cờ' },
      { full: 'CON VỊT', missing: 'V _ T', answer: 'Ị', icon: '🦆', choices: ['Ị', 'Ạ', 'Ẹ', 'Ọ'], say: 'Con vịt' },
      { full: 'CÂY KEM', missing: 'K _ M', answer: 'E', icon: '🍦', choices: ['E', 'Ê', 'A', 'O'], say: 'Cây kem' },
      { full: 'XE ĐẠP', missing: '_ E ĐẠP', answer: 'X', icon: '🚲', choices: ['X', 'S', 'C', 'K'], say: 'Xe đạp' },
      { full: 'ĐỒNG HỒ', missing: '_ Ồ N G H Ồ', answer: 'Đ', icon: '⏰', choices: ['Đ', 'D', 'B', 'T'], say: 'Đồng hồ' },
      { full: 'MẶT TRĂNG', missing: 'M _ T T R Ă N G', answer: 'Ặ', icon: '🌙', choices: ['Ặ', 'Ậ', 'Ạ', 'Ă'], say: 'Mặt trăng' }
    ];

    const q = rhymeWords[Math.floor(Math.random() * rhymeWords.length)];

    this.rhymeQArea.innerHTML = `
      <div class="math-visual-items">
        <span style="font-size: 5rem;">${q.icon}</span>
      </div>
      <div class="math-question-text" style="letter-spacing: 4px;">${q.missing}</div>
      <div class="math-prompt-hint">Hình minh họa: <strong>${q.say}</strong>. Điền chữ còn thiếu vào dấu gạch [ _ ] nhé:</div>
    `;

    window.soundSys.preloadAudio(`Đúng rồi nè! Bé ghép được từ ${q.say} giỏi quá!`);

    q.choices.sort(() => Math.random() - 0.5).forEach(letter => {
      const btn = document.createElement('button');
      btn.className = 'answer-choice-btn';
      btn.style.fontSize = '2.6rem';
      btn.textContent = letter;
      btn.addEventListener('click', () => {
        const isCorrect = (letter === q.answer);
        const allBtns = this.rhymeAArea.querySelectorAll('.answer-choice-btn');
        allBtns.forEach(b => b.disabled = true);

        if (isCorrect) {
          btn.classList.add('correct');
          window.soundSys.playCorrect();
          this.rhymeFeedback.className = 'feedback-box correct';
          this.rhymeFeedback.textContent = `🎉 Chuẩn luôn nè! Ghép được từ "${q.full}" (${q.say}) rồi!`;
          this.rhymeScore += 1;
          this.rhymeScoreEl.textContent = this.rhymeScore;
          window.rewards.addStars(1, "Bé ghép vần thông minh quá chừng!");
          window.rewards.recordActivity('vnScore', 1);
          const praiseMsg = `Đúng rồi nè! Bé ghép được từ ${q.say} giỏi quá!`;
          window.soundSys.speakThen(praiseMsg, () => this.loadRhymeQuestion(), 700);
        } else {
          btn.classList.add('wrong');
          window.soundSys.playWrong();
          this.rhymeFeedback.className = 'feedback-box wrong';
          this.rhymeFeedback.textContent = `Chưa đúng chữ rồi bé ơi! Bé thử lại nhé!`;
          window.soundSys.speak("Chưa đúng chữ rồi bé ơi, bé thử lại nhé!");
          setTimeout(() => {
            allBtns.forEach(b => { b.disabled = false; b.classList.remove('wrong'); });
          }, 1600);
        }
      });
      this.rhymeAArea.appendChild(btn);
    });

    setTimeout(() => {
      window.soundSys.speak(`Đây là hình ${q.say} nè. Còn thiếu chữ cái nào vậy bé ơi?`);
    }, 200);
  }

  // ================= 7. XẾP TỪ THÀNH CÂU HOÀN CHỈNH (SGK LỚP 1) =================
  loadSentenceQuestion() {
    this.sentenceFeedback.className = 'feedback-box';
    this.sentenceFeedback.textContent = '';
    this.sentenceAArea.innerHTML = '';
    this.sentenceQArea.innerHTML = '';

    const sentences = [
      {
        correct: "Bé đi học chăm chỉ.",
        shuffled: ["chăm chỉ.", "Bé", "đi học"],
        say: "Bé đi học chăm chỉ"
      },
      {
        correct: "Bầu trời có mây xanh.",
        shuffled: ["mây xanh.", "có", "Bầu trời"],
        say: "Bầu trời có mây xanh"
      },
      {
        correct: "Em yêu quý mẹ cha.",
        shuffled: ["mẹ cha.", "Em", "yêu quý"],
        say: "Em yêu quý mẹ cha"
      },
      {
        correct: "Đàn gà con theo mẹ.",
        shuffled: ["theo mẹ.", "Đàn gà con"],
        say: "Đàn gà con theo mẹ"
      },
      {
        correct: "Mặt trời mọc buổi sáng.",
        shuffled: ["buổi sáng.", "mọc", "Mặt trời"],
        say: "Mặt trời mọc buổi sáng"
      },
      {
        correct: "Bé yêu trường lớp của bé.",
        shuffled: ["của bé.", "trường lớp", "Bé yêu"],
        say: "Bé yêu trường lớp của bé"
      },
      {
        correct: "Hoa sen nở thơm ngát dưới hồ.",
        shuffled: ["dưới hồ.", "thơm ngát", "Hoa sen", "nở"],
        say: "Hoa sen nở thơm ngát dưới hồ"
      },
      {
        correct: "Cô giáo dạy bé tập đọc chữ.",
        shuffled: ["tập đọc chữ.", "dạy bé", "Cô giáo"],
        say: "Cô giáo dạy bé tập đọc chữ"
      },
      {
        correct: "Chim hót líu lo trên cành.",
        shuffled: ["trên cành.", "líu lo", "Chim hót"],
        say: "Chim hót líu lo trên cành"
      },
      {
        correct: "Bé giữ gìn sách vở cẩn thận.",
        shuffled: ["cẩn thận.", "sách vở", "Bé giữ gìn"],
        say: "Bé giữ gìn sách vở cẩn thận"
      },
      {
        correct: "Bé chào thầy cô lễ phép.",
        shuffled: ["lễ phép.", "Bé chào", "thầy cô"],
        say: "Bé chào thầy cô lễ phép"
      },
      {
        correct: "Ông bà yêu thương các cháu.",
        shuffled: ["các cháu.", "Ông bà", "yêu thương"],
        say: "Ông bà yêu thương các cháu"
      },
      {
        correct: "Bé tự đánh răng buổi sáng.",
        shuffled: ["buổi sáng.", "tự đánh răng", "Bé"],
        say: "Bé tự đánh răng buổi sáng"
      },
      {
        correct: "Con vịt lội trong hồ nước.",
        shuffled: ["trong hồ nước.", "lội", "Con vịt"],
        say: "Con vịt lội trong hồ nước"
      },
      {
        correct: "Trẻ em được vui chơi học hành.",
        shuffled: ["vui chơi học hành.", "Trẻ em", "được"],
        say: "Trẻ em được vui chơi học hành"
      }
    ];

    const q = sentences[Math.floor(Math.random() * sentences.length)];
    this.currentSentenceTarget = q.correct;
    this.userConstructedWords = [];

    // Container for user built sentence
    this.sentenceQArea.innerHTML = `
      <div class="math-prompt-hint">Bé hãy bấm vào từng từ theo thứ tự để ghép thành câu đúng ngữ pháp nhé:</div>
      <div class="constructed-sentence-box" id="constructedSentenceBox">
        <span class="placeholder-text">👉 Bấm chọn các từ ở dưới để xếp vào đây nè...</span>
      </div>
      <button class="small-pill-btn" id="btnResetSentence" style="margin-top:10px;">↺ Xếp lại từ đầu</button>
    `;

    const box = document.getElementById('constructedSentenceBox');
    const resetBtn = document.getElementById('btnResetSentence');

    resetBtn.addEventListener('click', () => {
      this.userConstructedWords = [];
      box.innerHTML = `<span class="placeholder-text">👉 Bấm chọn các từ ở dưới để xếp vào đây nè...</span>`;
      const allBtns = this.sentenceAArea.querySelectorAll('.answer-choice-btn');
      allBtns.forEach(b => {
        b.disabled = false;
        b.style.opacity = '1';
      });
    });

    q.shuffled.forEach(word => {
      const btn = document.createElement('button');
      btn.className = 'answer-choice-btn';
      btn.style.fontSize = '1.75rem';
      btn.style.padding = '12px 24px';
      btn.style.minHeight = '64px';
      btn.textContent = word;

      btn.addEventListener('click', () => {
        window.soundSys.playPop();
        this.userConstructedWords.push(word);
        btn.disabled = true;
        btn.style.opacity = '0.4';

        // Update box
        box.textContent = this.userConstructedWords.join(' ');

        // Check if finished
        if (this.userConstructedWords.length === q.shuffled.length) {
          const result = this.userConstructedWords.join(' ');
          if (result === q.correct) {
            box.style.borderColor = '#06d6a0';
            box.style.backgroundColor = '#d8f3dc';
            this.sentenceFeedback.className = 'feedback-box correct';
            this.sentenceFeedback.textContent = `🎉 Hoàn hảo! Câu đúng là: "${q.correct}"`;

            this.sentenceScore += 1;
            this.sentenceScoreEl.textContent = this.sentenceScore;
            window.rewards.addStars(2, "Bé ghép câu xuất sắc quá chừng!");
            window.soundSys.playCorrect();
            const praiseMsg = `Hoan hô! Bé đã ghép thành công câu: ${q.say} nhé!`;
            window.soundSys.speakThen(praiseMsg, () => this.loadSentenceQuestion(), 700);
          } else {
            box.style.borderColor = '#e63946';
            box.style.backgroundColor = '#ffe3e3';
            window.soundSys.playWrong();
            this.sentenceFeedback.className = 'feedback-box wrong';
            this.sentenceFeedback.textContent = `Thứ tự từ chưa đúng rồi bé ơi! Bé bấm nút "Xếp lại từ đầu" để làm lại nhé!`;
            window.soundSys.speak("Thứ tự các từ chưa đúng rồi, bé xếp lại với cô nhé!");
          }
        }
      });

      this.sentenceAArea.appendChild(btn);
    });

    setTimeout(() => {
      window.soundSys.speak("Bé hãy xếp các từ thành câu hoàn chỉnh nhé!");
    }, 200);
  }

  /* ========================================================
     BÀI ĐỌC HIỂU & KỂ CHUYỆN LỚP 1 (GRADE 1 READING COMPREHENSION)
     ======================================================== */
  getReadingStories() {
    return [
      {
        id: 'doi_ban_than',
        title: '🐰 Đôi Bạn Thân (Thỏ Trắng & Sóc Nâu)',
        topic: '🌟 Tình Bạn & Sẻ Chia',
        icon: '🐰',
        paragraphs: [
          [
            'Trong khu rừng xanh, Thỏ Trắng và Sóc Nâu là đôi bạn rất thân.',
            'Một hôm trời đổ mưa to, Thỏ Trắng không tìm được thức ăn và bị đói.'
          ],
          [
            'Sóc Nâu liền chạy sang, mang cho Thỏ một củ cà rốt to và vài hạt dẻ thơm ngon.',
            'Thỏ Trắng cảm động nói: "Cảm ơn bạn Sóc Nâu nhiều lắm!"'
          ],
          [
            'Khi trời hửng nắng, hai bạn lại cùng nhau vui vẻ nhảy múa dưới bóng cây xanh mát.'
          ]
        ],
        questions: [
          {
            q: 'Ai là bạn thân của Thỏ Trắng trong khu rừng xanh?',
            options: ['Bạn Sóc Nâu tốt bụng', 'Chó Sói hung dữ', 'Bác Gấu Đen'],
            correct: 0,
            explain: 'Đúng rồi bé ơi! Thỏ Trắng và Sóc Nâu là đôi bạn thân thiết luôn giúp đỡ nhau!'
          },
          {
            q: 'Khi trời mưa to, Sóc Nâu đã mang thức ăn gì sang cho Thỏ Trắng?',
            options: ['Một củ cà rốt to và hạt dẻ', 'Chiếc bánh kẹo ngọt', 'Một chùm quả dại'],
            correct: 0,
            explain: 'Chính xác! Sóc Nâu mang củ cà rốt và hạt dẻ sang chia sẻ với bạn Thỏ!'
          },
          {
            q: 'Câu chuyện khuyên các bé điều gì?',
            options: ['Biết yêu thương và chia sẻ với bạn bè khi gặp khó khăn', 'Thích trời mưa to để ở nhà', 'Chỉ chơi một mình trong rừng'],
            correct: 0,
            explain: 'Bé thật thông minh! Bạn bè phải biết quan tâm, sẻ chia và giúp đỡ lẫn nhau!'
          }
        ]
      },
      {
        id: 'bong_hoa_niem_vui',
        title: '🌸 Bông Hoa Niềm Vui (Bé Mai & Bà)',
        topic: '❤️ Lòng Hiếu Thảo & Yêu Thương',
        icon: '🌸',
        paragraphs: [
          [
            'Sáng sớm thức dậy, bé Mai thấy bà ngoại bị mệt và nằm nghỉ trên giường.',
            'Mai nhẹ nhàng chạy ra vườn hoa trước hiên nhà.'
          ],
          [
            'Bé chọn một bông hoa cúc vàng rực rỡ nhất mang vào cắm ở đầu giường tặng bà.',
            'Bà ôm Mai vào lòng và mỉm cười: "Nhìn thấy hoa đẹp và cháu ngoan, bà thấy khoẻ hơn rồi!"'
          ],
          [
            'Mai vui sướng nở nụ cười tươi như những bông hoa mùa xuân.'
          ]
        ],
        questions: [
          {
            q: 'Khi thấy bà ngoại bị mệt, bạn Mai đã làm gì?',
            options: ['Hái bông hoa cúc vàng rực rỡ tặng bà', 'Bật ti vi xem hoạt hình', 'Ngồi khóc nhè một mình'],
            correct: 0,
            explain: 'Tuyệt vời! Mai rất hiếu thảo, hái hoa cúc thơm ngát để làm bà vui!'
          },
          {
            q: 'Khi nhận được hoa của Mai, bà ngoại cảm thấy thế nào?',
            options: ['Bà mỉm cười và thấy khoẻ hơn nhiều', 'Bà cảm thấy mệt hơn', 'Bà bảo Mai đi ra ngoài'],
            correct: 0,
            explain: 'Bé giỏi lắm! Tình yêu thương của Mai đã giúp bà cảm thấy khoẻ khoắn hơn!'
          },
          {
            q: 'Qua câu chuyện, bé học tập được đức tính gì ở bạn Mai?',
            options: ['Lòng hiếu thảo, biết chăm sóc và yêu thương ông bà', 'Thích hái hoa trong vườn', 'Dậy thật sớm để chơi đùa'],
            correct: 0,
            explain: 'Chính xác! Bé ngoan luôn biết quan tâm, chăm sóc ông bà và cha mẹ!'
          }
        ]
      },
      {
        id: 'rua_va_tho',
        title: '🐢 Rùa Và Thỏ Chạy Thi',
        topic: '🏆 Tính Kiên Trì & Không Kiêu Ngạo',
        icon: '🐢',
        paragraphs: [
          [
            'Thỏ tự hào mình chạy nhanh, liền rủ Rùa chạy thi lên đỉnh đồi.',
            'Khi bắt đầu, Thỏ cậy tài chạy vụt lên phía trước rồi nằm ngủ say dưới bóng cây mát.'
          ],
          [
            'Rùa biết mình chậm chạp nên chăm chỉ bước từng bước, không hề nghỉ ngơi.',
            'Đến khi Thỏ giật mình tỉnh giấc thì Rùa đã kiên trì chạm vạch đích từ lúc nào.'
          ],
          [
            'Tất cả muông thú trong rừng đều reo hò chúc mừng chú Rùa chăm chỉ và khiêm tốn.'
          ]
        ],
        questions: [
          {
            q: 'Vì sao bạn Thỏ lại bị thua trong cuộc thi chạy?',
            options: ['Vì Thỏ chủ quan, kiêu ngạo và nằm ngủ quên', 'Vì Thỏ bị đau chân', 'Vì đường chạy quá xa'],
            correct: 0,
            explain: 'Đúng rồi! Thỏ cậy chạy nhanh nên chủ quan, ngủ quên dưới gốc cây!'
          },
          {
            q: 'Chú Rùa đã làm gì để giành chiến thắng cuộc đua?',
            options: ['Kiên trì bước từng bước, chăm chỉ không bỏ cuộc', 'Nhờ chim bồ câu cõng bay đi', 'Rùa chạy tắt qua đường mòn'],
            correct: 0,
            explain: 'Xuất sắc! Sự chăm chỉ và bền bỉ đã giúp bạn Rùa về đích đầu tiên!'
          },
          {
            q: 'Bài học ý nghĩa nhất từ câu chuyện là gì?',
            options: ['Kiên trì nhẫn nại sẽ thành công, không được kiêu căng', 'Chạy nhanh là giỏi nhất', 'Nên ngủ dưới gốc cây'],
            correct: 0,
            explain: 'Hoan hô bé! Dù làm việc gì, kiên trì và khiêm tốn luôn đem lại kết quả tốt đẹp!'
          }
        ]
      },
      {
        id: 'ngoi_truong_moi',
        title: '🏫 Ngôi Trường Mới Của Bé',
        topic: '🎒 Tình Yêu Mái Trường & Thầy Cô',
        icon: '🏫',
        paragraphs: [
          [
            'Năm nay bé vào lớp một ở một ngôi trường tiểu học khang trang và xinh đẹp.',
            'Sân trường rợp bóng cây bàng xanh mát và những bồn hoa mười giờ đỏ thắm.'
          ],
          [
            'Cô giáo đón bé ở cửa lớp với nụ cười dịu hiền và ánh mắt trìu mến.',
            'Bé được học chữ cái, học làm toán, vẽ tranh và có thêm nhiều người bạn mới.'
          ],
          [
            'Mỗi ngày cắp sách đến trường với bé là một ngày tràn ngập niềm vui và tiếng cười.'
          ]
        ],
        questions: [
          {
            q: 'Sân trường của bé có những loài cây và hoa gì đẹp mắt?',
            options: ['Cây bàng rợp bóng mát và hoa mười giờ đỏ thắm', 'Cây dừa và hoa sen', 'Cây chuối và hoa mai'],
            correct: 0,
            explain: 'Đúng rồi bé ơi! Sân trường rợp bóng cây bàng và rực rỡ hoa mười giờ!'
          },
          {
            q: 'Cô giáo đón các em học sinh với nét mặt như thế nào?',
            options: ['Với nụ cười dịu hiền và ánh mắt trìu mến', 'Nghiêm nghị không cười', 'Đang vội vã đi chấm bài'],
            correct: 0,
            explain: 'Chính xác! Cô giáo lớp một hiền như người mẹ thứ hai của bé vậy!'
          },
          {
            q: 'Mỗi ngày đến trường mang lại cảm xúc gì cho bé?',
            options: ['Tràn ngập niềm vui, tình bạn và nhiều kiến thức bổ ích', 'Bé cảm thấy buồn ngủ', 'Bé muốn về nhà ngay'],
            correct: 0,
            explain: 'Tuyệt vời! Mỗi ngày đến trường là một ngày vui của các bé lớp một!'
          }
        ]
      },
      {
        id: 'dan_ga_con',
        title: '🐥 Đàn Gà Con Của Bà',
        topic: '🌾 Yêu Lao Động & Thế Giới Loài Vật',
        icon: '🐥',
        paragraphs: [
          [
            'Mẹ gà mái ấp ủ mười quả trứng tròn trong ổ rơm rạ ấm áp suốt mấy tuần qua.',
            'Hôm nay, những quả trứng tí hon đồng loạt khẽ kêu lách tách rồi nứt vỏ.'
          ],
          [
            'Mười chú gà con chui ra, bộ lông vàng óng ả mềm mại như những cục bông tròn xoe.',
            'Bé vui vẻ giúp bà mang đĩa gạo tấm ra cho đàn gà con ăn bữa đầu tiên.'
          ],
          [
            'Đàn gà con líu ríu chạy quanh chân bé, trông thật ngộ nghĩnh và đáng yêu.'
          ]
        ],
        questions: [
          {
            q: 'Những chú gà con mới nở trông giống như vật gì?',
            options: ['Như những cục bông tròn xoe vàng óng ả', 'Như những chiếc lá khô', 'Như những viên bi lăn'],
            correct: 0,
            explain: 'Đúng rồi bé ơi! Lông gà con vàng óng như những cục bông nhỏ xíu!'
          },
          {
            q: 'Bé đã giúp bà ngoại làm công việc gì?',
            options: ['Mang đĩa gạo tấm cho đàn gà con ăn', 'Đi đào giun đất', 'Làm chuồng gà mới'],
            correct: 0,
            explain: 'Bé ngoan lắm! Bé biết giúp bà cho đàn gà ăn những hạt gạo tấm thơm lành!'
          },
          {
            q: 'Tiếng kêu líu ríu của đàn gà con thể hiện điều gì?',
            options: ['Đàn gà vui vẻ, quấn quýt bên chân bé', 'Đàn gà đang giận dữ', 'Đàn gà sợ hãi'],
            correct: 0,
            explain: 'Hoan hô bé! Đàn gà con rất vui và cảm ơn bé đã cho chúng ăn no!'
          }
        ]
      }
    ];
  }

  initReadingView() {
    this.renderStoryChips();
    this.renderStoryView();
    setTimeout(() => {
      window.soundSys.speak("Chào bé yêu! Bé hãy cùng cô đọc truyện và trả lời các câu hỏi đọc hiểu nhé!");
    }, 250);
  }

  renderStoryChips() {
    if (!this.storyChipsList) return;
    this.storyChipsList.innerHTML = '';
    const stories = this.getReadingStories();

    stories.forEach((story, idx) => {
      const chip = document.createElement('button');
      chip.className = 'story-chip' + (idx === this.currentStoryIndex ? ' active' : '');
      chip.innerHTML = `<span>${story.icon}</span> <span>${story.title.split('(')[0].trim()}</span>`;
      chip.addEventListener('click', () => {
        this.selectStory(idx);
      });
      this.storyChipsList.appendChild(chip);
    });
  }

  selectStory(index) {
    this.stopFullStory();
    this.currentStoryIndex = index;
    this.currentStoryQuestionIndex = 0;
    this.renderStoryChips();
    this.renderStoryView();
  }

  renderStoryView() {
    const stories = this.getReadingStories();
    const story = stories[this.currentStoryIndex];
    if (!story) return;

    if (this.storyTopicBadge) this.storyTopicBadge.textContent = story.topic;
    if (this.storyTitle) this.storyTitle.textContent = story.title;
    if (this.storyCounterLabel) {
      this.storyCounterLabel.textContent = `Truyện ${this.currentStoryIndex + 1} / ${stories.length}`;
    }

    // Render paragraphs and clickable sentences
    if (this.storyContentBox) {
      this.storyContentBox.innerHTML = '';
      story.paragraphs.forEach(paragraph => {
        const pEl = document.createElement('p');
        pEl.className = 'story-paragraph';

        paragraph.forEach((sentenceText, sIdx) => {
          const span = document.createElement('span');
          span.className = 'story-sentence';
          span.textContent = sentenceText + ' ';
          span.title = 'Chạm vào để nghe đọc câu này nha!';
          span.addEventListener('click', () => {
            this.speakSentence(sentenceText, span);
          });
          pEl.appendChild(span);
        });

        this.storyContentBox.appendChild(pEl);
      });
    }

    // Reset controls
    if (this.btnPlayFullStory) this.btnPlayFullStory.style.display = 'inline-flex';
    if (this.btnStopFullStory) this.btnStopFullStory.style.display = 'none';

    // Render current question
    this.renderStoryQuestion();
  }

  speakSentence(text, el) {
    this.stopFullStory();
    document.querySelectorAll('.story-sentence').forEach(s => s.classList.remove('active-speaking'));
    if (el) el.classList.add('active-speaking');

    window.soundSys.speak(text, () => {
      if (el) el.classList.remove('active-speaking');
    });
  }

  playFullStory() {
    const stories = this.getReadingStories();
    const story = stories[this.currentStoryIndex];
    if (!story) return;

    this.isReadingFullStory = true;
    if (this.btnPlayFullStory) this.btnPlayFullStory.style.display = 'none';
    if (this.btnStopFullStory) this.btnStopFullStory.style.display = 'inline-flex';

    // Collect all sentence spans
    const sentenceSpans = Array.from(this.storyContentBox.querySelectorAll('.story-sentence'));
    let currentIdx = 0;

    const readNext = () => {
      if (!this.isReadingFullStory || currentIdx >= sentenceSpans.length) {
        this.stopFullStory();
        return;
      }

      sentenceSpans.forEach(s => s.classList.remove('active-speaking'));
      const span = sentenceSpans[currentIdx];
      span.classList.add('active-speaking');

      const text = span.textContent.trim();
      currentIdx++;

      window.soundSys.speak(text, () => {
        span.classList.remove('active-speaking');
        if (this.isReadingFullStory) {
          this.readingTimer = setTimeout(readNext, 450);
        }
      });
    };

    readNext();
  }

  stopFullStory() {
    this.isReadingFullStory = false;
    if (this.readingTimer) {
      clearTimeout(this.readingTimer);
      this.readingTimer = null;
    }
    if (window.soundSys) window.soundSys.stop();

    if (this.btnPlayFullStory) this.btnPlayFullStory.style.display = 'inline-flex';
    if (this.btnStopFullStory) this.btnStopFullStory.style.display = 'none';

    if (this.storyContentBox) {
      this.storyContentBox.querySelectorAll('.story-sentence').forEach(s => s.classList.remove('active-speaking'));
    }
  }

  renderStoryQuestion() {
    const stories = this.getReadingStories();
    const story = stories[this.currentStoryIndex];
    if (!story || !story.questions) return;

    const q = story.questions[this.currentStoryQuestionIndex];
    if (!q) return;

    if (this.storyQuestionText) {
      this.storyQuestionText.textContent = `Câu ${this.currentStoryQuestionIndex + 1}: ${q.q}`;
    }

    if (this.storyFeedbackBox) {
      this.storyFeedbackBox.style.display = 'none';
      this.storyFeedbackBox.className = 'story-feedback-box';
      this.storyFeedbackBox.textContent = '';
    }

    if (this.storyOptionsGrid) {
      this.storyOptionsGrid.innerHTML = '';
      const letters = ['A', 'B', 'C'];

      q.options.forEach((optText, optIdx) => {
        const btn = document.createElement('button');
        btn.className = 'story-option-btn';
        btn.innerHTML = `
          <span class="opt-badge">${letters[optIdx]}</span>
          <span class="opt-text">${optText}</span>
        `;
        btn.addEventListener('click', () => {
          this.handleStoryAnswer(optIdx, btn, q, story);
        });
        this.storyOptionsGrid.appendChild(btn);
      });
    }
  }

  handleStoryAnswer(selectedIdx, btn, q, story) {
    const allBtns = this.storyOptionsGrid.querySelectorAll('.story-option-btn');
    allBtns.forEach(b => b.style.pointerEvents = 'none');

    if (selectedIdx === q.correct) {
      btn.classList.add('correct');
      window.soundSys.playCorrect();
      this.storyFeedbackBox.className = 'story-feedback-box correct';
      this.storyFeedbackBox.textContent = `🎉 Tuyệt vời! ${q.explain}`;
      this.storyFeedbackBox.style.display = 'block';

      this.readingScore += 1;
      if (this.readingScoreEl) this.readingScoreEl.textContent = this.readingScore;

      window.rewards.addStars(1, "Bé trả lời đúng câu hỏi đọc hiểu!");
      const praiseMsg = `Đúng rồi bé ơi! ${q.explain}`;
      window.soundSys.speakThen(praiseMsg, () => {
        if (this.currentStoryQuestionIndex + 1 < story.questions.length) {
          this.currentStoryQuestionIndex++;
          this.renderStoryQuestion();
        } else {
          // Completed all questions for this story
          window.soundSys.playCelebration();
          window.rewards.addStars(2, "Bé đã hoàn thành xuất sắc câu chuyện!");
          this.storyFeedbackBox.textContent = `🌟 Hoan hô! Bé đã tìm hiểu xong câu chuyện "${story.title}"! Bé hãy chọn truyện tiếp theo để đọc nhé!`;
          window.soundSys.speak(`Hoan hô! Bé đã tìm hiểu xong toàn bộ câu chuyện rồi, bé giỏi lắm!`);
        }
      }, 700);

    } else {
      btn.classList.add('wrong');
      window.soundSys.playWrong();
      this.storyFeedbackBox.className = 'story-feedback-box wrong';
      this.storyFeedbackBox.textContent = `Chưa chính xác rồi bé ơi! Bé cùng nghe lại câu chuyện và chọn lại nhé!`;
      this.storyFeedbackBox.style.display = 'block';
      window.soundSys.speak("Chưa đúng rồi bé ơi, bé suy nghĩ và chọn lại nhé!");

      setTimeout(() => {
        btn.classList.remove('wrong');
        allBtns.forEach(b => b.style.pointerEvents = 'auto');
      }, 2000);
    }
  }
}

// Global instance loaded on ready
window.vnApp = null;
