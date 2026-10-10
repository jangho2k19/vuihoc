/* ========================================================
   SCIENCE & NATURE MODULE - TỰ NHIÊN VÀ XÃ HỘI LỚP 1
   Bám sát SGK Tự Nhiên & Xã Hội Lớp 1 (GDPT 2018):
   1. Cơ thể & Giác quan của bé
   2. Vệ sinh & Sức khỏe dinh dưỡng
   3. Cây cối & Động vật quanh ta
   4. Thời tiết & Bốn mùa
   5. Kỹ năng An toàn quanh bé
   ======================================================== */

class ScienceApp {
  constructor() {
    this.currentTopic = 'body';
    this.currentMode = 'explore'; // 'explore' or 'quiz'
    this.score = 0;
    this.streak = 0;
    this.currentQuestion = null;

    this.topicsData = {
      body: {
        title: 'Cơ Thể & 5 Giác Quan',
        lessons: [
          { name: 'Đôi Mắt Sáng', icon: '👀', desc: 'Thị giác giúp bé nhìn thấy màu sắc, cảnh vật tươi đẹp xung quanh!', tip: 'Bé nhớ giữ khoảng cách khi xem sách và màn hình để mắt luôn sáng ngời nha!' },
          { name: 'Đôi Tai Thính', icon: '👂', desc: 'Thính giác giúp bé lắng nghe tiếng chim hót, lời giảng của cô và tiếng cười vui!', tip: 'Không nghe âm thanh quá to và không nhét vật lạ vào tai nha bé!' },
          { name: 'Chiếc Mũi Xinh', icon: '👃', desc: 'Khứu giác giúp bé ngửi thấy hương thơm ngọt ngào của hoa và món ăn ngon!', tip: 'Nhớ giữ ấm mũi khi trời lạnh và rửa sạch mũi mỗi ngày!' },
          { name: 'Chiếc Miệng Cười', icon: '👄', desc: 'Vị giác giúp bé nếm vị ngọt, chua, mặn; miệng giúp bé nói cười rộn rã!', tip: 'Đánh răng sạch sẽ mỗi sáng và tối trước khi đi ngủ nha!' },
          { name: 'Bàn Tay Khéo Léo', icon: '🖐️', desc: 'Xúc giác giúp bé cảm nhận sự ấm áp, mềm mại khi chạm vào đồ vật!', tip: 'Rửa tay thường xuyên bằng xà phòng để bảo vệ sức khỏe!' }
        ],
        quizQuestions: [
          { q: 'Bộ phận nào giúp bé nhìn thấy cảnh vật và màu sắc xung quanh?', icon: '👀', choices: ['Đôi Mắt', 'Chiếc Mũi', 'Đôi Tai', 'Bàn Tay'], ans: 'Đôi Mắt', exp: 'Đôi mắt (thị giác) giúp bé nhìn thấy mọi vật tươi đẹp!' },
          { q: 'Để lắng nghe tiếng cô giáo giảng bài, bé dùng giác quan nào?', icon: '👂', choices: ['Đôi Tai', 'Chiếc Mũi', 'Cái Miệng', 'Bàn Chân'], ans: 'Đôi Tai', exp: 'Đôi tai (thính giác) giúp bé nghe rõ mọi âm thanh!' },
          { q: 'Bé ngửi thấy mùi thơm của hoa quả bằng bộ phận nào?', icon: '👃', choices: ['Chiếc Mũi', 'Đôi Mắt', 'Đôi Tai', 'Khuỷu Tay'], ans: 'Chiếc Mũi', exp: 'Chiếc mũi (khứu giác) giúp bé ngửi được các mùi hương!' },
          { q: 'Để bảo vệ đôi mắt luôn sáng khỏe, bé nên làm gì?', icon: '👓', choices: ['Ngồi học ngay ngắn, đủ ánh sáng', 'Xem điện thoại thật gần', 'Dụi tay bẩn vào mắt', 'Đọc sách trong bóng tối'], ans: 'Ngồi học ngay ngắn, đủ ánh sáng', exp: 'Ngồi học đúng tư thế và đủ ánh sáng giúp bảo vệ mắt sáng ngời!' }
        ]
      },
      health: {
        title: 'Vệ Sinh & Dinh Dưỡng',
        lessons: [
          { name: 'Rửa Tay Sạch Sẽ', icon: '🧼', desc: 'Rửa tay bằng xà phòng trước khi ăn và sau khi đi vệ sinh để đánh bay vi khuẩn!', tip: 'Xoa đều xà phòng trong 30 giây để sạch bong vi khuẩn!' },
          { name: 'Đánh Răng Sáng Tối', icon: '🪥', desc: 'Đánh răng 2 lần mỗi ngày giúp hàm răng trắng sáng và hơi thở thơm tho!', tip: 'Chải nhẹ nhàng mặt trước, mặt sau và mặt nhai của răng!' },
          { name: 'Ăn Uống Đủ Chất', icon: '🥗', desc: 'Ăn nhiều rau xanh, trái cây chín, uống sữa và nước lọc mỗi ngày để cao lớn!', tip: 'Hạn chế ăn bánh kẹo ngọt và đồ uống có ga nha bé!' },
          { name: 'Tập Thể Dục Buổi Sáng', icon: '🏃', desc: 'Vận động thể thao giúp cơ thể dẻo dai, khỏe khoắn và tràn đầy năng lượng!', tip: 'Dậy sớm hít thở không khí trong lành cùng cả nhà!' }
        ],
        quizQuestions: [
          { q: 'Bé nên rửa tay bằng xà phòng vào lúc nào?', icon: '🧼', choices: ['Trước khi ăn và sau khi đi vệ sinh', 'Chỉ khi nào tay dính mực', 'Không cần rửa tay', 'Sau khi ngủ dậy xong'], ans: 'Trước khi ăn và sau khi đi vệ sinh', exp: 'Rửa tay sạch trước khi ăn giúp bụng dạ luôn khỏe mạnh!' },
          { q: 'Mỗi ngày bé nên đánh răng ít nhất mấy lần?', icon: '🪥', choices: ['2 lần (sáng và tối)', '1 tuần 1 lần', 'Không cần đánh răng', 'Chỉ khi ăn kẹo'], ans: '2 lần (sáng và tối)', exp: 'Đánh răng sáng và tối giúp bé có hàm răng chắc khỏe, ngừa sâu răng!' },
          { q: 'Món ăn nào sau đây rất tốt cho sức khỏe của bé?', icon: '🍎', choices: ['Rau củ quả tươi và sữa tươi', 'Nhiều kẹo ngọt phẩm màu', 'Bim bim cay nóng', 'Nước ngọt có ga'], ans: 'Rau củ quả tươi và sữa tươi', exp: 'Rau xanh và hoa quả chứa nhiều vitamin giúp bé thông minh và cao lớn!' }
        ]
      },
      nature: {
        title: 'Cây Cối & Động Vật',
        lessons: [
          { name: 'Các Bộ Phận Của Cây', icon: '🌳', desc: 'Một cái cây gồm có: Rễ (hút nước), Thân (nâng đỡ), Cành, Lá (quang hợp), Hoa và Quả!', tip: 'Bé nhớ tưới nước và chăm sóc cây xanh nhé!' },
          { name: 'Động Vật Nuôi Trong Nhà', icon: '🐕', desc: 'Chó giữ nhà, mèo bắt chuột, gà gáy sáng, vịt bơi dưới ao...', tip: 'Yêu thương và cho các con vật cưng ăn uống đầy đủ!' },
          { name: 'Động Vật Sống Dưới Nước', icon: '🐬', desc: 'Cá, tôm, cua, rùa biển... thở bằng mang và bơi lội tung tăng trong làn nước mát!', tip: 'Cùng chung tay giữ sạch nguồn nước không vứt rác nha!' }
        ],
        quizQuestions: [
          { q: 'Bộ phận nào của cây cắm sâu vào lòng đất để hút nước và chất dinh dưỡng?', icon: '🌱', choices: ['Rễ cây', 'Lá cây', 'Bông hoa', 'Quả chín'], ans: 'Rễ cây', exp: 'Rễ cây đâm sâu vào đất để hút nước nuôi cây lớn khôn!' },
          { q: 'Con vật nào sau đây biết bơi lội dưới nước?', icon: '🐟', choices: ['Con cá vàng', 'Con mèo mướp', 'Con chim bồ câu', 'Con gà trống'], ans: 'Con cá vàng', exp: 'Cá vàng có vây và đuôi bơi lội thoăn thoắt dưới nước!' },
          { q: 'Con vật nuôi nào giúp cả nhà trông nhà và rất trung thành?', icon: '🐶', choices: ['Chú chó', 'Con chuột', 'Con ong', 'Con ếch'], ans: 'Chú chó', exp: 'Chú chó là người bạn trung thành giữ nhà cho gia đình!' }
        ]
      },
      weather: {
        title: 'Thời Tiết & Bốn Mùa',
        lessons: [
          { name: 'Trời Nắng Rực Rỡ', icon: '☀️', desc: 'Mặt trời chiếu sáng, bầu trời trong xanh. Khi ra ngoài bé nhớ đội mũ nón nhé!', tip: 'Uống đủ nước và tránh chơi ngoài nắng gắt giữa trưa!' },
          { name: 'Trời Mưa Mát Mẻ', icon: '🌧️', desc: 'Mưa tưới mát cây cối, mang nước cho đồng ruộng. Đi mưa nhớ che ô và mặc áo mưa!', tip: 'Không tắm mưa lạnh để tránh bị cảm sốt nha bé!' },
          { name: 'Bốn Mùa Trong Năm', icon: '🌸', desc: 'Mùa Xuân (hoa nở), Mùa Hạ (nắng ấm), Mùa Thu (trăng rằm), Mùa Đông (se lạnh)!', tip: 'Mùa đông lạnh bé nhớ mặc áo ấm và quàng khăn len!' }
        ],
        quizQuestions: [
          { q: 'Khi đi ra ngoài đường vào ngày trời nắng to, bé cần mang theo gì?', icon: '🧢', choices: ['Đội mũ nón che nắng', 'Áo mưa dầy cộm', 'Đi chân đất', 'Chăn bông'], ans: 'Đội mũ nón che nắng', exp: 'Đội mũ nón giúp bé không bị say nắng khi đi ngoài trời!' },
          { q: 'Vào mùa đông trời trở lạnh, bé cần mặc trang phục như thế nào?', icon: '🧣', choices: ['Mặc áo ấm, quàng khăn len', 'Mặc áo cộc tay mỏng', 'Đi bơi dưới sông', 'Bật quạt gió to'], ans: 'Mặc áo ấm, quàng khăn len', exp: 'Mặc áo ấm và đi tất giúp giữ ấm cơ thể, phòng tránh ho cảm!' },
          { q: 'Sau cơn mưa rào mùa hạ, hiện tượng lung linh 7 màu nào thường xuất hiện?', icon: '🌈', choices: ['Cầu vồng rực rỡ', 'Tuyết rơi trắng xóa', 'Mặt trăng tròn', 'Sấm chớp giật'], ans: 'Cầu vồng rực rỡ', exp: 'Cầu vồng 7 sắc lung linh thường xuất hiện sau cơn mưa rào!' }
        ]
      },
      safety: {
        title: 'An Toàn Quanh Bé',
        lessons: [
          { name: 'Đèn Tín Hiệu Giao Thông', icon: '🚦', desc: 'Đèn Đỏ: Dừng lại! Đèn Vàng: Đi chậm chuẩn bị dừng! Đèn Xanh: Được đi!', tip: 'Qua đường phải đi trên vạch kẻ trắng và nắm tay người lớn!' },
          { name: 'An Toàn Khi Đi Xe Máy', icon: '🛵', desc: 'Ngồi sau xe máy phải đội mũ bảo hiểm đạt chuẩn và ôm chắc người lái!', tip: 'Đội mũ bảo hiểm bảo vệ đầu an toàn tuyệt đối!' },
          { name: 'Tránh Xa Nguy Hiểm Trong Nhà', icon: '⚠️', desc: 'Không thò tay vào ổ cắm điện, không nghịch dao kéo và tránh xa nồi nước sôi!', tip: 'Gặp sự cố hãy gọi to cầu cứu người lớn ngay lập tức!' }
        ],
        quizQuestions: [
          { q: 'Khi gặp tín hiệu đèn giao thông màu ĐỎ, người đi đường phải làm gì?', icon: '🔴', choices: ['Dừng lại ngay ngắn', 'Phóng thật nhanh qua', 'Đi tiếp không cần nhìn', 'Bấm còi to'], ans: 'Dừng lại ngay ngắn', exp: 'Đèn đỏ dừng lại để đảm bảo an toàn cho mọi người!' },
          { q: 'Khi được bố mẹ chở đi bằng xe máy, bé bắt buộc phải làm gì?', icon: '🪖', choices: ['Đội mũ bảo hiểm đúng cách', 'Đứng nhún nhảy trên xe', 'Buông hai tay ra', 'Cúi đầu nhìn xuống đất'], ans: 'Đội mũ bảo hiểm đúng cách', exp: 'Đội mũ bảo hiểm bảo vệ an toàn cho bé trên mọi nẻo đường!' },
          { q: 'Đồ vật nào trong nhà rất nguy hiểm mà bé tuyệt đối không được nghịch?', icon: '⚡', choices: ['Ổ cắm điện và phích nước sôi', 'Gấu bông mềm mại', 'Sách vở học tập', 'Cây bút chì sáp'], ans: 'Ổ cắm điện và phích nước sôi', exp: 'Ổ điện và nước sôi rất nguy hiểm, bé tuyệt đối không chạm vào nha!' }
        ]
      }
    };

    this.initElements();
    this.attachEvents();
    this.renderLessons();
  }

  initElements() {
    this.lessonsContainer = document.getElementById('scienceLessonsGrid');
    this.quizContainer = document.getElementById('scienceQuizContainer');
    this.scoreEl = document.getElementById('scienceQuizScore');
  }

  attachEvents() {
    // Topic Navigation
    const topicBtns = document.querySelectorAll('#scienceTopicNav .sub-btn');
    topicBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        topicBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentTopic = btn.dataset.topic;
        if (this.currentMode === 'explore') {
          this.renderLessons();
        } else {
          this.loadQuizQuestion();
        }
      });
    });

    // Mode Toggle (Explore vs Quiz)
    const btnExplore = document.getElementById('btnSciModeExplore');
    const btnQuiz = document.getElementById('btnSciModeQuiz');
    if (btnExplore && btnQuiz) {
      btnExplore.addEventListener('click', () => {
        this.currentMode = 'explore';
        btnExplore.classList.add('active');
        btnQuiz.classList.remove('active');
        if (this.lessonsContainer) this.lessonsContainer.style.display = 'grid';
        if (this.quizContainer) this.quizContainer.style.display = 'none';
        this.renderLessons();
      });

      btnQuiz.addEventListener('click', () => {
        this.currentMode = 'quiz';
        btnQuiz.classList.add('active');
        btnExplore.classList.remove('active');
        if (this.lessonsContainer) this.lessonsContainer.style.display = 'none';
        if (this.quizContainer) this.quizContainer.style.display = 'block';
        this.loadQuizQuestion();
      });
    }

    // New Quiz Button
    const btnNew = document.getElementById('btnSciQuizNew');
    if (btnNew) {
      btnNew.addEventListener('click', () => {
        window.soundSys.playPop();
        this.loadQuizQuestion();
      });
    }
  }

  renderLessons() {
    if (!this.lessonsContainer) return;
    this.lessonsContainer.innerHTML = '';

    const currentData = this.topicsData[this.currentTopic] || this.topicsData.body;
    currentData.lessons.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'science-lesson-card';
      card.style.animationDelay = `${idx * 0.05}s`;
      card.innerHTML = `
        <div class="science-card-icon">${item.icon}</div>
        <h3>${item.name}</h3>
        <p class="lesson-desc">${item.desc}</p>
        <div class="lesson-tip">💡 <strong>Lời khuyên:</strong> ${item.tip}</div>
        <button class="small-pill-btn sci-speak-btn" title="Nghe cô đọc bài">
          🔊 Nghe cô hướng dẫn
        </button>
      `;

      const speakBtn = card.querySelector('.sci-speak-btn');
      speakBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.soundSys.playPop();
        window.soundSys.speak(`${item.name}. ${item.desc} Lời khuyên cho bé: ${item.tip}`);
      });

      card.addEventListener('click', () => {
        window.soundSys.playPop();
        window.soundSys.speak(`${item.name}. ${item.desc}`);
      });

      this.lessonsContainer.appendChild(card);
    });
  }

  loadQuizQuestion() {
    if (!this.quizContainer) return;

    const currentData = this.topicsData[this.currentTopic] || this.topicsData.body;
    const questions = currentData.quizQuestions;
    const qItem = questions[Math.floor(Math.random() * questions.length)];

    this.currentQuestion = qItem;

    const qArea = document.getElementById('scienceQuizQArea');
    const aArea = document.getElementById('scienceQuizAArea');
    const fbBox = document.getElementById('scienceQuizFeedback');

    if (fbBox) {
      fbBox.className = 'feedback-box';
      fbBox.textContent = '';
    }

    if (qArea) {
      qArea.innerHTML = `
        <div class="math-prompt-hint">Khám phá thế giới quanh bé:</div>
        <div class="science-quiz-badge">${qItem.icon}</div>
        <div class="math-question-text">${qItem.q}</div>
        <button class="pill-btn" id="btnSciSpeakQuestion">
          🔊 Nghe câu hỏi
        </button>
      `;

      const speakBtn = document.getElementById('btnSciSpeakQuestion');
      if (speakBtn) {
        speakBtn.addEventListener('click', () => {
          window.soundSys.speak(qItem.q);
        });
      }
    }

    if (aArea) {
      aArea.innerHTML = '';
      const shuffledChoices = [...qItem.choices].sort(() => Math.random() - 0.5);
      shuffledChoices.forEach(choiceText => {
        const btn = document.createElement('button');
        btn.className = 'btn-choice sci-choice-btn';
        btn.innerHTML = `<span>${choiceText}</span>`;
        btn.addEventListener('click', () => this.handleAnswer(choiceText, btn));
        aArea.appendChild(btn);
      });
    }

    // Auto read the question
    setTimeout(() => {
      window.soundSys.speak(qItem.q);
    }, 300);
  }

  handleAnswer(selected, btnEl) {
    if (!this.currentQuestion) return;
    const isCorrect = selected === this.currentQuestion.ans;
    const fbBox = document.getElementById('scienceQuizFeedback');
    const allBtns = document.querySelectorAll('#scienceQuizAArea .btn-choice');

    allBtns.forEach(b => b.disabled = true);

    if (isCorrect) {
      btnEl.classList.add('correct');
      this.score++;
      this.streak++;
      if (this.scoreEl) this.scoreEl.textContent = this.score;

      if (this.streak >= 3) {
        window.soundSys.playCombo(this.streak);
      } else {
        window.soundSys.playCorrect();
      }

      window.rewards.addStars(1, `Đúng rồi! ${this.currentQuestion.exp}`);
      window.rewards.recordActivity('scienceScore', 1);

      if (fbBox) {
        fbBox.className = 'feedback-box correct';
        fbBox.innerHTML = `🎉 <strong>Tuyệt vời!</strong> ${this.currentQuestion.exp}`;
      }

      window.soundSys.speak(`Chính xác rồi bé ơi! ${this.currentQuestion.exp}`);

      setTimeout(() => {
        this.loadQuizQuestion();
      }, 2200);
    } else {
      btnEl.classList.add('wrong');
      this.streak = 0;
      window.soundSys.playWrong();

      if (fbBox) {
        fbBox.className = 'feedback-box wrong';
        fbBox.innerHTML = `💡 Chưa đúng rồi nè! Đáp án đúng là: <strong>"${this.currentQuestion.ans}"</strong>. Cùng nghe giải thích nha: ${this.currentQuestion.exp}`;
      }

      window.soundSys.speak(`Chưa đúng rồi nè! Đáp án đúng là ${this.currentQuestion.ans}. Bé thử lại nhé!`);

      setTimeout(() => {
        allBtns.forEach(b => b.disabled = false);
        btnEl.classList.remove('wrong');
      }, 1600);
    }
  }
}

// Global instance
window.scienceApp = null;
