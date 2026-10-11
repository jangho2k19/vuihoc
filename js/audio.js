/* ========================================================
   AUDIO SYSTEM (Web Audio API Synthesizer & Neural TTS)
   Zero external audio files needed - 100% reliable & rich!
   ======================================================== */

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

  // --- Vietnamese Speech Synthesis (Triple-Tier Fallback: Server Neural -> Google TTS -> WebSpeech API) ---
  speak(text, onEnd) {
    this.speakWithVoice(text, 'vi-VN-HoaiMyNeural', onEnd);
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

    // Visual speaking indicator on the teacher button
    const voiceBtn = document.getElementById('btnVoiceTest');
    if (voiceBtn) voiceBtn.classList.add('speaking');

    // Rate preset calculation
    let rateParam = '+0%';
    if (this.speechRatePreset === 'slow') rateParam = '-15%';
    else if (this.speechRatePreset === 'fast') rateParam = '+10%';

    const targetVoice = 'vi-VN-HoaiMyNeural';
    const cleanText = String(text).trim();

    // Tier 3: Browser Web Speech API fallback (100% offline, zero server required)
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

    // Tier 2: Google Translate Vietnamese TTS (works natively in browser audio, fast & zero local server setup needed)
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

    // Tier 1: Local High-Fidelity Server Neural TTS (Cô giáo Hoài My Edge TTS)
    let serverBase = '';
    if (window.location.protocol === 'file:') {
      serverBase = 'http://localhost:8000';
    } else if (window.location.port !== '8000') {
      serverBase = `${window.location.protocol}//${window.location.hostname || 'localhost'}:8000`;
    }
    const serverUrl = `${serverBase}/api/tts?text=${encodeURIComponent(cleanText)}&voice=${encodeURIComponent(targetVoice)}&rate=${encodeURIComponent(rateParam)}`;

    this.playAudioUrl(serverUrl, currentToken, () => {
      tryGoogleTts();
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
