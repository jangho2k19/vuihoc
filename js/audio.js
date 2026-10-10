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

    // Client-side in-memory audio cache for instant 0ms replays
    this.audioCache = new Map();
    this.currentAudio = null;

    this.initAudioContext();
    this.loadVoices();
  }

  initAudioContext() {
    // Lazy initialize upon first user interaction
    const init = () => {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.audioCtx = new AudioContext();
        }
      } else if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    };
    window.addEventListener('click', init, { once: true });
    window.addEventListener('touchstart', init, { once: true });
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
    this.currentAudio = null;
  }

  // --- Vietnamese Speech Synthesis ---
  speak(text) {
    this.speakWithVoice(text, this.selectedVoiceId);
  }

  speakWithVoice(text, voiceId) {
    if (!this.soundEnabled || !text) return;

    // Exclusively use Cô giáo Hoài My Neural Voice
    const activeVoiceId = 'vi-VN-HoaiMyNeural';

    // Visual speaking indicator on the teacher badge
    const voiceBtn = document.getElementById('btnVoiceTest');
    const setSpeaking = (isSpeaking) => {
      if (voiceBtn) {
        voiceBtn.classList.toggle('speaking', isSpeaking);
      }
    };

    // Stop any existing playing speech
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {}
      this.currentAudio = null;
    }
    if (this.speechSynth) {
      try { this.speechSynth.cancel(); } catch (e) {}
    }

    setSpeaking(true);

    // Map rate preset to Edge-TTS rate string
    let rateParam = '+0%';
    if (this.speechRatePreset === 'slow') rateParam = '-15%';
    else if (this.speechRatePreset === 'fast') rateParam = '+10%';

    // Check Client In-Memory Cache (0ms instant playback)
    const cacheKey = `${text}_${activeVoiceId}_${rateParam}`;
    if (this.audioCache.has(cacheKey)) {
      const cached = this.audioCache.get(cacheKey);
      try {
        cached.currentTime = 0;
        this.currentAudio = cached;
        cached.onended = () => {
          setSpeaking(false);
          this.currentAudio = null;
        };
        cached.play().catch(() => {
          setSpeaking(false);
        });
        return;
      } catch (e) {
        // Fallback to fresh instantiation if cached audio fails
      }
    }

    // Server TTS Endpoint
    const ttsUrl = `/api/tts?text=${encodeURIComponent(text)}&voice=${encodeURIComponent(activeVoiceId)}&rate=${encodeURIComponent(rateParam)}`;
    const audio = new Audio(ttsUrl);
    this.currentAudio = audio;

    let hasStarted = false;
    let fallbackTriggered = false;

    const runFallback = () => {
      if (fallbackTriggered) return;
      fallbackTriggered = true;

      // Fallback 1: Google Translate TTS (~0.18s)
      const gUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(text)}`;
      const fallbackAudio = new Audio(gUrl);
      this.currentAudio = fallbackAudio;

      fallbackAudio.onended = () => {
        setSpeaking(false);
        this.currentAudio = null;
      };

      fallbackAudio.onerror = () => {
        // Fallback 2: Device SpeechSynthesis (0ms)
        try {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'vi-VN';
          utterance.rate = this.voiceRate || 0.86;
          utterance.pitch = this.voicePitch || 1.25;
          if (this.vietnameseVoice) utterance.voice = this.vietnameseVoice;
          utterance.onend = () => setSpeaking(false);
          utterance.onerror = () => setSpeaking(false);
          this.speechSynth.speak(utterance);
        } catch (e) {
          setSpeaking(false);
        }
      };

      fallbackAudio.play().catch(() => {
        try {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'vi-VN';
          utterance.rate = this.voiceRate || 0.86;
          utterance.pitch = this.voicePitch || 1.25;
          if (this.vietnameseVoice) utterance.voice = this.vietnameseVoice;
          utterance.onend = () => setSpeaking(false);
          utterance.onerror = () => setSpeaking(false);
          this.speechSynth.speak(utterance);
        } catch (e) {
          setSpeaking(false);
        }
      });
    };

    // Watchdog timer: if audio takes longer than 0.9s, fallback to Google TTS or device
    const watchdog = setTimeout(() => {
      if (!hasStarted) {
        runFallback();
      }
    }, 900);

    audio.onplaying = () => {
      hasStarted = true;
      clearTimeout(watchdog);
    };

    audio.onended = () => {
      clearTimeout(watchdog);
      setSpeaking(false);
      this.currentAudio = null;
    };

    audio.onerror = () => {
      clearTimeout(watchdog);
      runFallback();
    };

    // Cache the successfully created audio object for future instant replay
    this.audioCache.set(cacheKey, audio);

    audio.play().catch(err => {
      clearTimeout(watchdog);
      runFallback();
    });
  }

  // --- English Speech Synthesis for Grade 1 English module ---
  speakEnglish(text) {
    if (!this.soundEnabled || !text) return;

    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {}
      this.currentAudio = null;
    }
    if (this.speechSynth) {
      try { this.speechSynth.cancel(); } catch (e) {}
    }

    // Google Translate TTS English
    const gUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(text)}`;
    const audio = new Audio(gUrl);
    this.currentAudio = audio;

    audio.onerror = () => {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.85;
        if (this.englishVoice) utterance.voice = this.englishVoice;
        this.speechSynth.speak(utterance);
      } catch (e) {}
    };

    audio.play().catch(() => {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.85;
        if (this.englishVoice) utterance.voice = this.englishVoice;
        this.speechSynth.speak(utterance);
      } catch (e) {}
    });
  }
}

// Global sound manager instance
window.soundSys = new SoundSystem();
