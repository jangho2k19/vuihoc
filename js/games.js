/* ========================================================
   GAMES MODULE:
   1. Balloon Pop Game (Bóng bay kì diệu)
   2. Animal Memory Card Game (Lật thẻ trí nhớ)
   ======================================================== */

// ---------------- 1. BALLOON POP GAME ----------------
class BalloonGame {
  constructor() {
    this.sky = document.getElementById('balloonSky');
    this.targetSymbolEl = document.getElementById('balloonTargetSymbol');
    this.scoreEl = document.getElementById('balloonScore');
    this.timerEl = document.getElementById('balloonTimer');
    this.livesEl = document.getElementById('balloonLives');
    this.startOverlay = document.getElementById('balloonStartOverlay');
    this.btnStart = document.getElementById('btnStartBalloonGame');
    this.btnSpeak = document.getElementById('btnBalloonSpeakTarget');

    this.isPlaying = false;
    this.score = 0;
    this.timeLeft = 30;
    this.lives = 3;
    this.target = null;
    this.balloons = [];
    this.spawnTimer = null;
    this.gameTimer = null;
    this.mode = 'numbers'; // 'numbers' or 'letters'

    this.colors = ['#ff477e', '#ff70a6', '#ff9770', '#ffd166', '#06d6a0', '#118ab2', '#7209b7', '#f72585', '#fb8500'];

    this.initEvents();
  }

  initEvents() {
    if (this.btnStart) {
      this.btnStart.addEventListener('click', () => {
        const modeRadio = document.querySelector('input[name="balloonMode"]:checked');
        this.mode = modeRadio ? modeRadio.value : 'numbers';
        this.startGame();
      });
    }

    if (this.btnSpeak) {
      this.btnSpeak.addEventListener('click', () => {
        this.speakTarget();
      });
    }
  }

  startGame() {
    this.isPlaying = true;
    this.score = 0;
    this.timeLeft = 30;
    this.lives = 3;
    this.scoreEl.textContent = '0';
    this.timerEl.textContent = '30s';
    this.updateLivesDisplay();
    this.startOverlay.style.display = 'none';

    // Clear existing balloons
    this.clearAllBalloons();

    this.pickNewTarget();
    this.speakTarget();

    // Spawn balloon loop
    this.spawnTimer = setInterval(() => {
      if (this.isPlaying && this.balloons.length < 8) {
        this.spawnBalloon();
      }
    }, 1100);

    // Initial batch of 3 balloons
    for (let i = 0; i < 3; i++) {
      setTimeout(() => { if (this.isPlaying) this.spawnBalloon(); }, i * 350);
    }

    // Countdown loop
    this.gameTimer = setInterval(() => {
      this.timeLeft--;
      this.timerEl.textContent = `${this.timeLeft}s`;
      if (this.timeLeft <= 0) {
        this.endGame("Hết giờ rồi!");
      }
    }, 1000);
  }

  updateLivesDisplay() {
    this.livesEl.textContent = '❤️'.repeat(Math.max(0, this.lives));
  }

  pickNewTarget() {
    if (this.mode === 'numbers') {
      this.target = String(Math.floor(Math.random() * 10) + 1); // 1-10
    } else {
      const letters = ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'I', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V'];
      this.target = letters[Math.floor(Math.random() * letters.length)];
    }
    this.targetSymbolEl.textContent = this.target;
  }

  speakTarget() {
    if (!this.target) return;
    const txt = (this.mode === 'numbers') ? `Bé bấm vô bóng số ${this.target} nghen!` : `Bé hãy bấm vô bóng chữ ${this.target} nghen!`;
    window.soundSys.speak(txt);
  }

  spawnBalloon() {
    if (!this.sky || !this.isPlaying) return;

    // Decide whether to spawn the target or a distractor
    let symbol = this.target;
    // 35% chance to guarantee current target, 65% random
    if (Math.random() > 0.35) {
      if (this.mode === 'numbers') {
        symbol = String(Math.floor(Math.random() * 10) + 1);
      } else {
        const letters = ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'I', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V'];
        symbol = letters[Math.floor(Math.random() * letters.length)];
      }
    }

    const balloon = document.createElement('div');
    balloon.className = 'flying-balloon';
    balloon.textContent = symbol;
    balloon.dataset.symbol = symbol;

    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    balloon.style.backgroundColor = color;

    // Random X position inside sky
    const skyWidth = this.sky.clientWidth;
    const posX = Math.max(20, Math.floor(Math.random() * (skyWidth - 100)));
    balloon.style.left = `${posX}px`;
    balloon.style.bottom = `-120px`;

    // Speed
    const speed = Math.random() * 1.5 + 1.8; // px per tick
    const floatObj = {
      el: balloon,
      y: -120,
      x: posX,
      speed: speed,
      symbol: symbol,
      wiggleOffset: Math.random() * 100
    };

    balloon.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.handleBalloonClick(floatObj);
    });

    this.sky.appendChild(balloon);
    this.balloons.push(floatObj);

    if (!this.animLoopRunning) {
      this.animLoopRunning = true;
      this.animateBalloons();
    }
  }

  animateBalloons() {
    if (!this.isPlaying) {
      this.animLoopRunning = false;
      return;
    }

    const skyHeight = this.sky.clientHeight;
    for (let i = this.balloons.length - 1; i >= 0; i--) {
      const b = this.balloons[i];
      b.y += b.speed;
      b.wiggleOffset += 0.04;
      const sway = Math.sin(b.wiggleOffset) * 12;

      b.el.style.bottom = `${b.y}px`;
      b.el.style.transform = `translateX(${sway}px)`;

      // If balloon flew beyond top
      if (b.y > skyHeight + 100) {
        if (b.el.parentNode) b.el.parentNode.removeChild(b.el);
        this.balloons.splice(i, 1);
      }
    }

    requestAnimationFrame(() => this.animateBalloons());
  }

  handleBalloonClick(floatObj) {
    if (!this.isPlaying || floatObj.popped) return;
    floatObj.popped = true;

    window.soundSys.playPop();

    if (floatObj.symbol === this.target) {
      // Correct!
      floatObj.el.classList.add('popping');
      this.score += 1;
      this.scoreEl.textContent = this.score;

      window.rewards.addStars(1, `Nổ bóng ${this.target} thành công!`);
      this.pickNewTarget();
      this.speakTarget();

      setTimeout(() => {
        if (floatObj.el.parentNode) floatObj.el.parentNode.removeChild(floatObj.el);
        this.balloons = this.balloons.filter(b => b !== floatObj);
      }, 250);
    } else {
      // Wrong balloon
      window.soundSys.playWrong();
      floatObj.el.style.transform += ' scale(0.85)';
      this.lives--;
      this.updateLivesDisplay();

      if (this.lives <= 0) {
        this.endGame("Bé hết lượt rồi, cùng chơi lại nhé!");
      }
    }
  }

  clearAllBalloons() {
    this.balloons.forEach(b => {
      if (b.el && b.el.parentNode) b.el.parentNode.removeChild(b.el);
    });
    this.balloons = [];
  }

  endGame(message) {
    this.isPlaying = false;
    clearInterval(this.spawnTimer);
    clearInterval(this.gameTimer);

    window.rewards.setHighScore('balloonHighScore', this.score);

    this.startOverlay.style.display = 'flex';
    this.startOverlay.innerHTML = `
      <h3>🎉 Trò chơi kết thúc!</h3>
      <p style="font-size: 1.4rem; color: #b45309; font-weight:800;">Bé đã nổ được <strong>${this.score}</strong> quả bóng!</p>
      <p>${message}</p>
      <div class="mode-select">
        <label><input type="radio" name="balloonMode" value="numbers" ${this.mode === 'numbers' ? 'checked' : ''}> Học Đếm Số (1 - 10)</label>
        <label><input type="radio" name="balloonMode" value="letters" ${this.mode === 'letters' ? 'checked' : ''}> Bảng Chữ Cái (A - Z)</label>
      </div>
      <button class="btn-primary" id="btnPlayAgainBalloon">🔄 Chơi lại ngay!</button>
    `;

    const btnAgain = document.getElementById('btnPlayAgainBalloon');
    if (btnAgain) {
      btnAgain.addEventListener('click', () => {
        const modeRadio = document.querySelector('input[name="balloonMode"]:checked');
        this.mode = modeRadio ? modeRadio.value : 'numbers';
        this.startGame();
      });
    }

    if (this.score >= 5) {
      window.rewards.triggerConfetti(50);
      window.soundSys.playFanfare();
    }
  }
}

// ---------------- 2. MEMORY CARD MATCH GAME ----------------
class MemoryGame {
  constructor() {
    this.grid = document.getElementById('memoryGrid');
    this.pairsEl = document.getElementById('memoryPairsFound');
    this.movesEl = document.getElementById('memoryMoves');
    this.btnReset = document.getElementById('btnResetMemory');

    this.animals = [
      { name: 'Mèo con', icon: '🐱' },
      { name: 'Cún con', icon: '🐶' },
      { name: 'Thỏ trắng', icon: '🐰' },
      { name: 'Gấu trúc', icon: '🐼' },
      { name: 'Sư tử', icon: '🦁' },
      { name: 'Chú voi', icon: '🐘' }
    ];

    this.cards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.moves = 0;
    this.isLocked = false;

    this.init();
  }

  init() {
    if (this.btnReset) {
      this.btnReset.addEventListener('click', () => {
        window.soundSys.playPop();
        this.resetGame();
      });
    }
    this.resetGame();
  }

  resetGame() {
    this.grid.innerHTML = '';
    this.matchedPairs = 0;
    this.moves = 0;
    this.flippedCards = [];
    this.isLocked = false;

    this.pairsEl.textContent = `0 / ${this.animals.length}`;
    this.movesEl.textContent = '0';

    // Duplicate cards to form pairs
    const deck = [...this.animals, ...this.animals]
      .map((item, index) => ({ ...item, id: index }))
      .sort(() => Math.random() - 0.5);

    this.cards = deck;

    deck.forEach(item => {
      const card = document.createElement('div');
      card.className = 'memory-card-item';
      card.dataset.name = item.name;

      card.innerHTML = `
        <div class="card-inner">
          <div class="card-front">
            <span class="card-front-icon">❓</span>
          </div>
          <div class="card-back">
            <span class="card-back-icon">${item.icon}</span>
            <span class="card-back-name">${item.name}</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => this.handleFlip(card, item));
      this.grid.appendChild(card);
    });
  }

  handleFlip(cardEl, item) {
    if (this.isLocked) return;
    if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

    window.soundSys.playCardFlip();
    cardEl.classList.add('flipped');
    this.flippedCards.push({ el: cardEl, item: item });

    if (this.flippedCards.length === 2) {
      this.moves++;
      this.movesEl.textContent = this.moves;
      this.checkMatch();
    }
  }

  checkMatch() {
    this.isLocked = true;
    const [c1, c2] = this.flippedCards;

    if (c1.item.name === c2.item.name) {
      // Match!
      setTimeout(() => {
        window.soundSys.playCorrect();
        c1.el.classList.add('matched');
        c2.el.classList.add('matched');
        this.matchedPairs++;
        this.pairsEl.textContent = `${this.matchedPairs} / ${this.animals.length}`;

        window.soundSys.speak(`Tìm thấy một cặp ${c1.item.name} rồi nè bé ơi!`);

        this.flippedCards = [];
        this.isLocked = false;

        if (this.matchedPairs === this.animals.length) {
          this.handleWin();
        }
      }, 500);
    } else {
      // Not match
      setTimeout(() => {
        window.soundSys.playWrong();
        c1.el.classList.remove('flipped');
        c2.el.classList.remove('flipped');
        this.flippedCards = [];
        this.isLocked = false;
      }, 1000);
    }
  }

  handleWin() {
    setTimeout(() => {
      window.soundSys.playFanfare();
      window.rewards.triggerConfetti(70);
      window.rewards.addStars(3, "Bé hoàn thành trò chơi lật thẻ trí nhớ!");
      window.rewards.recordActivity('memoryWon', 1);

      window.soundSys.speak(`Hoan hô! Bé đã tìm đủ hết tất cả các cặp con vật rồi nè! Bé giỏi quá chừng luôn!`);
    }, 600);
  }
}

// Global instances
window.balloonGame = null;
window.memoryGame = null;
