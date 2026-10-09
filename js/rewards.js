/* ========================================================
   REWARD & CELEBRATION SYSTEM (Stars, Badges, Confetti)
   ======================================================== */

class RewardManager {
  constructor() {
    this.storageKey = 'vuon_tuoi_tho_rewards_v1';
    this.state = this.loadState();
    this.badgesConfig = [
      { id: 'first_star', icon: '🌟', title: 'Ngôi Sao Đầu Tiên', desc: 'Kiếm được ngôi sao đầu tiên trong ngày', condition: (s) => s.stars >= 1 },
      { id: 'math_starter', icon: '🔢', title: 'Thám Tử Toán Học', desc: 'Đạt 5 câu trả lời đúng môn Toán', condition: (s) => (s.mathScore || 0) >= 5 },
      { id: 'math_master', icon: '🧮', title: 'Siêu Cấp Tính Nhanh', desc: 'Đạt 20 câu trả lời đúng môn Toán', condition: (s) => (s.mathScore || 0) >= 20 },
      { id: 'vn_starter', icon: '📖', title: 'Bé Yêu Tiếng Việt', desc: 'Học và tìm đúng 5 chữ cái Tiếng Việt', condition: (s) => (s.vnScore || 0) >= 5 },
      { id: 'balloon_hunter', icon: '🎈', title: 'Dũng Sĩ Bắn Bóng', desc: 'Đạt trên 10 điểm trong trò Bóng Bay', condition: (s) => (s.balloonHighScore || 0) >= 10 },
      { id: 'memory_ace', icon: '🧠', title: 'Trí Nhớ Siêu Phàm', desc: 'Hoàn thành bàn lật thẻ động vật', condition: (s) => s.memoryWon >= 1 },
      { id: 'little_artist', icon: '🎨', title: 'Họa Sĩ Tí Hon', desc: 'Lưu thành công một bức tranh bé vẽ', condition: (s) => s.drawingsSaved >= 1 },
      { id: 'star_champion', icon: '👑', title: 'Đại Sứ Sao Vàng', desc: 'Thu thập được 30 ngôi sao may mắn', condition: (s) => s.stars >= 30 }
    ];

    this.initConfetti();
    this.updateUI();
  }

  loadState() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return {
      stars: 0,
      mathScore: 0,
      vnScore: 0,
      balloonHighScore: 0,
      memoryWon: 0,
      drawingsSaved: 0,
      unlockedBadges: []
    };
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {}
    this.updateUI();
  }

  addStars(count = 1, reason = "Bé trả lời đúng rồi! Hoan hô!") {
    this.state.stars += count;
    window.soundSys.playCorrect();
    this.showToast(`⭐ +${count} Sao! ${reason}`);
    this.checkBadges();
    this.saveState();
  }

  recordActivity(key, increment = 1) {
    if (!this.state[key]) this.state[key] = 0;
    this.state[key] += increment;
    this.checkBadges();
    this.saveState();
  }

  setHighScore(key, val) {
    if (!this.state[key] || val > this.state[key]) {
      this.state[key] = val;
      this.checkBadges();
      this.saveState();
    }
  }

  checkBadges() {
    let newlyUnlocked = false;
    this.badgesConfig.forEach(badge => {
      if (!this.state.unlockedBadges.includes(badge.id)) {
        if (badge.condition(this.state)) {
          this.state.unlockedBadges.push(badge.id);
          newlyUnlocked = true;
          setTimeout(() => {
            window.soundSys.playFanfare();
            this.triggerConfetti();
            this.showToast(`🎖️ HUÂN CHƯƠNG MỚI: "${badge.title}"! Bé cừ quá!`);
          }, 800);
        }
      }
    });
    return newlyUnlocked;
  }

  showToast(message, duration = 3500) {
    const toast = document.getElementById('mascotToast');
    const msgEl = document.getElementById('toastMessage');
    if (!toast || !msgEl) return;

    msgEl.textContent = message;
    toast.classList.add('show');

    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  updateUI() {
    // Header star counter
    const starEl = document.getElementById('totalStars');
    if (starEl) starEl.textContent = this.state.stars;

    // Awards tab counter
    const awardStarEl = document.getElementById('awardTotalStars');
    if (awardStarEl) awardStarEl.textContent = this.state.stars;

    // Rank upgrade
    const rankTitle = document.getElementById('userRankTitle');
    const rankDesc = document.getElementById('userRankDesc');
    const rankBox = document.getElementById('userRankBox');
    if (rankTitle && rankDesc && rankBox) {
      if (this.state.stars >= 50) {
        rankTitle.textContent = "🏆 Thần Đồng Lớp 1 Xuất Sắc";
        rankDesc.textContent = "Bé đã chinh phục mọi thử thách với kết quả đáng nể!";
        rankBox.querySelector('.rank-badge').textContent = "👑";
      } else if (this.state.stars >= 20) {
        rankTitle.textContent = "🌟 Hiệp Sĩ Thông Thái";
        rankDesc.textContent = "Bé học rất chăm chỉ và thu được thật nhiều điểm tốt!";
        rankBox.querySelector('.rank-badge').textContent = "🎖️";
      } else {
        rankTitle.textContent = "🌱 Mầm Non Tinh Anh";
        rankDesc.textContent = "Bé đang bước vào những bài học đầu tiên thật tuyệt vời!";
        rankBox.querySelector('.rank-badge').textContent = "🌱";
      }
    }

    // Render badges
    this.renderBadges();
  }

  renderBadges() {
    const grid = document.getElementById('badgesGrid');
    if (!grid) return;

    grid.innerHTML = '';
    this.badgesConfig.forEach(badge => {
      const isUnlocked = this.state.unlockedBadges.includes(badge.id);
      const card = document.createElement('div');
      card.className = `badge-card ${isUnlocked ? 'unlocked' : 'locked'}`;
      card.innerHTML = `
        <div class="badge-icon-box">${badge.icon}</div>
        <h4>${badge.title}</h4>
        <p>${badge.desc}</p>
        <span class="badge-status-tag">${isUnlocked ? '✨ Đã đạt được' : '🔒 Chưa mở'}</span>
      `;
      grid.appendChild(card);
    });
  }

  // --- Confetti particle engine ---
  initConfetti() {
    this.canvas = document.getElementById('confettiCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;

    const resize = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();
  }

  triggerConfetti(count = 65) {
    if (!this.canvas || !this.ctx) return;
    const colors = ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0', '#ffb703', '#06d6a0', '#ff70a6'];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: this.canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: this.canvas.height / 3 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.7) * 15,
        size: Math.random() * 9 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        opacity: 1
      });
    }

    if (!this.animationId) {
      this.animateConfetti();
    }
  }

  animateConfetti() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.rotation += p.rotSpeed;
      p.opacity -= 0.009;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
      this.ctx.restore();
    }

    this.particles = this.particles.filter(p => p.opacity > 0 && p.y < this.canvas.height + 50);

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(() => this.animateConfetti());
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.animationId = null;
    }
  }
}

// Global reward instance
window.rewards = new RewardManager();
