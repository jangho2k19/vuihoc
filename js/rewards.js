/* ========================================================
   REWARD & GAMIFICATION SYSTEM
   Stars, Ranks, Badges, Confetti, Mascot Companions,
   Daily Lucky Wheel & Printable Certificate of Excellence
   ======================================================== */

class RewardManager {
  constructor() {
    this.storageKey = 'vuon_tuoi_tho_rewards_v2';
    this.state = this.loadState();

    this.mascots = {
      bear: { id: 'bear', name: 'Gấu Nâu Thông Thái', emoji: '🐻', role: 'Dũng Cảm & Tốt Bụng', greet: 'Chào bé cưng! Gấu Nâu rất vui được đồng hành cùng bé nghen!' },
      bunny: { id: 'bunny', name: 'Thỏ Hồng Đáng Yêu', emoji: '🐰', role: 'Nhanh Nhẹn & Chăm Chỉ', greet: 'Xin chào bé! Thỏ Hồng nhảy chân sáo chúc bé học thật giỏi nha!' },
      cat: { id: 'cat', name: 'Mèo Miu Tinh Nghịch', emoji: '🐱', role: 'Thông Minh & Đáng Yêu', greet: 'Meo meo! Mèo Miu cùng bé bắt thật nhiều ngôi sao may mắn nha!' },
      dog: { id: 'dog', name: 'Cún Vàng Vui Vẻ', emoji: '🐶', role: 'Trung Thành & Năng Động', greet: 'Gâu gâu! Cún Vàng vẫy đuôi khen bé học giỏi quá chừng nè!' },
      panda: { id: 'panda', name: 'Gấu Trúc Hóm Hỉnh', emoji: '🐼', role: 'Hiền Lành & Trí Tuệ', greet: 'Chào bạn nhỏ! Gấu Trúc chúc bé mỗi ngày là một niềm vui lớn nha!' }
    };

    this.badgesConfig = [
      { id: 'first_star', icon: '🌟', title: 'Ngôi Sao Đầu Tiên', desc: 'Kiếm được ngôi sao may mắn đầu tiên', condition: (s) => s.stars >= 1 },
      { id: 'math_starter', icon: '🔢', title: 'Thám Tử Toán Học', desc: 'Đạt 5 câu trả lời đúng môn Toán', condition: (s) => (s.mathScore || 0) >= 5 },
      { id: 'math_master', icon: '🧮', title: 'Siêu Cấp Tính Nhanh', desc: 'Đạt 20 câu trả lời đúng môn Toán', condition: (s) => (s.mathScore || 0) >= 20 },
      { id: 'vn_starter', icon: '📖', title: 'Bé Yêu Tiếng Việt', desc: 'Học và tìm đúng 5 chữ cái Tiếng Việt', condition: (s) => (s.vnScore || 0) >= 5 },
      { id: 'english_star', icon: '🇬🇧', title: 'Ngôi Sao Tiếng Anh', desc: 'Đạt 5 câu đúng môn Tiếng Anh', condition: (s) => (s.englishScore || 0) >= 5 },
      { id: 'science_explorer', icon: '🔬', title: 'Nhà Thám Hiểm Nhí', desc: 'Đạt 5 câu đúng Tự nhiên & Xã hội', condition: (s) => (s.scienceScore || 0) >= 5 },
      { id: 'music_maestro', icon: '🎹', title: 'Nghệ Sĩ Đàn Tí Hon', desc: 'Đàn xong bài hát trên phím đàn', condition: (s) => (s.musicSongsCompleted || 0) >= 1 },
      { id: 'balloon_hunter', icon: '🎈', title: 'Dũng Sĩ Bắn Bóng', desc: 'Đạt trên 10 điểm trong trò Bóng Bay', condition: (s) => (s.balloonHighScore || 0) >= 10 },
      { id: 'memory_ace', icon: '🧠', title: 'Trí Nhớ Siêu Phàm', desc: 'Hoàn thành bàn lật thẻ động vật', condition: (s) => (s.memoryWon || 0) >= 1 },
      { id: 'little_artist', icon: '🎨', title: 'Họa Sĩ Tí Hon', desc: 'Lưu thành công một bức tranh bé vẽ', condition: (s) => (s.drawingsSaved || 0) >= 1 },
      { id: 'lucky_spinner', icon: '🎡', title: 'Bé May Mắn', desc: 'Quay vòng quay may mắn rinh quà', condition: (s) => (s.spinsCount || 0) >= 1 },
      { id: 'star_champion', icon: '👑', title: 'Đại Sứ Sao Vàng', desc: 'Thu thập được 50 ngôi sao may mắn', condition: (s) => s.stars >= 50 }
    ];

    this.wheelSlices = [
      { text: '+5 Sao ⭐', stars: 5, color: '#ff477e' },
      { text: '+10 Sao ⭐⭐', stars: 10, color: '#ffd166' },
      { text: '+15 Sao ⭐⭐⭐', stars: 15, color: '#06d6a0' },
      { text: '+20 Sao 🌟🌟', stars: 20, color: '#118ab2' },
      { text: 'Quà Bí Mật 🎁 (+25)', stars: 25, color: '#7209b7' },
      { text: 'Pháo Tay 👏 (+5)', stars: 5, color: '#f77f00' },
      { text: 'Cầu Vồng 🌈 (+10)', stars: 10, color: '#ff70a6' },
      { text: 'Siêu Cúp 👑 (+30)', stars: 30, color: '#4361ee' }
    ];

    this.wheelRotation = 0;
    this.isSpinning = false;

    this.initConfetti();
    this.updateUI();
    this.initLuckyWheel();
    this.initCertificate();
  }

  loadState() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) return JSON.parse(data);
    } catch (e) {}

    // Fallback to check older storage
    try {
      const old = localStorage.getItem('vuon_tuoi_tho_rewards_v1');
      if (old) {
        const parsed = JSON.parse(old);
        return {
          studentName: 'Bé Yêu Thông Thái',
          mascotId: 'bear',
          stars: parsed.stars || 0,
          mathScore: parsed.mathScore || 0,
          vnScore: parsed.vnScore || 0,
          englishScore: 0,
          scienceScore: 0,
          musicSongsCompleted: 0,
          balloonHighScore: parsed.balloonHighScore || 0,
          memoryWon: parsed.memoryWon || 0,
          drawingsSaved: parsed.drawingsSaved || 0,
          spinsCount: 0,
          unlockedBadges: parsed.unlockedBadges || []
        };
      }
    } catch (e) {}

    return {
      studentName: 'Bé Yêu Thông Thái',
      mascotId: 'bear',
      stars: 0,
      mathScore: 0,
      vnScore: 0,
      englishScore: 0,
      scienceScore: 0,
      musicSongsCompleted: 0,
      balloonHighScore: 0,
      memoryWon: 0,
      drawingsSaved: 0,
      spinsCount: 0,
      unlockedBadges: []
    };
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {}
    this.updateUI();
  }

  getMascot() {
    return this.mascots[this.state.mascotId] || this.mascots.bear;
  }

  setMascot(mascotId) {
    if (this.mascots[mascotId]) {
      this.state.mascotId = mascotId;
      this.saveState();
      const m = this.getMascot();
      window.soundSys.playPop();
      this.showToast(`${m.emoji} Bạn ${m.name} đã sẵn sàng đồng hành cùng bé!`);
      window.soundSys.speak(m.greet);
    }
  }

  setStudentName(name) {
    if (name && name.trim()) {
      this.state.studentName = name.trim();
      this.saveState();
    }
  }

  addStars(count = 1, reason = "Bé làm đúng rồi! Hoan hô!") {
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
            this.triggerConfetti(60);
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
    const avatarEl = toast ? toast.querySelector('.toast-avatar') : null;
    if (!toast || !msgEl) return;

    if (avatarEl) {
      avatarEl.textContent = this.getMascot().emoji;
    }

    msgEl.innerHTML = message;
    toast.classList.add('show');

    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  updateUI() {
    const mascot = this.getMascot();

    // Header Mascot Avatar
    const mascotAvatarEl = document.getElementById('mascotAvatar');
    if (mascotAvatarEl) {
      const emojiSpan = mascotAvatarEl.querySelector('.avatar-emoji');
      if (emojiSpan) emojiSpan.textContent = mascot.emoji;
      mascotAvatarEl.title = `Bạn đồng hành: ${mascot.name}`;
    }

    // Home mascot body & tag
    const homeMascotBody = document.querySelector('.welcome-character .mascot-body');
    const homeMascotTag = document.querySelector('.welcome-character .mascot-tag');
    if (homeMascotBody) homeMascotBody.textContent = mascot.emoji;
    if (homeMascotTag) homeMascotTag.textContent = mascot.name;

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

  // --- Lucky Wheel (Vòng Quay May Mắn) ---
  initLuckyWheel() {
    const canvas = document.getElementById('luckyWheelCanvas');
    if (!canvas) return;
    this.wheelCtx = canvas.getContext('2d');
    this.drawWheel(0);

    const btnSpin = document.getElementById('btnSpinWheel');
    if (btnSpin) {
      btnSpin.addEventListener('click', () => this.spinWheel());
    }
  }

  drawWheel(angleOffset) {
    if (!this.wheelCtx) return;
    const ctx = this.wheelCtx;
    const canvas = ctx.canvas;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = cx - 10;
    const totalSlices = this.wheelSlices.length;
    const sliceAngle = (Math.PI * 2) / totalSlices;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < totalSlices; i++) {
      const startA = angleOffset + i * sliceAngle;
      const endA = startA + sliceAngle;
      const slice = this.wheelSlices[i];

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startA, endA);
      ctx.closePath();
      ctx.fillStyle = slice.color;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // Text label
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(startA + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px "Baloo 2", sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 4;
      ctx.fillText(slice.text, radius - 20, 6);
      ctx.restore();
    }

    // Center hub
    ctx.beginPath();
    ctx.arc(cx, cy, 26, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#ffd166';
    ctx.stroke();

    ctx.fillStyle = '#1e293b';
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎁', cx, cy);
  }

  spinWheel() {
    if (this.isSpinning) return;
    this.isSpinning = true;

    window.soundSys.playPop();

    // Pick random target slice
    const totalSlices = this.wheelSlices.length;
    const winningIndex = Math.floor(Math.random() * totalSlices);
    const sliceAngle = 360 / totalSlices;

    // Pointer is at the top (270 degrees in canvas coordinates)
    const extraSpins = 5 + Math.floor(Math.random() * 3); // 5 to 7 full rotations
    const targetSliceCenterDeg = (winningIndex * sliceAngle) + (sliceAngle / 2);
    const finalAngle = (extraSpins * 360) + (270 - targetSliceCenterDeg);

    const startRot = this.wheelRotation % 360;
    const totalRotation = startRot + finalAngle;
    const duration = 4000;
    const startTime = performance.now();

    // Audio click ticker
    let lastTickAngle = 0;

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentDeg = startRot + (finalAngle * ease);

      this.wheelRotation = currentDeg;
      this.drawWheel((currentDeg * Math.PI) / 180);

      if (currentDeg - lastTickAngle > sliceAngle) {
        window.soundSys.playTone(700, 'sine', 0.04, 0.04);
        lastTickAngle = currentDeg;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.isSpinning = false;
        const wonSlice = this.wheelSlices[winningIndex];

        setTimeout(() => {
          window.soundSys.playFanfare();
          this.triggerConfetti(65);
          this.addStars(wonSlice.stars, `Bé quay trúng phần thưởng ${wonSlice.text}!`);
          this.recordActivity('spinsCount', 1);

          const resultEl = document.getElementById('luckyWheelResult');
          if (resultEl) {
            resultEl.innerHTML = `🎉 <strong>CHÚC MỪNG BÉ!</strong> Bé trúng: <span style="color:#d97706; font-size:1.3rem;">${wonSlice.text}</span>!`;
          }

          window.soundSys.speak(`Chúc mừng bé cưng! Bé quay trúng ${wonSlice.text} rồi nè!`);
        }, 300);
      }
    };

    requestAnimationFrame(animate);
  }

  // --- Certificate of Excellence (Giấy Khen Cá Nhân Hóa) ---
  initCertificate() {
    const btnOpenCert = document.getElementById('btnOpenCertificate');
    const certModal = document.getElementById('certificateModal');
    const certNameInput = document.getElementById('certStudentNameInput');
    const btnPrint = document.getElementById('btnPrintCertificate');
    const btnDownload = document.getElementById('btnDownloadCertImage');
    const btnClose = document.getElementById('btnCloseCertModal');

    if (btnOpenCert && certModal) {
      btnOpenCert.addEventListener('click', () => {
        window.soundSys.playPop();
        this.updateCertificateCard();
        certModal.classList.add('active');
      });
    }

    if (btnClose && certModal) {
      btnClose.addEventListener('click', () => {
        certModal.classList.remove('active');
      });
    }

    if (certNameInput) {
      certNameInput.value = this.state.studentName;
      certNameInput.addEventListener('input', (e) => {
        this.setStudentName(e.target.value);
        this.updateCertificateCard();
      });
    }

    if (btnPrint) {
      btnPrint.addEventListener('click', () => {
        window.print();
      });
    }

    if (btnDownload) {
      btnDownload.addEventListener('click', () => {
        this.downloadCertificateImage();
      });
    }
  }

  updateCertificateCard() {
    const nameEl = document.getElementById('certStudentName');
    const rankEl = document.getElementById('certStudentRank');
    const starsEl = document.getElementById('certStudentStars');
    const mascotBadgeEl = document.getElementById('certMascotBadge');

    const mascot = this.getMascot();

    if (nameEl) nameEl.textContent = this.state.studentName || 'Bé Yêu Thông Thái';
    if (starsEl) starsEl.textContent = `${this.state.stars} Ngôi Sao May Mắn ⭐`;
    if (mascotBadgeEl) mascotBadgeEl.textContent = `${mascot.emoji} ${mascot.name}`;

    if (rankEl) {
      if (this.state.stars >= 50) {
        rankEl.textContent = "DANH HIỆU: THẦN ĐỒNG LỚP 1 XUẤT SẮC 👑";
      } else if (this.state.stars >= 20) {
        rankEl.textContent = "DANH HIỆU: HIỆP SĨ THÔNG THÁI LỚP 1 🌟";
      } else {
        rankEl.textContent = "DANH HIỆU: MẦM NON TINH ANH TIỂU HỌC 🌱";
      }
    }
  }

  downloadCertificateImage() {
    window.soundSys.playPop();
    const certCard = document.getElementById('certificatePrintArea');
    if (!certCard) return;

    // Render certificate into an HTML5 Canvas and save
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 700;
    const ctx = canvas.getContext('2d');

    // Certificate Background
    ctx.fillStyle = '#fffdfa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 14;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.strokeRect(36, 36, canvas.width - 72, canvas.height - 72);

    // Header emblem
    ctx.font = '64px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🌟', canvas.width / 2, 110);

    // Title
    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 38px "Baloo 2", sans-serif';
    ctx.fillText('GIẤY KHEN THƯỞNG BÉ NGOAN HỌC GIỎI', canvas.width / 2, 175);

    ctx.fillStyle = '#64748b';
    ctx.font = '22px "Nunito", sans-serif';
    ctx.fillText('CHƯƠNG TRÌNH GIÁO DỤC TIỂU HỌC LỚP 1 (GDPT 2018)', canvas.width / 2, 215);

    // Praise line
    ctx.fillStyle = '#334155';
    ctx.font = '24px "Nunito", sans-serif';
    ctx.fillText('Khen tặng bạn nhỏ chăm chỉ, sáng tạo:', canvas.width / 2, 275);

    // Student Name
    ctx.fillStyle = '#1e3a8a';
    ctx.font = 'bold 44px "Baloo 2", sans-serif';
    ctx.fillText(this.state.studentName || 'Bé Yêu Thông Thái', canvas.width / 2, 340);

    // Rank & Stars
    const rankTitle = this.state.stars >= 50 ? 'THẦN ĐỒNG LỚP 1 XUẤT SẮC 👑' : (this.state.stars >= 20 ? 'HIỆP SĨ THÔNG THÁI LỚP 1 🌟' : 'MẦM NON TINH ANH TIỂU HỌC 🌱');
    ctx.fillStyle = '#d97706';
    ctx.font = 'bold 28px "Baloo 2", sans-serif';
    ctx.fillText(rankTitle, canvas.width / 2, 410);

    ctx.fillStyle = '#475569';
    ctx.font = '22px "Nunito", sans-serif';
    ctx.fillText(`Đã xuất sắc thu thập được ${this.state.stars} Ngôi Sao May Mắn ⭐`, canvas.width / 2, 460);

    // Seal and Mascot stamp
    ctx.font = '50px sans-serif';
    ctx.fillText('💮', 240, 570);
    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 18px "Nunito", sans-serif';
    ctx.fillText('CHỨNG NHẬN ĐẠT CHUẨN', 240, 625);

    const m = this.getMascot();
    ctx.font = '50px sans-serif';
    ctx.fillText(m.emoji, 760, 570);
    ctx.fillStyle = '#0284c7';
    ctx.font = 'bold 18px "Nunito", sans-serif';
    ctx.fillText(`Bạn Đồng Hành: ${m.name}`, 760, 625);

    // Download
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `giay_khen_${(this.state.studentName || 'be').replace(/\s+/g, '_')}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.soundSys.playFanfare();
    this.triggerConfetti(50);
    this.showToast(`🎉 Đã tải giấy khen của ${this.state.studentName} về máy! Bố mẹ hãy in ra tặng bé nhé!`);
    window.soundSys.speak(`Cô đã tạo xong giấy khen cho ${this.state.studentName} rồi nè! Bố mẹ nhớ in ra để thưởng cho bé nhé!`);
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
