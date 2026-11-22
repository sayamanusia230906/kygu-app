/**
 * KyGU (Know Your GU) - Core Application Logic
 * Integrates State Management, Local Storage Persistence, Tab Navigation,
 * Modals, Bladder Diary, Urinalysis, Calculators, Quiz Engine & Games.
 */

class KyGUApp {
  constructor() {
    this.currentTab = 'home';
    this.state = {
      profile: {
        name: 'dr. Naufal / Sarah',
        role: 'Mahasiswa Kesehatan', // or 'Masyarakat Umum'
        email: 'user.kygu@medical.id',
        dailyTarget: 2000,
        defaultCup: 250,
        avatar: '👨‍⚕️',
        remindersEnabled: true
      },
      diary: {
        date: this.getTodayDateString(),
        totalMl: 1250,
        targetMl: 2000,
        logsMinum: [
          { id: 1, time: '07:15', ml: 250, label: '1 Gelas Air Pagi' },
          { id: 2, time: '09:30', ml: 250, label: '1 Gelas Air Saat Belajar' },
          { id: 3, time: '11:45', ml: 250, label: '1 Gelas Air Menjelang Siang' },
          { id: 4, time: '13:30', ml: 500, label: '1 Botol Air Pasca Makan' }
        ],
        logsBAK: [
          { id: 1, time: '07:40', vol: '200 ml', note: 'Normal' },
          { id: 2, time: '10:15', vol: '250 ml', note: 'Normal' },
          { id: 3, time: '12:30', vol: '180 ml', note: 'Agak mendesak' },
          { id: 4, time: '14:50', vol: '220 ml', note: 'Normal' }
        ],
        lastUrineColor: 'pale_yellow'
      },
      progress: {
        easyDone: 8,
        mediumDone: 4,
        hardDone: 2,
        totalScore: 1450,
        puzzleBest: 850,
        rushBest: 1200
      },
      notifications: [
        { id: 1, time: '14:00', title: '💧 Waktunya Minum Air!', text: 'Jangan tunggu haus, minumlah 1 gelas (250 ml) untuk menjaga filtrasi ginjal.', unread: true },
        { id: 2, time: '11:30', title: '🩺 Tip Fisiologi Renal', text: 'Tekanan hidrostatik kapiler glomerulus (60 mmHg) menjaga laju filtrasi tetap prima.', unread: true },
        { id: 3, time: '08:00', title: '☀️ Semangat Pagi KyGU', text: 'Target hidrasi Anda hari ini adalah 2.000 ml. Mulai hari dengan 1 gelas air.', unread: false }
      ],
      currentFactIdx: 0,
      activeQuiz: null,
      activeGame: null
    };

    this.viewer3D = null;
    this.waveCanvas = null;
    this.waveCtx = null;
    this.waveAnimId = null;

    this.loadState();
    this.init();
  }

  getTodayDateString() {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }

  getFormattedDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date().toLocaleDateString('id-ID', options);
  }

  loadState() {
    try {
      const s = localStorage.getItem('kygu_app_state');
      if (s) {
        const parsed = JSON.parse(s);
        if (parsed.profile) this.state.profile = Object.assign(this.state.profile, parsed.profile);
        if (parsed.diary && parsed.diary.date === this.getTodayDateString()) {
          this.state.diary = parsed.diary;
        }
        if (parsed.progress) this.state.progress = Object.assign(this.state.progress, parsed.progress);
      }
    } catch (e) {
      console.warn('Load state fallback:', e);
    }
  }

  saveState() {
    try {
      localStorage.setItem('kygu_app_state', JSON.stringify({
        profile: this.state.profile,
        diary: this.state.diary,
        progress: this.state.progress
      }));
    } catch (e) {
      console.warn('Save state fallback:', e);
    }
  }

  init() {
    this.setupViewportToggle();
    this.setupSplashScreen();
    this.setupTabNavigation();
    this.setupGlobalSearch();
    this.setupBladderDiary();
    this.setupFunFact();
    this.setupCalculators();
    this.setupLearnModules();
    this.setupPracticeScreen();
    this.setupProfileScreen();
    this.setupModals();
    this.initWaveAnimation();
    this.updateUI();
  }

  // --- VIEWPORT TOGGLE (MOBILE SHELL vs FULLSCREEN) ---
  setupViewportToggle() {
    const btnPhone = document.getElementById('view-phone-btn');
    const btnFull = document.getElementById('view-full-btn');
    const shell = document.getElementById('mobile-device-shell');

    if (btnPhone && btnFull && shell) {
      btnPhone.addEventListener('click', () => {
        shell.classList.remove('fullscreen-mode');
        btnPhone.classList.add('active');
        btnFull.classList.remove('active');
        if (this.viewer3D) this.viewer3D.resize();
        if (window.kyguAudio) window.kyguAudio.playTap();
      });

      btnFull.addEventListener('click', () => {
        shell.classList.add('fullscreen-mode');
        btnFull.classList.add('active');
        btnPhone.classList.remove('active');
        if (this.viewer3D) this.viewer3D.resize();
        if (window.kyguAudio) window.kyguAudio.playTap();
      });
    }
  }

  // --- SPLASH SCREEN ---
  setupSplashScreen() {
    const splash = document.getElementById('splash-screen');
    const bar = document.getElementById('splash-bar');

    if (splash && bar) {
      setTimeout(() => {
        bar.style.width = '100%';
      }, 100);

      const dismissSplash = () => {
        splash.classList.add('hidden');
        if (window.kyguAudio) {
          window.kyguAudio.unlock();
          window.kyguAudio.playWaterDrop();
        }
      };

      splash.addEventListener('click', dismissSplash);
      setTimeout(dismissSplash, 2200);
    }
  }

  // --- TAB NAVIGATION ---
  setupTabNavigation() {
    const tabs = document.querySelectorAll('.nav-tab-item');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        this.switchTab(targetTab);
        if (window.kyguAudio) window.kyguAudio.playTap();
      });
    });
  }

  switchTab(tabName) {
    this.currentTab = tabName;
    document.querySelectorAll('.nav-tab-item').forEach(t => {
      if (t.getAttribute('data-tab') === tabName) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    document.querySelectorAll('.tab-view-pane').forEach(p => {
      p.style.display = 'none';
    });

    const activePane = document.getElementById(`tab-pane-${tabName}`);
    if (activePane) {
      activePane.style.display = 'block';
    }

    if (tabName === 'learn' && !this.viewer3D) {
      setTimeout(() => {
        this.init3DViewer();
      }, 50);
    } else if (tabName === 'learn' && this.viewer3D) {
      this.viewer3D.resize();
    }
  }

  // --- GLOBAL SEARCH BAR ---
  setupGlobalSearch() {
    const input = document.getElementById('global-search-input');
    const drawer = document.getElementById('search-results-drawer');

    if (!input || !drawer) return;

    input.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        drawer.classList.remove('active');
        drawer.innerHTML = '';
        return;
      }

      const results = [];
      // Search in modules
      window.KyGUContent.modules.forEach(m => {
        if (m.title.toLowerCase().includes(q) || m.subtitle.toLowerCase().includes(q)) {
          results.push({ type: 'Materi GU', title: m.title, meta: m.subtitle, action: () => this.openModuleDetail(m.id) });
        }
        m.pathology.diseases.forEach(d => {
          if (d.name.toLowerCase().includes(q) || (d.description && d.description.toLowerCase().includes(q))) {
            results.push({ type: 'Penyakit GU', title: d.name, meta: m.title, action: () => {
              this.openModuleDetail(m.id);
              this.switchModuleTab('pathology');
            }});
          }
        });
      });

      // Search calculators
      const calcs = [
        { name: 'Kalkulator eGFR (CKD-EPI)', id: 'calc-egfr' },
        { name: 'Kalkulator Urine Output (ml/kg/jam)', id: 'calc-output' },
        { name: 'Kebutuhan Cairan Harian', id: 'calc-fluid' },
        { name: 'Skor Gejala Prostat (IPSS)', id: 'calc-ipss' }
      ];
      calcs.forEach(c => {
        if (c.name.toLowerCase().includes(q)) {
          results.push({ type: 'Kalkulator Medis', title: c.name, meta: 'Alat Klinis Fungsional', action: () => this.openCalculatorModal(c.id) });
        }
      });

      if (results.length === 0) {
        drawer.innerHTML = `<div style="padding: 10px; font-size: 12px; color: var(--text-muted); text-align: center;">Tidak ada hasil untuk "${q}"</div>`;
      } else {
        drawer.innerHTML = results.slice(0, 5).map((r, i) => `
          <div class="search-result-item" data-res="${i}">
            <div>
              <span style="font-size: 10px; font-weight: 700; color: var(--secondary-orange); text-transform: uppercase;">${r.type}</span>
              <div style="font-size: 13.5px; font-weight: 700; color: var(--primary-navy);">${r.title}</div>
              <div style="font-size: 11px; color: var(--text-secondary);">${r.meta}</div>
            </div>
            <span style="color: var(--secondary-orange); font-weight: 800;">➔</span>
          </div>
        `).join('');

        drawer.querySelectorAll('.search-result-item').forEach((item, idx) => {
          item.addEventListener('click', () => {
            drawer.classList.remove('active');
            input.value = '';
            results[idx].action();
          });
        });
      }

      drawer.classList.add('active');
    });
  }

  // --- BLADDER DIARY & URINE CHECK ---
  setupBladderDiary() {
    const btnLogMinum = document.getElementById('btn-log-minum');
    const btnLogBAK = document.getElementById('btn-log-bak');
    const btnCekWarna = document.getElementById('btn-cek-warna-urin');

    if (btnLogMinum) {
      btnLogMinum.addEventListener('click', () => {
        this.openModal('modal-log-minum');
        if (window.kyguAudio) window.kyguAudio.playTap();
      });
    }

    if (btnLogBAK) {
      btnLogBAK.addEventListener('click', () => {
        this.openModal('modal-log-bak');
        if (window.kyguAudio) window.kyguAudio.playTap();
      });
    }

    if (btnCekWarna) {
      btnCekWarna.addEventListener('click', () => {
        this.openModal('modal-cek-urin');
        this.renderUrineColorScale();
        if (window.kyguAudio) window.kyguAudio.playTap();
      });
    }

    // Quick add water buttons
    document.querySelectorAll('.quick-water-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const ml = parseInt(btn.getAttribute('data-ml'), 10);
        this.addWaterIntake(ml, btn.innerText);
        this.closeModal('modal-log-minum');
      });
    });

    const btnCustomWater = document.getElementById('btn-custom-water');
    if (btnCustomWater) {
      btnCustomWater.addEventListener('click', () => {
        const inp = document.getElementById('custom-water-input');
        const ml = parseInt(inp ? inp.value : '0', 10);
        if (ml > 0) {
          this.addWaterIntake(ml, `Kustom ${ml} ml`);
          if (inp) inp.value = '';
          this.closeModal('modal-log-minum');
        }
      });
    }

    // Submit BAK Log
    const btnSubmitBAK = document.getElementById('btn-submit-bak');
    if (btnSubmitBAK) {
      btnSubmitBAK.addEventListener('click', () => {
        const vol = document.getElementById('bak-volume-select').value;
        const note = document.getElementById('bak-complaint-select').value;
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        this.state.diary.logsBAK.push({
          id: Date.now(),
          time: timeStr,
          vol,
          note
        });

        this.saveState();
        this.updateUI();
        this.closeModal('modal-log-bak');
        if (window.kyguAudio) window.kyguAudio.playUrination();
      });
    }
  }

  addWaterIntake(ml, label) {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    this.state.diary.totalMl += ml;
    this.state.diary.logsMinum.push({
      id: Date.now(),
      time: timeStr,
      ml,
      label
    });

    this.saveState();
    this.updateUI();
    if (window.kyguAudio) window.kyguAudio.playWaterPour();

    // Check goal celebration
    if (this.state.diary.totalMl >= this.state.diary.targetMl) {
      this.triggerConfetti();
      if (window.kyguAudio) window.kyguAudio.playFanfare();
    }
  }

  // --- WAVE ANIMATION INSIDE CIRCULAR PROGRESS ---
  initWaveAnimation() {
    this.waveCanvas = document.getElementById('liquid-wave-canvas');
    if (!this.waveCanvas) return;
    this.waveCtx = this.waveCanvas.getContext('2d');
    let step = 0;

    const renderWave = () => {
      if (!this.waveCtx || !this.waveCanvas) return;
      const w = this.waveCanvas.width = 150;
      const h = this.waveCanvas.height = 150;
      this.waveCtx.clearRect(0, 0, w, h);

      const ratio = Math.min(1.0, this.state.diary.totalMl / this.state.diary.targetMl);
      const waterHeight = h * (1 - ratio);

      step += 0.045;

      // Draw water wave fill
      this.waveCtx.beginPath();
      this.waveCtx.moveTo(0, h);
      this.waveCtx.lineTo(0, waterHeight);

      for (let x = 0; x <= w; x += 5) {
        const y = waterHeight + Math.sin(x * 0.05 + step) * 5 + Math.cos(x * 0.03 - step * 0.7) * 3;
        this.waveCtx.lineTo(x, y);
      }

      this.waveCtx.lineTo(w, h);
      this.waveCtx.closePath();

      const waveGrad = this.waveCtx.createLinearGradient(0, waterHeight, 0, h);
      waveGrad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
      waveGrad.addColorStop(1, 'rgba(2, 132, 199, 0.75)');
      this.waveCtx.fillStyle = waveGrad;
      this.waveCtx.fill();

      this.waveAnimId = requestAnimationFrame(renderWave);
    };

    renderWave();
  }

  // --- TODAY FUN FACT ---
  setupFunFact() {
    const btn = document.getElementById('btn-refresh-fact');
    if (btn) {
      btn.addEventListener('click', () => {
        const facts = window.KyGUContent.funFacts;
        this.state.currentFactIdx = (this.state.currentFactIdx + 1) % facts.length;
        this.renderFunFact();
        if (window.kyguAudio) window.kyguAudio.playTap();
      });
    }
    this.renderFunFact();
  }

  renderFunFact() {
    const f = window.KyGUContent.funFacts[this.state.currentFactIdx];
    const titleEl = document.getElementById('funfact-title-text');
    const descEl = document.getElementById('funfact-desc-text');
    if (titleEl && descEl && f) {
      titleEl.innerText = f.title;
      descEl.innerText = f.content;
    }
  }

  // --- CLINICAL CALCULATORS MODAL & FORMS ---
  setupCalculators() {
    const banner = document.getElementById('btn-open-calculators');
    if (banner) {
      banner.addEventListener('click', () => {
        this.openModal('modal-calculators-hub');
        if (window.kyguAudio) window.kyguAudio.playTap();
      });
    }

    // Calculator Hub buttons
    document.querySelectorAll('.calc-hub-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-calc');
        this.closeModal('modal-calculators-hub');
        this.openCalculatorModal(targetId);
        if (window.kyguAudio) window.kyguAudio.playTap();
      });
    });

    // Form: eGFR
    const formEGFR = document.getElementById('form-calc-egfr');
    if (formEGFR) {
      formEGFR.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
          age: document.getElementById('egfr-age').value,
          gender: document.getElementById('egfr-gender').value,
          weight: document.getElementById('egfr-weight').value,
          scr: document.getElementById('egfr-scr').value
        };
        const res = window.KyGUCalculators.calculateEGFR(data);
        this.renderEGFRResult(res);
        if (window.kyguAudio) window.kyguAudio.playCorrect();
      });
    }

    // Form: Urine Output
    const formOutput = document.getElementById('form-calc-output');
    if (formOutput) {
      formOutput.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
          volume: document.getElementById('output-volume').value,
          weight: document.getElementById('output-weight').value,
          hours: document.getElementById('output-hours').value
        };
        const res = window.KyGUCalculators.calculateUrineOutput(data);
        this.renderOutputResult(res);
        if (window.kyguAudio) window.kyguAudio.playCorrect();
      });
    }

    // Form: Kebutuhan Cairan
    const formFluid = document.getElementById('form-calc-fluid');
    if (formFluid) {
      formFluid.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
          weight: document.getElementById('fluid-weight').value,
          activity: document.getElementById('fluid-activity').value,
          weather: document.getElementById('fluid-weather').value
        };
        const res = window.KyGUCalculators.calculateFluidRequirement(data);
        this.renderFluidResult(res);
        if (window.kyguAudio) window.kyguAudio.playCorrect();
      });
    }

    // Form: IPSS
    const formIPSS = document.getElementById('form-calc-ipss');
    if (formIPSS) {
      formIPSS.addEventListener('submit', (e) => {
        e.preventDefault();
        const answers = [];
        for (let i = 1; i <= 7; i++) {
          const sel = document.getElementById(`ipss-q${i}`);
          answers.push(sel ? sel.value : 0);
        }
        const qol = document.getElementById('ipss-qol').value;
        const res = window.KyGUCalculators.calculateIPSS(answers, qol);
        this.renderIPSSResult(res);
        if (window.kyguAudio) window.kyguAudio.playCorrect();
      });
    }
  }

  openCalculatorModal(calcId) {
    this.openModal(`modal-${calcId}`);
  }

  renderEGFRResult(res) {
    const box = document.getElementById('egfr-result-box');
    if (!box) return;
    if (res.error) {
      box.innerHTML = `<div class="res-error">${res.error}</div>`;
      return;
    }
    box.innerHTML = `
      <div class="calc-result-card ${res.stageClass}">
        <div class="result-number-hero">
          <span class="num">${res.egfr}</span>
          <span class="unit">mL/menit/1.73m² (CKD-EPI)</span>
        </div>
        ${res.crcl ? `<div style="font-size:12px; margin-bottom:8px; color:var(--text-secondary);">CrCl Cockcroft-Gault: <strong>${res.crcl} mL/menit</strong></div>` : ''}
        <div class="result-badge-pill">${res.stage}</div>
        <p class="result-desc-text"><strong>Makna Medis:</strong> ${res.description}</p>
        <div class="result-rec-alert"><strong>Rekomendasi Tindakan:</strong> ${res.recommendation}</div>
      </div>
    `;
  }

  renderOutputResult(res) {
    const box = document.getElementById('output-result-box');
    if (!box) return;
    if (res.error) {
      box.innerHTML = `<div class="res-error">${res.error}</div>`;
      return;
    }
    box.innerHTML = `
      <div class="calc-result-card ${res.statusClass}">
        <div class="result-number-hero">
          <span class="num">${res.rate}</span>
          <span class="unit">ml/kgBB/jam</span>
        </div>
        <div class="result-badge-pill">${res.status}</div>
        <p class="result-desc-text"><strong>Interpretasi Klinis:</strong> ${res.clinicalMeaning}</p>
        <div class="result-rec-alert"><strong>Saran Medis:</strong> ${res.actionAdvice}</div>
      </div>
    `;
  }

  renderFluidResult(res) {
    const box = document.getElementById('fluid-result-box');
    if (!box) return;
    if (res.error) {
      box.innerHTML = `<div class="res-error">${res.error}</div>`;
      return;
    }
    box.innerHTML = `
      <div class="calc-result-card fluid-card">
        <div class="result-number-hero">
          <span class="num">${res.recommendedMl}</span>
          <span class="unit">ml/hari (± ${res.glasses} Gelas)</span>
        </div>
        <div style="font-size: 11.5px; color: var(--text-secondary); margin-bottom: 10px;">
          Rumus Holliday-Segar: <strong>${res.hollidayMl} ml</strong> | Standar Dewasa 30–35 ml/kg: <strong>${res.adultRange}</strong>
        </div>
        <div class="fluid-schedule-grid">
          <div class="sched-pill">☀️ Pagi: <strong>${res.breakdown.pagi} ml</strong></div>
          <div class="sched-pill">🌤️ Siang: <strong>${res.breakdown.siang} ml</strong></div>
          <div class="sched-pill">🌙 Malam: <strong>${res.breakdown.malam} ml</strong></div>
        </div>
        <button class="kygu-btn btn-orange-deep btn-bounce" id="btn-sync-target-diary" style="margin-top:12px; width:100%;">
          🔄 Sinkronkan ke Target Bladder Diary
        </button>
      </div>
    `;

    document.getElementById('btn-sync-target-diary').addEventListener('click', () => {
      this.state.profile.dailyTarget = res.recommendedMl;
      this.state.diary.targetMl = res.recommendedMl;
      this.saveState();
      this.updateUI();
      if (window.kyguAudio) window.kyguAudio.playWaterDrop();
      alert(`✅ Target harian Bladder Diary berhasil diperbarui menjadi ${res.recommendedMl} ml (${res.glasses} Gelas)!`);
      this.closeModal('modal-calc-fluid');
    });
  }

  renderIPSSResult(res) {
    const box = document.getElementById('ipss-result-box');
    if (!box) return;
    if (res.error) {
      box.innerHTML = `<div class="res-error">${res.error}</div>`;
      return;
    }
    box.innerHTML = `
      <div class="calc-result-card ${res.severityClass}">
        <div class="result-number-hero">
          <span class="num">${res.totalScore}</span>
          <span class="unit">/ 35 Total Skor IPSS</span>
        </div>
        <div class="result-badge-pill">${res.severity}</div>
        <div style="font-size: 12px; color: var(--text-secondary); margin: 6px 0;">Kualitas Hidup (QoL): <strong>${res.qolScore} / 6 (${res.qolText})</strong></div>
        <p class="result-desc-text"><strong>Kesimpulan Klinis:</strong> ${res.clinicalSummary}</p>
        <div class="result-rec-alert"><strong>Langkah Penanganan:</strong> ${res.recommendation}</div>
      </div>
    `;
  }

  // --- URINE COLOR SCALE MODAL ---
  renderUrineColorScale() {
    const grid = document.getElementById('urine-color-grid');
    const detailBox = document.getElementById('urine-color-detail-box');
    if (!grid || !detailBox) return;

    const scales = window.KyGUContent.urineColorScale;
    grid.innerHTML = scales.map(s => `
      <div class="urine-scale-swatch ${s.id === this.state.diary.lastUrineColor ? 'active' : ''}" 
           style="background: ${s.colorHex}; border-color: ${s.borderHex};" 
           data-id="${s.id}">
        <span>${s.name.split('(')[0]}</span>
      </div>
    `).join('');

    const showDetails = (item) => {
      detailBox.innerHTML = `
        <div class="urine-interp-card" style="border-left: 4px solid ${item.borderHex};">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <strong style="color:var(--primary-navy); font-size:15px;">${item.name}</strong>
            <span class="badge ${item.badgeClass}">${item.status}</span>
          </div>
          <div style="font-size:12px; color:var(--text-secondary); margin-bottom:6px;">
            <strong>Tingkat Hidrasi:</strong> ${item.hydrationRating}
          </div>
          <p style="font-size:12.5px; line-height:1.45; margin-bottom:8px;">
            <strong>Makna Medis:</strong> ${item.clinicalMeaning}
          </p>
          <div style="font-size:12px; background:rgba(245,124,0,0.1); border-left:3px solid var(--secondary-orange); padding:8px; border-radius:4px; color:#9A3412;">
            <strong>Saran Tindakan:</strong> ${item.actionAdvice}
          </div>
          <button class="kygu-btn btn-orange-deep btn-bounce" id="btn-save-urine-color" style="margin-top:12px; width:100%;">
            💾 Catat Warna Ini ke Bladder Diary
          </button>
        </div>
      `;

      document.getElementById('btn-save-urine-color').addEventListener('click', () => {
        this.state.diary.lastUrineColor = item.id;
        this.saveState();
        if (window.kyguAudio) window.kyguAudio.playWaterDrop();
        alert(`✅ Warna urin "${item.name}" berhasil dicatat ke riwayat harian!`);
        this.closeModal('modal-cek-urin');
        this.updateUI();
      });
    };

    // Default select current or first
    const currentItem = scales.find(s => s.id === this.state.diary.lastUrineColor) || scales[1];
    showDetails(currentItem);

    grid.querySelectorAll('.urine-scale-swatch').forEach(swatch => {
      swatch.addEventListener('click', () => {
        grid.querySelectorAll('.urine-scale-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        const id = swatch.getAttribute('data-id');
        const item = scales.find(s => s.id === id);
        if (item) showDetails(item);
        if (window.kyguAudio) window.kyguAudio.playTap();
      });
    });
  }

  // --- SCREEN 2: LEARN MODULES & 3D VIEWER ---
  setupLearnModules() {
    const list = document.getElementById('learn-category-list');
    if (!list) return;

    list.innerHTML = window.KyGUContent.modules.map(m => `
      <div class="category-card-btn btn-bounce" data-id="${m.id}">
        <div class="cat-left">
          <div class="cat-icon-box">${m.icon}</div>
          <div>
            <div class="cat-title">${m.title}</div>
            <div class="cat-subtitle">${m.subtitle}</div>
          </div>
        </div>
        <span class="cat-arrow">➔</span>
      </div>
    `).join('');

    list.querySelectorAll('.category-card-btn').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        this.openModuleDetail(id);
        if (window.kyguAudio) window.kyguAudio.playTap();
      });
    });

    // Module Detail Controls
    const btnBack = document.getElementById('btn-back-learn-list');
    if (btnBack) {
      btnBack.addEventListener('click', () => {
        document.getElementById('learn-modules-view').style.display = 'block';
        document.getElementById('learn-detail-view').style.display = 'none';
        if (window.kyguAudio) window.kyguAudio.playTap();
      });
    }

    const tabNormal = document.getElementById('mod-tab-normal');
    const tabPathology = document.getElementById('mod-tab-pathology');
    if (tabNormal && tabPathology) {
      tabNormal.addEventListener('click', () => this.switchModuleTab('normal'));
      tabPathology.addEventListener('click', () => this.switchModuleTab('pathology'));
    }
  }

  init3DViewer() {
    if (this.viewer3D) return;
    this.viewer3D = new KyGU3DViewer('anatomy-3d-canvas', 'canvas-viewport-frame');
    this.viewer3D.onHotspotClick = (hotspot) => {
      this.showHotspotModal(hotspot);
    };

    // 3D Controls buttons
    const btnReset = document.getElementById('btn-3d-reset');
    const btnRotate = document.getElementById('btn-3d-autorotate');
    const selOrgan = document.getElementById('select-3d-organ');

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        this.viewer3D.resetView();
        if (window.kyguAudio) window.kyguAudio.playTap();
      });
    }

    if (btnRotate) {
      btnRotate.addEventListener('click', () => {
        const isRot = this.viewer3D.toggleAutoRotate();
        btnRotate.innerText = isRot ? '🔄 Putar: ON' : '⏸️ Putar: OFF';
        if (window.kyguAudio) window.kyguAudio.playTap();
      });
    }

    if (selOrgan) {
      selOrgan.addEventListener('change', (e) => {
        this.viewer3D.loadOrgan(e.target.value);
        if (window.kyguAudio) window.kyguAudio.playTap();
      });
    }
  }

  openModuleDetail(moduleId) {
    const mod = window.KyGUContent.modules.find(m => m.id === moduleId);
    if (!mod) return;

    this.switchTab('learn');
    document.getElementById('learn-modules-view').style.display = 'none';
    const detailView = document.getElementById('learn-detail-view');
    detailView.style.display = 'block';

    document.getElementById('detail-module-title').innerText = mod.title;
    document.getElementById('detail-module-sub').innerText = mod.subtitle;

    // Load matching 3D Organ Model
    if (this.viewer3D && mod.anatomyId) {
      const selOrgan = document.getElementById('select-3d-organ');
      if (selOrgan) selOrgan.value = mod.anatomyId;
      this.viewer3D.loadOrgan(mod.anatomyId);
    }

    // Render Normal Content
    const normalBox = document.getElementById('detail-pane-normal');
    normalBox.innerHTML = `
      <div class="detail-summary-card">${mod.normal.summary}</div>
      ${mod.normal.sections.map(sec => `
        <div class="detail-section-block">
          <h4 class="sec-title">${sec.title}</h4>
          <ul class="sec-point-list">
            ${sec.points.map(pt => `<li>${pt}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    `;

    // Render Pathology Content
    const pathBox = document.getElementById('detail-pane-pathology');
    pathBox.innerHTML = `
      ${mod.pathology.diseases.map(d => `
        <div class="disease-card">
          <h4 class="disease-name">${d.name}</h4>
          <p class="disease-desc">${d.description}</p>
          ${d.subtypes ? `
            <div class="disease-subtypes">
              <strong>Klasifikasi & Etiologi:</strong>
              <ul>${d.subtypes.map(s => `<li>${s}</li>`).join('')}</ul>
            </div>
          ` : ''}
          ${d.symptoms ? `
            <div class="disease-symptoms">
              <strong>Gejala Khas:</strong> ${d.symptoms}
            </div>
          ` : ''}
          ${d.redFlags ? `
            <div class="disease-redflags">
              <strong>🚨 Kapan Harus ke Dokter (Red Flags):</strong> ${d.redFlags}
            </div>
          ` : ''}
        </div>
      `).join('')}
    `;

    this.switchModuleTab('normal');
  }

  switchModuleTab(tabType) {
    const tabN = document.getElementById('mod-tab-normal');
    const tabP = document.getElementById('mod-tab-pathology');
    const paneN = document.getElementById('detail-pane-normal');
    const paneP = document.getElementById('detail-pane-pathology');

    if (tabType === 'normal') {
      tabN.classList.add('active');
      tabP.classList.remove('active');
      paneN.style.display = 'block';
      paneP.style.display = 'none';
    } else {
      tabP.classList.add('active');
      tabN.classList.remove('active');
      paneP.style.display = 'block';
      paneN.style.display = 'none';
    }
  }

  showHotspotModal(hotspot) {
    const modal = document.getElementById('modal-hotspot-info');
    if (!modal) return;
    document.getElementById('hotspot-modal-title').innerText = hotspot.title;
    document.getElementById('hotspot-modal-sub').innerText = hotspot.subtitle;
    document.getElementById('hotspot-modal-desc').innerText = hotspot.desc;
    this.openModal('modal-hotspot-info');
  }

  // --- SCREEN 3: PRACTICE (QUIZ & GAMES) ---
  setupPracticeScreen() {
    // Difficulty Buttons (Easy, Medium, Hard - Exactly 20 questions each)
    document.getElementById('btn-quiz-easy').addEventListener('click', () => {
      this.startQuiz('easy');
      if (window.kyguAudio) window.kyguAudio.playTap();
    });

    document.getElementById('btn-quiz-medium').addEventListener('click', () => {
      this.startQuiz('medium');
      if (window.kyguAudio) window.kyguAudio.playTap();
    });

    document.getElementById('btn-quiz-hard').addEventListener('click', () => {
      this.startQuiz('hard');
      if (window.kyguAudio) window.kyguAudio.playTap();
    });

    // Games Buttons
    document.getElementById('btn-game-puzzle').addEventListener('click', () => {
      this.startGamePuzzle();
      if (window.kyguAudio) window.kyguAudio.playTap();
    });

    document.getElementById('btn-game-rush').addEventListener('click', () => {
      this.startGameRush();
      if (window.kyguAudio) window.kyguAudio.playTap();
    });

    // Quiz Close / Exit
    const btnExitQuiz = document.getElementById('btn-exit-quiz');
    if (btnExitQuiz) {
      btnExitQuiz.addEventListener('click', () => {
        this.closeModal('modal-quiz-player');
      });
    }
  }

  startQuiz(difficulty) {
    const questions = window.KyGUQuestions[difficulty];
    if (!questions || questions.length === 0) return;

    this.activeQuiz = {
      difficulty,
      questions,
      currentIndex: 0,
      score: 0,
      correctCount: 0,
      timer: 30,
      timerInterval: null
    };

    this.openModal('modal-quiz-player');
    this.renderQuizQuestion();
  }

  renderQuizQuestion() {
    const qState = this.activeQuiz;
    if (!qState || qState.currentIndex >= qState.questions.length) {
      this.endQuiz();
      return;
    }

    const q = qState.questions[qState.currentIndex];
    const playerBox = document.getElementById('quiz-player-content');

    playerBox.innerHTML = `
      <div class="quiz-status-header">
        <span class="quiz-level-tag badge-${qState.difficulty}">Level ${qState.difficulty.toUpperCase()}</span>
        <span class="quiz-q-counter">Soal ${qState.currentIndex + 1} / ${qState.questions.length}</span>
        <span class="quiz-score-live">Skor: ${qState.score}</span>
      </div>

      <div class="quiz-question-card">
        <span class="quiz-topic-badge">${q.badge}</span>
        <h3 class="quiz-question-text">${q.question}</h3>
      </div>

      <div class="quiz-options-list">
        ${q.options.map((opt, idx) => `
          <button class="quiz-option-choice btn-bounce" data-opt="${idx}">
            <span class="opt-letter">${String.fromCharCode(65 + idx)}.</span>
            <span class="opt-text">${opt}</span>
          </button>
        `).join('')}
      </div>

      <div id="quiz-feedback-area" style="display: none;"></div>
    `;

    const btns = playerBox.querySelectorAll('.quiz-option-choice');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const choice = parseInt(btn.getAttribute('data-opt'), 10);
        this.handleQuizAnswer(choice, btns, q);
      });
    });
  }

  handleQuizAnswer(choice, buttons, q) {
    buttons.forEach(b => b.disabled = true);
    const feedbackArea = document.getElementById('quiz-feedback-area');
    const isCorrect = choice === q.correct;

    if (isCorrect) {
      buttons[choice].classList.add('correct');
      this.activeQuiz.score += 100;
      this.activeQuiz.correctCount++;
      if (window.kyguAudio) window.kyguAudio.playCorrect();
    } else {
      buttons[choice].classList.add('incorrect');
      buttons[q.correct].classList.add('correct');
      if (window.kyguAudio) window.kyguAudio.playWrong();
    }

    feedbackArea.style.display = 'block';
    feedbackArea.innerHTML = `
      <div class="quiz-explanation-box">
        <strong>${isCorrect ? '✅ Jawaban Anda Tepat!' : '❌ Jawaban Kurang Tepat!'}</strong>
        <p style="margin-top: 6px;">${q.explanation}</p>
        <button class="kygu-btn primary-btn btn-bounce" id="btn-next-question" style="margin-top: 12px; width: 100%;">
          ${this.activeQuiz.currentIndex + 1 < this.activeQuiz.questions.length ? 'Soal Selanjutnya ➔' : 'Lihat Hasil Akhir 🏆'}
        </button>
      </div>
    `;

    document.getElementById('btn-next-question').addEventListener('click', () => {
      this.activeQuiz.currentIndex++;
      this.renderQuizQuestion();
      if (window.kyguAudio) window.kyguAudio.playTap();
    });
  }

  endQuiz() {
    const qState = this.activeQuiz;
    const total = qState.questions.length;
    const pct = Math.round((qState.correctCount / total) * 100);

    // Update state progress
    if (qState.difficulty === 'easy') {
      this.state.progress.easyDone = Math.max(this.state.progress.easyDone, qState.correctCount);
    } else if (qState.difficulty === 'medium') {
      this.state.progress.mediumDone = Math.max(this.state.progress.mediumDone, qState.correctCount);
    } else if (qState.difficulty === 'hard') {
      this.state.progress.hardDone = Math.max(this.state.progress.hardDone, qState.correctCount);
    }
    this.state.progress.totalScore += qState.score;
    this.saveState();
    this.updateUI();

    if (pct >= 70) {
      this.triggerConfetti();
      if (window.kyguAudio) window.kyguAudio.playFanfare();
    }

    const playerBox = document.getElementById('quiz-player-content');
    playerBox.innerHTML = `
      <div class="quiz-result-summary-card">
        <div class="trophy-icon">${pct >= 70 ? '🎉🎓' : '📚💡'}</div>
        <h3>Hasil Latihan ${qState.difficulty.toUpperCase()}</h3>
        <div class="score-circle-display">
          <span class="pct">${pct}%</span>
          <span class="txt">${qState.correctCount} / ${total} Soal Benar</span>
        </div>
        <p style="font-size:13px; color:var(--text-secondary); text-align:center; margin:12px 0;">
          ${pct >= 70 ? 'Pemahaman genitourinaria Anda sangat mendalam dan siap diaplikasikan!' : 'Pelajari kembali rangkuman materi normal vs patologis di tab Learn untuk meningkatkan skor.'}
        </p>
        <button class="kygu-btn primary-btn btn-bounce" id="btn-finish-quiz" style="width:100%;">
          Selesai & Kembali
        </button>
      </div>
    `;

    document.getElementById('btn-finish-quiz').addEventListener('click', () => {
      this.closeModal('modal-quiz-player');
      this.activeQuiz = null;
    });
  }

  startGamePuzzle() {
    this.openModal('modal-game-container');
    document.getElementById('game-modal-title').innerText = 'Uro-Puzzle: Rakit Anatomi GU';
    this.activeGame = new window.UroPuzzleGame('game-viewport-box', (earned) => {
      this.state.progress.totalScore += earned;
      this.saveState();
      this.updateUI();
      this.closeModal('modal-game-container');
    });
    this.activeGame.start();
  }

  startGameRush() {
    this.openModal('modal-game-container');
    document.getElementById('game-modal-title').innerText = 'Hydration & Clinic Rush';
    this.activeGame = new window.ClinicRushGame('game-viewport-box', (earned) => {
      this.state.progress.totalScore += earned;
      this.saveState();
      this.updateUI();
      this.closeModal('modal-game-container');
    });
    this.activeGame.start();
  }

  // --- SCREEN 4: PROFILE & AUDIO SETTINGS ---
  setupProfileScreen() {
    const sfxToggle = document.getElementById('toggle-sfx-switch');
    const musicToggle = document.getElementById('toggle-music-switch');
    const volumeSlider = document.getElementById('slider-volume');

    if (sfxToggle) {
      sfxToggle.checked = window.kyguAudio.isSfxEnabled;
      sfxToggle.addEventListener('change', (e) => {
        window.kyguAudio.toggleSfx(e.target.checked);
      });
    }

    if (musicToggle) {
      musicToggle.checked = window.kyguAudio.isMusicEnabled;
      musicToggle.addEventListener('change', (e) => {
        window.kyguAudio.toggleMusic(e.target.checked);
      });
    }

    if (volumeSlider) {
      volumeSlider.value = Math.round(window.kyguAudio.volume * 100);
      volumeSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10) / 100;
        window.kyguAudio.setVolume(val);
      });
    }

    // Audio Track Pills
    document.querySelectorAll('.audio-track-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.audio-track-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const track = btn.getAttribute('data-track');
        window.kyguAudio.setTrack(track);
        if (!window.kyguAudio.isMusicEnabled && track !== 'none') {
          if (musicToggle) musicToggle.checked = true;
          window.kyguAudio.toggleMusic(true);
        }
      });
    });

    // Profile Edit Modal
    const btnEditProfile = document.getElementById('btn-edit-profile');
    if (btnEditProfile) {
      btnEditProfile.addEventListener('click', () => {
        this.openModal('modal-edit-profile');
        if (window.kyguAudio) window.kyguAudio.playTap();
      });
    }

    const formProfile = document.getElementById('form-edit-profile');
    if (formProfile) {
      formProfile.addEventListener('submit', (e) => {
        e.preventDefault();
        this.state.profile.name = document.getElementById('profile-edit-name').value;
        this.state.profile.role = document.getElementById('profile-edit-role').value;
        this.state.profile.dailyTarget = parseInt(document.getElementById('profile-edit-target').value, 10) || 2000;
        this.state.profile.defaultCup = parseInt(document.getElementById('profile-edit-cup').value, 10) || 250;
        this.state.diary.targetMl = this.state.profile.dailyTarget;
        this.saveState();
        this.updateUI();
        this.closeModal('modal-edit-profile');
        if (window.kyguAudio) window.kyguAudio.playWaterDrop();
        alert('✅ Profil berhasil diperbarui!');
      });
    }

    // Avatar change trigger
    const avatarCircle = document.getElementById('profile-avatar-circle');
    if (avatarCircle) {
      avatarCircle.addEventListener('click', () => {
        const avs = ['👨‍⚕️', '👩‍⚕️', '🧑‍🔬', '🏃‍♂️', '💧'];
        const curIdx = avs.indexOf(this.state.profile.avatar);
        this.state.profile.avatar = avs[(curIdx + 1) % avs.length];
        this.saveState();
        this.updateUI();
        if (window.kyguAudio) window.kyguAudio.playTap();
      });
    }

    // FAQ Accordion
    const faqList = document.getElementById('faq-accordion-list');
    if (faqList) {
      faqList.innerHTML = window.KyGUContent.faqs.map((f, i) => `
        <div class="faq-item" data-idx="${i}">
          <div class="faq-q">
            <span>${f.q}</span>
            <span class="faq-arrow">▼</span>
          </div>
          <div class="faq-a">${f.a}</div>
        </div>
      `).join('');

      faqList.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => {
          item.classList.toggle('open');
          if (window.kyguAudio) window.kyguAudio.playTap();
        });
      });
    }

    // Logout Button with Confirmation
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
      btnLogout.addEventListener('click', () => {
        if (confirm('Apakah Anda yakin ingin keluar dari akun? Data pemantauan harian tetap tersimpan secara lokal di perangkat ini.')) {
          alert('Anda sekarang berada dalam Mode Tamu (Guest Mode).');
          this.switchTab('home');
        }
      });
    }
  }

  // --- GENERAL MODALS ---
  setupModals() {
    document.querySelectorAll('.modal-close-x').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay-backdrop');
        if (modal) modal.classList.remove('active');
        if (window.kyguAudio) window.kyguAudio.playTap();
      });
    });

    // Close on backdrop click
    document.querySelectorAll('.modal-overlay-backdrop').forEach(m => {
      m.addEventListener('click', (e) => {
        if (e.target === m) {
          m.classList.remove('active');
        }
      });
    });

    // Bell notification trigger
    const btnBell = document.getElementById('btn-notification-bell');
    if (btnBell) {
      btnBell.addEventListener('click', () => {
        this.renderNotifications();
        this.openModal('modal-notifications');
        if (window.kyguAudio) window.kyguAudio.playNotification();
      });
    }
  }

  openModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.add('active');
  }

  closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.remove('active');
  }

  renderNotifications() {
    const box = document.getElementById('notifications-list-container');
    if (!box) return;
    box.innerHTML = this.state.notifications.map(n => `
      <div class="notification-item-card ${n.unread ? 'unread' : ''}">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
          <strong style="color: var(--primary-navy); font-size: 13.5px;">${n.title}</strong>
          <span style="font-size: 11px; color: var(--text-muted);">${n.time}</span>
        </div>
        <p style="font-size: 12px; color: var(--text-secondary); line-height: 1.4;">${n.text}</p>
      </div>
    `).join('');
  }

  // --- CELEBRATION CONFETTI ---
  triggerConfetti() {
    const confettiWrap = document.getElementById('confetti-container');
    if (!confettiWrap) return;
    confettiWrap.innerHTML = '';
    const colors = ['#FFA000', '#F57C00', '#0A2E5C', '#38BDF8', '#10B981', '#EC4899'];
    for (let i = 0; i < 45; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = `${Math.random() * 0.8}s`;
      piece.style.transform = `scale(${0.6 + Math.random() * 0.7}) rotate(${Math.random() * 360}deg)`;
      confettiWrap.appendChild(piece);
    }
    setTimeout(() => {
      confettiWrap.innerHTML = '';
    }, 3500);
  }

  // --- REFRESH ALL UI METRICS ---
  updateUI() {
    const d = this.state.diary;
    const p = this.state.profile;
    const prog = this.state.progress;

    // Home Bladder Diary metrics
    const intakeLabel = document.getElementById('bladder-fluid-ratio');
    if (intakeLabel) {
      intakeLabel.innerText = `${d.totalMl.toLocaleString('id-ID')} / ${d.targetMl.toLocaleString('id-ID')} ml`;
    }

    const cupLabel = document.getElementById('bladder-cups-ratio');
    if (cupLabel) {
      const cupsConsumed = Math.round((d.totalMl / p.defaultCup) * 10) / 10;
      const cupsTarget = Math.round((d.targetMl / p.defaultCup) * 10) / 10;
      cupLabel.innerText = `${cupsConsumed} / ${cupsTarget} Gelas`;
    }

    const bakCountLabel = document.getElementById('bladder-bak-count');
    if (bakCountLabel) {
      bakCountLabel.innerText = `${d.logsBAK.length}x BAK Hari Ini`;
    }

    const dateBadge = document.getElementById('diary-date-badge');
    if (dateBadge) {
      dateBadge.innerText = this.getFormattedDate();
    }

    // Practice tab status cards
    const totalQuestions = 60;
    const doneQuestions = prog.easyDone + prog.mediumDone + prog.hardDone;
    const donePct = Math.round((doneQuestions / totalQuestions) * 100);

    const progVal = document.getElementById('practice-progress-val');
    if (progVal) progVal.innerText = `${donePct}% (${doneQuestions}/${totalQuestions})`;

    const scoreVal = document.getElementById('practice-score-val');
    if (scoreVal) scoreVal.innerText = `${prog.totalScore.toLocaleString('id-ID')} Pts`;

    // Profile screen labels
    const pName = document.getElementById('profile-display-name');
    if (pName) pName.innerText = p.name;

    const pRole = document.getElementById('profile-display-role');
    if (pRole) pRole.innerText = p.role;

    const pEmail = document.getElementById('profile-display-email');
    if (pEmail) pEmail.innerText = p.email;

    const pAvatar = document.getElementById('profile-avatar-emoji');
    if (pAvatar) pAvatar.innerText = p.avatar;

    const pTarget = document.getElementById('profile-display-target');
    if (pTarget) pTarget.innerText = `${p.dailyTarget} ml (${p.dailyTarget / p.defaultCup} Gelas)`;
  }
}

// Instantiate App
window.addEventListener('DOMContentLoaded', () => {
  window.kygu = new KyGUApp();
});
