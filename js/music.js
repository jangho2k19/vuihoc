/* ========================================================
   MUSIC & XYLOPHONE MODULE (Phím Đàn Âm Nhạc Cho Bé)
   8-key colorful musical keyboard with acoustic xylophone synth,
   Free play mode & Song play-along guided practice
   ======================================================== */

class MusicApp {
  constructor() {
    this.keys = [
      { note: 'C4', name: 'Đồ', solfege: 'Do', freq: 261.63, color: '#e63946', height: '100%' },
      { note: 'D4', name: 'Rê', solfege: 'Re', freq: 293.66, color: '#f77f00', height: '94%' },
      { note: 'E4', name: 'Mi', solfege: 'Mi', freq: 329.63, color: '#ffd166', height: '88%' },
      { note: 'F4', name: 'Pha', solfege: 'Fa', freq: 349.23, color: '#06d6a0', height: '82%' },
      { note: 'G4', name: 'Son', solfege: 'Sol', freq: 392.00, color: '#118ab2', height: '76%' },
      { note: 'A4', name: 'La', solfege: 'La', freq: 440.00, color: '#4361ee', height: '70%' },
      { note: 'B4', name: 'Si', solfege: 'Ti', freq: 493.88, color: '#7209b7', height: '64%' },
      { note: 'C5', name: 'Đố', solfege: 'Do', freq: 523.25, color: '#f72585', height: '58%' }
    ];

    this.songs = [
      {
        id: 'butterfly',
        title: '🦋 Kìa Con Bướm Vàng',
        notes: ['C4', 'D4', 'E4', 'C4', 'C4', 'D4', 'E4', 'C4', 'E4', 'F4', 'G4', 'E4', 'F4', 'G4'],
        lyrics: ['Kìa', 'con', 'bướm', 'vàng,', 'kìa', 'con', 'bướm', 'vàng,', 'xòe', 'đôi', 'cánh,', 'xòe', 'đôi', 'cánh...']
      },
      {
        id: 'star',
        title: '🌟 Ngôi Sao Lấp Lánh (Twinkle Star)',
        notes: ['C4', 'C4', 'G4', 'G4', 'A4', 'A4', 'G4', 'F4', 'F4', 'E4', 'E4', 'D4', 'D4', 'C4'],
        lyrics: ['Twinkle,', 'twinkle,', 'little', 'star,', 'how', 'I', 'wonder', 'what', 'you', 'are,', 'up', 'above', 'the', 'world...']
      },
      {
        id: 'birthday',
        title: '🎂 Chúc Mừng Sinh Nhật (Happy Birthday)',
        notes: ['C4', 'C4', 'D4', 'C4', 'F4', 'E4', 'C4', 'C4', 'D4', 'C4', 'G4', 'F4'],
        lyrics: ['Mừng', 'ngày', 'sinh', 'nhật', 'bé', 'yêu,', 'chúc', 'bé', 'chăm', 'ngoan', 'học', 'giỏi!']
      },
      {
        id: 'frog',
        title: '🐸 Chú Ếch Con',
        notes: ['C4', 'D4', 'E4', 'G4', 'E4', 'D4', 'C4', 'C4', 'D4', 'E4', 'G4', 'A4', 'G4', 'E4'],
        lyrics: ['Kìa', 'chú', 'là', 'chú', 'ếch', 'con,', 'có', 'hai', 'là', 'hai', 'mắt', 'tròn', 'xoe...']
      }
    ];

    this.currentMode = 'free'; // 'free' or 'song'
    this.currentSongIndex = 0;
    this.songStep = 0;

    this.init();
  }

  init() {
    this.renderKeyboard();
    this.renderSongButtons();
    this.attachEvents();
  }

  renderKeyboard() {
    const board = document.getElementById('xylophoneBoard');
    if (!board) return;
    board.innerHTML = '';

    this.keys.forEach((k, idx) => {
      const bar = document.createElement('div');
      bar.className = 'xylo-bar';
      bar.dataset.note = k.note;
      bar.style.backgroundColor = k.color;
      bar.style.height = k.height;

      bar.innerHTML = `
        <div class="xylo-pin top"></div>
        <div class="xylo-label">
          <span class="xylo-solfege">${k.name}</span>
          <span class="xylo-note">${k.note.replace('4', '').replace('5', '\'')}</span>
        </div>
        <div class="xylo-pin bottom"></div>
      `;

      bar.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.hitKey(k, bar);
      });

      board.appendChild(bar);
    });
  }

  renderSongButtons() {
    const songNav = document.getElementById('musicSongNav');
    if (!songNav) return;
    songNav.innerHTML = '';

    const btnFree = document.createElement('button');
    btnFree.className = `sub-btn ${this.currentMode === 'free' ? 'active' : ''}`;
    btnFree.textContent = '🎶 Gõ Đàn Tự Do';
    btnFree.addEventListener('click', () => {
      this.currentMode = 'free';
      this.highlightActiveSongButton();
      this.updateSongGuideUI();
    });
    songNav.appendChild(btnFree);

    this.songs.forEach((song, idx) => {
      const btn = document.createElement('button');
      btn.className = `sub-btn ${this.currentMode === 'song' && this.currentSongIndex === idx ? 'active' : ''}`;
      btn.textContent = song.title;
      btn.addEventListener('click', () => {
        this.startSongPractice(idx);
      });
      songNav.appendChild(btn);
    });
  }

  highlightActiveSongButton() {
    const btns = document.querySelectorAll('#musicSongNav .sub-btn');
    btns.forEach((b, idx) => {
      if (this.currentMode === 'free' && idx === 0) b.classList.add('active');
      else if (this.currentMode === 'song' && idx === (this.currentSongIndex + 1)) b.classList.add('active');
      else b.classList.remove('active');
    });
  }

  attachEvents() {
    // Demo Song Button (Listen cô giáo đàn mẫu)
    const btnDemo = document.getElementById('btnMusicDemoSong');
    if (btnDemo) {
      btnDemo.addEventListener('click', () => {
        this.playDemoSong();
      });
    }

    // Reset practice button
    const btnReset = document.getElementById('btnMusicResetSong');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        window.soundSys.playPop();
        this.songStep = 0;
        this.updateSongGuideUI();
        this.highlightNextKey();
      });
    }
  }

  hitKey(keyObj, barEl) {
    // Sound
    window.soundSys.playXylophoneKey(keyObj.freq);

    // Visual strike animation
    barEl.classList.remove('struck');
    void barEl.offsetWidth; // trigger reflow
    barEl.classList.add('struck');

    // Float note bubble
    this.spawnMusicNoteBubble(barEl, keyObj.name);

    // If in Song Practice Mode
    if (this.currentMode === 'song') {
      const currentSong = this.songs[this.currentSongIndex];
      const targetNote = currentSong.notes[this.songStep];

      if (keyObj.note === targetNote) {
        // Correct key!
        this.songStep++;
        this.updateSongGuideUI();

        if (this.songStep >= currentSong.notes.length) {
          // Completed song!
          setTimeout(() => {
            window.soundSys.playFanfare();
            window.rewards.triggerConfetti(65);
            window.rewards.addStars(3, `Bé hoàn thành xuất sắc bài "${currentSong.title}"!`);
            window.rewards.recordActivity('musicSongsCompleted', 1);

            const guideEl = document.getElementById('musicGuidePrompt');
            if (guideEl) {
              guideEl.innerHTML = `🎉 <strong>Hoan hô!</strong> Bé đã đàn xong bài <em>${currentSong.title}</em> rồi! Bé có đôi tai âm nhạc tuyệt vời!`;
            }
            window.soundSys.speak(`Hoan hô! Bé đàn bài ${currentSong.title} hay quá chừng luôn!`);
          }, 350);
        } else {
          this.highlightNextKey();
        }
      } else {
        // Wrong key in practice mode
        barEl.classList.add('wrong-hit');
        setTimeout(() => barEl.classList.remove('wrong-hit'), 400);
      }
    }
  }

  spawnMusicNoteBubble(barEl, noteName) {
    const bubble = document.createElement('div');
    bubble.className = 'music-note-bubble';
    const notesSymbols = ['🎵', '🎶', '✨', '⭐'];
    const sym = notesSymbols[Math.floor(Math.random() * notesSymbols.length)];
    bubble.textContent = `${sym} ${noteName}`;

    barEl.appendChild(bubble);
    setTimeout(() => {
      if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
    }, 900);
  }

  startSongPractice(songIdx) {
    this.currentMode = 'song';
    this.currentSongIndex = songIdx;
    this.songStep = 0;

    this.highlightActiveSongButton();
    this.updateSongGuideUI();
    this.highlightNextKey();

    const currentSong = this.songs[songIdx];
    window.soundSys.speak(`Cùng tập đàn bài ${currentSong.title} nha bé! Bấm vào phím đang phát sáng nhé!`);
  }

  updateSongGuideUI() {
    const guideBox = document.getElementById('musicGuidePrompt');
    const progressEl = document.getElementById('musicSongProgress');
    const nextNoteEl = document.getElementById('musicNextNoteTarget');

    if (!guideBox) return;

    if (this.currentMode === 'free') {
      guideBox.innerHTML = `💡 <strong>Chế độ tự do:</strong> Bé hãy thoải mái gõ từng phím đàn màu sắc để tạo nên giai điệu của riêng mình nhé!`;
      if (progressEl) progressEl.textContent = '--';
      if (nextNoteEl) nextNoteEl.textContent = 'Tự do';
      this.clearKeyHighlights();
      return;
    }

    const currentSong = this.songs[this.currentSongIndex];
    const total = currentSong.notes.length;
    const currentNoteCode = currentSong.notes[this.songStep] || '';
    const currentKeyObj = this.keys.find(k => k.note === currentNoteCode);
    const lyricWord = currentSong.lyrics[this.songStep] || '';

    if (progressEl) progressEl.textContent = `${this.songStep} / ${total}`;
    if (nextNoteEl && currentKeyObj) {
      nextNoteEl.textContent = `${currentKeyObj.name} (${lyricWord})`;
    }

    guideBox.innerHTML = `
      🎶 <strong>Bài đang tập:</strong> ${currentSong.title} • 
      Bé hãy gõ nốt tiếp theo: <span class="highlight-target-note">${currentKeyObj ? currentKeyObj.name : 'Hoàn thành'}</span> 
      <small style="margin-left: 8px; color: #475569;">(Lời: "${lyricWord}")</small>
    `;
  }

  highlightNextKey() {
    this.clearKeyHighlights();
    if (this.currentMode !== 'song') return;

    const currentSong = this.songs[this.currentSongIndex];
    if (this.songStep >= currentSong.notes.length) return;

    const targetNote = currentSong.notes[this.songStep];
    const targetBar = document.querySelector(`.xylo-bar[data-note="${targetNote}"]`);
    if (targetBar) {
      targetBar.classList.add('guiding-pulse');
    }
  }

  clearKeyHighlights() {
    const bars = document.querySelectorAll('.xylo-bar');
    bars.forEach(b => b.classList.remove('guiding-pulse'));
  }

  playDemoSong() {
    if (this.currentMode !== 'song') {
      this.startSongPractice(0);
    }

    const currentSong = this.songs[this.currentSongIndex];
    this.songStep = 0;
    this.updateSongGuideUI();
    this.clearKeyHighlights();

    // Auto play notes sequentially
    currentSong.notes.forEach((noteCode, idx) => {
      setTimeout(() => {
        const keyObj = this.keys.find(k => k.note === noteCode);
        const barEl = document.querySelector(`.xylo-bar[data-note="${noteCode}"]`);
        if (keyObj && barEl) {
          this.hitKey(keyObj, barEl);
        }

        // When demo finishes, guide player
        if (idx === currentSong.notes.length - 1) {
          setTimeout(() => {
            this.songStep = 0;
            this.updateSongGuideUI();
            this.highlightNextKey();
          }, 600);
        }
      }, idx * 450);
    });
  }
}

// Global instance
window.musicApp = null;
