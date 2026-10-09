/* ========================================================
   AUDIO SYSTEM (Web Audio API Synthesizer & Web Speech API)
   Zero external audio files needed - 100% reliable!
   ======================================================== */

class SoundSystem {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = true;
    this.musicEnabled = false;
    this.musicTimer = null;
    this.speechSynth = window.speechSynthesis;
    this.vietnameseVoice = null;
    this.allViVoices = [];
    this.voicePitch = 1.25; // Gentle, sweet feminine pitch
    this.voiceRate = 0.86;  // Clear, friendly pace for 1st grade children

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

      // Prioritize female voice (e.g. HoaiMy, Google Tiếng Việt, female keywords)
      const femaleSouthernVoice = this.allViVoices.find(v => {
        const n = v.name.toLowerCase();
        return n.includes('hoaimy') || n.includes('hoai my') || n.includes('southern') || n.includes('south') || n.includes('miennam') || n.includes('nu');
      }) || this.allViVoices.find(v => {
        const n = v.name.toLowerCase();
        return n.includes('google') && !n.includes('male');
      }) || this.allViVoices.find(v => {
        const n = v.name.toLowerCase();
        return !n.includes('nam') && !n.includes('male') && !n.includes('anh');
      }) || this.allViVoices[0] || null;

      this.vietnameseVoice = femaleSouthernVoice;

      if (typeof window.updateVoiceSelectorUI === 'function') {
        window.updateVoiceSelectorUI(this.allViVoices, this.vietnameseVoice);
      }
    };

    findVoice();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = findVoice;
    }
  }

  setVoice(voiceIndex) {
    if (this.allViVoices && this.allViVoices[voiceIndex]) {
      this.vietnameseVoice = this.allViVoices[voiceIndex];
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
      { f: 523.25, d: 0.12 }, // C
      { f: 659.25, d: 0.12 }, // E
      { f: 783.99, d: 0.12 }, // G
      { f: 1046.50, d: 0.35 } // C
    ];
    let time = 0;
    melody.forEach((note) => {
      setTimeout(() => {
        this.playTone(note.f, 'triangle', note.d, 0.18);
      }, time * 1000);
      time += note.d + 0.04;
    });
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

  // --- Speech Synthesis (Phát âm tiếng Việt cho bé) ---
  speak(text) {
    if (!this.soundEnabled || !text) return;

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

    // Method 1: Play via local High-Quality Neural TTS endpoint (Microsoft HoaiMy)
    const ttsUrl = `/api/tts?text=${encodeURIComponent(text)}`;
    const audio = new Audio(ttsUrl);
    this.currentAudio = audio;

    audio.onended = () => {
      setSpeaking(false);
      this.currentAudio = null;
    };

    audio.onerror = () => {
      console.warn("Local TTS endpoint error, falling back to Google Translate TTS...");
      // Method 2: Fallback to Google Translate Vietnamese TTS
      const gUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(text)}`;
      const fallbackAudio = new Audio(gUrl);
      this.currentAudio = fallbackAudio;

      fallbackAudio.onended = () => {
        setSpeaking(false);
        this.currentAudio = null;
      };

      fallbackAudio.onerror = () => {
        console.warn("Audio fallback error, attempting Web Speech Synthesis...");
        // Method 3: Browser SpeechSynthesis
        try {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'vi-VN';
          utterance.rate = this.voiceRate || 0.86;
          utterance.pitch = this.voicePitch || 1.25;
          if (this.vietnameseVoice) {
            utterance.voice = this.vietnameseVoice;
          }
          utterance.onend = () => setSpeaking(false);
          utterance.onerror = () => setSpeaking(false);
          this.speechSynth.speak(utterance);
        } catch (e) {
          setSpeaking(false);
        }
      };

      fallbackAudio.play().catch(() => {
        setSpeaking(false);
      });
    };

    audio.play().catch(err => {
      console.warn("Audio play blocked or error:", err);
      // If browser blocked autoplay, attempt SpeechSynthesis
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
  }
}

// Global sound manager instance
window.soundSys = new SoundSystem();
