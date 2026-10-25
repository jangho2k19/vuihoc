/* ========================================================
   ENGLISH MODULE - BÉ HỌC TIẾNG ANH LỚP 1 (GRADE 1 ENGLISH)
   Phonics & Alphabet, Colors, Numbers, Animals, Family, School
   Interactive Flashcards & Fun Quiz with Audio Pronunciation
   ======================================================== */

class EnglishApp {
  constructor() {
    this.currentTheme = 'phonics';
    this.currentViewMode = 'flashcards'; // 'flashcards' or 'quiz'
    this.quizScore = 0;
    this.quizStreak = 0;
    this.currentQuizQ = null;

    this.themesData = {
      phonics: [
        { word: 'Apple', ipa: '/ˈæp.əl/', vn: 'Quả táo', icon: '🍎', sample: 'An apple a day' },
        { word: 'Ball', ipa: '/bɔːl/', vn: 'Quả bóng', icon: '⚽', sample: 'A red ball' },
        { word: 'Cat', ipa: '/kæt/', vn: 'Con mèo', icon: '🐱', sample: 'A cute cat' },
        { word: 'Dog', ipa: '/dɒɡ/', vn: 'Con chó', icon: '🐶', sample: 'A happy dog' },
        { word: 'Elephant', ipa: '/ˈel.ɪ.fənt/', vn: 'Con voi', icon: '🐘', sample: 'A big elephant' },
        { word: 'Fish', ipa: '/fɪʃ/', vn: 'Con cá', icon: '🐟', sample: 'Fish can swim' },
        { word: 'Giraffe', ipa: '/dʒɪˈrɑːf/', vn: 'Hươu cao cổ', icon: '🦒', sample: 'A tall giraffe' },
        { word: 'Hat', ipa: '/hæt/', vn: 'Cái mũ', icon: '👒', sample: 'A pretty hat' },
        { word: 'Ice cream', ipa: '/ˈaɪs ˌkriːm/', vn: 'Cây kem', icon: '🍦', sample: 'Sweet ice cream' },
        { word: 'Juice', ipa: '/dʒuːs/', vn: 'Nước ép', icon: '🧃', sample: 'Orange juice' },
        { word: 'Kite', ipa: '/kaɪt/', vn: 'Con diều', icon: '🪁', sample: 'Flying a kite' },
        { word: 'Lion', ipa: '/ˈlaɪ.ən/', vn: 'Sư tử', icon: '🦁', sample: 'King of jungle' },
        { word: 'Monkey', ipa: '/ˈmʌŋ.ki/', vn: 'Con khỉ', icon: '🐵', sample: 'A funny monkey' },
        { word: 'Nest', ipa: '/nest/', vn: 'Tổ chim', icon: '🪺', sample: 'A bird nest' },
        { word: 'Orange', ipa: '/ˈɒr.ɪndʒ/', vn: 'Quả cam', icon: '🍊', sample: 'Fresh orange' },
        { word: 'Panda', ipa: '/ˈpæn.də/', vn: 'Gấu trúc', icon: '🐼', sample: 'A cute panda' },
        { word: 'Queen', ipa: '/kwiːn/', vn: 'Nữ hoàng', icon: '👑', sample: 'A lovely queen' },
        { word: 'Rabbit', ipa: '/ˈræb.ɪt/', vn: 'Con thỏ', icon: '🐰', sample: 'A white rabbit' },
        { word: 'Sun', ipa: '/sʌn/', vn: 'Mặt trời', icon: '☀️', sample: 'The bright sun' },
        { word: 'Tiger', ipa: '/ˈtaɪ.ɡər/', vn: 'Con hổ', icon: '🐯', sample: 'A brave tiger' },
        { word: 'Umbrella', ipa: '/ʌmˈbrel.ə/', vn: 'Cái ô che mưa', icon: '☂️', sample: 'Yellow umbrella' },
        { word: 'Van', ipa: '/væn/', vn: 'Xe tải nhỏ', icon: '🚐', sample: 'A blue van' },
        { word: 'Watermelon', ipa: '/ˈwɔː.təˌmel.ən/', vn: 'Quả dưa hấu', icon: '🍉', sample: 'Sweet watermelon' },
        { word: 'Xylophone', ipa: '/ˈzaɪ.lə.fəʊn/', vn: 'Đàn gõ mộc cầm', icon: '🎹', sample: 'Play xylophone' },
        { word: 'Yo-yo', ipa: '/ˈjəʊ.jəʊ/', vn: 'Đồ chơi Yô-yô', icon: '🪀', sample: 'Spin a yo-yo' },
        { word: 'Zebra', ipa: '/ˈzeb.rə/', vn: 'Ngựa vằn', icon: '🦓', sample: 'Black and white zebra' }
      ],
      colors: [
        { word: 'Red', ipa: '/red/', vn: 'Màu Đỏ', icon: '🔴', sample: 'Red apple' },
        { word: 'Blue', ipa: '/bluː/', vn: 'Màu Xanh Dương', icon: '🔵', sample: 'Blue sky' },
        { word: 'Green', ipa: '/ɡriːn/', vn: 'Màu Xanh Lá', icon: '🟢', sample: 'Green tree' },
        { word: 'Yellow', ipa: '/ˈjel.əʊ/', vn: 'Màu Vàng', icon: '🟡', sample: 'Yellow sun' },
        { word: 'Orange', ipa: '/ˈɒr.ɪndʒ/', vn: 'Màu Cam', icon: '🟠', sample: 'Orange juice' },
        { word: 'Purple', ipa: '/ˈpɜː.pəl/', vn: 'Màu Tím', icon: '🟣', sample: 'Purple flower' },
        { word: 'Pink', ipa: '/pɪŋk/', vn: 'Màu Hồng', icon: '🌸', sample: 'Pink ribbon' },
        { word: 'Brown', ipa: '/braʊn/', vn: 'Màu Nâu', icon: '🟤', sample: 'Brown bear' },
        { word: 'Black', ipa: '/blæk/', vn: 'Màu Đen', icon: '⚫', sample: 'Black cat' },
        { word: 'White', ipa: '/waɪt/', vn: 'Màu Trắng', icon: '⚪', sample: 'White cloud' }
      ],
      numbers: [
        { word: 'One', ipa: '/wʌn/', vn: 'Số 1', icon: '1️⃣', sample: 'One pencil' },
        { word: 'Two', ipa: '/tuː/', vn: 'Số 2', icon: '2️⃣', sample: 'Two birds' },
        { word: 'Three', ipa: '/θriː/', vn: 'Số 3', icon: '3️⃣', sample: 'Three cats' },
        { word: 'Four', ipa: '/fɔːr/', vn: 'Số 4', icon: '4️⃣', sample: 'Four stars' },
        { word: 'Five', ipa: '/faɪv/', vn: 'Số 5', icon: '5️⃣', sample: 'Five apples' },
        { word: 'Six', ipa: '/sɪks/', vn: 'Số 6', icon: '6️⃣', sample: 'Six balls' },
        { word: 'Seven', ipa: '/ˈsev.ən/', vn: 'Số 7', icon: '7️⃣', sample: 'Seven colors' },
        { word: 'Eight', ipa: '/eɪt/', vn: 'Số 8', icon: '8️⃣', sample: 'Eight flowers' },
        { word: 'Nine', ipa: '/naɪn/', vn: 'Số 9', icon: '9️⃣', sample: 'Nine balloons' },
        { word: 'Ten', ipa: '/ten/', vn: 'Số 10', icon: '🔟', sample: 'Ten fingers' }
      ],
      animals: [
        { word: 'Cat', ipa: '/kæt/', vn: 'Con mèo', icon: '🐱', sample: 'Meow meow' },
        { word: 'Dog', ipa: '/dɒɡ/', vn: 'Con chó', icon: '🐶', sample: 'Woof woof' },
        { word: 'Bird', ipa: '/bɜːd/', vn: 'Con chim', icon: '🐦', sample: 'Singing bird' },
        { word: 'Duck', ipa: '/dʌk/', vn: 'Con vịt', icon: '🦆', sample: 'Quack quack' },
        { word: 'Cow', ipa: '/kaʊ/', vn: 'Con bò', icon: '🐮', sample: 'Moo moo' },
        { word: 'Pig', ipa: '/pɪɡ/', vn: 'Con heo / lợn', icon: '🐷', sample: 'Oink oink' },
        { word: 'Lion', ipa: '/ˈlaɪ.ən/', vn: 'Sư tử', icon: '🦁', sample: 'Roar!' },
        { word: 'Monkey', ipa: '/ˈmʌŋ.ki/', vn: 'Con khỉ', icon: '🐵', sample: 'Climbing tree' },
        { word: 'Rabbit', ipa: '/ˈræb.ɪt/', vn: 'Con thỏ', icon: '🐰', sample: 'Hop hop' },
        { word: 'Bear', ipa: '/beər/', vn: 'Con gấu', icon: '🐻', sample: 'Big brown bear' }
      ],
      family: [
        { word: 'Father', ipa: '/ˈfɑː.ðər/', vn: 'Bố / Ba', icon: '👨', sample: 'My loving father' },
        { word: 'Mother', ipa: '/ˈmʌð.ər/', vn: 'Mẹ / Má', icon: '👩', sample: 'My sweet mother' },
        { word: 'Brother', ipa: '/ˈbrʌð.ər/', vn: 'Anh / Em trai', icon: '👦', sample: 'My brother plays soccer' },
        { word: 'Sister', ipa: '/ˈsɪs.tər/', vn: 'Chị / Em gái', icon: '👧', sample: 'My cute sister' },
        { word: 'Baby', ipa: '/ˈbeɪ.bi/', vn: 'Em bé', icon: '👶', sample: 'A sweet baby' },
        { word: 'Grandfather', ipa: '/ˈɡrænˌfɑː.ðər/', vn: 'Ông nội / ngoại', icon: '👴', sample: 'Grandpa tells stories' },
        { word: 'Grandmother', ipa: '/ˈɡrænˌmʌð.ər/', vn: 'Bà nội / ngoại', icon: '👵', sample: 'Grandma loves me' }
      ],
      school: [
        { word: 'Book', ipa: '/bʊk/', vn: 'Quyển sách', icon: '📖', sample: 'Read a book' },
        { word: 'Pen', ipa: '/pen/', vn: 'Cây bút mực', icon: '🖊️', sample: 'Write with a pen' },
        { word: 'Pencil', ipa: '/ˈpen.səl/', vn: 'Cây bút chì', icon: '✏️', sample: 'Draw with a pencil' },
        { word: 'Ruler', ipa: '/ˈruː.lər/', vn: 'Thước kẻ', icon: '📏', sample: 'Measure with a ruler' },
        { word: 'Eraser', ipa: '/ɪˈreɪ.zər/', vn: 'Cục tẩy', icon: '🧽', sample: 'Erase mistakes' },
        { word: 'School Bag', ipa: '/ˈskuːl bæɡ/', vn: 'Cặp sách', icon: '🎒', sample: 'My red school bag' },
        { word: 'Desk', ipa: '/desk/', vn: 'Bàn học', icon: '🪑', sample: 'Sit at my desk' },
        { word: 'Crayon', ipa: '/ˈkreɪ.ɒn/', vn: 'Bút màu sáp', icon: '🖍️', sample: 'Coloring with crayons' }
      ],
      body: [
        { word: 'Face', ipa: '/feɪs/', vn: 'Khuôn mặt', icon: '👦', sample: 'Wash your face' },
        { word: 'Hand', ipa: '/hænd/', vn: 'Bàn tay', icon: '✋', sample: 'Clap your hands' },
        { word: 'Foot', ipa: '/fʊt/', vn: 'Bàn chân', icon: '🦶', sample: 'Tap your foot' },
        { word: 'Hair', ipa: '/heər/', vn: 'Mái tóc', icon: '💇', sample: 'Touch your hair' },
        { word: 'Head', ipa: '/hed/', vn: 'Cái đầu', icon: '🗣️', sample: 'Nod your head' },
        { word: 'Eye', ipa: '/aɪ/', vn: 'Đôi mắt', icon: '👁️', sample: 'Open your eyes' },
        { word: 'Ear', ipa: '/ɪər/', vn: 'Cái tai', icon: '👂', sample: 'Listen with your ears' },
        { word: 'Nose', ipa: '/nəʊz/', vn: 'Chiếc mũi', icon: '👃', sample: 'Smell with your nose' }
      ],
      food: [
        { word: 'Cake', ipa: '/keɪk/', vn: 'Bánh ngọt', icon: '🍰', sample: 'A yummy cake' },
        { word: 'Milk', ipa: '/mɪlk/', vn: 'Sữa tươi', icon: '🥛', sample: 'I like milk' },
        { word: 'Chicken', ipa: '/ˈtʃɪk.ɪn/', vn: 'Thịt gà', icon: '🍗', sample: 'Crispy chicken' },
        { word: 'Fish', ipa: '/fɪʃ/', vn: 'Món cá', icon: '🐟', sample: 'Fresh fish' },
        { word: 'Apple', ipa: '/ˈæp.əl/', vn: 'Quả táo', icon: '🍎', sample: 'A red apple' },
        { word: 'Banana', ipa: '/bəˈnɑː.nə/', vn: 'Quả chuối', icon: '🍌', sample: 'Sweet banana' },
        { word: 'Noodles', ipa: '/ˈnuː.dəlz/', vn: 'Mì / Phở', icon: '🍜', sample: 'Having noodles' },
        { word: 'Water', ipa: '/ˈwɔː.tər/', vn: 'Nước uống', icon: '💧', sample: 'Drink water' }
      ],
      toys: [
        { word: 'Teddy bear', ipa: '/ˈted.i ˌbeər/', vn: 'Gấu bông', icon: '🧸', sample: 'A cute teddy bear' },
        { word: 'Car', ipa: '/kɑːr/', vn: 'Xe ô tô', icon: '🚗', sample: 'I have a car' },
        { word: 'Ball', ipa: '/bɔːl/', vn: 'Quả bóng', icon: '⚽', sample: 'Kick the ball' },
        { word: 'Kite', ipa: '/kaɪt/', vn: 'Con diều', icon: '🪁', sample: 'Fly a kite' },
        { word: 'Top', ipa: '/tɒp/', vn: 'Con quay', icon: '🪀', sample: 'Spin a top' },
        { word: 'Robot', ipa: '/ˈrəʊ.bɒt/', vn: 'Người máy', icon: '🤖', sample: 'A cool robot' },
        { word: 'Bike', ipa: '/baɪk/', vn: 'Xe đạp', icon: '🚲', sample: 'Ride a bike' },
        { word: 'Boat', ipa: '/bəʊt/', vn: 'Thuyền buồm', icon: '⛵', sample: 'A toy boat' }
      ]
    };

    this.initElements();
    this.attachEvents();
    this.renderThemeCards();
  }

  initElements() {
    this.cardsContainer = document.getElementById('englishCardsGrid');
    this.quizContainer = document.getElementById('englishQuizContainer');
    this.themeNav = document.getElementById('englishThemeNav');
    this.scoreEl = document.getElementById('englishQuizScore');
  }

  attachEvents() {
    // Theme buttons
    const themeBtns = document.querySelectorAll('#englishThemeNav .sub-btn');
    themeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        themeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentTheme = btn.dataset.theme;
        if (this.currentViewMode === 'flashcards') {
          this.renderThemeCards();
        } else {
          this.loadQuizQuestion();
        }
      });
    });

    // Mode Toggle: Flashcards vs Quiz
    const btnFlashcard = document.getElementById('btnEngModeCards');
    const btnQuiz = document.getElementById('btnEngModeQuiz');
    if (btnFlashcard && btnQuiz) {
      btnFlashcard.addEventListener('click', () => {
        this.currentViewMode = 'flashcards';
        btnFlashcard.classList.add('active');
        btnQuiz.classList.remove('active');
        if (this.cardsContainer) this.cardsContainer.style.display = 'grid';
        if (this.quizContainer) this.quizContainer.style.display = 'none';
        this.renderThemeCards();
      });

      btnQuiz.addEventListener('click', () => {
        this.currentViewMode = 'quiz';
        btnQuiz.classList.add('active');
        btnFlashcard.classList.remove('active');
        if (this.cardsContainer) this.cardsContainer.style.display = 'none';
        if (this.quizContainer) this.quizContainer.style.display = 'block';
        this.loadQuizQuestion();
      });
    }

    // New Quiz Button
    const btnNewQuiz = document.getElementById('btnEngQuizNew');
    if (btnNewQuiz) {
      btnNewQuiz.addEventListener('click', () => {
        window.soundSys.playPop();
        this.loadQuizQuestion();
      });
    }
  }

  renderThemeCards() {
    if (!this.cardsContainer) return;
    this.cardsContainer.innerHTML = '';

    const list = this.themesData[this.currentTheme] || this.themesData.phonics;
    list.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'english-flashcard';
      card.style.animationDelay = `${idx * 0.04}s`;
      card.innerHTML = `
        <div class="card-icon-bubble">${item.icon}</div>
        <div class="card-english-word">${item.word}</div>
        <div class="card-ipa">${item.ipa}</div>
        <div class="card-vn-meaning">${item.vn}</div>
        <button class="eng-speak-btn" title="Nghe phát âm">
          🔊 Nghe đọc
        </button>
      `;

      card.addEventListener('click', () => {
        window.soundSys.playPop();
        window.soundSys.speakEnglish(item.word);
      });

      this.cardsContainer.appendChild(card);
    });
  }

  loadQuizQuestion() {
    if (!this.quizContainer) return;

    const list = this.themesData[this.currentTheme] || this.themesData.phonics;
    const correctItem = list[Math.floor(Math.random() * list.length)];

    // Pick 3 distractors
    const choices = [correctItem];
    while (choices.length < 4) {
      const randomItem = list[Math.floor(Math.random() * list.length)];
      if (!choices.includes(randomItem)) {
        choices.push(randomItem);
      }
    }
    choices.sort(() => Math.random() - 0.5);

    this.currentQuizQ = {
      correct: correctItem,
      choices: choices
    };

    const qArea = document.getElementById('englishQuizQArea');
    const aArea = document.getElementById('englishQuizAArea');
    const fbBox = document.getElementById('englishQuizFeedback');

    if (fbBox) {
      fbBox.className = 'feedback-box';
      fbBox.textContent = '';
    }

    if (qArea) {
      qArea.innerHTML = `
        <div class="math-prompt-hint">Bé hãy chọn từ tiếng Anh tương ứng với hình ảnh dưới đây nha:</div>
        <div class="english-quiz-badge">${correctItem.icon}</div>
        <div class="math-question-text">Nghĩa tiếng Việt: <strong>${correctItem.vn}</strong></div>
        <button class="pill-btn eng-audio-prompt-btn" id="btnEngQuizAudioPrompt">
          🔊 Nghe cô đọc từ này
        </button>
      `;

      const audioBtn = document.getElementById('btnEngQuizAudioPrompt');
      if (audioBtn) {
        audioBtn.addEventListener('click', () => {
          window.soundSys.speakEnglish(correctItem.word);
        });
      }
    }

    if (aArea) {
      aArea.innerHTML = '';
      choices.forEach(c => {
        const btn = document.createElement('button');
        btn.className = 'answer-choice-btn btn-choice eng-choice-btn';
        btn.innerHTML = `<strong>${c.word}</strong> <span class="choice-sub">(${c.ipa})</span>`;
        btn.addEventListener('click', () => this.handleAnswer(c, btn));
        aArea.appendChild(btn);
      });
    }

    // Preload praise audio silently in background
    window.soundSys.preloadAudio(`Tuyệt vời! ${correctItem.word} nghĩa là ${correctItem.vn} nhé bé!`);

    // Auto speak the target word politely
    setTimeout(() => {
      window.soundSys.speakEnglish(correctItem.word);
    }, 300);
  }

  handleAnswer(selected, btnEl) {
    if (!this.currentQuizQ) return;
    const isCorrect = selected.word === this.currentQuizQ.correct.word;
    const fbBox = document.getElementById('englishQuizFeedback');
    const allBtns = document.querySelectorAll('#englishQuizAArea .btn-choice');

    allBtns.forEach(b => b.disabled = true);

    if (isCorrect) {
      btnEl.classList.add('correct');
      this.quizScore++;
      this.quizStreak++;
      if (this.scoreEl) this.scoreEl.textContent = this.quizScore;

      if (this.quizStreak >= 3) {
        window.soundSys.playCombo(this.quizStreak);
      } else {
        window.soundSys.playCorrect();
      }

      window.rewards.addStars(1, `Chính xác! "${selected.word}" nghĩa là "${selected.vn}"!`);
      window.rewards.recordActivity('englishScore', 1);

      if (fbBox) {
        fbBox.className = 'feedback-box correct';
        fbBox.innerHTML = `🎉 <strong>Tuyệt vời!</strong> "${selected.word}" nghĩa là <em>${selected.vn}</em>! Bé học Tiếng Anh siêu đỉnh!`;
      }

      const praiseMsg = `Tuyệt vời! ${selected.word} nghĩa là ${selected.vn} nhé bé!`;
      window.soundSys.speakThen(praiseMsg, () => {
        this.loadQuizQuestion();
      }, 700);
    } else {
      btnEl.classList.add('wrong');
      this.quizStreak = 0;
      window.soundSys.playWrong();

      if (fbBox) {
        fbBox.className = 'feedback-box wrong';
        fbBox.innerHTML = `💡 Chưa đúng rồi nè! Đáp án đúng là <strong>"${this.currentQuizQ.correct.word}"</strong> (${this.currentQuizQ.correct.vn}). Cùng thử lại nhé!`;
      }

      window.soundSys.speak(`Chưa đúng rồi bé ơi! Đáp án đúng là ${this.currentQuizQ.correct.word}. Bé thử lại nhé!`);

      setTimeout(() => {
        allBtns.forEach(b => b.disabled = false);
        btnEl.classList.remove('wrong');
      }, 2000);
    }
  }
}

// Global instance
window.englishApp = null;
