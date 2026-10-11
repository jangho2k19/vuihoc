/* ========================================================
   AUDIO SYSTEM (Web Audio API Synthesizer & Neural TTS)
   Zero external audio files needed - 100% reliable & rich!
   ======================================================== */

// High-speed pure JS MD5 hashing for static audio cache resolution
function computeMd5(string) {
  function rotateLeft(lValue, iShiftBits) { return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits)); }
  function addUnsigned(lX, lY) {
    var lX4 = (lX & 0x40000000), lY4 = (lY & 0x40000000);
    var lX8 = (lX & 0x80000000), lY8 = (lY & 0x80000000);
    var lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);
    if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    if (lX4 | lY4) {
      if (lResult & 0x40000000) return (lResult ^ 0xc0000000 ^ lX8 ^ lY8);
      else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
    } else return (lResult ^ lX8 ^ lY8);
  }
  function f(x, y, z) { return (x & y) | ((~x) & z); }
  function g(x, y, z) { return (x & z) | (y & (~z)); }
  function h(x, y, z) { return (x ^ y ^ z); }
  function i(x, y, z) { return (y ^ (x | (~z))); }
  function ff(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(f(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function gg(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(g(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function hh(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(h(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function ii(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(i(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function convertToWordArray(string) {
    var lWordCount;
    var lMessageLength = string.length;
    var lNumberOfWords_temp1 = lMessageLength + 8;
    var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    var lWordArray = Array(lNumberOfWords - 1);
    var lBytePosition = 0, lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  }
  function wordToHex(lValue) {
    var wordToHexValue = '', wordToHexValue_temp = '', lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      wordToHexValue_temp = '0' + lByte.toString(16);
      wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
    }
    return wordToHexValue;
  }
  function utf8Encode(string) {
    return unescape(encodeURIComponent(string));
  }
  var x = Array();
  var k, AA, BB, CC, DD, a, b, c, d;
  var S11=7, S12=12, S13=17, S14=22;
  var S21=5, S22=9 , S23=14, S24=20;
  var S31=4, S32=11, S33=16, S34=23;
  var S41=6, S42=10, S43=15, S44=21;
  string = utf8Encode(string);
  x = convertToWordArray(string);
  a = 0x67452301; b = 0xefcdab89; c = 0x98badcfe; d = 0x10325476;
  for (k = 0; k < x.length; k += 16) {
    AA = a; BB = b; CC = c; DD = d;
    a = ff(a, b, c, d, x[k+0],  S11, 0xd76aa478);
    d = ff(d, a, b, c, x[k+1],  S12, 0xe8c7b756);
    c = ff(c, d, a, b, x[k+2],  S13, 0x242070db);
    b = ff(b, c, d, a, x[k+3],  S14, 0xc1bdceee);
    a = ff(a, b, c, d, x[k+4],  S11, 0xf57c0faf);
    d = ff(d, a, b, c, x[k+5],  S12, 0x4787c62a);
    c = ff(c, d, a, b, x[k+6],  S13, 0xa8304613);
    b = ff(b, c, d, a, x[k+7],  S14, 0xfd469501);
    a = ff(a, b, c, d, x[k+8],  S11, 0x698098d8);
    d = ff(d, a, b, c, x[k+9],  S12, 0x8b44f7af);
    c = ff(c, d, a, b, x[k+10], S13, 0xffff5bb1);
    b = ff(b, c, d, a, x[k+11], S14, 0x895cd7be);
    a = ff(a, b, c, d, x[k+12], S11, 0x6b901122);
    d = ff(d, a, b, c, x[k+13], S12, 0xfd987193);
    c = ff(c, d, a, b, x[k+14], S13, 0xa679438e);
    b = ff(b, c, d, a, x[k+15], S14, 0x49b40821);
    a = gg(a, b, c, d, x[k+1],  S21, 0xf61e2562);
    d = gg(d, a, b, c, x[k+6],  S22, 0xc040b340);
    c = gg(c, d, a, b, x[k+11], S23, 0x265e5a51);
    b = gg(b, c, d, a, x[k+0],  S24, 0xe9b6c7aa);
    a = gg(a, b, c, d, x[k+5],  S21, 0xd62f105d);
    d = gg(d, a, b, c, x[k+10], S22, 0x2441453);
    c = gg(c, d, a, b, x[k+15], S23, 0xd8a1e681);
    b = gg(b, c, d, a, x[k+4],  S24, 0xe7d3fbc8);
    a = gg(a, b, c, d, x[k+9],  S21, 0x21e1cde6);
    d = gg(d, a, b, c, x[k+14], S22, 0xc33707d6);
    c = gg(c, d, a, b, x[k+3],  S23, 0xf4d50d87);
    b = gg(b, c, d, a, x[k+8],  S24, 0x455a14ed);
    a = gg(a, b, c, d, x[k+13], S21, 0xa9e3e905);
    d = gg(d, a, b, c, x[k+2],  S22, 0xfcefa3f8);
    c = gg(c, d, a, b, x[k+7],  S23, 0x676f02d9);
    b = gg(b, c, d, a, x[k+12], S24, 0x8d2a4c8a);
    a = hh(a, b, c, d, x[k+5],  S31, 0xfffa3942);
    d = hh(d, a, b, c, x[k+8],  S32, 0x8771f681);
    c = hh(c, d, a, b, x[k+11], S33, 0x6d9d6122);
    b = hh(b, c, d, a, x[k+14], S34, 0xfde5380c);
    a = hh(a, b, c, d, x[k+1],  S31, 0xa4beea44);
    d = hh(d, a, b, c, x[k+4],  S32, 0x4bdecfa9);
    c = hh(c, d, a, b, x[k+7],  S33, 0xf6bb4b60);
    b = hh(b, c, d, a, x[k+10], S34, 0xbebfbc70);
    a = hh(a, b, c, d, x[k+13], S31, 0x289b7ec6);
    d = hh(d, a, b, c, x[k+0],  S32, 0xeaa127fa);
    c = hh(c, d, a, b, x[k+3],  S33, 0xd4ef3085);
    b = hh(b, c, d, a, x[k+6],  S34, 0x4881d05);
    a = hh(a, b, c, d, x[k+9],  S31, 0xd9d4d039);
    d = hh(d, a, b, c, x[k+12], S32, 0xe6db99e5);
    c = hh(c, d, a, b, x[k+15], S33, 0x1fa27cf8);
    b = hh(b, c, d, a, x[k+2],  S34, 0xc4ac5665);
    a = ii(a, b, c, d, x[k+0],  S41, 0xf4292244);
    d = ii(d, a, b, c, x[k+7],  S42, 0x432aff97);
    c = ii(c, d, a, b, x[k+14], S43, 0xab9423a7);
    b = ii(b, c, d, a, x[k+5],  S44, 0xfc93a039);
    a = ii(a, b, c, d, x[k+12], S41, 0x655b59c3);
    d = ii(d, a, b, c, x[k+3],  S42, 0x8f0ccc92);
    c = ii(c, d, a, b, x[k+10], S43, 0xffeff47d);
    b = ii(b, c, d, a, x[k+1],  S44, 0x85845dd1);
    a = ii(a, b, c, d, x[k+8],  S41, 0x6fa87e4f);
    d = ii(d, a, b, c, x[k+15], S42, 0xfe2ce6e0);
    c = ii(c, d, a, b, x[k+6],  S43, 0xa3014314);
    b = ii(b, c, d, a, x[k+13], S44, 0x4e0811a1);
    a = ii(a, b, c, d, x[k+4],  S41, 0xf7537e82);
    d = ii(d, a, b, c, x[k+11], S42, 0xbd3af235);
    c = ii(c, d, a, b, x[k+2],  S43, 0x2ad7d2bb);
    b = ii(b, c, d, a, x[k+9],  S44, 0xeb86d391);
    a = addUnsigned(a, AA); b = addUnsigned(b, BB); c = addUnsigned(c, CC); d = addUnsigned(d, DD);
  }
  return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
}

class SoundSystem {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = true;
    this.musicEnabled = false;
    this.musicTimer = null;
    this.speechSynth = window.speechSynthesis;
    this.vietnameseVoice = null;
    this.englishVoice = null;
    this.allViVoices = [];
    this.voicePitch = 1.25; // Gentle, sweet feminine pitch
    this.voiceRate = 0.86;  // Clear, friendly pace for 1st grade children
    
    // Persistent voice preference
    let savedVoice = 'vi-VN-HoaiMyNeural';
    let savedRate = 'normal';
    try {
      savedVoice = localStorage.getItem('vuon_tuoi_tho_voice') || 'vi-VN-HoaiMyNeural';
      savedRate = localStorage.getItem('vuon_tuoi_tho_rate') || 'normal';
    } catch (e) {}

    this.selectedVoiceId = savedVoice;
    this.serverVoice = savedVoice;
    this.speechRatePreset = savedRate;
    this.setSpeechRate(savedRate, false);

    // Dedicated Single Audio Player instance for zero concurrency/overlap
    this.audioPlayer = new Audio();
    this.speechToken = 0;
    this.activeCallback = null;

    this.initAudioContext();
    this.initAudioPlayer();
    this.loadVoices();
  }

  initAudioPlayer() {
    // Managed dynamically by playAudioUrl for precise per-token fallbacks
  }

  handleAudioEnded() {
    this.isSpeakingNow = false;
    const voiceBtn = document.getElementById('btnVoiceTest');
    if (voiceBtn) voiceBtn.classList.remove('speaking');

    if (typeof this.activeCallback === 'function') {
      const cb = this.activeCallback;
      this.activeCallback = null;
      try { cb(); } catch (e) {}
    }
  }

  finishSpeech(token) {
    if (this.speechToken !== token) return;
    this.handleAudioEnded();
  }

  initAudioContext() {
    // Initialize upon interaction and keep context active
    const resume = () => {
      if (!this.audioCtx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.audioCtx = new AudioCtx();
        }
      } else if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    };
    window.addEventListener('click', resume, { passive: true });
    window.addEventListener('touchstart', resume, { passive: true });
    window.addEventListener('keydown', resume, { passive: true });
  }

  loadVoices() {
    if (!this.speechSynth) return;
    const findVoice = () => {
      const voices = this.speechSynth.getVoices();
      
      // Filter Vietnamese voices
      this.allViVoices = voices.filter(v => 
        (v.lang && (v.lang.startsWith('vi') || v.lang.toLowerCase().includes('vietnam'))) || 
        v.name.toLowerCase().includes('vietnam')
      );

      // Detect authentic Southern Vietnamese voice (e.g., Linh on iOS/macOS, or southern tags)
      const southernVoice = this.allViVoices.find(v => {
        const n = v.name.toLowerCase();
        return n.includes('linh') || n.includes('south') || n.includes('saigon') || n.includes('hcm') || n.includes('mien nam');
      });

      this.hasSouthernDeviceVoice = !!southernVoice;
      this.southernVoice = southernVoice || null;

      // Default Vietnamese voice for device synthesis
      const femaleVoice = southernVoice || this.allViVoices.find(v => {
        const n = v.name.toLowerCase();
        return !n.includes('nam') && !n.includes('male') && !n.includes('anh');
      }) || this.allViVoices[0] || null;

      this.vietnameseVoice = femaleVoice;

      // English voice for Grade 1 English module
      this.englishVoice = voices.find(v => 
        (v.lang && (v.lang.startsWith('en-US') || v.lang.startsWith('en-GB'))) && 
        (v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('female'))
      ) || voices.find(v => v.lang && v.lang.startsWith('en')) || null;

      // Update UI while preserving user's saved choice
      this.updateVoiceUI();
    };

    findVoice();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = findVoice;
    }
  }

  setVoice(voiceId) {
    this.selectedVoiceId = 'vi-VN-HoaiMyNeural';
    this.serverVoice = 'vi-VN-HoaiMyNeural';
    try {
      localStorage.setItem('vuon_tuoi_tho_voice', 'vi-VN-HoaiMyNeural');
    } catch (e) {}

    this.updateVoiceUI();
  }

  setServerVoice(voiceId) {
    this.setVoice('vi-VN-HoaiMyNeural');
  }

  getVoiceTitle(voiceId) {
    return { 
      name: 'Cô giáo Hoài My (Nữ miền Bắc - Dịu dàng, chuẩn sư phạm Lớp 1)', 
      short: 'Cô Hoài My', 
      icon: '👩‍🏫' 
    };
  }

  updateVoiceUI() {
    const info = this.getVoiceTitle();
    
    // Header Status Badge
    const statusText = document.getElementById('voiceStatusText');
    if (statusText) {
      statusText.textContent = info.short;
    }

    // Header voice button icon
    const voiceBtn = document.getElementById('btnVoiceTest');
    if (voiceBtn) {
      const iconSpan = voiceBtn.querySelector('.btn-icon');
      if (iconSpan) iconSpan.textContent = info.icon;
      voiceBtn.title = 'Giọng đọc chuẩn: Cô giáo Hoài My (Bấm để nghe cô chào)';
    }

    // Dropdown Sync
    const select = document.getElementById('voiceSelect');
    if (select) {
      select.innerHTML = `
        <option value="vi-VN-HoaiMyNeural">👩‍🏫 Cô giáo Hoài My (Nữ miền Bắc - Dịu dàng, chuẩn sư phạm Lớp 1)</option>
      `;
      select.value = 'vi-VN-HoaiMyNeural';
    }

    // Voice Modal Cards Highlight
    document.querySelectorAll('.voice-studio-card').forEach(card => {
      const cardVoiceId = card.dataset.voiceId;
      const isSelected = (cardVoiceId === 'vi-VN-HoaiMyNeural');
      card.classList.toggle('selected', isSelected);
      const selectBtn = card.querySelector('.btn-select-voice');
      if (selectBtn) {
        selectBtn.textContent = isSelected ? '✓ Đang Dùng' : 'Chọn Giọng Này';
        selectBtn.classList.toggle('active', isSelected);
      }
    });
  }

  previewVoice(voiceId) {
    const sampleText = 'Cô giáo chào các em học sinh yêu quý! Chúc các em một ngày học tập thật vui và đạt nhiều điểm mười nhé!';
    this.speakWithVoice(sampleText, 'vi-VN-HoaiMyNeural');
  }

  setSpeechRate(preset, save = true) {
    this.speechRatePreset = preset;
    if (preset === 'slow') {
      this.voiceRate = 0.72;
    } else if (preset === 'fast') {
      this.voiceRate = 1.05;
    } else {
      this.voiceRate = 0.86;
    }
    if (save) {
      try { localStorage.setItem('vuon_tuoi_tho_rate', preset); } catch (e) {}
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    return this.soundEnabled;
  }

  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    if (this.musicEnabled) {
      this.startBackgroundMelody();
    } else {
      this.stopBackgroundMelody();
    }
    return this.musicEnabled;
  }

  // --- Sound Effects using Synthesizer ---

  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1) {
    if (!this.soundEnabled || !this.audioCtx) return;
    try {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio playTone error", e);
    }
  }

  playPop() {
    if (!this.soundEnabled || !this.audioCtx) return;
    try {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const t = this.audioCtx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, t);
      osc.frequency.exponentialRampToValueAtTime(150, t + 0.08);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(t + 0.08);
    } catch (e) {}
  }

  playCorrect() {
    if (!this.soundEnabled) return;
    // Chime C5 -> E5 -> G5 -> C6
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.22, 0.12);
      }, idx * 75);
    });
  }

  playCombo(count) {
    if (!this.soundEnabled) return;
    // Ascending celebratory arpeggio with brightness
    const baseFreqs = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    const steps = Math.min(count, 5);
    for (let i = 0; i < steps; i++) {
      setTimeout(() => {
        this.playTone(baseFreqs[i], 'triangle', 0.2, 0.14);
      }, i * 65);
    }
  }

  playWrong() {
    if (!this.soundEnabled) return;
    // Low double bonk
    this.playTone(220, 'sawtooth', 0.18, 0.08);
    setTimeout(() => {
      this.playTone(180, 'sawtooth', 0.25, 0.08);
    }, 120);
  }

  playCardFlip() {
    if (!this.soundEnabled) return;
    this.playTone(600, 'sine', 0.06, 0.05);
  }

  playFanfare() {
    if (!this.soundEnabled) return;
    // Joyful celebration fanfare
    const melody = [
      { f: 523.25, d: 0.12 }, // C5
      { f: 659.25, d: 0.12 }, // E5
      { f: 783.99, d: 0.12 }, // G5
      { f: 1046.50, d: 0.35 } // C6
    ];
    let time = 0;
    melody.forEach((note) => {
      setTimeout(() => {
        this.playTone(note.f, 'triangle', note.d, 0.18);
      }, time * 1000);
      time += note.d + 0.04;
    });
  }

  // --- Real Acoustic-like Xylophone / Glockenspiel Synth ---
  playXylophoneKey(freq, duration = 0.8) {
    if (!this.soundEnabled || !this.audioCtx) return;
    try {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const now = this.audioCtx.currentTime;

      // Fundamental oscillator (sine)
      const osc1 = this.audioCtx.createOscillator();
      const gain1 = this.audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      gain1.gain.setValueAtTime(0.35, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc1.connect(gain1);
      gain1.connect(this.audioCtx.destination);

      // 3rd harmonic overtone for chime wooden bar resonance
      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 3.0, now);

      gain2.gain.setValueAtTime(0.12, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + (duration * 0.45));
      osc2.connect(gain2);
      gain2.connect(this.audioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + (duration * 0.45));
    } catch (e) {
      console.warn("Xylophone sound error", e);
    }
  }

  // --- Background Melody Loop ---
  startBackgroundMelody() {
    if (!this.audioCtx) return;
    const lofiNotes = [
      261.63, 329.63, 392.00, 523.25,
      293.66, 349.23, 440.00, 587.33
    ];
    let step = 0;
    this.musicTimer = setInterval(() => {
      if (!this.musicEnabled) return;
      const f = lofiNotes[step % lofiNotes.length];
      this.playTone(f, 'sine', 0.45, 0.025); // very soft
      step++;
    }, 550);
  }

  stopBackgroundMelody() {
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
  }

  playCelebration() {
    this.playFanfare();
  }

  // --- Strict Single-Voice Controller: Stops all sound completely ---
  stop() {
    // 1. Invalidate any ongoing asynchronous speech token
    this.speechToken = (this.speechToken || 0) + 1;
    this.activeCallback = null;
    this.isSpeakingNow = false;

    // 2. Clear any pending timers
    if (this.speechTimer) {
      clearTimeout(this.speechTimer);
      this.speechTimer = null;
    }

    // 3. Immediately halt and reset single audio player
    if (this.audioPlayer) {
      try {
        this.audioPlayer.pause();
        this.audioPlayer.onended = null;
        this.audioPlayer.onerror = null;
        this.audioPlayer.removeAttribute('src');
      } catch (e) {}
    }

    // 4. Hard stop any browser Web Speech synthesis
    if (this.speechSynth) {
      try {
        this.speechSynth.cancel();
      } catch (e) {}
    }

    // 5. Reset speaking badge animation
    const voiceBtn = document.getElementById('btnVoiceTest');
    if (voiceBtn) {
      voiceBtn.classList.remove('speaking');
    }
  }

  // --- Resilient Audio Stream Player with Token Lifecycle ---
  playAudioUrl(url, token, onErrorFallback) {
    if (this.speechToken !== token) return;

    let resolved = false;
    const cleanup = () => {
      this.audioPlayer.onended = null;
      this.audioPlayer.onerror = null;
    };

    this.audioPlayer.onended = () => {
      if (resolved) return;
      resolved = true;
      cleanup();
      if (this.speechToken === token) {
        this.finishSpeech(token);
      }
    };

    const handleFail = () => {
      if (resolved) return;
      resolved = true;
      cleanup();
      if (this.speechToken === token) {
        if (typeof onErrorFallback === 'function') {
          onErrorFallback();
        } else {
          this.finishSpeech(token);
        }
      }
    };

    this.audioPlayer.onerror = handleFail;

    try {
      this.audioPlayer.referrerPolicy = 'no-referrer';
      this.audioPlayer.src = url;
      const playPromise = this.audioPlayer.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          handleFail();
        });
      }
    } catch (e) {
      handleFail();
    }
  }

  // --- Vietnamese Speech Synthesis (4-Tier: Static Neural MP3 -> Local Server -> Google TTS -> WebSpeech) ---
  speak(text, onEnd) {
    this.speakWithVoice(text, 'vi-VN-HoaiMyNeural', onEnd);
  }

  // Speak completely, then execute callback after speech finishes + comfortable breathing pause
  speakThen(text, onComplete, breathingPauseMs = 600) {
    if (typeof onComplete !== 'function') onComplete = () => {};

    if (!this.soundEnabled || !text || !String(text).trim()) {
      setTimeout(onComplete, Math.min(breathingPauseMs, 400));
      return;
    }

    let isDone = false;
    let fallbackTimer = null;

    const doFinish = () => {
      if (isDone) return;
      isDone = true;
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
        fallbackTimer = null;
      }
      setTimeout(onComplete, breathingPauseMs);
    };

    // Calculate dynamic safety fallback: ~90ms per character + 3000ms buffer (min 4.5s, max 15s)
    const charCount = String(text).trim().length;
    const maxWaitMs = Math.max(4500, Math.min(15000, charCount * 90 + 3000));
    fallbackTimer = setTimeout(doFinish, maxWaitMs);

    this.speak(text, () => {
      doFinish();
    });
  }

  // Speak English completely, then execute callback after speech finishes
  speakEnglishThen(text, onComplete, breathingPauseMs = 600) {
    if (typeof onComplete !== 'function') onComplete = () => {};

    if (!this.soundEnabled || !text || !String(text).trim()) {
      setTimeout(onComplete, Math.min(breathingPauseMs, 400));
      return;
    }

    let isDone = false;
    let fallbackTimer = null;

    const doFinish = () => {
      if (isDone) return;
      isDone = true;
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
        fallbackTimer = null;
      }
      setTimeout(onComplete, breathingPauseMs);
    };

    const charCount = String(text).trim().length;
    const maxWaitMs = Math.max(4000, Math.min(12000, charCount * 90 + 2500));
    fallbackTimer = setTimeout(doFinish, maxWaitMs);

    this.speakEnglish(text, () => {
      doFinish();
    });
  }

  isSpeaking() {
    return !!this.isSpeakingNow;
  }

  speakWithVoice(text, voiceId, onEnd) {
    if (!this.soundEnabled || !text || !String(text).trim()) {
      if (typeof onEnd === 'function') onEnd();
      return;
    }

    // 1. Immediately abort and stop any previous speech
    this.stop();

    // 2. Generation token for strict single-voice concurrency control
    const currentToken = this.speechToken;
    this.activeCallback = onEnd;
    this.isSpeakingNow = true;

    // Visual speaking indicator on the teacher button
    const voiceBtn = document.getElementById('btnVoiceTest');
    if (voiceBtn) voiceBtn.classList.add('speaking');

    // Rate preset calculation
    let rateParam = '+0%';
    if (this.speechRatePreset === 'slow') rateParam = '-15%';
    else if (this.speechRatePreset === 'fast') rateParam = '+10%';

    const targetVoice = 'vi-VN-HoaiMyNeural';
    const cleanText = String(text).trim();

    // Strategy 4: Browser Web Speech API fallback (100% offline, zero server required)
    const tryWebSpeech = () => {
      if (this.speechToken !== currentToken) return;
      if (!this.speechSynth) {
        this.finishSpeech(currentToken);
        return;
      }
      try {
        this.speechSynth.cancel();
        const utter = new SpeechSynthesisUtterance(cleanText);
        utter.lang = 'vi-VN';
        if (this.vietnameseVoice) {
          utter.voice = this.vietnameseVoice;
        }
        utter.rate = this.voiceRate || 0.88;
        utter.pitch = this.voicePitch || 1.15;
        utter.onend = () => {
          if (this.speechToken === currentToken) {
            this.finishSpeech(currentToken);
          }
        };
        utter.onerror = () => {
          if (this.speechToken === currentToken) {
            this.finishSpeech(currentToken);
          }
        };
        this.speechSynth.speak(utter);
      } catch (e) {
        this.finishSpeech(currentToken);
      }
    };

    // Strategy 3: Google Translate Vietnamese TTS (works natively with no-referrer on GitHub Pages)
    const tryGoogleTts = () => {
      if (this.speechToken !== currentToken) return;
      if (cleanText.length > 200) {
        tryWebSpeech();
        return;
      }
      const gUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(cleanText)}`;
      this.playAudioUrl(gUrl, currentToken, () => {
        tryWebSpeech();
      });
    };

    // Strategy 2: Local Python Server (only when running on localhost / 127.0.0.1 / file:)
    const tryLocalServer = () => {
      const isLocal = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:');
      if (!isLocal) {
        tryGoogleTts();
        return;
      }
      let serverBase = '';
      if (window.location.protocol === 'file:') {
        serverBase = 'http://localhost:8000';
      } else if (window.location.port !== '8000') {
        serverBase = `${window.location.protocol}//${window.location.hostname}:8000`;
      }
      const serverUrl = `${serverBase}/api/tts?text=${encodeURIComponent(cleanText)}&voice=${encodeURIComponent(targetVoice)}&rate=${encodeURIComponent(rateParam)}`;
      this.playAudioUrl(serverUrl, currentToken, () => {
        tryGoogleTts();
      });
    };

    // Strategy 1: Pre-cached static Neural AI MP3 from audio_cache/ (fast 0ms on GitHub Pages!)
    const h1 = computeMd5(`${cleanText}_${targetVoice}_${rateParam}`);
    const h2 = computeMd5(`${cleanText}_${targetVoice}`);
    const staticUrl1 = `audio_cache/${h1}.mp3`;
    const staticUrl2 = `audio_cache/${h2}.mp3`;

    this.playAudioUrl(staticUrl1, currentToken, () => {
      this.playAudioUrl(staticUrl2, currentToken, () => {
        tryLocalServer();
      });
    });
  }

  // --- English Speech Synthesis for Grade 1 English module ---
  speakEnglish(text, onEnd) {
    if (!this.soundEnabled || !text || !String(text).trim()) {
      if (typeof onEnd === 'function') onEnd();
      return;
    }

    this.stop();
    const currentToken = this.speechToken;
    this.activeCallback = onEnd;
    this.isSpeakingNow = true;

    const voiceBtn = document.getElementById('btnVoiceTest');
    if (voiceBtn) voiceBtn.classList.add('speaking');

    const cleanText = String(text).trim();

    const tryWebSpeechEn = () => {
      if (this.speechToken !== currentToken) return;
      if (!this.speechSynth) {
        this.finishSpeech(currentToken);
        return;
      }
      try {
        this.speechSynth.cancel();
        const utter = new SpeechSynthesisUtterance(cleanText);
        utter.lang = 'en-US';
        if (this.englishVoice) utter.voice = this.englishVoice;
        utter.rate = 0.9;
        utter.pitch = 1.1;
        utter.onend = () => {
          if (this.speechToken === currentToken) {
            this.finishSpeech(currentToken);
          }
        };
        utter.onerror = () => {
          if (this.speechToken === currentToken) {
            this.finishSpeech(currentToken);
          }
        };
        this.speechSynth.speak(utter);
      } catch (e) {
        this.finishSpeech(currentToken);
      }
    };

    const gUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(cleanText)}`;
    this.playAudioUrl(gUrl, currentToken, () => {
      tryWebSpeechEn();
    });
  }
}

// Global sound manager instance
window.soundSys = new SoundSystem();
