/* ========================================================
   MAIN APPLICATION ORCHESTRATOR
   ======================================================== */

class MainApp {
  constructor() {
    this.currentTab = 'tab-home';
    this.tips = [
      "Mỗi ngày học một chút điều mới, bé sẽ thông minh và đáng yêu hơn từng ngày! Chúc bé học thật vui nhé! 🌟",
      "Bé nhớ ngồi thẳng lưng và giữ khoảng cách mắt với màn hình để bảo vệ mắt sáng ngời nha! 👀",
      "Học xong nhớ khoe phiếu khen và các ngôi sao may mắn với bố mẹ nhé! Bố mẹ rất tự hào về bé! ❤️",
      "Chăm chỉ làm toán và đọc bảng chữ cái sẽ giúp bé thành học sinh xuất sắc nhất lớp 1 đó! 🏆",
      "Vừa học vừa chơi, tuổi thơ rạng rỡ tiếng cười! Cùng khám phá thêm nhiều điều kỳ thú nhé! 🎈"
    ];

    this.init();
  }

  init() {
    this.bindNavigation();
    this.bindHeaderButtons();
    this.bindMascot();
    this.setRandomTip();

    // Initialize sub-modules
    window.mathApp = new MathApp();
    window.vnApp = new VietnameseApp();
    window.balloonGame = new BalloonGame();
    window.memoryGame = new MemoryGame();
    window.drawingApp = new DrawingApp();

    console.log("Vườn Tuổi Thơ - Lớp 1 App ready!");
  }

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

    // Special behavior per tab
    if (targetId === 'tab-math' && window.mathApp) {
      window.mathApp.loadQuestion();
    } else if (targetId === 'tab-balloon' && window.balloonGame) {
      // Prompt user to play
    } else if (targetId === 'tab-awards') {
      window.rewards.updateUI();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

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

    // Voice Test Button
    const btnVoice = document.getElementById('btnVoiceTest');
    if (btnVoice) {
      btnVoice.addEventListener('click', () => {
        window.soundSys.playPop();
        const testPhrase = "Dạ cô chào bé cưng nghen! Cô là cô giáo miền Nam, cô đồng hành cùng bé học bài nè!";
        window.rewards.showToast("👩‍🏫 Giọng cô giáo miền Nam: Ngọt ngào & ấm áp!", 3500);
        window.soundSys.speak(testPhrase);
      });
    }

    // Voice Selector Dropdown
    const voiceSelect = document.getElementById('voiceSelect');
    if (voiceSelect) {
      voiceSelect.addEventListener('change', (e) => {
        const idx = parseInt(e.target.value, 10);
        window.soundSys.setVoice(idx);
        window.soundSys.speak("Cô đổi giọng đọc rồi nè bé ơi!");
      });
    }

    // Star Badge Click -> Jump to Awards tab
    const starBadge = document.getElementById('starBadge');
    if (starBadge) {
      starBadge.addEventListener('click', () => {
        this.switchTab('tab-awards');
      });
    }
  }

  bindMascot() {
    const avatar = document.getElementById('mascotAvatar');
    if (avatar) {
      avatar.addEventListener('click', () => {
        window.soundSys.playPop();
        const greetings = [
          "Dạ cô chào bé cưng nghen! Chúc bé một ngày học thiệt là vui nè!",
          "Bé của cô học giỏi và chăm chỉ quá chừng nè!",
          "Cố lên nghen bé, bạn Gấu Nâu luôn thương và cổ vũ bé nè!",
          "Bé đã thu thập thêm được bao nhiêu ngôi sao may mắn rồi ta?"
        ];
        const msg = greetings[Math.floor(Math.random() * greetings.length)];
        window.rewards.showToast(`🐻 ${msg}`, 4000);
        window.soundSys.speak(msg);
      });
    }
  }

  setRandomTip() {
    const tipEl = document.getElementById('dailyTipText');
    if (tipEl) {
      const tip = this.tips[Math.floor(Math.random() * this.tips.length)];
      tipEl.textContent = `"${tip}"`;
    }
  }
}

// Global hook to populate voice dropdown when voices are loaded
window.updateVoiceSelectorUI = function(voices, selectedVoice) {
  const select = document.getElementById('voiceSelect');
  const statusText = document.getElementById('voiceStatusText');
  if (!select) return;

  select.innerHTML = '';
  if (!voices || voices.length === 0) {
    const opt = document.createElement('option');
    opt.value = '0';
    opt.textContent = 'Giọng mặc định (Nữ)';
    select.appendChild(opt);
    return;
  }

  voices.forEach((v, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = v.name.replace('Microsoft ', '').replace('Online (Natural)', '').replace(' - Vietnamese (Vietnam)', ' (VN)');
    if (selectedVoice && v === selectedVoice) {
      opt.selected = true;
    }
    select.appendChild(opt);
  });

  if (statusText && selectedVoice) {
    statusText.textContent = `Giọng: Nữ miền Nam`;
  }
};

// Start app on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new MainApp();
  // Attempt initial populate if voices already ready
  if (window.soundSys && window.soundSys.allViVoices) {
    window.updateVoiceSelectorUI(window.soundSys.allViVoices, window.soundSys.vietnameseVoice);
  }
});
