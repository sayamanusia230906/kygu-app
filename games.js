/**
 * KyGU (Know Your GU) - Mini-Games Module
 * Game 1: "Uro-Puzzle: Rakit Anatomi GU"
 * Game 2: "Hydration & Clinic Rush"
 */

class UroPuzzleGame {
  constructor(containerId, onEndCallback) {
    this.container = document.getElementById(containerId);
    this.onEnd = onEndCallback;
    this.timer = 60;
    this.score = 0;
    this.timerInterval = null;
    this.selectedOrgan = null;

    this.organs = [
      {
        id: 'kidney',
        name: 'Ginjal (Ren)',
        icon: '🩺',
        functionDesc: 'Menyaring 180 L plasma darah per hari & menghasilkan urin',
        targetSlot: 'slot-kidney'
      },
      {
        id: 'ureter',
        name: 'Ureter',
        icon: '💧',
        functionDesc: 'Saluran pipa muskular pembawa urin via gerak peristaltik',
        targetSlot: 'slot-ureter'
      },
      {
        id: 'bladder',
        name: 'Kandung Kemih',
        icon: '🛡️',
        functionDesc: 'Reservoir penampung 300–400 ml urin dengan otot detrusor',
        targetSlot: 'slot-bladder'
      },
      {
        id: 'urethra',
        name: 'Uretra',
        icon: '⚡',
        functionDesc: 'Saluran pembuangan akhir yang diatur oleh sfingter eksterna',
        targetSlot: 'slot-urethra'
      },
      {
        id: 'nephron',
        name: 'Nefron & Glomerulus',
        icon: '🔬',
        functionDesc: 'Unit mikroskopis filtrasi plasma bebas protein & reabsorpsi',
        targetSlot: 'slot-nephron'
      },
      {
        id: 'prostate',
        name: 'Kelenjar Prostat',
        icon: '🧬',
        functionDesc: 'Melingkari uretra pria & memproduksi cairan semen alkali',
        targetSlot: 'slot-prostate'
      }
    ];

    this.placedCount = 0;
  }

  start() {
    this.timer = 60;
    this.score = 0;
    this.placedCount = 0;
    this.selectedOrgan = null;
    this.render();
    this.startTimer();
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timer--;
      const timerEl = document.getElementById('puzzle-timer');
      if (timerEl) timerEl.innerText = `${this.timer}s`;

      if (this.timer <= 0) {
        this.endGame(false);
      }
    }, 1000);
  }

  render() {
    if (!this.container) return;

    // Shuffle organs for piece pool
    const shuffled = [...this.organs].sort(() => Math.random() - 0.5);

    this.container.innerHTML = `
      <div class="game-wrapper uro-puzzle-view">
        <div class="game-header-bar">
          <div class="game-stat-pill">
            <span class="icon">⏱️</span>
            <span id="puzzle-timer" class="val">${this.timer}s</span>
          </div>
          <div class="game-stat-pill score-pill">
            <span class="icon">🏆</span>
            <span id="puzzle-score" class="val">${this.score} Pts</span>
          </div>
        </div>

        <p class="game-instruction-banner">
          👉 <strong>Cara Main:</strong> Pilih kartu organ di bawah, lalu ketuk slot target anatomis atau fungsi yang cocok di sebelah kiri!
        </p>

        <div class="puzzle-game-board">
          <!-- Left: Anatomical Drop Slots -->
          <div class="puzzle-slots-column">
            <div class="column-title">🏛️ Bagan Target Anatomi GU</div>
            ${this.organs.map(o => `
              <div class="puzzle-slot" id="${o.targetSlot}" data-target="${o.id}">
                <div class="slot-badge">${o.name}</div>
                <div class="slot-desc">${o.functionDesc}</div>
                <div class="slot-placeholder">Ketuk untuk memasang</div>
              </div>
            `).join('')}
          </div>

          <!-- Right: Draggable / Clickable Organ Pieces -->
          <div class="puzzle-pieces-column">
            <div class="column-title">🧩 Kepingan Organ</div>
            <div class="pieces-pool" id="puzzle-pieces-pool">
              ${shuffled.map(o => `
                <div class="puzzle-piece" id="piece-${o.id}" data-id="${o.id}">
                  <span class="piece-icon">${o.icon}</span>
                  <div class="piece-info">
                    <span class="piece-name">${o.name}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const pieces = this.container.querySelectorAll('.puzzle-piece');
    const slots = this.container.querySelectorAll('.puzzle-slot');

    pieces.forEach(p => {
      p.addEventListener('click', () => {
        if (p.classList.contains('placed')) return;
        pieces.forEach(x => x.classList.remove('selected'));
        p.classList.add('selected');
        this.selectedOrgan = p.getAttribute('data-id');
        if (window.kyguAudio) window.kyguAudio.playTap();
      });
    });

    slots.forEach(s => {
      s.addEventListener('click', () => {
        if (s.classList.contains('filled')) return;
        if (!this.selectedOrgan) {
          alert('Pilih salah satu kepingan organ di sebelah kanan terlebih dahulu!');
          return;
        }

        const targetId = s.getAttribute('data-target');
        if (targetId === this.selectedOrgan) {
          // Correct match!
          s.classList.add('filled', 'correct-anim');
          const matchedOrgan = this.organs.find(o => o.id === targetId);
          s.innerHTML = `
            <div class="slot-matched-content">
              <span class="big-icon">${matchedOrgan.icon}</span>
              <div class="txt">
                <strong>✅ ${matchedOrgan.name}</strong>
                <p>${matchedOrgan.functionDesc}</p>
              </div>
            </div>
          `;

          const pieceEl = document.getElementById(`piece-${this.selectedOrgan}`);
          if (pieceEl) {
            pieceEl.classList.remove('selected');
            pieceEl.classList.add('placed');
          }

          this.score += 250 + this.timer * 3;
          this.placedCount++;
          document.getElementById('puzzle-score').innerText = `${this.score} Pts`;

          if (window.kyguAudio) window.kyguAudio.playCorrect();
          this.selectedOrgan = null;

          if (this.placedCount === this.organs.length) {
            this.endGame(true);
          }
        } else {
          // Wrong match!
          s.classList.add('shake-wrong');
          setTimeout(() => s.classList.remove('shake-wrong'), 500);
          this.score = Math.max(0, this.score - 50);
          document.getElementById('puzzle-score').innerText = `${this.score} Pts`;
          if (window.kyguAudio) window.kyguAudio.playWrong();
        }
      });
    });
  }

  endGame(isVictory) {
    if (this.timerInterval) clearInterval(this.timerInterval);

    // Save highscore
    let best = 0;
    try {
      best = parseInt(localStorage.getItem('kygu_puzzle_best') || '0', 10);
      if (this.score > best) {
        best = this.score;
        localStorage.setItem('kygu_puzzle_best', best.toString());
      }
    } catch (e) {}

    if (isVictory && window.kyguAudio) {
      window.kyguAudio.playFanfare();
    }

    this.container.innerHTML = `
      <div class="game-result-modal-inner">
        <div class="trophy-icon">${isVictory ? '🎉🏆' : '⏰⌛'}</div>
        <h3 class="result-title">${isVictory ? 'Luar Biasa! Anatomi Tersusun Sempurna!' : 'Waktu Habis!'}</h3>
        <p class="result-msg">
          ${isVictory 
            ? 'Anda berhasil merakit seluruh organ sistem genitourinaria beserta fungsinya dengan sangat akurat!' 
            : `Anda berhasil memasang ${this.placedCount} dari ${this.organs.length} organ genitourinaria.`}
        </p>
        
        <div class="result-stats-card">
          <div class="stat-row">
            <span>Skor Akhir:</span>
            <strong class="highlight">${this.score} Pts</strong>
          </div>
          <div class="stat-row">
            <span>Sisa Waktu:</span>
            <strong>${this.timer} Detik</strong>
          </div>
          <div class="stat-row">
            <span>Skor Tertinggi:</span>
            <strong>${best} Pts</strong>
          </div>
        </div>

        <div class="result-actions">
          <button class="kygu-btn primary-btn btn-bounce" id="btn-replay-puzzle">
            🔄 Main Lagi
          </button>
          <button class="kygu-btn secondary-btn btn-bounce" id="btn-exit-puzzle">
            Kembali ke Practice
          </button>
        </div>
      </div>
    `;

    document.getElementById('btn-replay-puzzle').addEventListener('click', () => {
      this.start();
    });

    document.getElementById('btn-exit-puzzle').addEventListener('click', () => {
      if (typeof this.onEnd === 'function') this.onEnd(this.score);
    });
  }
}

// Game 2: "Hydration & Clinic Rush"
class ClinicRushGame {
  constructor(containerId, onEndCallback) {
    this.container = document.getElementById(containerId);
    this.onEnd = onEndCallback;
    this.score = 0;
    this.combo = 1;
    this.lives = 3;
    this.currentIndex = 0;
    this.timer = 15;
    this.timerInterval = null;

    this.vignettes = [
      {
        id: 1,
        patient: 'Tn. Budi (32 th) — Atlet Marathon',
        case: 'Baru menyelesaikan lari 21 km di cuaca terik. Urin berwarna kuning emas pekat, bibir kering, dan sangat haus.',
        colorBadge: 'Kuning Pekat / Emas',
        colorHex: '#EAB308',
        options: [
          { text: '💧 Beri Hidrasi Cepat 500 ml Air + Elektrolit', isCorrect: true, reason: 'Tepat! Pasien mengalami dehidrasi akibat keringat berlebih (insensible loss tinggi).' },
          { text: '🚫 Batasi Cairan ketat <200 ml', isCorrect: false, reason: 'Salah! Pasien sangat kekurangan cairan dan berisiko mengalami gagal ginjal akut prarenal jika dibatasi.' },
          { text: '💊 Beri Diuretik Furosemid', isCorrect: false, reason: 'Bahaya! Diuretik akan memperparah hipovolemia pasien.' }
        ]
      },
      {
        id: 2,
        patient: 'Ny. Siti (58 th) — Pasien Sindrom Nefrotik',
        case: 'Kedua tungkai bengkak cekung (pitting edema), urin berbusa tebal keputihan, albumin serum 1.8 g/dL.',
        colorBadge: 'Keruh & Berbusa Tebal',
        colorHex: '#CBD5E1',
        options: [
          { text: '🌊 Minum 3 Liter air dalam 1 jam', isCorrect: false, reason: 'Salah! Pasien mengalami retensi cairan akibat hilangnya tekanan onkotik plasma.' },
          { text: '⚖️ Batasi Garam & Cairan, Evaluasi Albumin', isCorrect: true, reason: 'Tepat! Sindrom nefrotik membutuhkan pembatasan garam/cairan dan koreksi kebocoran protein.' },
          { text: '☕ Beri Kopi pekat untuk memicu kencing', isCorrect: false, reason: 'Salah! Tidak menyelesaikan patofisiologi kebocoran membran glomerulus.' }
        ]
      },
      {
        id: 3,
        patient: 'Sdr. Dimas (22 th) — Mahasiswa Begadang',
        case: 'Sedang belajar ujian semalaman, banyak minum air putih hingga 3.5 liter. Urin berwarna jernih tidak berwarna seperti air keran.',
        colorBadge: 'Jernih Transparan',
        colorHex: '#F0F9FF',
        options: [
          { text: '🛡️ Kurangi Porsi Minum, Hidrasi Sudah Sangat Penuh', isCorrect: true, reason: 'Tepat! Urin transparan menandakan overhidrasi; ginjal menekan ADH untuk membuang kelebihan air.' },
          { text: '💉 Suntik Desmopressin segera', isCorrect: false, reason: 'Salah! Desmopressin hanya untuk diabetes insipidus.' },
          { text: '🏃 Paksa minum 2 liter lagi', isCorrect: false, reason: 'Bahaya! Dapat menyebabkan keracunan air (hiponatremia hipotonik akut).' }
        ]
      },
      {
        id: 4,
        patient: 'Ny. Rina (28 th) — Gejala Disuria Akut',
        case: 'Nyeri perih hebat saat kencing, sering buang air kecil tiap 30 menit tapi keluar sedikit-sedikit, urin agak keruh kemerahan.',
        colorBadge: 'Kemerahan / Pink',
        colorHex: '#F87171',
        options: [
          { text: '🚨 Evaluasi Hematuria & Anjurkan Periksa Urinalisis ISK', isCorrect: true, reason: 'Tepat! Disuria + hematuria + frekuensi adalah trias klasik infeksi kandung kemih (sistitis).' },
          { text: '😴 Tahan kencing selama 12 jam', isCorrect: false, reason: 'Salah! Menahan kencing membiarkan bakteri E. coli berkembang biak pesat.' },
          { text: '🚫 Jangan minum air sama sekali', isCorrect: false, reason: 'Salah! Menghidrasi tubuh membantu membilas bakteri dari lumen kandung kemih.' }
        ]
      },
      {
        id: 5,
        patient: 'Tn. Joko (45 th) — Pekerja Lapangan',
        case: 'Nyeri pinggang hilang timbul menjalar ke selangkangan. Urin berwarna kemerahan setelah bekerja mengangkat beban berat.',
        colorBadge: 'Kemerahan / Teh Gelap',
        colorHex: '#EF4444',
        options: [
          { text: '🩺 Waspada Nefrolitiasis (Batu Ginjal), Cek USG & Hidrasi', isCorrect: true, reason: 'Tepat! Nyeri kolik menjalar disertai hematuria merupakan tanda batu saluran kemih.' },
          { text: '🍔 Makan makanan tinggi garam dan jeroan', isCorrect: false, reason: 'Salah! Garam dan purin tinggi justru memicu pembentukan kristal kalsium dan asam urat.' },
          { text: '🛑 Hentikan asupan air', isCorrect: false, reason: 'Salah! Cairan cukup membantu melancarkan batu kecil keluar.' }
        ]
      },
      {
        id: 6,
        patient: 'Ibu Ani (40 th) — Evaluasi Pola Sehat',
        case: 'Makan siang teratur, minum 2 liter sehari, urin berwarna kuning pucat jernih tanpa keluhan nyeri apapun.',
        colorBadge: 'Kuning Pucat (Optimal)',
        colorHex: '#FEF08A',
        options: [
          { text: '🌟 Status Hidrasi Optimal, Pertahankan Pola Harian!', isCorrect: true, reason: 'Bagus sekali! Warna kuning pucat menandakan keseimbangan cairan dan fungsi tubulus prima.' },
          { text: '🏥 Rawat inap darurat', isCorrect: false, reason: 'Salah! Pasien dalam kondisi fisiologis normal.' },
          { text: '🧪 Beri antibiotik profilaksis', isCorrect: false, reason: 'Salah! Tidak ada indikasi antibiotik pada orang sehat.' }
        ]
      }
    ];
  }

  start() {
    this.score = 0;
    this.combo = 1;
    this.lives = 3;
    this.currentIndex = 0;
    this.renderQuestion();
  }

  renderQuestion() {
    if (this.currentIndex >= this.vignettes.length || this.lives <= 0) {
      this.endGame();
      return;
    }

    const item = this.vignettes[this.currentIndex];
    this.timer = 15;
    this.startTimer();

    this.container.innerHTML = `
      <div class="game-wrapper clinic-rush-view">
        <div class="game-header-bar">
          <div class="game-stat-pill">
            <span class="icon">⏱️</span>
            <span id="rush-timer" class="val">${this.timer}s</span>
          </div>
          <div class="game-stat-pill lives-pill">
            <span class="val">${'❤️'.repeat(this.lives)}${'🤍'.repeat(3 - this.lives)}</span>
          </div>
          <div class="game-stat-pill combo-pill">
            <span class="icon">⚡</span>
            <span class="val">x${this.combo} Combo</span>
          </div>
          <div class="game-stat-pill score-pill">
            <span class="icon">🏆</span>
            <span class="val">${this.score} Pts</span>
          </div>
        </div>

        <div class="clinic-patient-card">
          <div class="patient-profile">
            <span class="avatar-badge">👨‍⚕️ Pasien #${this.currentIndex + 1}</span>
            <h4 class="patient-name">${item.patient}</h4>
          </div>

          <div class="urine-visual-sample" style="background: ${item.colorHex}; border-color: rgba(10,46,92,0.2);">
            <span class="urine-beaker">🧪</span>
            <span class="urine-label">Sampel Urin: <strong>${item.colorBadge}</strong></span>
          </div>

          <div class="patient-case-text">
            <strong>Keluhan & Kondisi:</strong>
            <p>${item.case}</p>
          </div>
        </div>

        <div class="rush-options-grid">
          ${item.options.map((opt, idx) => `
            <button class="rush-option-btn btn-bounce" data-idx="${idx}">
              <span class="opt-text">${opt.text}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    const btns = this.container.querySelectorAll('.rush-option-btn');
    btns.forEach(b => {
      b.addEventListener('click', () => {
        const idx = parseInt(b.getAttribute('data-idx'), 10);
        this.handleChoice(item.options[idx], b);
      });
    });
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timer--;
      const el = document.getElementById('rush-timer');
      if (el) el.innerText = `${this.timer}s`;

      if (this.timer <= 0) {
        clearInterval(this.timerInterval);
        this.handleTimeout();
      }
    }, 1000);
  }

  handleTimeout() {
    this.lives--;
    this.combo = 1;
    if (window.kyguAudio) window.kyguAudio.playWrong();
    alert('⏱️ Waktu habis untuk pasien ini!');
    this.currentIndex++;
    this.renderQuestion();
  }

  handleChoice(option, btnEl) {
    if (this.timerInterval) clearInterval(this.timerInterval);

    if (option.isCorrect) {
      btnEl.classList.add('btn-correct');
      const earned = 200 * this.combo + this.timer * 10;
      this.score += earned;
      this.combo++;
      if (window.kyguAudio) window.kyguAudio.playCorrect();

      setTimeout(() => {
        alert(`✅ Tepat Sekali (+${earned} Pts)!\n\n${option.reason}`);
        this.currentIndex++;
        this.renderQuestion();
      }, 350);
    } else {
      btnEl.classList.add('btn-wrong');
      this.lives--;
      this.combo = 1;
      if (window.kyguAudio) window.kyguAudio.playWrong();

      setTimeout(() => {
        alert(`❌ Kurang Tepat (-1 Nyawa)!\n\n${option.reason}`);
        this.currentIndex++;
        this.renderQuestion();
      }, 350);
    }
  }

  endGame() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    let best = 0;
    try {
      best = parseInt(localStorage.getItem('kygu_rush_best') || '0', 10);
      if (this.score > best) {
        best = this.score;
        localStorage.setItem('kygu_rush_best', best.toString());
      }
    } catch (e) {}

    const isWin = this.lives > 0;
    if (isWin && window.kyguAudio) {
      window.kyguAudio.playFanfare();
    }

    this.container.innerHTML = `
      <div class="game-result-modal-inner">
        <div class="trophy-icon">${isWin ? '🏥🎖️' : '💔🚑'}</div>
        <h3 class="result-title">${isWin ? 'Shift Klinik Selesai dengan Sukses!' : 'Shift Berakhir (Nyawa Habis)'}</h3>
        <p class="result-msg">
          ${isWin 
            ? 'Analisis klinis dan penanganan hidrasi Anda sangat tepat dalam menjaga keseimbangan cairan pasien!' 
            : 'Perhatikan kembali interpretasi warna urin dan status klinis pasien untuk shift berikutnya.'}
        </p>

        <div class="result-stats-card">
          <div class="stat-row">
            <span>Skor Total:</span>
            <strong class="highlight">${this.score} Pts</strong>
          </div>
          <div class="stat-row">
            <span>Sisa Nyawa:</span>
            <strong>${this.lives} / 3</strong>
          </div>
          <div class="stat-row">
            <span>Skor Tertinggi:</span>
            <strong>${best} Pts</strong>
          </div>
        </div>

        <div class="result-actions">
          <button class="kygu-btn primary-btn btn-bounce" id="btn-replay-rush">
            🔄 Main Lagi
          </button>
          <button class="kygu-btn secondary-btn btn-bounce" id="btn-exit-rush">
            Kembali ke Practice
          </button>
        </div>
      </div>
    `;

    document.getElementById('btn-replay-rush').addEventListener('click', () => {
      this.start();
    });

    document.getElementById('btn-exit-rush').addEventListener('click', () => {
      if (typeof this.onEnd === 'function') this.onEnd(this.score);
    });
  }
}

window.UroPuzzleGame = UroPuzzleGame;
window.ClinicRushGame = ClinicRushGame;
