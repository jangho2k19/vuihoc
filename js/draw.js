/* ========================================================
   DRAWING & COLORING MODULE (Góc Bé Vẽ & Tô Màu)
   Canvas drawing board with colors, brushes, stamps,
   Coloring Book Templates, Flood Fill Bucket, Undo / Redo & Save
   ======================================================== */

class DrawingApp {
  constructor() {
    this.canvas = document.getElementById('paintCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });

    this.currentColor = '#e63946';
    this.brushSize = 10;
    this.isDrawing = false;
    this.activeTool = 'brush'; // 'brush', 'bucket', 'eraser', 'rainbow', 'sticker'
    this.selectedSticker = null;
    this.rainbowHue = 0;

    // Undo / Redo history stacks
    this.undoStack = [];
    this.redoStack = [];
    this.maxHistory = 15;

    this.templates = {
      blank: 'Trang giấy trắng',
      cat: 'Chú Mèo Con 🐱',
      house: 'Ngôi Nhà Hoa 🏠',
      boat: 'Thuyền Buồm ⛵',
      rocket: 'Tàu Vũ Trụ 🚀',
      apple: 'Quả Táo Thần Kỳ 🍎',
      rainbow: 'Cầu Vồng Mây Trắng 🌈'
    };

    this.initCanvas();
    this.initControls();
    this.saveState();
  }

  initCanvas() {
    // Fill background with white
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Default line settings
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    // Pointer events (handles mouse and touch seamlessly)
    this.canvas.addEventListener('pointerdown', (e) => this.handlePointerDown(e));
    this.canvas.addEventListener('pointermove', (e) => this.handlePointerMove(e));
    this.canvas.addEventListener('pointerup', () => this.handlePointerUp());
    this.canvas.addEventListener('pointercancel', () => this.handlePointerUp());
    this.canvas.addEventListener('pointerleave', () => this.handlePointerUp());
  }

  saveState() {
    if (!this.canvas) return;
    try {
      const imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
      this.undoStack.push(imgData);
      if (this.undoStack.length > this.maxHistory) {
        this.undoStack.shift();
      }
      this.redoStack = []; // clear redo on new action
      this.updateUndoRedoButtons();
    } catch (e) {
      console.warn("Save drawing state error:", e);
    }
  }

  undo() {
    if (this.undoStack.length <= 1) return;
    window.soundSys.playPop();
    const currentState = this.undoStack.pop();
    this.redoStack.push(currentState);
    const prevState = this.undoStack[this.undoStack.length - 1];
    this.ctx.putImageData(prevState, 0, 0);
    this.updateUndoRedoButtons();
  }

  redo() {
    if (this.redoStack.length === 0) return;
    window.soundSys.playPop();
    const nextState = this.redoStack.pop();
    this.undoStack.push(nextState);
    this.ctx.putImageData(nextState, 0, 0);
    this.updateUndoRedoButtons();
  }

  updateUndoRedoButtons() {
    const btnUndo = document.getElementById('btnUndo');
    const btnRedo = document.getElementById('btnRedo');
    if (btnUndo) btnUndo.disabled = this.undoStack.length <= 1;
    if (btnRedo) btnRedo.disabled = this.redoStack.length === 0;
  }

  initControls() {
    // Color dots
    const dots = document.querySelectorAll('.color-dot');
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        this.currentColor = dot.dataset.color;
        if (this.activeTool === 'eraser' || this.activeTool === 'rainbow') {
          this.activeTool = 'brush';
        }
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
        if (this.activeTool === 'eraser' || this.activeTool === 'rainbow') {
          this.activeTool = 'brush';
        }
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
          this.activeTool = 'sticker';
        } else {
          this.selectedSticker = null;
          this.activeTool = 'brush';
        }
        this.updateActiveButtons();
      });
    });

    // Brush Tool Button
    const btnBrush = document.getElementById('btnBrush');
    if (btnBrush) {
      btnBrush.addEventListener('click', () => {
        this.activeTool = 'brush';
        this.selectedSticker = null;
        this.updateActiveButtons();
      });
    }

    // Flood Fill Paint Bucket Tool
    const btnBucket = document.getElementById('btnPaintBucket');
    if (btnBucket) {
      btnBucket.addEventListener('click', () => {
        this.activeTool = 'bucket';
        this.selectedSticker = null;
        this.updateActiveButtons();
      });
    }

    // Rainbow Brush Tool
    const btnRainbow = document.getElementById('btnRainbowBrush');
    if (btnRainbow) {
      btnRainbow.addEventListener('click', () => {
        this.activeTool = 'rainbow';
        this.selectedSticker = null;
        this.updateActiveButtons();
      });
    }

    // Eraser Tool
    const eraserBtn = document.getElementById('btnEraser');
    if (eraserBtn) {
      eraserBtn.addEventListener('click', () => {
        this.activeTool = this.activeTool === 'eraser' ? 'brush' : 'eraser';
        this.selectedSticker = null;
        this.updateActiveButtons();
      });
    }

    // Undo / Redo buttons
    const btnUndo = document.getElementById('btnUndo');
    const btnRedo = document.getElementById('btnRedo');
    if (btnUndo) btnUndo.addEventListener('click', () => this.undo());
    if (btnRedo) btnRedo.addEventListener('click', () => this.redo());

    // Clear Canvas
    const clearBtn = document.getElementById('btnClearCanvas');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        window.soundSys.playPop();
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.saveState();
      });
    }

    // Template Selector Dropdown / Buttons
    const templateSelect = document.getElementById('coloringTemplateSelect');
    if (templateSelect) {
      templateSelect.addEventListener('change', (e) => {
        this.loadTemplate(e.target.value);
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
    if (eraserBtn) eraserBtn.classList.toggle('active-tool', this.activeTool === 'eraser');

    const bucketBtn = document.getElementById('btnPaintBucket');
    if (bucketBtn) bucketBtn.classList.toggle('active-tool', this.activeTool === 'bucket');

    const rainbowBtn = document.getElementById('btnRainbowBrush');
    if (rainbowBtn) rainbowBtn.classList.toggle('active-tool', this.activeTool === 'rainbow');

    const brushBtn = document.getElementById('btnBrush');
    if (brushBtn) brushBtn.classList.toggle('active-tool', this.activeTool === 'brush');

    const stickerBtns = document.querySelectorAll('.sticker-btn');
    stickerBtns.forEach(b => {
      b.classList.toggle('active', this.activeTool === 'sticker' && b.dataset.sticker === this.selectedSticker);
    });
  }

  getCanvasCoordinates(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    return {
      x: Math.round((e.clientX - rect.left) * scaleX),
      y: Math.round((e.clientY - rect.top) * scaleY)
    };
  }

  handlePointerDown(e) {
    const pos = this.getCanvasCoordinates(e);

    // If sticker mode is selected
    if (this.activeTool === 'sticker' && this.selectedSticker) {
      window.soundSys.playPop();
      this.ctx.font = '54px "Segoe UI Emoji", sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(this.selectedSticker, pos.x, pos.y);
      this.saveState();
      return;
    }

    // If paint bucket tool is selected
    if (this.activeTool === 'bucket') {
      window.soundSys.playPop();
      this.floodFill(pos.x, pos.y, this.currentColor);
      this.saveState();
      return;
    }

    // Brush or Eraser
    this.isDrawing = true;
    this.ctx.beginPath();
    this.ctx.moveTo(pos.x, pos.y);

    if (this.activeTool === 'eraser') {
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = this.brushSize * 2.8;
    } else if (this.activeTool === 'rainbow') {
      this.rainbowHue = (this.rainbowHue + 15) % 360;
      this.ctx.strokeStyle = `hsl(${this.rainbowHue}, 90%, 55%)`;
      this.ctx.lineWidth = this.brushSize;
    } else {
      this.ctx.strokeStyle = this.currentColor;
      this.ctx.lineWidth = this.brushSize;
    }
  }

  handlePointerMove(e) {
    if (!this.isDrawing || this.activeTool === 'sticker' || this.activeTool === 'bucket') return;
    const pos = this.getCanvasCoordinates(e);

    if (this.activeTool === 'rainbow') {
      this.rainbowHue = (this.rainbowHue + 3) % 360;
      this.ctx.strokeStyle = `hsl(${this.rainbowHue}, 90%, 55%)`;
    }

    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();
  }

  handlePointerUp() {
    if (this.isDrawing) {
      this.ctx.closePath();
      this.isDrawing = false;
      this.saveState();
    }
  }

  // --- Fast BFS Flood Fill Algorithm ---
  floodFill(startX, startY, fillHexColor) {
    const width = this.canvas.width;
    const height = this.canvas.height;
    if (startX < 0 || startX >= width || startY < 0 || startY >= height) return;

    // Convert hex to RGBA
    const fillRgba = this.hexToRgba(fillHexColor);

    const imgData = this.ctx.getImageData(0, 0, width, height);
    const data32 = new Uint32Array(imgData.data.buffer);

    const startIndex = startY * width + startX;
    const targetColor = data32[startIndex];
    const newColor = (fillRgba.a << 24) | (fillRgba.b << 16) | (fillRgba.g << 8) | fillRgba.r;

    if (targetColor === newColor) return;

    // Don't fill pure black outline lines
    const targetR = targetColor & 0xff;
    const targetG = (targetColor >> 8) & 0xff;
    const targetB = (targetColor >> 16) & 0xff;
    if (targetR < 40 && targetG < 40 && targetB < 40) return; // outline boundary

    const queue = [startIndex];
    const visited = new Uint8Array(width * height);
    visited[startIndex] = 1;

    // Color match tolerance
    const colorMatch = (c1, c2) => {
      const r1 = c1 & 0xff, g1 = (c1 >> 8) & 0xff, b1 = (c1 >> 16) & 0xff;
      const r2 = c2 & 0xff, g2 = (c2 >> 8) & 0xff, b2 = (c2 >> 16) & 0xff;
      return Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2) < 45;
    };

    while (queue.length > 0) {
      const curr = queue.pop();
      data32[curr] = newColor;

      const cx = curr % width;
      const cy = Math.floor(curr / width);

      // 4 neighbors
      const neighbors = [
        cx > 0 ? curr - 1 : -1,
        cx < width - 1 ? curr + 1 : -1,
        cy > 0 ? curr - width : -1,
        cy < height - 1 ? curr + width : -1
      ];

      for (let n of neighbors) {
        if (n !== -1 && !visited[n]) {
          if (colorMatch(data32[n], targetColor)) {
            visited[n] = 1;
            queue.push(n);
          }
        }
      }
    }

    this.ctx.putImageData(imgData, 0, 0);
  }

  hexToRgba(hex) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
      a: 255
    };
  }

  // --- Coloring Book Templates Generator ---
  loadTemplate(tplKey) {
    window.soundSys.playPop();

    // Reset white canvas
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (tplKey === 'blank') {
      this.saveState();
      return;
    }

    this.ctx.strokeStyle = '#1e293b';
    this.ctx.lineWidth = 6;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    const cx = this.canvas.width / 2;
    const cy = this.canvas.height / 2;

    switch (tplKey) {
      case 'cat':
        // Head
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, 140, 0, Math.PI * 2);
        this.ctx.stroke();

        // Left Ear
        this.ctx.beginPath();
        this.ctx.moveTo(cx - 100, cy - 90);
        this.ctx.lineTo(cx - 140, cy - 220);
        this.ctx.lineTo(cx - 20, cy - 135);
        this.ctx.stroke();

        // Right Ear
        this.ctx.beginPath();
        this.ctx.moveTo(cx + 100, cy - 90);
        this.ctx.lineTo(cx + 140, cy - 220);
        this.ctx.lineTo(cx + 20, cy - 135);
        this.ctx.stroke();

        // Eyes
        this.ctx.beginPath();
        this.ctx.arc(cx - 55, cy - 25, 24, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.arc(cx + 55, cy - 25, 24, 0, Math.PI * 2);
        this.ctx.stroke();

        // Nose
        this.ctx.beginPath();
        this.ctx.moveTo(cx - 16, cy + 25);
        this.ctx.lineTo(cx + 16, cy + 25);
        this.ctx.lineTo(cx, cy + 45);
        this.ctx.closePath();
        this.ctx.stroke();

        // Mouth
        this.ctx.beginPath();
        this.ctx.arc(cx - 20, cy + 55, 20, 0, Math.PI);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.arc(cx + 20, cy + 55, 20, 0, Math.PI);
        this.ctx.stroke();

        // Whiskers
        this.ctx.beginPath();
        this.ctx.moveTo(cx - 80, cy + 25);
        this.ctx.lineTo(cx - 190, cy + 10);
        this.ctx.moveTo(cx - 80, cy + 45);
        this.ctx.lineTo(cx - 190, cy + 55);
        this.ctx.moveTo(cx + 80, cy + 25);
        this.ctx.lineTo(cx + 190, cy + 10);
        this.ctx.moveTo(cx + 80, cy + 45);
        this.ctx.lineTo(cx + 190, cy + 55);
        this.ctx.stroke();
        break;

      case 'house':
        // Walls
        this.ctx.strokeRect(cx - 180, cy - 40, 360, 220);

        // Roof
        this.ctx.beginPath();
        this.ctx.moveTo(cx - 220, cy - 40);
        this.ctx.lineTo(cx, cy - 200);
        this.ctx.lineTo(cx + 220, cy - 40);
        this.ctx.closePath();
        this.ctx.stroke();

        // Door
        this.ctx.strokeRect(cx - 45, cy + 60, 90, 120);
        // Doorknob
        this.ctx.beginPath();
        this.ctx.arc(cx + 28, cy + 120, 8, 0, Math.PI * 2);
        this.ctx.stroke();

        // Left Window
        this.ctx.strokeRect(cx - 145, cy + 20, 65, 65);
        this.ctx.beginPath();
        this.ctx.moveTo(cx - 112, cy + 20);
        this.ctx.lineTo(cx - 112, cy + 85);
        this.ctx.moveTo(cx - 145, cy + 52);
        this.ctx.lineTo(cx - 80, cy + 52);
        this.ctx.stroke();

        // Right Window
        this.ctx.strokeRect(cx + 80, cy + 20, 65, 65);
        this.ctx.beginPath();
        this.ctx.moveTo(cx + 112, cy + 20);
        this.ctx.lineTo(cx + 112, cy + 85);
        this.ctx.moveTo(cx + 80, cy + 52);
        this.ctx.lineTo(cx + 145, cy + 52);
        this.ctx.stroke();

        // Chimney
        this.ctx.strokeRect(cx + 120, cy - 170, 45, 80);

        // Sun in sky
        this.ctx.beginPath();
        this.ctx.arc(120, 100, 45, 0, Math.PI * 2);
        this.ctx.stroke();
        break;

      case 'boat':
        // Hull
        this.ctx.beginPath();
        this.ctx.moveTo(cx - 240, cy + 60);
        this.ctx.lineTo(cx + 240, cy + 60);
        this.ctx.lineTo(cx + 160, cy + 150);
        this.ctx.lineTo(cx - 160, cy + 150);
        this.ctx.closePath();
        this.ctx.stroke();

        // Mast
        this.ctx.beginPath();
        this.ctx.moveTo(cx, cy + 60);
        this.ctx.lineTo(cx, cy - 180);
        this.ctx.stroke();

        // Big Sail
        this.ctx.beginPath();
        this.ctx.moveTo(cx + 10, cy - 170);
        this.ctx.lineTo(cx + 170, cy + 40);
        this.ctx.lineTo(cx + 10, cy + 40);
        this.ctx.closePath();
        this.ctx.stroke();

        // Small Sail
        this.ctx.beginPath();
        this.ctx.moveTo(cx - 10, cy - 150);
        this.ctx.lineTo(cx - 130, cy + 40);
        this.ctx.lineTo(cx - 10, cy + 40);
        this.ctx.closePath();
        this.ctx.stroke();

        // Water waves
        this.ctx.beginPath();
        for (let x = 60; x < this.canvas.width - 60; x += 80) {
          this.ctx.arc(x + 40, cy + 170, 40, Math.PI, 0, true);
        }
        this.ctx.stroke();
        break;

      case 'apple':
        // Apple body
        this.ctx.beginPath();
        this.ctx.arc(cx - 65, cy, 120, 0, Math.PI * 2);
        this.ctx.arc(cx + 65, cy, 120, 0, Math.PI * 2);
        this.ctx.stroke();

        // Stem
        this.ctx.beginPath();
        this.ctx.moveTo(cx, cy - 110);
        this.ctx.quadraticCurveTo(cx + 20, cy - 190, cx + 45, cy - 200);
        this.ctx.lineWidth = 12;
        this.ctx.stroke();
        this.ctx.lineWidth = 6;

        // Leaf
        this.ctx.beginPath();
        this.ctx.moveTo(cx + 20, cy - 150);
        this.ctx.quadraticCurveTo(cx + 120, cy - 190, cx + 130, cy - 130);
        this.ctx.quadraticCurveTo(cx + 80, cy - 110, cx + 20, cy - 150);
        this.ctx.stroke();
        break;

      case 'rainbow':
        // Arcs
        const rY = cy + 120;
        const radii = [280, 240, 200, 160, 120];
        radii.forEach(r => {
          this.ctx.beginPath();
          this.ctx.arc(cx, rY, r, Math.PI, 0, false);
          this.ctx.stroke();
        });

        // Left Cloud
        this.ctx.beginPath();
        this.ctx.arc(cx - 280, rY, 50, 0, Math.PI * 2);
        this.ctx.arc(cx - 230, rY - 35, 60, 0, Math.PI * 2);
        this.ctx.arc(cx - 170, rY, 50, 0, Math.PI * 2);
        this.ctx.stroke();

        // Right Cloud
        this.ctx.beginPath();
        this.ctx.arc(cx + 170, rY, 50, 0, Math.PI * 2);
        this.ctx.arc(cx + 230, rY - 35, 60, 0, Math.PI * 2);
        this.ctx.arc(cx + 280, rY, 50, 0, Math.PI * 2);
        this.ctx.stroke();
        break;

      case 'rocket':
        // Fuselage
        this.ctx.beginPath();
        this.ctx.moveTo(cx, cy - 200);
        this.ctx.quadraticCurveTo(cx + 100, cy - 50, cx + 80, cy + 110);
        this.ctx.lineTo(cx - 80, cy + 110);
        this.ctx.quadraticCurveTo(cx - 100, cy - 50, cx, cy - 200);
        this.ctx.stroke();

        // Porthole Window
        this.ctx.beginPath();
        this.ctx.arc(cx, cy - 40, 45, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.arc(cx, cy - 40, 32, 0, Math.PI * 2);
        this.ctx.stroke();

        // Left Fin
        this.ctx.beginPath();
        this.ctx.moveTo(cx - 80, cy + 30);
        this.ctx.lineTo(cx - 160, cy + 140);
        this.ctx.lineTo(cx - 80, cy + 110);
        this.ctx.closePath();
        this.ctx.stroke();

        // Right Fin
        this.ctx.beginPath();
        this.ctx.moveTo(cx + 80, cy + 30);
        this.ctx.lineTo(cx + 160, cy + 140);
        this.ctx.lineTo(cx + 80, cy + 110);
        this.ctx.closePath();
        this.ctx.stroke();

        // Thruster flame
        this.ctx.beginPath();
        this.ctx.moveTo(cx - 50, cy + 110);
        this.ctx.lineTo(cx, cy + 190);
        this.ctx.lineTo(cx + 50, cy + 110);
        this.ctx.stroke();
        break;
    }

    this.saveState();
    window.soundSys.speak(`Cô đã mở bức tranh ${this.templates[tplKey]} cho bé tô màu rồi nè! Bé hãy dùng thùng đổ màu hoặc cọ vẽ nha!`);
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
