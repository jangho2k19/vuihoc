/* ========================================================
   DRAWING & COLORING MODULE (Góc Bé Vẽ & Tô Màu)
   Canvas drawing board with colors, brushes, stamps & save
   ======================================================== */

class DrawingApp {
  constructor() {
    this.canvas = document.getElementById('paintCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.currentColor = '#e63946';
    this.brushSize = 10;
    this.isDrawing = false;
    this.isEraser = false;
    this.selectedSticker = null;

    this.initCanvas();
    this.initControls();
  }

  initCanvas() {
    // Fill background with white
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Default line settings
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    // Pointer events (handles both mouse and touch seamlessly)
    this.canvas.addEventListener('pointerdown', (e) => this.handlePointerDown(e));
    this.canvas.addEventListener('pointermove', (e) => this.handlePointerMove(e));
    this.canvas.addEventListener('pointerup', () => this.handlePointerUp());
    this.canvas.addEventListener('pointercancel', () => this.handlePointerUp());
    this.canvas.addEventListener('pointerleave', () => this.handlePointerUp());
  }

  initControls() {
    // Color dots
    const dots = document.querySelectorAll('.color-dot');
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        this.currentColor = dot.dataset.color;
        this.isEraser = false;
        this.selectedSticker = null;
        this.updateActiveButtons();
      });
    });

    // Custom color picker
    const picker = document.getElementById('customColorPicker');
    if (picker) {
      picker.addEventListener('input', (e) => {
        dots.forEach(d => d.classList.remove('active'));
        this.currentColor = e.target.value;
        this.isEraser = false;
        this.selectedSticker = null;
        this.updateActiveButtons();
      });
    }

    // Brush sizes
    const sizeBtns = document.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.brushSize = parseInt(btn.dataset.size, 10);
      });
    });

    // Stickers
    const stickerBtns = document.querySelectorAll('.sticker-btn');
    stickerBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const wasActive = btn.classList.contains('active');
        stickerBtns.forEach(b => b.classList.remove('active'));

        if (!wasActive) {
          btn.classList.add('active');
          this.selectedSticker = btn.dataset.sticker;
          this.isEraser = false;
          const eraserBtn = document.getElementById('btnEraser');
          if (eraserBtn) eraserBtn.classList.remove('active-tool');
        } else {
          this.selectedSticker = null;
        }
      });
    });

    // Eraser
    const eraserBtn = document.getElementById('btnEraser');
    if (eraserBtn) {
      eraserBtn.addEventListener('click', () => {
        this.isEraser = !this.isEraser;
        this.selectedSticker = null;
        stickerBtns.forEach(b => b.classList.remove('active'));
        eraserBtn.classList.toggle('active-tool', this.isEraser);
      });
    }

    // Clear Canvas
    const clearBtn = document.getElementById('btnClearCanvas');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        window.soundSys.playPop();
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      });
    }

    // Save Canvas
    const saveBtn = document.getElementById('btnSaveCanvas');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        this.saveArtwork();
      });
    }
  }

  updateActiveButtons() {
    const eraserBtn = document.getElementById('btnEraser');
    if (eraserBtn) eraserBtn.classList.remove('active-tool');
    const stickerBtns = document.querySelectorAll('.sticker-btn');
    stickerBtns.forEach(b => b.classList.remove('active'));
  }

  getCanvasCoordinates(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  handlePointerDown(e) {
    const pos = this.getCanvasCoordinates(e);

    // If sticker mode is selected, stamp sticker at clicked spot
    if (this.selectedSticker) {
      window.soundSys.playPop();
      this.ctx.font = '48px "Segoe UI Emoji", sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(this.selectedSticker, pos.x, pos.y);
      return;
    }

    this.isDrawing = true;
    this.ctx.beginPath();
    this.ctx.moveTo(pos.x, pos.y);

    this.ctx.strokeStyle = this.isEraser ? '#ffffff' : this.currentColor;
    this.ctx.lineWidth = this.isEraser ? this.brushSize * 2.5 : this.brushSize;
  }

  handlePointerMove(e) {
    if (!this.isDrawing || this.selectedSticker) return;
    const pos = this.getCanvasCoordinates(e);
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();
  }

  handlePointerUp() {
    if (this.isDrawing) {
      this.ctx.closePath();
      this.isDrawing = false;
    }
  }

  saveArtwork() {
    try {
      const dataUrl = this.canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `tranh_be_ve_${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.soundSys.playFanfare();
      window.rewards.triggerConfetti(45);
      window.rewards.addStars(2, "Bé đã lưu lại tác phẩm nghệ thuật tuyệt đẹp!");
      window.rewards.recordActivity('drawingsSaved', 1);

      window.soundSys.speak("Bức tranh của bé đẹp quá! Đã tải về máy rồi nhé!");
    } catch (e) {
      console.warn("Save drawing error:", e);
    }
  }
}

// Global instance
window.drawingApp = null;
