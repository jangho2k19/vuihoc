/* ========================================================
   MATH MODULE - BÁM SÁT CHƯƠNG TRÌNH TOÁN LỚP 1 (GDPT 2018)
   Đếm số (1-20), Dãy số, So sánh, Tách gộp, Cộng trừ (10&20),
   Hình học & Vị trí, Đồng hồ kim, Toán có lời văn
   ======================================================== */

class MathApp {
  constructor() {
    this.currentMode = 'math-counting';
    this.currentQuestion = null;
    this.score = 0;
    this.streak = 0;
    this.emojis = ['🍎', '🐰', '🌟', '🚗', '🍓', '🐥', '🐟', '🌻', '🐶', '⚽', '🍦', '🎈'];

    this.initElements();
    this.attachEvents();
    this.loadQuestion();
  }

  initElements() {
    this.qArea = document.getElementById('mathQuestionArea');
    this.aArea = document.getElementById('mathAnswersArea');
    this.feedback = document.getElementById('mathFeedbackBox');
    this.scoreEl = document.getElementById('mathCurrentScore');
    this.levelTag = document.getElementById('mathLevelTag');
    this.btnNew = document.getElementById('btnMathNewQuestion');
    this.btnSpeak = document.getElementById('btnMathSpeak');
  }

  attachEvents() {
    // Sub-mode tabs
    const subBtns = document.querySelectorAll('#tab-math .sub-btn');
    subBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        subBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentMode = btn.dataset.sub;
        this.loadQuestion();
      });
    });

    if (this.btnNew) {
      this.btnNew.addEventListener('click', () => {
        window.soundSys.playPop();
        this.loadQuestion();
      });
    }

    if (this.btnSpeak) {
      this.btnSpeak.addEventListener('click', () => {
        if (this.currentQuestion && this.currentQuestion.speechText) {
          window.soundSys.speak(this.currentQuestion.speechText);
        }
      });
    }
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomEmoji() {
    return this.emojis[Math.floor(Math.random() * this.emojis.length)];
  }

  loadQuestion() {
    this.feedback.className = 'feedback-box';
    this.feedback.textContent = '';
    this.aArea.innerHTML = '';
    this.qArea.innerHTML = '';

    switch (this.currentMode) {
      case 'math-counting':
        this.generateCountingQuestion();
        break;
      case 'math-sequence':
        this.generateSequenceQuestion();
        break;
      case 'math-compare':
        this.generateCompareQuestion();
        break;
      case 'math-split':
        this.generateSplitQuestion();
        break;
      case 'math-addition':
        this.generateAdditionQuestion();
        break;
      case 'math-subtraction':
        this.generateSubtractionQuestion();
        break;
      case 'math-shapes':
        this.generateShapesQuestion();
        break;
      case 'math-clock':
        this.generateClockQuestion();
        break;
      case 'math-wordproblems':
        this.generateWordProblemQuestion();
        break;
      default:
        this.generateCountingQuestion();
    }

    this.renderQuestion();
  }

  // 1. Bé Tập Đếm (Phạm vi 1 - 20)
  generateCountingQuestion() {
    this.levelTag.textContent = "Chủ đề: Đếm số đồ vật (1 - 20)";
    // 60% range 1-10, 40% range 11-20
    const count = Math.random() < 0.6 ? this.randomInt(1, 10) : this.randomInt(11, 18);
    const emoji = this.getRandomEmoji();

    let itemsHtml = '';
    for (let i = 0; i < count; i++) {
      itemsHtml += `<span class="item-symbol" style="animation-delay: ${i * 0.03}s">${emoji}</span>`;
    }

    const choices = [count];
    while (choices.length < 4) {
      const wrong = Math.max(1, count + this.randomInt(-3, 3));
      if (!choices.includes(wrong) && wrong >= 1 && wrong <= 20) choices.push(wrong);
      else {
        const alt = this.randomInt(1, 20);
        if (!choices.includes(alt)) choices.push(alt);
      }
    }
    choices.sort(() => Math.random() - 0.5);

    this.currentQuestion = {
      html: `
        <div class="math-prompt-hint">Bé hãy đếm xem có bao nhiêu hình ở dưới đây nghen:</div>
        <div class="math-visual-items">
          <div class="item-group" style="max-width: 480px;">${itemsHtml}</div>
        </div>
        <div class="math-question-text">Có tất cả mấy hình vậy bé?</div>
      `,
      speechText: `Bé hãy đếm xem có bao nhiêu hình ở đây nghen!`,
      choices: choices,
      correctAnswer: count,
      praise: `Chính xác rồi nè! Có tất cả ${count} hình nè bé ơi!`
    };
  }

  // 2. Dãy Số & Số Liền Trước / Liền Sau (Trọng tâm Lớp 1)
  generateSequenceQuestion() {
    this.levelTag.textContent = "Chủ đề: Dãy số & Số liền trước / sau";
    const subType = this.randomInt(1, 3);

    if (subType === 1) {
      // Điền số vào dãy tiến: ví dụ 5, 6, [?], 8, 9
      const start = this.randomInt(1, 15);
      const missingIndex = this.randomInt(1, 3);
      const seq = [start, start + 1, start + 2, start + 3, start + 4];
      const answer = seq[missingIndex];

      const seqBoxes = seq.map((num, idx) => {
        if (idx === missingIndex) {
          return `<div class="seq-box missing">?</div>`;
        }
        return `<div class="seq-box">${num}</div>`;
      }).join('<span class="seq-arrow">➔</span>');

      const choices = [answer];
      while (choices.length < 4) {
        const wrong = Math.max(1, answer + this.randomInt(-2, 3));
        if (!choices.includes(wrong)) choices.push(wrong);
      }
      choices.sort(() => Math.random() - 0.5);

      this.currentQuestion = {
        html: `
          <div class="math-prompt-hint">Bé hãy tìm số còn thiếu để điền vào dấu chấm hỏi [?] nghen:</div>
          <div class="sequence-display">${seqBoxes}</div>
          <div class="math-question-text">Số còn thiếu là số mấy?</div>
        `,
        speechText: `Bé hãy tìm số còn thiếu trong dãy số này nghen!`,
        choices: choices,
        correctAnswer: answer,
        praise: `Đúng rồi nè! Số còn thiếu là số ${answer} nghen!`
      };
    } else if (subType === 2) {
      // Số liền trước của N là N - 1
      const n = this.randomInt(2, 20);
      const answer = n - 1;

      const choices = [answer];
      while (choices.length < 4) {
        const wrong = Math.max(1, n + this.randomInt(-2, 2));
        if (!choices.includes(wrong)) choices.push(wrong);
      }
      choices.sort(() => Math.random() - 0.5);

      this.currentQuestion = {
        html: `
          <div class="math-prompt-hint">Khái niệm Số liền trước (đứng ngay trước):</div>
          <div class="single-number-badge">${n}</div>
          <div class="math-question-text">Số liền trước của số <strong>${n}</strong> là số mấy vậy bé?</div>
        `,
        speechText: `Số liền trước của số ${n} là số mấy vậy bé cưng?`,
        choices: choices,
        correctAnswer: answer,
        praise: `Giỏi quá! Số liền trước của số ${n} là số ${answer} nè!`
      };
    } else {
      // Số liền sau của N là N + 1
      const n = this.randomInt(1, 19);
      const answer = n + 1;

      const choices = [answer];
      while (choices.length < 4) {
        const wrong = Math.max(1, n + this.randomInt(-2, 2));
        if (!choices.includes(wrong)) choices.push(wrong);
      }
      choices.sort(() => Math.random() - 0.5);

      this.currentQuestion = {
        html: `
          <div class="math-prompt-hint">Khái niệm Số liền sau (đứng ngay sau):</div>
          <div class="single-number-badge">${n}</div>
          <div class="math-question-text">Số liền sau của số <strong>${n}</strong> là số mấy vậy bé?</div>
        `,
        speechText: `Số liền sau của số ${n} là số mấy vậy bé cưng?`,
        choices: choices,
        correctAnswer: answer,
        praise: `Chính xác rồi nè! Số liền sau của số ${n} là số ${answer} nghen!`
      };
    }
  }

  // 3. So Sánh Lớn Bé (>, <, =) trong phạm vi 20 & số tròn chục
  generateCompareQuestion() {
    this.levelTag.textContent = "Chủ đề: So sánh lớn hơn, bé hơn, bằng nhau";
    const mode = Math.random();
    let num1, num2;

    if (mode < 0.3) {
      // Số tròn chục (10, 20, 30, 40...)
      const rounds = [10, 20, 30, 40, 50, 60, 70, 80, 90];
      num1 = rounds[Math.floor(Math.random() * rounds.length)];
      num2 = rounds[Math.floor(Math.random() * rounds.length)];
    } else {
      num1 = this.randomInt(1, 20);
      num2 = this.randomInt(1, 20);
    }

    let symbol = '=';
    let speechComp = 'bằng nhau';
    if (num1 > num2) {
      symbol = '>';
      speechComp = 'lớn hơn';
    } else if (num1 < num2) {
      symbol = '<';
      speechComp = 'nhỏ hơn';
    }

    const emoji = this.getRandomEmoji();
    let visualGroup = '';
    if (num1 <= 10 && num2 <= 10) {
      let items1 = Array(num1).fill(`<span class="item-symbol" style="font-size:2rem;">${emoji}</span>`).join('');
      let items2 = Array(num2).fill(`<span class="item-symbol" style="font-size:2rem;">${emoji}</span>`).join('');
      visualGroup = `
        <div class="math-visual-items">
          <div class="item-group">${items1} <br><strong>(${num1})</strong></div>
          <div class="math-operator-symbol" style="background:#fff3b0; padding:4px 20px; border-radius:12px; border:2px dashed #f59e0b;">?</div>
          <div class="item-group">${items2} <br><strong>(${num2})</strong></div>
        </div>
      `;
    }

    this.currentQuestion = {
      html: `
        <div class="math-prompt-hint">Bé hãy chọn dấu thích hợp ( > , < , = ) để điền vô giữa nghen:</div>
        ${visualGroup}
        <div class="math-question-text">${num1} [ ? ] ${num2}</div>
      `,
      speechText: `Số ${num1} với số ${num2}, số nào lớn hơn ta? Bé chọn dấu lớn hơn, nhỏ hơn hay bằng nhau nè?`,
      choices: ['>', '<', '='],
      correctAnswer: symbol,
      praise: `Giỏi quá chừng nè! Số ${num1} ${speechComp} số ${num2} nghen!`
    };
  }

  // 4. Sơ Đồ Tách - Gộp Số (Cốt lõi Toán 1 GDPT 2018)
  generateSplitQuestion() {
    this.levelTag.textContent = "Chủ đề: Sơ đồ Tách - Gộp số (Tư duy SGK mới)";
    const total = this.randomInt(3, 10);
    const partA = this.randomInt(1, total - 1);
    const partB = total - partA;

    // 2 dạng: Hỏi phần gộp hoặc hỏi phần tách
    const isAskTotal = Math.random() < 0.5;

    if (isAskTotal) {
      // Gộp partA và partB được ?
      const choices = [total];
      while (choices.length < 4) {
        const wrong = this.randomInt(2, 10);
        if (!choices.includes(wrong)) choices.push(wrong);
      }
      choices.sort(() => Math.random() - 0.5);

      this.currentQuestion = {
        html: `
          <div class="math-prompt-hint">Sơ đồ Gộp số: Gộp <strong>${partA}</strong> và <strong>${partB}</strong> được mấy?</div>
          <div class="split-tree">
            <div class="tree-node tree-top missing">?</div>
            <div class="tree-branches">/ &nbsp; &nbsp; \\</div>
            <div class="tree-leaves">
              <div class="tree-node">${partA}</div>
              <div class="tree-node">${partB}</div>
            </div>
          </div>
          <div class="math-question-text">Gộp ${partA} và ${partB} được mấy?</div>
        `,
        speechText: `Gộp ${partA} và ${partB} được mấy hả bé cưng?`,
        choices: choices,
        correctAnswer: total,
        praise: `Rất chính xác! Gộp ${partA} và ${partB} được ${total} nè!`
      };
    } else {
      // Tách total gồm partA và ?
      const choices = [partB];
      while (choices.length < 4) {
        const wrong = this.randomInt(1, total);
        if (!choices.includes(wrong)) choices.push(wrong);
      }
      choices.sort(() => Math.random() - 0.5);

      this.currentQuestion = {
        html: `
          <div class="math-prompt-hint">Sơ đồ Tách số: <strong>${total}</strong> gồm <strong>${partA}</strong> và mấy?</div>
          <div class="split-tree">
            <div class="tree-node tree-top">${total}</div>
            <div class="tree-branches">/ &nbsp; &nbsp; \\</div>
            <div class="tree-leaves">
              <div class="tree-node">${partA}</div>
              <div class="tree-node missing">?</div>
            </div>
          </div>
          <div class="math-question-text">${total} gồm ${partA} và mấy?</div>
        `,
        speechText: `Số ${total} gồm ${partA} và mấy vậy bé?`,
        choices: choices,
        correctAnswer: partB,
        praise: `Chuẩn luôn nè bé! ${total} gồm ${partA} và ${partB} nghen!`
      };
    }
  }

  // 5. Phép Cộng (Phạm vi 10 & 20 không nhớ)
  generateAdditionQuestion() {
    this.levelTag.textContent = "Chủ đề: Phép cộng trong phạm vi 10 và 20";
    const mode = Math.random();
    let a, b, sum;

    if (mode < 0.45) {
      // Trong phạm vi 10
      a = this.randomInt(1, 7);
      b = this.randomInt(1, 10 - a);
      sum = a + b;
    } else if (mode < 0.75) {
      // 10 + n hoặc n + 10
      const n = this.randomInt(1, 9);
      a = 10;
      b = n;
      sum = 10 + n;
    } else {
      // Phép cộng không nhớ phạm vi 20 (ví dụ 12 + 4, 15 + 3)
      a = this.randomInt(11, 16);
      b = this.randomInt(1, 19 - a);
      sum = a + b;
    }

    const choices = [sum];
    while (choices.length < 4) {
      const wrong = Math.max(1, sum + this.randomInt(-3, 3));
      if (!choices.includes(wrong)) choices.push(wrong);
    }
    choices.sort(() => Math.random() - 0.5);

    this.currentQuestion = {
      html: `
        <div class="math-prompt-hint">Bé tính kết quả của phép cộng này giùm cô nghen:</div>
        <div class="math-question-text" style="font-size: 3.5rem; color:#4361ee; margin: 20px 0;">
          ${a} + ${b} = ?
        </div>
      `,
      speechText: `${a} cộng ${b} bằng mấy vậy bé ơi?`,
      choices: choices,
      correctAnswer: sum,
      praise: `Giỏi quá bé ơi! ${a} cộng ${b} bằng ${sum} nè!`
    };
  }

  // 6. Phép Trừ (Phạm vi 10 & 20 không nhớ)
  generateSubtractionQuestion() {
    this.levelTag.textContent = "Chủ đề: Phép trừ trong phạm vi 10 và 20";
    const mode = Math.random();
    let total, sub, diff;

    if (mode < 0.45) {
      // Trong phạm vi 10
      total = this.randomInt(3, 10);
      sub = this.randomInt(1, total - 1);
      diff = total - sub;
    } else {
      // Trong phạm vi 20 (ví dụ: 15 - 3 = 12, 18 - 5 = 13)
      total = this.randomInt(12, 19);
      const units = total % 10;
      sub = this.randomInt(1, Math.max(1, units));
      diff = total - sub;
    }

    const choices = [diff];
    while (choices.length < 4) {
      const wrong = Math.max(0, diff + this.randomInt(-3, 3));
      if (!choices.includes(wrong)) choices.push(wrong);
    }
    choices.sort(() => Math.random() - 0.5);

    this.currentQuestion = {
      html: `
        <div class="math-prompt-hint">Bé hãy tính kết quả của phép trừ này nghen:</div>
        <div class="math-question-text" style="font-size: 3.5rem; color:#d90429; margin: 20px 0;">
          ${total} - ${sub} = ?
        </div>
      `,
      speechText: `${total} trừ ${sub} bằng mấy vậy bé cưng?`,
      choices: choices,
      correctAnswer: diff,
      praise: `Đúng rồi nè! ${total} trừ ${sub} còn lại ${diff} nghen!`
    };
  }

  // 7. Nhận Biết Hình Học & Định Hướng Không Gian
  generateShapesQuestion() {
    this.levelTag.textContent = "Chủ đề: Hình học & Định hướng không gian";
    const shapes = [
      { name: 'Hình tròn', icon: '🟡', desc: 'Có đường cong khép kín tròn xoe' },
      { name: 'Hình vuông', icon: '🟦', desc: 'Có 4 cạnh bằng nhau' },
      { name: 'Hình tam giác', icon: '🔺', desc: 'Có 3 cạnh và 3 góc nhọn' },
      { name: 'Hình chữ nhật', icon: '🟧', desc: 'Có 2 cạnh dài và 2 cạnh ngắn' }
    ];

    const isPosition = Math.random() < 0.4;

    if (isPosition) {
      // Câu hỏi vị trí trái / phải / trên / dưới
      const positions = [
        { q: 'Chú gấu 🐻 ở bên TRÁI hay bên PHẢI quả táo 🍎?', visual: '🐻 &nbsp; &nbsp; 🍎', ans: 'Bên trái', say: 'Chú gấu ở bên trái hay bên phải quả táo nè bé?' },
        { q: 'Ngôi sao ⭐ ở bên TRÊN hay bên DƯỚI đám mây ☁️?', visual: '<div style="font-size:3rem;">⭐<br>☁️</div>', ans: 'Bên trên', say: 'Ngôi sao ở bên trên hay bên dưới đám mây vậy bé?' },
        { q: 'Chú cá 🐟 đang bơi ở BÊN PHẢI hay BÊN TRÁI?', visual: '🌻 &nbsp; &nbsp; 🐟', ans: 'Bên phải', say: 'Chú cá ở bên phải hay bên trái bông hoa nè bé?' }
      ];
      const p = positions[Math.floor(Math.random() * positions.length)];
      const choices = (p.ans === 'Bên trái' || p.ans === 'Bên phải') ? ['Bên trái', 'Bên phải'] : ['Bên trên', 'Bên dưới'];

      this.currentQuestion = {
        html: `
          <div class="math-prompt-hint">Định hướng không gian:</div>
          <div style="font-size: 3.8rem; margin: 15px 0;">${p.visual}</div>
          <div class="math-question-text">${p.q}</div>
        `,
        speechText: p.say,
        choices: choices,
        correctAnswer: p.ans,
        praise: `Chính xác rồi nè! Đáp án đúng là ${p.ans} nghen!`
      };
    } else {
      // Nhận diện hình
      const target = shapes[Math.floor(Math.random() * shapes.length)];
      const choices = shapes.map(s => s.name).sort(() => Math.random() - 0.5);

      this.currentQuestion = {
        html: `
          <div class="math-prompt-hint">Bé hãy quan sát hình dưới đây và cho cô biết tên hình nghen:</div>
          <div style="font-size: 5rem; margin: 16px 0; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.15));">${target.icon}</div>
          <div class="math-question-text">Đây là hình gì vậy bé?</div>
        `,
        speechText: `Hình này là hình gì vậy bé cưng? Bé chọn hình tròn, hình vuông, hình tam giác hay hình chữ nhật nè?`,
        choices: choices,
        correctAnswer: target.name,
        praise: `Giỏi quá! Đây đúng là ${target.name} rồi nè!`
      };
    }
  }

  // 8. Bé Xem Giờ Đúng Trên Đồng Hồ Kim (SGK Lớp 1)
  generateClockQuestion() {
    this.levelTag.textContent = "Chủ đề: Bé tập xem đồng hồ kim (Giờ đúng)";
    const hour = this.randomInt(1, 12);
    // Angle of hour hand: (hour % 12) * 30 degrees
    const hourAngle = (hour % 12) * 30;

    // SVG clock face
    const clockSvg = `
      <svg width="220" height="220" viewBox="0 0 200 200" style="margin: 10px auto;">
        <circle cx="100" cy="100" r="92" fill="#ffffff" stroke="#4361ee" stroke-width="8" />
        <circle cx="100" cy="100" r="82" fill="#f8fafc" />
        
        <!-- Number indicators -->
        <text x="100" y="32" font-size="18" font-weight="bold" text-anchor="middle" fill="#1e293b">12</text>
        <text x="170" y="106" font-size="18" font-weight="bold" text-anchor="middle" fill="#1e293b">3</text>
        <text x="100" y="178" font-size="18" font-weight="bold" text-anchor="middle" fill="#1e293b">6</text>
        <text x="30" y="106" font-size="18" font-weight="bold" text-anchor="middle" fill="#1e293b">9</text>

        <!-- Center pin -->
        <circle cx="100" cy="100" r="6" fill="#d90429" />

        <!-- Minute hand (always points to 12 for exact hour in Grade 1) -->
        <line x1="100" y1="100" x2="100" y2="38" stroke="#4361ee" stroke-width="5" stroke-linecap="round" />

        <!-- Hour hand rotated according to hour -->
        <line x1="100" y1="100" x2="100" y2="58" stroke="#d90429" stroke-width="7" stroke-linecap="round" transform="rotate(${hourAngle} 100 100)" />
      </svg>
    `;

    const choices = [`${hour} giờ`];
    while (choices.length < 4) {
      const wrongH = this.randomInt(1, 12);
      const str = `${wrongH} giờ`;
      if (!choices.includes(str)) choices.push(str);
    }
    choices.sort(() => Math.random() - 0.5);

    this.currentQuestion = {
      html: `
        <div class="math-prompt-hint">Kim dài chỉ số 12, kim ngắn màu đỏ chỉ vào giờ nè:</div>
        ${clockSvg}
        <div class="math-question-text">Đồng hồ đang chỉ mấy giờ vậy bé?</div>
      `,
      speechText: `Đồng hồ đang chỉ mấy giờ vậy bé ơi? Kim ngắn màu đỏ chỉ số mấy nè?`,
      choices: choices,
      correctAnswer: `${hour} giờ`,
      praise: `Chính xác rồi nè! Đồng hồ chỉ đúng ${hour} giờ nghen!`
    };
  }

  // 9. Bài Toán Có Lời Văn (Tình huống thực tế SGK Lớp 1)
  generateWordProblemQuestion() {
    this.levelTag.textContent = "Chủ đề: Bài toán có lời văn thực tế";
    const problems = [
      {
        text: "Trên cành cây có 4 chú chim 🐦, sau đó có thêm 3 chú chim bay tới đậu cùng. Hỏi trên cành cây có tất cả bao nhiêu chú chim?",
        say: "Trên cành cây có 4 chú chim, sau đó có thêm 3 chú chim bay tới. Hỏi có tất cả mấy chú chim vậy bé?",
        ans: 7,
        formula: "4 + 3 = 7"
      },
      {
        text: "Mẹ mua cho bé 5 quả cam 🍊, bé được bà cho thêm 2 quả cam nữa. Hỏi bé có tất cả mấy quả cam?",
        say: "Mẹ mua cho bé 5 quả cam, bà cho thêm 2 quả cam nữa. Hỏi bé có tất cả mấy quả cam nè?",
        ans: 7,
        formula: "5 + 2 = 7"
      },
      {
        text: "Trong đĩa có 8 cái bánh quy 🍪, bé ăn bớt đi 3 cái bánh. Hỏi trong đĩa còn lại mấy cái bánh quy?",
        say: "Trong đĩa có 8 cái bánh quy, bé ăn bớt đi 3 cái. Hỏi còn lại mấy cái bánh quy vậy bé?",
        ans: 5,
        formula: "8 - 3 = 5"
      },
      {
        text: "Nhà bạn Lan nuôi 6 con vịt 🦆, hôm nay mẹ mua thêm 4 con vịt nữa. Hỏi nhà bạn Lan có tất cả bao nhiêu con vịt?",
        say: "Nhà bạn Lan nuôi 6 con vịt, mẹ mua thêm 4 con nữa. Hỏi có tất cả bao nhiêu con vịt nè?",
        ans: 10,
        formula: "6 + 4 = 10"
      },
      {
        text: "Bé có chùm bóng bay gồm 9 quả bóng 🎈, chẳng may bị bay mất 4 quả bóng. Hỏi bé còn lại bao nhiêu quả bóng bay?",
        say: "Bé có 9 quả bóng bay, bị bay mất 4 quả rồi. Hỏi bé còn lại bao nhiêu quả bóng nè?",
        ans: 5,
        formula: "9 - 4 = 5"
      },
      {
        text: "Tổ Một có 10 bạn học sinh, tổ Hai có 5 bạn học sinh. Hỏi cả hai tổ có tất cả bao nhiêu bạn học sinh?",
        say: "Tổ Một có 10 bạn, tổ Hai có 5 bạn. Hỏi cả hai tổ có tất cả mấy bạn vậy bé?",
        ans: 15,
        formula: "10 + 5 = 15"
      }
    ];

    const p = problems[Math.floor(Math.random() * problems.length)];
    const choices = [p.ans];
    while (choices.length < 4) {
      const wrong = Math.max(1, p.ans + this.randomInt(-3, 3));
      if (!choices.includes(wrong)) choices.push(wrong);
    }
    choices.sort(() => Math.random() - 0.5);

    this.currentQuestion = {
      html: `
        <div class="math-prompt-hint">Bé hãy lắng nghe cô đọc đề bài và suy nghĩ tính toán nghen:</div>
        <div class="word-problem-card">
          <p class="word-problem-text">📝 "${p.text}"</p>
        </div>
        <div class="math-question-text">Đáp số đúng là bao nhiêu?</div>
      `,
      speechText: p.say,
      choices: choices,
      correctAnswer: p.ans,
      praise: `Tuyệt vời quá chừng! Phép tính là ${p.formula}, đáp số là ${p.ans} nè!`
    };
  }

  renderQuestion() {
    this.qArea.innerHTML = this.currentQuestion.html;

    this.currentQuestion.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'answer-choice-btn';
      btn.textContent = choice;
      btn.addEventListener('click', () => this.handleAnswer(choice, btn));
      this.aArea.appendChild(btn);
    });

    // Automatically speak question prompt when question loads
    setTimeout(() => {
      if (this.currentQuestion && this.currentQuestion.speechText) {
        window.soundSys.speak(this.currentQuestion.speechText);
      }
    }, 250);
  }

  handleAnswer(selected, buttonEl) {
    const isCorrect = (selected === this.currentQuestion.correctAnswer);

    // Disable all choice buttons momentarily
    const allBtns = this.aArea.querySelectorAll('.answer-choice-btn');
    allBtns.forEach(b => b.disabled = true);

    if (isCorrect) {
      this.streak += 1;
      buttonEl.classList.add('correct');
      this.feedback.className = 'feedback-box correct';

      const comboText = this.streak >= 3 ? ` 🔥 Combo x${this.streak} liên tiếp!` : '';
      this.feedback.textContent = `🎉 ${this.currentQuestion.praise}${comboText}`;

      this.score += 1;
      this.scoreEl.textContent = this.score;

      if (this.streak >= 3) {
        window.soundSys.playCombo(this.streak);
      } else {
        window.soundSys.playCorrect();
      }

      window.rewards.addStars(1, `Bé giải toán xuất sắc quá chừng!${comboText}`);
      window.rewards.recordActivity('mathScore', 1);
      window.soundSys.speak(this.currentQuestion.praise);

      // Auto advance to next question after 2.4s
      setTimeout(() => {
        this.loadQuestion();
      }, 2400);
    } else {
      this.streak = 0;
      buttonEl.classList.add('wrong');
      window.soundSys.playWrong();
      this.feedback.className = 'feedback-box wrong';
      this.feedback.textContent = `Chưa đúng rồi! Bé thử đếm và tính lại với cô nghen! 💡`;
      window.soundSys.speak("Chưa đúng rồi bé ơi, bé thử tính lại với cô nghen!");

      setTimeout(() => {
        allBtns.forEach(b => {
          b.disabled = false;
          b.classList.remove('wrong');
        });
      }, 1400);
    }
  }
}

// Global instance loaded on ready
window.mathApp = null;
