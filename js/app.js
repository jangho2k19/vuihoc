/* ========================================================
   MAIN APPLICATION ORCHESTRATOR - VƯỜN TUỔI THƠ 2.0
   Orchestrates Navigation, Mascots, Night Mode, Speech Rate,
   Math, Vietnamese, English, Science, Music, Games, Drawing & Awards
   ======================================================== */

class MainApp {
  constructor() {
    this.currentTab = 'tab-home';
    this.isNightMode = false;
    this.tips = [
      "Mỗi ngày học một chút điều mới, bé sẽ thông minh và đáng yêu hơn từng ngày! Chúc bé học thật vui nhé! 🌟",
      "Bé nhớ ngồi thẳng lưng và giữ khoảng cách mắt với màn hình để bảo vệ mắt sáng ngời nha! 👀",
      "Học xong nhớ khoe phiếu khen và các ngôi sao may mắn với bố mẹ nhé! Bố mẹ rất tự hào về bé! ❤️",
      "Chăm chỉ làm toán, đọc chữ cái và học tiếng Anh sẽ giúp bé thành học sinh xuất sắc nhất lớp 1 đó! 🏆",
      "Vừa học vừa chơi, tuổi thơ rạng rỡ tiếng cười! Cùng khám phá thêm nhiều điều kỳ thú nhé! 🎈",
      "Bé đã thử tài đánh đàn và tô màu chưa? Cùng rủ bố mẹ xem tác phẩm của bé nhé! 🎨"
    ];

    this.init();
  }

  init() {
    this.initTheme();
    this.bindNavigation();
    this.bindHeaderButtons();
    this.bindMascotModal();
    this.bindVoiceModal();
    this.bindSpeechRateControls();
    this.setRandomTip();

    // Initialize all modules
    window.mathApp = new MathApp();
    window.vnApp = new VietnameseApp();
    window.englishApp = new EnglishApp();
    window.scienceApp = new ScienceApp();
    window.musicApp = new MusicApp();
    window.balloonGame = new BalloonGame();
    window.memoryGame = new MemoryGame();
    window.drawingApp = new DrawingApp();

    console.log("🌟 Vườn Tuổi Thơ 2.0 - Bé Vui Học Lớp 1 Ready!");
  }

  // --- Night Mode / Eye Protection Theme ---
  initTheme() {
    const saved = localStorage.getItem('vuon_tuoi_tho_theme');
    if (saved === 'night') {
      this.enableNightMode(false);
    }
  }

  enableNightMode(animate = true) {
    this.isNightMode = true;
    document.body.classList.add('night-mode');
    localStorage.setItem('vuon_tuoi_tho_theme', 'night');
    const btn = document.getElementById('btnNightToggle');
    if (btn) {
      btn.querySelector('.btn-icon').textContent = '☀️';
      btn.querySelector('.btn-text').textContent = 'Chế độ: Dịu mắt';
      btn.classList.add('active');
    }
  }

  disableNightMode() {
    this.isNightMode = false;
    document.body.classList.remove('night-mode');
    localStorage.setItem('vuon_tuoi_tho_theme', 'day');
    const btn = document.getElementById('btnNightToggle');
    if (btn) {
      btn.querySelector('.btn-icon').textContent = '🌙';
      btn.querySelector('.btn-text').textContent = 'Chế độ: Ban đêm';
      btn.classList.remove('active');
    }
  }

  toggleNightMode() {
    window.soundSys.playPop();
    if (this.isNightMode) {
      this.disableNightMode();
      window.rewards.showToast("☀️ Đã chuyển sang Giao diện Ban Ngày tươi sáng!");
    } else {
      this.enableNightMode(true);
      window.rewards.showToast("🌙 Đã bật Giao diện Dịu Mắt Ban Đêm giúp bảo vệ mắt bé!");
    }
  }

  // --- Navigation ---
  bindNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.tab;
        this.switchTab(targetId);
      });
    });
  }

  switchTab(targetId) {
    if (this.currentTab === targetId) return;

    // Immediately stop any active speech or story reading when navigating
    if (window.soundSys) window.soundSys.stop();
    if (window.vnApp && typeof window.vnApp.stopFullStory === 'function') {
      window.vnApp.stopFullStory();
    }

    window.soundSys.playPop();

    // Update nav buttons
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === targetId);
    });

    // Update pane views
    const panes = document.querySelectorAll('.tab-pane');
    panes.forEach(pane => {
      pane.classList.toggle('active', pane.id === targetId);
    });

    this.currentTab = targetId;

    // Trigger tab-specific actions
    if (targetId === 'tab-math' && window.mathApp) {
      window.mathApp.loadQuestion();
    } else if (targetId === 'tab-english' && window.englishApp) {
      window.englishApp.renderThemeCards();
    } else if (targetId === 'tab-science' && window.scienceApp) {
      window.scienceApp.renderLessons();
    } else if (targetId === 'tab-music' && window.musicApp) {
      window.musicApp.updateSongGuideUI();
    } else if (targetId === 'tab-awards') {
      window.rewards.updateUI();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- Header Controls ---
  bindHeaderButtons() {
    // Sound Toggle
    const btnSound = document.getElementById('btnSoundToggle');
    if (btnSound) {
      btnSound.addEventListener('click', () => {
        const enabled = window.soundSys.toggleSound();
        const icon = btnSound.querySelector('.btn-icon');
        const text = btnSound.querySelector('.btn-text');

        if (enabled) {
          icon.textContent = '🔊';
          text.textContent = 'Âm thanh: Bật';
          btnSound.classList.add('active');
          window.soundSys.playPop();
        } else {
          icon.textContent = '🔇';
          text.textContent = 'Âm thanh: Tắt';
          btnSound.classList.remove('active');
        }
      });
    }

    // Music Toggle
    const btnMusic = document.getElementById('btnMusicToggle');
    if (btnMusic) {
      btnMusic.addEventListener('click', () => {
        const enabled = window.soundSys.toggleMusic();
        const icon = btnMusic.querySelector('.btn-icon');
        const text = btnMusic.querySelector('.btn-text');

        if (enabled) {
          icon.textContent = '🎶';
          text.textContent = 'Nhạc nền: Bật';
          btnMusic.classList.add('active');
        } else {
          icon.textContent = '🎵';
          text.textContent = 'Nhạc nền: Tắt';
          btnMusic.classList.remove('active');
        }
      });
    }

    // Night Mode Toggle
    const btnNight = document.getElementById('btnNightToggle');
    if (btnNight) {
      btnNight.addEventListener('click', () => {
        this.toggleNightMode();
      });
    }

    // Voice Selection & Studio Modal Trigger
    const btnVoice = document.getElementById('btnVoiceTest');
    if (btnVoice) {
      btnVoice.addEventListener('click', () => {
        window.soundSys.playPop();
        const modal = document.getElementById('voiceStudioModal');
        if (modal) {
          modal.classList.add('active');
          window.soundSys.updateVoiceUI();
        } else {
          window.soundSys.previewVoice(window.soundSys.selectedVoiceId);
        }
      });
    }

    // Header Quick Voice Selector Dropdown
    const voiceSelect = document.getElementById('voiceSelect');
    if (voiceSelect) {
      voiceSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        window.soundSys.setVoice(val);
        const info = window.soundSys.getVoiceTitle(val);
        window.rewards.showToast(`🎙️ Đã chọn: ${info.name}`, 3000);
        window.soundSys.previewVoice(val);
      });
    }

    // Star Badge Click -> Jump to Awards tab
    const starBadge = document.getElementById('starBadge');
    if (starBadge) {
      starBadge.addEventListener('click', () => {
        this.switchTab('tab-awards');
      });
    }

    // Lucky Wheel Trigger Button in Header or Awards
    const btnOpenWheel = document.getElementById('btnOpenLuckyWheel');
    const wheelModal = document.getElementById('luckyWheelModal');
    const btnCloseWheel = document.getElementById('btnCloseWheelModal');

    if (btnOpenWheel && wheelModal) {
      btnOpenWheel.addEventListener('click', () => {
        window.soundSys.playPop();
        wheelModal.classList.add('active');
      });
    }

    if (btnCloseWheel && wheelModal) {
      btnCloseWheel.addEventListener('click', () => {
        wheelModal.classList.remove('active');
      });
    }

    // Touch-friendly: Dismiss modals when tapping backdrop
    document.querySelectorAll('.app-modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    });
  }

  // --- Mascot Companion Selector Modal ---
  bindMascotModal() {
    const avatar = document.getElementById('mascotAvatar');
    const modal = document.getElementById('mascotSelectModal');
    const btnClose = document.getElementById('btnCloseMascotModal');

    if (avatar && modal) {
      avatar.addEventListener('click', () => {
        window.soundSys.playPop();
        modal.classList.add('active');
      });
    }

    if (btnClose && modal) {
      btnClose.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }

    // Mascot Option Cards
    const mascotCards = document.querySelectorAll('.mascot-pick-card');
    mascotCards.forEach(card => {
      card.addEventListener('click', () => {
        const mascotId = card.dataset.mascot;
        window.rewards.setMascot(mascotId);
        mascotCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        setTimeout(() => {
          if (modal) modal.classList.remove('active');
        }, 500);
      });
    });
  }

  // --- Voice Studio Modal Controls ---
  bindVoiceModal() {
    const modal = document.getElementById('voiceStudioModal');
    const btnClose = document.getElementById('btnCloseVoiceModal');

    if (btnClose && modal) {
      btnClose.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }

    // Voice Preview Buttons
    document.querySelectorAll('.btn-voice-preview').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.soundSys.playPop();
        const voiceId = btn.dataset.voiceId;
        window.soundSys.previewVoice(voiceId);
      });
    });

    // Voice Select Buttons
    document.querySelectorAll('.btn-select-voice').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.soundSys.playPop();
        const voiceId = btn.dataset.voiceId;
        window.soundSys.setVoice(voiceId);
        const info = window.soundSys.getVoiceTitle(voiceId);
        window.rewards.showToast(`🎉 Đã chọn: ${info.name}!`, 3500);
        window.soundSys.previewVoice(voiceId);
      });
    });

    // Voice Card Click Select
    document.querySelectorAll('.voice-studio-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-voice-preview')) return;
        window.soundSys.playPop();
        const voiceId = card.dataset.voiceId;
        window.soundSys.setVoice(voiceId);
        const info = window.soundSys.getVoiceTitle(voiceId);
        window.rewards.showToast(`🎉 Đã chọn: ${info.name}!`, 3500);
        window.soundSys.previewVoice(voiceId);
      });
    });
  }

  // --- Speech Rate Preset Controls ---
  bindSpeechRateControls() {
    const rateBtns = document.querySelectorAll('.speed-pill-btn');
    const currentPreset = window.soundSys.speechRatePreset || 'normal';
    rateBtns.forEach(b => {
      b.classList.toggle('active', b.dataset.speed === currentPreset);
    });

    rateBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        rateBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const speed = btn.dataset.speed; // 'slow', 'normal', 'fast'
        window.soundSys.setSpeechRate(speed);
        window.soundSys.playPop();

        const labels = { slow: 'Chậm (0.75x)', normal: 'Chuẩn (1.0x)', fast: 'Nhanh (1.1x)' };
        window.rewards.showToast(`⏱️ Đã đặt tốc độ đọc: ${labels[speed] || speed}`);
        window.soundSys.speak("Cô đã điều chỉnh tốc độ nói rồi nè bé!");
      });
    });
  }

  setRandomTip() {
    const tipEl = document.getElementById('dailyTipText');
    if (tipEl) {
      const tip = this.tips[Math.floor(Math.random() * this.tips.length)];
      tipEl.textContent = `"${tip}"`;
    }
  }
}

// Global voice selector callback
window.updateVoiceSelectorUI = function(voices, selectedVoice) {
  if (window.soundSys && typeof window.soundSys.updateVoiceUI === 'function') {
    window.soundSys.updateVoiceUI();
  }
};

// Start app on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new MainApp();
});
