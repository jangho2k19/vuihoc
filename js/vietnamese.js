/* ========================================================
   VIETNAMESE MODULE - BÁM SÁT CHƯƠNG TRÌNH TIẾNG VIỆT LỚP 1
   Bảng chữ cái, 5 Dấu thanh, Quy tắc chính tả (c/k, g/gh, ng/ngh),
   Âm ghép (ch, nh, th...), Đố chữ, Ghép vần, Xếp từ thành câu
   ======================================================== */

class VietnameseApp {
  constructor() {
    this.alphabetData = [
      { upper: 'A', lower: 'a', word: 'Con Gà', icon: '🐔', sentence: 'Chữ A trong từ Con Gà' },
      { upper: 'Ă', lower: 'ă', word: 'Mặt Trăng', icon: '🌙', sentence: 'Chữ Ă trong Mặt Trăng' },
      { upper: 'Â', lower: 'â', word: 'Cây Nấm', icon: '🍄', sentence: 'Chữ Â trong Cây Nấm' },
      { upper: 'B', lower: 'b', word: 'Quả Bóng', icon: '⚽', sentence: 'Chữ Bờ trong Quả Bóng' },
      { upper: 'C', lower: 'c', word: 'Con Cá', icon: '🐟', sentence: 'Chữ Cờ trong Con Cá' },
      { upper: 'D', lower: 'd', word: 'Dưa Hấu', icon: '🍉', sentence: 'Chữ Dờ trong Dưa Hấu' },
      { upper: 'Đ', lower: 'đ', word: 'Đồng Hồ', icon: '⏰', sentence: 'Chữ Đờ trong Đồng Hồ' },
      { upper: 'E', lower: 'e', word: 'Em Bé', icon: '👶', sentence: 'Chữ E trong Em Bé' },
      { upper: 'Ê', lower: 'ê', word: 'Con Ếch', icon: '🐸', sentence: 'Chữ Ê trong Con Ếch' },
      { upper: 'G', lower: 'g', word: 'Ghế Gỗ', icon: '🪑', sentence: 'Chữ Gờ trong Ghế Gỗ' },
      { upper: 'H', lower: 'h', word: 'Bông Hoa', icon: '🌸', sentence: 'Chữ Hát trong Bông Hoa' },
      { upper: 'I', lower: 'i', word: 'Viên Bi', icon: '🔮', sentence: 'Chữ I trong Viên Bi' },
      { upper: 'K', lower: 'k', word: 'Cây Kem', icon: '🍦', sentence: 'Chữ Ca trong Cây Kem' },
      { upper: 'L', lower: 'l', word: 'Chiếc Lá', icon: '🍃', sentence: 'Chữ Lờ trong Chiếc Lá' },
      { upper: 'M', lower: 'm', word: 'Con Mèo', icon: '🐱', sentence: 'Chữ Mờ trong Con Mèo' },
      { upper: 'N', lower: 'n', word: 'Nụ Hoa', icon: '🌷', sentence: 'Chữ Nờ trong Nụ Hoa' },
      { upper: 'O', lower: 'o', word: 'Con Ong', icon: '🐝', sentence: 'Chữ O trong Con Ong' },
      { upper: 'Ô', lower: 'ô', word: 'Cái Ô', icon: '☂️', sentence: 'Chữ Ô trong Cái Ô' },
      { upper: 'Ơ', lower: 'ơ', word: 'Lá Cờ', icon: '🚩', sentence: 'Chữ Ơ trong Lá Cờ' },
      { upper: 'P', lower: 'p', word: 'Cây Bút', icon: '✏️', sentence: 'Chữ Pờ trong Bút Chì' },
      { upper: 'Q', lower: 'q', word: 'Quả Quýt', icon: '🍊', sentence: 'Chữ Quy trong Quả Quýt' },
      { upper: 'R', lower: 'r', word: 'Con Rùa', icon: '🐢', sentence: 'Chữ Rờ trong Con Rùa' },
      { upper: 'S', lower: 's', word: 'Ngôi Sao', icon: '⭐', sentence: 'Chữ Sờ trong Ngôi Sao' },
      { upper: 'T', lower: 't', word: 'Con Tôm', icon: '🦐', sentence: 'Chữ Tờ trong Con Tôm' },
      { upper: 'U', lower: 'u', word: 'Búp Bê', icon: '🪆', sentence: 'Chữ U trong Búp Bê' },
      { upper: 'Ư', lower: 'ư', word: 'Con Hươu', icon: '🦌', sentence: 'Chữ Ư trong Con Hươu' },
      { upper: 'V', lower: 'v', word: 'Con Vịt', icon: '🦆', sentence: 'Chữ Vờ trong Con Vịt' },
      { upper: 'X', lower: 'x', word: 'Xe Đạp', icon: '🚲', sentence: 'Chữ Xờ trong Xe Đạp' },
      { upper: 'Y', lower: 'y', word: 'Chim Yến', icon: '🐦', sentence: 'Chữ Y Dài trong Chim Yến' }
    ];

    this.isUppercase = true;
    this.selectedLetter = this.alphabetData[0];

    // Scores
    this.quizScore = 0;
    this.rhymeScore = 0;
    this.tonesScore = 0;
    this.spellingScore = 0;
    this.compoundsScore = 0;
    this.sentenceScore = 0;

    this.initElements();
    this.attachEvents();
    this.renderAlphabetGrid();
    this.showLetterDetail(this.selectedLetter);
  }

  initElements() {
    this.gridEl = document.getElementById('alphabetGrid');
    this.btnUpper = document.getElementById('btnLetterUpper');
    this.btnLower = document.getElementById('btnLetterLower');

    // Detail card elements
    this.detailLetterBox = document.getElementById('detailLetterBox');
    this.detailIllustration = document.getElementById('detailIllustration');
    this.detailWord = document.getElementById('detailWord');
    this.detailSentence = document.getElementById('detailSentence');
    this.btnPlayLetterSound = document.getElementById('btnPlayLetterSound');

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
  }

  attachEvents() {
    // Sub tabs
    const subBtns = document.querySelectorAll('#tab-vietnamese .sub-btn');
    const subViews = document.querySelectorAll('.vn-sub-view');

    subBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        subBtns.forEach(b => b.classList.remove('active'));
        subViews.forEach(v => v.classList.remove('active'));

        btn.classList.add('active');
        const viewId = 'sub-' + btn.dataset.sub;
        const targetView = document.getElementById(viewId);
        if (targetView) targetView.classList.add('active');

        switch (btn.dataset.sub) {
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
        }
      });
    });

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
  }

  renderAlphabetGrid() {
    if (!this.gridEl) return;
    this.gridEl.innerHTML = '';

    this.alphabetData.forEach(item => {
      const card = document.createElement('div');
      card.className = 'letter-card';
      if (this.selectedLetter === item) card.classList.add('active-selected');

      const char = this.isUppercase ? item.upper : item.lower;
      card.innerHTML = `
        <span class="letter-main">${char}</span>
        <span class="letter-sub-word">${item.icon}</span>
      `;

      card.addEventListener('click', () => {
        document.querySelectorAll('.letter-card').forEach(c => c.classList.remove('active-selected'));
        card.classList.add('active-selected');
        this.selectedLetter = item;
        this.showLetterDetail(item);
        window.soundSys.playPop();
        this.speakCurrentLetter();
      });

      this.gridEl.appendChild(card);
    });
  }

  showLetterDetail(item) {
    if (!this.detailLetterBox) return;
    this.detailLetterBox.textContent = `${item.upper} ${item.lower}`;
    this.detailIllustration.textContent = item.icon;
    this.detailWord.textContent = `${item.word} (${item.icon})`;
    this.detailSentence.textContent = item.sentence;
  }

  speakCurrentLetter() {
    if (!this.selectedLetter) return;
    const char = this.isUppercase ? this.selectedLetter.upper : this.selectedLetter.lower;
    const textToSay = `Chữ ${char} nè bé. ${this.selectedLetter.word}!`;
    window.soundSys.speak(textToSay);
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
      { word: 'MŨ', icon: '🧢', tone: 'Dấu ngã (~)', say: 'Tiếng Mũ có dấu ngã' }
    ];

    const q = tonesList[Math.floor(Math.random() * tonesList.length)];
    const allToneChoices = ['Dấu sắc (/)', 'Dấu huyền (\\)', 'Dấu hỏi (?)', 'Dấu ngã (~)', 'Dấu nặng (.)'];

    this.tonesQArea.innerHTML = `
      <div style="font-size: 5rem; margin-bottom: 10px;">${q.icon}</div>
      <div class="math-question-text" style="font-size: 3rem; color: #d90429; letter-spacing: 2px;">"${q.word}"</div>
      <div class="math-prompt-hint">Bé hãy cho cô biết: Tiếng <strong>"${q.word}"</strong> mang dấu thanh nào?</div>
    `;

    allToneChoices.forEach(t => {
      const btn = document.createElement('button');
      btn.className = 'answer-choice-btn';
      btn.style.fontSize = '1.25rem';
      btn.style.minWidth = '140px';
      btn.textContent = t;
      btn.addEventListener('click', () => {
        const isCorrect = (t === q.tone);
        const allBtns = this.tonesAArea.querySelectorAll('.answer-choice-btn');
        allBtns.forEach(b => b.disabled = true);

        if (isCorrect) {
          btn.classList.add('correct');
          this.tonesFeedback.className = 'feedback-box correct';
          this.tonesFeedback.textContent = `🎉 Hoan hô! ${q.say} là chính xác rồi nè!`;
          this.tonesScore += 1;
          this.tonesScoreEl.textContent = this.tonesScore;
          window.rewards.addStars(1, "Bé nhận diện dấu thanh chuẩn quá!");
          window.soundSys.speak(`Đúng rồi nè bé ơi! ${q.say} nghen!`);
          setTimeout(() => this.loadTonesQuestion(), 2200);
        } else {
          btn.classList.add('wrong');
          window.soundSys.playWrong();
          this.tonesFeedback.className = 'feedback-box wrong';
          this.tonesFeedback.textContent = `Chưa đúng dấu rồi bé ơi! Bé nhìn kỹ lại dấu trên chữ nghen!`;
          window.soundSys.speak("Chưa đúng dấu rồi bé ơi, bé nhìn kỹ lại nghen!");
          setTimeout(() => {
            allBtns.forEach(b => { b.disabled = false; b.classList.remove('wrong'); });
          }, 1300);
        }
      });
      this.tonesAArea.appendChild(btn);
    });

    setTimeout(() => {
      window.soundSys.speak(`Tiếng ${q.word} mang dấu thanh nào vậy bé cưng?`);
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
      }
    ];

    const q = rules[Math.floor(Math.random() * rules.length)];

    this.spellingQArea.innerHTML = `
      <div style="font-size: 4.8rem; margin-bottom: 8px;">${q.icon}</div>
      <div class="math-question-text" style="font-size: 2.8rem; color:#4361ee;">${q.word}</div>
      <div class="math-prompt-hint">${q.hint} <br><em>(Mẹo: ${q.rule})</em></div>
    `;

    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'answer-choice-btn';
      btn.style.fontSize = '2.2rem';
      btn.style.minWidth = '120px';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        const isCorrect = (opt === q.ans);
        const allBtns = this.spellingAArea.querySelectorAll('.answer-choice-btn');
        allBtns.forEach(b => b.disabled = true);

        if (isCorrect) {
          btn.classList.add('correct');
          this.spellingFeedback.className = 'feedback-box correct';
          this.spellingFeedback.textContent = `🎉 Hoan hô! Điền đúng là: "${q.full}" nghen!`;
          this.spellingScore += 1;
          this.spellingScoreEl.textContent = this.spellingScore;
          window.rewards.addStars(1, "Bé thuộc quy tắc chính tả rất cừ!");
          window.soundSys.speak(`Chính xác rồi nè! Điền chữ ${q.ans} tạo thành từ ${q.full} nghen!`);
          setTimeout(() => this.loadSpellingQuestion(), 2400);
        } else {
          btn.classList.add('wrong');
          window.soundSys.playWrong();
          this.spellingFeedback.className = 'feedback-box wrong';
          this.spellingFeedback.textContent = `Chưa đúng quy tắc rồi bé ơi! Nhớ quy tắc: k, gh, ngh đứng trước e, ê, i nghen!`;
          window.soundSys.speak("Chưa đúng quy tắc rồi bé ơi, bé chọn lại nghen!");
          setTimeout(() => {
            allBtns.forEach(b => { b.disabled = false; b.classList.remove('wrong'); });
          }, 1400);
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
      { full: 'Quả quýt', missing: '_ _ ýt', ans: 'qu', icon: '🍊', choices: ['qu', 'cu', 'kh', 'ph'], say: 'Quả quýt có âm quờ' }
    ];

    const q = list[Math.floor(Math.random() * list.length)];

    this.compoundsQArea.innerHTML = `
      <div style="font-size: 5rem; margin-bottom: 8px;">${q.icon}</div>
      <div class="math-question-text" style="font-size: 3rem; color: #7209b7;">${q.missing}</div>
      <div class="math-prompt-hint">Hình ảnh: <strong>${q.full}</strong>. Bé hãy chọn âm ghép thích hợp điền vào nghen:</div>
    `;

    q.choices.sort(() => Math.random() - 0.5).forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'answer-choice-btn';
      btn.style.fontSize = '2rem';
      btn.style.minWidth = '95px';
      btn.textContent = c;
      btn.addEventListener('click', () => {
        const isCorrect = (c === q.ans);
        const allBtns = this.compoundsAArea.querySelectorAll('.answer-choice-btn');
        allBtns.forEach(b => b.disabled = true);

        if (isCorrect) {
          btn.classList.add('correct');
          this.compoundsFeedback.className = 'feedback-box correct';
          this.compoundsFeedback.textContent = `🎉 Hoan hô! Ghép đúng âm "${q.ans}" thành từ "${q.full}" rồi!`;
          this.compoundsScore += 1;
          this.compoundsScoreEl.textContent = this.compoundsScore;
          window.rewards.addStars(1, "Bé nhớ âm ghép rất giỏi!");
          window.soundSys.speak(`Đúng rồi nè! ${q.say} nghen!`);
          setTimeout(() => this.loadCompoundsQuestion(), 2200);
        } else {
          btn.classList.add('wrong');
          window.soundSys.playWrong();
          this.compoundsFeedback.className = 'feedback-box wrong';
          this.compoundsFeedback.textContent = `Chưa đúng âm ghép rồi bé ơi! Bé thử lại nghen!`;
          window.soundSys.speak("Chưa đúng âm ghép rồi, bé chọn lại nghen!");
          setTimeout(() => {
            allBtns.forEach(b => { b.disabled = false; b.classList.remove('wrong'); });
          }, 1300);
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
      <div class="math-question-text">Bé hãy bấm vô chữ cái: <strong>"${target.upper}"</strong> nghen!</div>
      <div class="math-prompt-hint">Từ mẫu: ${target.word}</div>
    `;

    choices.forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'answer-choice-btn';
      btn.textContent = `${item.upper} ${item.lower}`;
      btn.addEventListener('click', () => {
        const isCorrect = (item === this.currentQuiz.target);
        const allBtns = this.quizAArea.querySelectorAll('.answer-choice-btn');
        allBtns.forEach(b => b.disabled = true);

        if (isCorrect) {
          btn.classList.add('correct');
          this.quizFeedback.className = 'feedback-box correct';
          this.quizFeedback.textContent = `🎉 Hoan hô! Đây đúng là chữ "${item.upper}" rồi nè!`;
          this.quizScore += 1;
          this.quizScoreEl.textContent = this.quizScore;
          window.rewards.addStars(1, "Bé nhận biết chữ cái rất chuẩn nè!");
          window.rewards.recordActivity('vnScore', 1);
          window.soundSys.speak(`Chính xác rồi nè! Chữ ${item.upper} giỏi quá!`);
          setTimeout(() => this.loadQuizQuestion(), 2000);
        } else {
          btn.classList.add('wrong');
          window.soundSys.playWrong();
          this.quizFeedback.className = 'feedback-box wrong';
          this.quizFeedback.textContent = `Chưa đúng rồi! Bé thử nhìn lại hình và chọn nghen!`;
          window.soundSys.speak("Bé chọn lại với cô nghen!");
          setTimeout(() => {
            allBtns.forEach(b => { b.disabled = false; b.classList.remove('wrong'); });
          }, 1200);
        }
      });
      this.quizAArea.appendChild(btn);
    });

    setTimeout(() => {
      window.soundSys.speak(`Bé hãy tìm chữ ${target.upper} của từ ${target.word} nghen bé cưng!`);
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
      { full: 'HOA', missing: 'H _ A', answer: 'O', icon: '🌸', choices: ['O', 'U', 'A', 'E'], say: 'Bông hoa' }
    ];

    const q = rhymeWords[Math.floor(Math.random() * rhymeWords.length)];

    this.rhymeQArea.innerHTML = `
      <div class="math-visual-items">
        <span style="font-size: 5rem;">${q.icon}</span>
      </div>
      <div class="math-question-text" style="letter-spacing: 4px;">${q.missing}</div>
      <div class="math-prompt-hint">Hình minh họa: <strong>${q.say}</strong>. Điền chữ còn thiếu vào dấu gạch [ _ ] nghen!</div>
    `;

    q.choices.sort(() => Math.random() - 0.5).forEach(letter => {
      const btn = document.createElement('button');
      btn.className = 'answer-choice-btn';
      btn.textContent = letter;
      btn.addEventListener('click', () => {
        const isCorrect = (letter === q.answer);
        const allBtns = this.rhymeAArea.querySelectorAll('.answer-choice-btn');
        allBtns.forEach(b => b.disabled = true);

        if (isCorrect) {
          btn.classList.add('correct');
          this.rhymeFeedback.className = 'feedback-box correct';
          this.rhymeFeedback.textContent = `🎉 Chuẩn luôn nè! Ghép được từ "${q.full}" (${q.say}) rồi!`;
          this.rhymeScore += 1;
          this.rhymeScoreEl.textContent = this.rhymeScore;
          window.rewards.addStars(1, "Bé ghép vần thông minh quá chừng!");
          window.rewards.recordActivity('vnScore', 1);
          window.soundSys.speak(`Đúng rồi nè! Bé ghép được từ ${q.say} giỏi quá!`);
          setTimeout(() => this.loadRhymeQuestion(), 2000);
        } else {
          btn.classList.add('wrong');
          window.soundSys.playWrong();
          this.rhymeFeedback.className = 'feedback-box wrong';
          this.rhymeFeedback.textContent = `Chưa đúng chữ rồi bé ơi! Bé thử lại nghen!`;
          window.soundSys.speak("Chưa đúng chữ rồi bé ơi, bé thử lại nghen!");
          setTimeout(() => {
            allBtns.forEach(b => { b.disabled = false; b.classList.remove('wrong'); });
          }, 1200);
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
      }
    ];

    const q = sentences[Math.floor(Math.random() * sentences.length)];
    this.currentSentenceTarget = q.correct;
    this.userConstructedWords = [];

    // Container for user built sentence
    this.sentenceQArea.innerHTML = `
      <div class="math-prompt-hint">Bé hãy bấm vào từng từ theo thứ tự để ghép thành câu đúng ngữ pháp nghen:</div>
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
      btn.style.fontSize = '1.35rem';
      btn.style.padding = '8px 20px';
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
            window.soundSys.speak(`Hoan hô! Bé đã ghép thành công câu: ${q.say} nghen!`);

            setTimeout(() => this.loadSentenceQuestion(), 2600);
          } else {
            box.style.borderColor = '#e63946';
            box.style.backgroundColor = '#ffe3e3';
            window.soundSys.playWrong();
            this.sentenceFeedback.className = 'feedback-box wrong';
            this.sentenceFeedback.textContent = `Thứ tự từ chưa đúng rồi bé ơi! Bé bấm nút "Xếp lại từ đầu" để làm lại nghen!`;
            window.soundSys.speak("Thứ tự các từ chưa đúng rồi, bé xếp lại với cô nghen!");
          }
        }
      });

      this.sentenceAArea.appendChild(btn);
    });

    setTimeout(() => {
      window.soundSys.speak("Bé hãy xếp các từ thành câu hoàn chỉnh nghen!");
    }, 200);
  }
}

// Global instance loaded on ready
window.vnApp = null;
