/**
 * KyGU (Know Your GU) - Interactive 3D GU Anatomy Viewer
 * Provides 360-degree interactive 3D anatomical visualization of Genitourinary organs,
 * featuring zoom, pan, orbit controls, organ presets, and interactive 3D anatomical hotspots!
 */

class KyGU3DViewer {
  constructor(canvasId, containerId) {
    this.canvas = document.getElementById(canvasId);
    this.container = document.getElementById(containerId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;

    this.currentOrgan = 'kidney'; // 'kidney', 'nephron', 'bladder', 'prostate'
    this.rotationX = 0.25;
    this.rotationY = 0.45;
    this.zoom = 1.0;
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.autoRotate = true;
    this.animId = null;
    this.hotspots = [];
    this.activeHotspot = null;
    this.onHotspotClick = null;

    this.initEvents();
    this.loadOrgan('kidney');
    this.animate();
  }

  initEvents() {
    if (!this.canvas) return;

    // Mouse drag rotation
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
      this.autoRotate = false;
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.lastMouseX;
      const dy = e.clientY - this.lastMouseY;
      this.rotationY += dx * 0.008;
      this.rotationX += dy * 0.008;
      this.rotationX = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, this.rotationX));
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    });

    // Touch events for mobile phones
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.lastMouseX = e.touches[0].clientX;
        this.lastMouseY = e.touches[0].clientY;
        this.autoRotate = false;
      }
    }, { passive: false });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && this.isDragging) {
        e.preventDefault();
        const dx = e.touches[0].clientX - this.lastMouseX;
        const dy = e.touches[0].clientY - this.lastMouseY;
        this.rotationY += dx * 0.01;
        this.rotationX += dy * 0.01;
        this.rotationX = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, this.rotationX));
        this.lastMouseX = e.touches[0].clientX;
        this.lastMouseY = e.touches[0].clientY;
      }
    }, { passive: false });

    // Wheel zoom
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.zoom += e.deltaY * -0.001;
      this.zoom = Math.max(0.6, Math.min(2.4, this.zoom));
    }, { passive: false });

    // Click hotspot detection
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.checkHotspotClick(x, y);
    });

    // Resize observer
    window.addEventListener('resize', () => this.resize());
    this.resize();
  }

  resize() {
    if (!this.canvas || !this.container) return;
    const w = this.container.clientWidth || 360;
    const h = this.container.clientHeight || 260;
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = w * dpr;
    this.canvas.height = h * dpr;
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    if (this.ctx) {
      this.ctx.resetTransform();
      this.ctx.scale(dpr, dpr);
    }
  }

  setZoom(val) {
    this.zoom = Math.max(0.6, Math.min(2.4, val));
  }

  resetView() {
    this.rotationX = 0.25;
    this.rotationY = 0.45;
    this.zoom = 1.0;
    this.autoRotate = true;
  }

  toggleAutoRotate() {
    this.autoRotate = !this.autoRotate;
    return this.autoRotate;
  }

  loadOrgan(organKey) {
    this.currentOrgan = organKey;
    this.resetView();
    this.defineHotspots(organKey);
  }

  defineHotspots(organKey) {
    if (organKey === 'kidney') {
      this.hotspots = [
        {
          id: 'cortex',
          title: 'Korteks Ginjal (Renal Cortex)',
          subtitle: 'Lapisan luar tempat filtrasi glomerulus',
          desc: 'Bagian luar ginjal berwarna cokelat kemerahan yang mengandung seluruh glomerulus, tubulus kontortus proksimal, dan tubulus distal. Di sini tempat terjadinya ultrafiltrasi darah.',
          coords: { x: -65, y: -40, z: 25 }
        },
        {
          id: 'medulla',
          title: 'Medula Ginjal & Piramida Renalis',
          subtitle: 'Sistem countercurrent pemekatan urin',
          desc: 'Tersusun atas 8–10 piramid ginjal yang mengandung ansa Henle panjang dan duktus koligens. Menghasilkan gradien osmotik hingga 1.200 mOsm/L untuk mereabsorpsi air.',
          coords: { x: -10, y: 15, z: 15 }
        },
        {
          id: 'pelvis',
          title: 'Pelvis Renalis & Kalises',
          subtitle: 'Corong pengumpul urin utama',
          desc: 'Ujung ureter bagian atas yang melebar membentuk corong. Kalises minor dan mayor mengumpulkan urin dari setiap papila piramid ginjal sebelum dialirkan ke ureter.',
          coords: { x: 30, y: 0, z: -10 }
        },
        {
          id: 'vessels',
          title: 'Arteri & Vena Renalis (Hilum)',
          subtitle: 'Aliran darah 22% curah jantung',
          desc: 'Arteri renalis membawa 1.100 ml darah per menit ke glomerulus, sementara vena renalis mengembalikan darah yang telah disaring ke vena kava inferior.',
          coords: { x: 55, y: -25, z: -15 }
        },
        {
          id: 'ureter_start',
          title: 'Ureter Superior (UPJ)',
          subtitle: 'Sambungan pieloureter',
          desc: 'Saluran yang membawa urin dari pelvis ginjal ke kandung kemih melalui gerakan peristaltik aktif. Merupakan salah satu lokasi tersering batu tersangkut.',
          coords: { x: 35, y: 65, z: -5 }
        }
      ];
    } else if (organKey === 'nephron') {
      this.hotspots = [
        {
          id: 'glomerulus',
          title: 'Glomerulus & Kapsula Bowman',
          subtitle: 'Sawar ultrafiltrasi plasma bebas protein',
          desc: 'Anyaman kapiler dengan tekanan hidrostatik tinggi (60 mmHg) yang menyaring 125 ml/menit cairan darah melalui membran berfenestra, membran basalis bermuatan negatif, dan slit pores podosit.',
          coords: { x: -60, y: -50, z: 20 }
        },
        {
          id: 'pct',
          title: 'Tubulus Kontortus Proksimal',
          subtitle: 'Reabsorpsi 65% air, Na+, & 100% glukosa',
          desc: 'Memiliki membran brush border mikrovili raksasa. Menghidrolisis ATP via pompa Na-K-ATPase basolateral untuk mereabsorpsi nutrisi dan menyekresi asam/basa organik.',
          coords: { x: 20, y: -45, z: 15 }
        },
        {
          id: 'loop',
          title: 'Ansa Henle (Lengkung Henle)',
          subtitle: 'Countercurrent Multiplier',
          desc: 'Pars desendens tipis sangat permeabel air, sedangkan pars asendens tebal aktif memompa 1-Na+, 2-Cl-, 1-K+ tanpa air, menciptakan hiperosmolaritas interstisial medula.',
          coords: { x: -10, y: 55, z: 0 }
        },
        {
          id: 'macula',
          title: 'Makula Densa & Aparatus Jukstaglomerulus',
          subtitle: 'Sensor umpan balik tubuloglomerulus',
          desc: 'Sel epitel khusus di tubulus distal yang merasakan konsentrasi NaCl. Jika NaCl turun, sel ini memicu vasodilatasi arteriol aferen dan pelepasan renin.',
          coords: { x: -20, y: -20, z: 25 }
        },
        {
          id: 'collecting',
          title: 'Duktus Koligens & Pengaturan ADH',
          subtitle: 'Tempat kerja akhir ADH & Aldosteron',
          desc: 'Hormon ADH menyisipkan kanal Akuaporin-2 (AQP-2) di membran luminal untuk menyerap air saat dehidrasi. Aldosteron menstimulasi sel prinsipalis mereabsorpsi natrium dan menyekresi kalium.',
          coords: { x: 65, y: 35, z: -10 }
        }
      ];
    } else if (organKey === 'bladder') {
      this.hotspots = [
        {
          id: 'detrusor',
          title: 'Otot Detrusor (Dinding Kandung Kemih)',
          subtitle: 'Anyaman otot polos elastis',
          desc: 'Mampu meregang elastis menampung 300–400 ml urin. Saat berkemih, rangsang parasimpatis nervus pelvikus mengontraksikan detrusor hingga tekanan 40–60 mmHg.',
          coords: { x: -10, y: -50, z: 30 }
        },
        {
          id: 'trigone',
          title: 'Trigonum Vesicae',
          subtitle: 'Area segitiga mukosa licin',
          desc: 'Daerah segitiga di dasar kandung kemih yang dibatasi oleh dua muara orifisium ureter dan orifisium uretra interna. Sangat sensitif terhadap peregangan.',
          coords: { x: 0, y: 15, z: 20 }
        },
        {
          id: 'ureter_entry',
          title: 'Orifisium Ureterika & Katup Flap',
          subtitle: 'Mekanisme pencegah refluks urin',
          desc: 'Ureter menembus detrusor secara miring (oblik). Tonus normal detrusor menjepit ureter saat kandung kemih terisi, mencegah refluks vesikoureter (VUR).',
          coords: { x: -45, y: -10, z: -10 }
        },
        {
          id: 'sphincter_int',
          title: 'Sfingter Uretra Interna',
          subtitle: 'Kontrol involunter leher kandung kemih',
          desc: 'Otot polos sirkuler di leher kandung kemih yang mempertahankan penutupan saluran kemih secara otonom saat fase penyimpanan urin.',
          coords: { x: 0, y: 55, z: 15 }
        }
      ];
    } else if (organKey === 'prostate') {
      this.hotspots = [
        {
          id: 'prostate_gland',
          title: 'Kelenjar Prostat (Zona Transisi & Perifer)',
          subtitle: 'Kelenjar aksesori reproduksi pria',
          desc: 'Melingkari uretra prostatika. Zona transisi adalah tempat utama pembesaran BPH (Benign Prostatic Hyperplasia) pada pria usia >50 tahun.',
          coords: { x: 0, y: -15, z: 25 }
        },
        {
          id: 'prostatic_urethra',
          title: 'Uretra Pars Prostatika',
          subtitle: 'Saluran kemih & ejakulasi',
          desc: 'Bagian uretra yang melewati jaringan prostat tempat bermuaranya duktus ejakulatorius dan kelenjar prostat.',
          coords: { x: 0, y: 15, z: 15 }
        },
        {
          id: 'sphincter_ext',
          title: 'Sfingter Uretra Eksterna',
          subtitle: 'Kontrol sadar (volunter) nervus pudendus',
          desc: 'Lapisan otot rangka pada diafragma urogenital. Saraf somatik memungkinkan kita menahan atau menghentikan aliran kencing secara sadar.',
          coords: { x: 0, y: 48, z: 10 }
        },
        {
          id: 'cowper',
          title: 'Kelenjar Bulbouretral (Cowper)',
          subtitle: 'Sekresi pelumas alkali pelindung uretra',
          desc: 'Sepasang kelenjar kecil di bawah prostat yang menghasilkan cairan mukoid pre-ejakulasi untuk menetralkan sisa keasaman urin di uretra.',
          coords: { x: 25, y: 35, z: -5 }
        }
      ];
    }
  }

  project(p) {
    // 3D rotation matrix (Yaw around Y, Pitch around X)
    const cosY = Math.cos(this.rotationY);
    const sinY = Math.sin(this.rotationY);
    const cosX = Math.cos(this.rotationX);
    const sinX = Math.sin(this.rotationX);

    // Rotate Y
    let x1 = p.x * cosY - p.z * sinY;
    let z1 = p.x * sinY + p.z * cosY;
    let y1 = p.y;

    // Rotate X
    let y2 = y1 * cosX - z1 * sinX;
    let z2 = y1 * sinX + z1 * cosX;
    let x2 = x1;

    // Perspective projection
    const fov = 350;
    const distance = 260 / this.zoom;
    const scale = fov / (fov + z2 + distance);

    const w = this.canvas.width / (window.devicePixelRatio || 1);
    const h = this.canvas.height / (window.devicePixelRatio || 1);

    return {
      x: w / 2 + x2 * scale,
      y: h / 2 + y2 * scale,
      z: z2,
      scale: scale
    };
  }

  animate() {
    this.render();
    if (this.autoRotate && !this.isDragging) {
      this.rotationY += 0.004;
    }
    this.animId = requestAnimationFrame(() => this.animate());
  }

  render() {
    if (!this.ctx) return;
    const w = this.canvas.width / (window.devicePixelRatio || 1);
    const h = this.canvas.height / (window.devicePixelRatio || 1);

    this.ctx.clearRect(0, 0, w, h);

    // Draw high-tech medical grid backdrop
    this.drawMedicalBackground(w, h);

    // Render organ based on selection
    if (this.currentOrgan === 'kidney') {
      this.draw3DKidney();
    } else if (this.currentOrgan === 'nephron') {
      this.draw3DNephron();
    } else if (this.currentOrgan === 'bladder') {
      this.draw3DBladder();
    } else if (this.currentOrgan === 'prostate') {
      this.draw3DProstate();
    }

    // Draw interactive 3D Hotspots
    this.drawHotspots();
  }

  drawMedicalBackground(w, h) {
    const ctx = this.ctx;
    // Radial subtle glow
    const grad = ctx.createRadialGradient(w / 2, h / 2, 20, w / 2, h / 2, w / 1.4);
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.65, '#F8FAFC');
    grad.addColorStop(1, '#EDF2F7');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle cyan grid lines
    ctx.save();
    ctx.strokeStyle = 'rgba(10, 46, 92, 0.04)';
    ctx.lineWidth = 1;
    const step = 28;
    for (let x = 0; x < w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  // --- 3D ANATOMICAL RENDERING METHODS ---

  draw3DKidney() {
    const ctx = this.ctx;
    const time = Date.now() * 0.002;
    const pulse = Math.sin(time) * 1.5;

    // Kidney outer body (Cortex) - layered parametric ellipsoid
    ctx.save();

    // Renal Cortex (Outer parenchymal layer)
    const pointsCortex = [];
    const numPoints = 36;
    for (let i = 0; i < numPoints; i++) {
      const a = (i / numPoints) * Math.PI * 2;
      // Bean-shaped polar curve
      const r = (60 + Math.cos(a) * 12 + Math.sin(a * 2) * 8 + pulse) * 1.05;
      const x = Math.cos(a) * r * 0.95 - 15;
      const y = Math.sin(a) * r * 1.25;
      const z = Math.sin(a * 2) * 22;
      pointsCortex.push(this.project({ x, y, z }));
    }

    // Draw Cortex boundary with glowing 3D depth
    ctx.beginPath();
    pointsCortex.forEach((p, idx) => {
      if (idx === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    const cortexGrad = ctx.createLinearGradient(0, 0, 0, this.canvas.height / (window.devicePixelRatio || 1));
    cortexGrad.addColorStop(0, '#B91C1C');
    cortexGrad.addColorStop(0.5, '#991B1B');
    cortexGrad.addColorStop(1, '#7F1D1D');
    ctx.fillStyle = cortexGrad;
    ctx.fill();
    ctx.strokeStyle = '#FCA5A5';
    ctx.lineWidth = 3.5;
    ctx.stroke();

    // Inner Medullary Parenchyma
    ctx.beginPath();
    for (let i = 0; i < numPoints; i++) {
      const a = (i / numPoints) * Math.PI * 2;
      const r = (42 + Math.cos(a) * 8 + Math.sin(a * 2) * 5) * 0.9;
      const x = Math.cos(a) * r * 0.85 - 10;
      const y = Math.sin(a) * r * 1.1;
      const z = Math.sin(a * 2) * 15;
      const p = this.project({ x, y, z });
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.fillStyle = '#C2410C'; // Medullary dark orange
    ctx.fill();
    ctx.strokeStyle = '#FDBA74';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 8 Medullary Pyramids (Renal Pyramids with papillae pointing toward hilum)
    const pyramids = [
      { x: -35, y: -50, z: 10 },
      { x: -45, y: -25, z: 15 },
      { x: -45, y: 5, z: 12 },
      { x: -35, y: 35, z: 10 },
      { x: -20, y: 55, z: 8 },
      { x: -10, y: -60, z: 5 }
    ];

    pyramids.forEach(pyr => {
      const pBase1 = this.project({ x: pyr.x - 8, y: pyr.y - 10, z: pyr.z });
      const pBase2 = this.project({ x: pyr.x + 8, y: pyr.y - 10, z: pyr.z });
      const pApex = this.project({ x: pyr.x + 18, y: pyr.y, z: pyr.z - 5 });

      ctx.beginPath();
      ctx.moveTo(pBase1.x, pBase1.y);
      ctx.lineTo(pBase2.x, pBase2.y);
      ctx.lineTo(pApex.x, pApex.y);
      ctx.closePath();
      ctx.fillStyle = '#EA580C';
      ctx.fill();
      ctx.strokeStyle = '#FED7AA';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    });

    // Renal Pelvis (Corong Kuning Keemasan)
    const pPelvisApex = this.project({ x: 10, y: 0, z: -5 });
    const pPelvisCal1 = this.project({ x: -10, y: -30, z: -5 });
    const pPelvisCal2 = this.project({ x: -10, y: 30, z: -5 });
    const pUreterEnd = this.project({ x: 30, y: 75, z: -10 });

    ctx.beginPath();
    ctx.moveTo(pPelvisCal1.x, pPelvisCal1.y);
    ctx.quadraticCurveTo(pPelvisApex.x, pPelvisApex.y - 15, pPelvisApex.x + 15, pPelvisApex.y);
    ctx.lineTo(pUreterEnd.x, pUreterEnd.y);
    ctx.lineTo(pUreterEnd.x - 10, pUreterEnd.y);
    ctx.lineTo(pPelvisApex.x - 5, pPelvisApex.y + 15);
    ctx.quadraticCurveTo(pPelvisApex.x - 10, pPelvisApex.y, pPelvisCal2.x, pPelvisCal2.y);
    ctx.closePath();
    ctx.fillStyle = '#FBBF24';
    ctx.fill();
    ctx.strokeStyle = '#D97706';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Renal Artery (Red) & Vein (Blue) entering hilum
    const pArtery1 = this.project({ x: 55, y: -15, z: -10 });
    const pArtery2 = this.project({ x: 15, y: -10, z: -5 });
    ctx.beginPath();
    ctx.moveTo(pArtery1.x, pArtery1.y);
    ctx.lineTo(pArtery2.x, pArtery2.y);
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 6 * pArtery1.scale;
    ctx.lineCap = 'round';
    ctx.stroke();

    const pVein1 = this.project({ x: 55, y: -28, z: -12 });
    const pVein2 = this.project({ x: 15, y: -22, z: -6 });
    ctx.beginPath();
    ctx.moveTo(pVein1.x, pVein1.y);
    ctx.lineTo(pVein2.x, pVein2.y);
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 6.5 * pVein1.scale;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Descending Ureter Tube
    const pU1 = this.project({ x: 26, y: 65, z: -8 });
    const pU2 = this.project({ x: 38, y: 110, z: -12 });
    ctx.beginPath();
    ctx.moveTo(pU1.x, pU1.y);
    ctx.quadraticCurveTo(pU1.x + 12, (pU1.y + pU2.y) / 2, pU2.x, pU2.y);
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 5 * pU1.scale;
    ctx.stroke();

    ctx.restore();
  }

  draw3DNephron() {
    const ctx = this.ctx;
    ctx.save();

    // Glomerulus spherical bundle
    const pGlom = this.project({ x: -50, y: -45, z: 15 });
    const radGlom = 22 * pGlom.scale;

    // Bowman's Capsule cup around glomerulus
    ctx.beginPath();
    ctx.arc(pGlom.x, pGlom.y, radGlom + 5, 0.4 * Math.PI, 1.8 * Math.PI);
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 4 * pGlom.scale;
    ctx.stroke();

    // Glomerular Capillaries (Intense red coil)
    ctx.beginPath();
    ctx.arc(pGlom.x, pGlom.y, radGlom, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(239, 68, 68, 0.85)';
    ctx.fill();
    ctx.strokeStyle = '#B91C1C';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Afferent & Efferent Arterioles
    const pAff = this.project({ x: -80, y: -30, z: 20 });
    const pEff = this.project({ x: -75, y: -65, z: 10 });
    ctx.beginPath();
    ctx.moveTo(pAff.x, pAff.y);
    ctx.lineTo(pGlom.x - radGlom * 0.7, pGlom.y);
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 4.5 * pAff.scale;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(pGlom.x, pGlom.y - radGlom * 0.8);
    ctx.lineTo(pEff.x, pEff.y);
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 3.5 * pEff.scale;
    ctx.stroke();

    // Proximal Convoluted Tubule (PCT - Orange wiggly pathway)
    const pctPoints = [
      { x: -35, y: -38, z: 12 },
      { x: -20, y: -60, z: 20 },
      { x: 0, y: -45, z: 10 },
      { x: -5, y: -25, z: 15 },
      { x: 15, y: -35, z: 5 },
      { x: 10, y: -5, z: 0 }
    ];

    ctx.beginPath();
    pctPoints.forEach((pt, idx) => {
      const p = this.project(pt);
      if (idx === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.strokeStyle = '#EA580C';
    ctx.lineWidth = 6 * pctPoints[0].x ? 5 : 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Loop of Henle: Descending Thin Limb -> Hairpin -> Ascending Thick Limb
    const loopPoints = [
      { x: 10, y: -5, z: 0 },
      { x: 12, y: 40, z: -5 },
      { x: 14, y: 80, z: -10 }, // Hairpin bend in deep medulla
      { x: 28, y: 80, z: -8 },
      { x: 30, y: 35, z: -5 },
      { x: 32, y: -15, z: 0 },
      { x: 25, y: -20, z: 10 } // Passing macula densa near glomerulus!
    ];

    ctx.beginPath();
    loopPoints.forEach((pt, idx) => {
      const p = this.project(pt);
      if (idx === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.strokeStyle = '#EAB308';
    ctx.lineWidth = 4.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Distal Convoluted Tubule & Collecting Duct
    const cdPoints = [
      { x: 25, y: -20, z: 10 },
      { x: 45, y: -35, z: 5 },
      { x: 60, y: -25, z: -5 },
      { x: 62, y: 15, z: -10 },
      { x: 65, y: 65, z: -12 },
      { x: 68, y: 105, z: -15 } // Into renal papilla
    ];

    ctx.beginPath();
    cdPoints.forEach((pt, idx) => {
      const p = this.project(pt);
      if (idx === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.strokeStyle = '#10B981'; // Green for collecting duct
    ctx.lineWidth = 6.5;
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.restore();
  }

  draw3DBladder() {
    const ctx = this.ctx;
    ctx.save();
    const time = Date.now() * 0.0018;
    const wave = Math.sin(time) * 2;

    // 3D Urinary Bladder Dome
    const pCenter = this.project({ x: 0, y: -5, z: 10 });
    const radX = 65 * pCenter.scale;
    const radY = 55 * pCenter.scale;

    // Muscular detrusor mesh gradient
    ctx.beginPath();
    ctx.ellipse(pCenter.x, pCenter.y, radX, radY, 0, 0, Math.PI * 2);
    const bladderGrad = ctx.createRadialGradient(pCenter.x - radX * 0.2, pCenter.y - radY * 0.3, 10, pCenter.x, pCenter.y, radX);
    bladderGrad.addColorStop(0, '#FED7AA');
    bladderGrad.addColorStop(0.65, '#FB923C');
    bladderGrad.addColorStop(1, '#C2410C');
    ctx.fillStyle = bladderGrad;
    ctx.fill();
    ctx.strokeStyle = '#EA580C';
    ctx.lineWidth = 3.5;
    ctx.stroke();

    // Inner liquid level (urine wave)
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(pCenter.x, pCenter.y, radX - 4, radY - 4, 0, 0, Math.PI * 2);
    ctx.clip();

    ctx.beginPath();
    const liquidY = pCenter.y + radY * 0.2 + wave;
    ctx.moveTo(pCenter.x - radX, liquidY);
    ctx.bezierCurveTo(pCenter.x - radX * 0.5, liquidY - 6, pCenter.x + radX * 0.5, liquidY + 6, pCenter.x + radX, liquidY);
    ctx.lineTo(pCenter.x + radX, pCenter.y + radY);
    ctx.lineTo(pCenter.x - radX, pCenter.y + radY);
    ctx.closePath();
    ctx.fillStyle = 'rgba(250, 204, 21, 0.45)';
    ctx.fill();
    ctx.restore();

    // Trigonum Vesicae (Triangle inside posterior bladder)
    const pT1 = this.project({ x: -25, y: 10, z: 15 });
    const pT2 = this.project({ x: 25, y: 10, z: 15 });
    const pT3 = this.project({ x: 0, y: 35, z: 20 });
    ctx.beginPath();
    ctx.moveTo(pT1.x, pT1.y);
    ctx.lineTo(pT2.x, pT2.y);
    ctx.lineTo(pT3.x, pT3.y);
    ctx.closePath();
    ctx.fillStyle = 'rgba(239, 68, 68, 0.35)';
    ctx.fill();
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Ureters entering posterior dome
    const pUrL1 = this.project({ x: -65, y: -60, z: -20 });
    const pUrL2 = this.project({ x: -35, y: 5, z: -5 });
    ctx.beginPath();
    ctx.moveTo(pUrL1.x, pUrL1.y);
    ctx.quadraticCurveTo(pUrL1.x + 10, pUrL2.y - 15, pUrL2.x, pUrL2.y);
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 5 * pUrL1.scale;
    ctx.stroke();

    const pUrR1 = this.project({ x: 65, y: -60, z: -20 });
    const pUrR2 = this.project({ x: 35, y: 5, z: -5 });
    ctx.beginPath();
    ctx.moveTo(pUrR1.x, pUrR1.y);
    ctx.quadraticCurveTo(pUrR1.x - 10, pUrR2.y - 15, pUrR2.x, pUrR2.y);
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 5 * pUrR1.scale;
    ctx.stroke();

    // Bladder Neck & Internal Sphincter
    const pNeck1 = this.project({ x: -14, y: 45, z: 12 });
    const pNeck2 = this.project({ x: 14, y: 45, z: 12 });
    const pUrethra = this.project({ x: 0, y: 90, z: 10 });
    ctx.beginPath();
    ctx.moveTo(pNeck1.x, pNeck1.y);
    ctx.lineTo(pUrethra.x - 6, pUrethra.y);
    ctx.lineTo(pUrethra.x + 6, pUrethra.y);
    ctx.lineTo(pNeck2.x, pNeck2.y);
    ctx.strokeStyle = '#0A2E5C';
    ctx.lineWidth = 6 * pNeck1.scale;
    ctx.stroke();

    ctx.restore();
  }

  draw3DProstate() {
    const ctx = this.ctx;
    ctx.save();

    // Bladder lower base
    const pBladderBase = this.project({ x: 0, y: -45, z: 10 });
    ctx.beginPath();
    ctx.ellipse(pBladderBase.x, pBladderBase.y, 45 * pBladderBase.scale, 25 * pBladderBase.scale, 0, Math.PI, 0);
    ctx.fillStyle = '#FB923C';
    ctx.fill();
    ctx.strokeStyle = '#C2410C';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Walnut-shaped Prostate Gland surrounding urethra
    const pPros = this.project({ x: 0, y: -5, z: 15 });
    const pRadX = 38 * pPros.scale;
    const pRadY = 32 * pPros.scale;

    // Prostate lobules (left & right lobe)
    ctx.beginPath();
    ctx.ellipse(pPros.x - pRadX * 0.45, pPros.y, pRadX * 0.65, pRadY, 0.15, 0, Math.PI * 2);
    ctx.ellipse(pPros.x + pRadX * 0.45, pPros.y, pRadX * 0.65, pRadY, -0.15, 0, Math.PI * 2);
    const prosGrad = ctx.createRadialGradient(pPros.x, pPros.y - 10, 5, pPros.x, pPros.y, pRadX);
    prosGrad.addColorStop(0, '#F59E0B');
    prosGrad.addColorStop(0.7, '#D97706');
    prosGrad.addColorStop(1, '#92400E');
    ctx.fillStyle = prosGrad;
    ctx.fill();
    ctx.strokeStyle = '#78350F';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Prostatic Urethra running down the center
    const pUrStart = this.project({ x: 0, y: -35, z: 18 });
    const pUrMid = this.project({ x: 0, y: -5, z: 22 });
    const pUrEnd = this.project({ x: 0, y: 70, z: 12 });

    ctx.beginPath();
    ctx.moveTo(pUrStart.x, pUrStart.y);
    ctx.lineTo(pUrMid.x, pUrMid.y);
    ctx.lineTo(pUrEnd.x, pUrEnd.y);
    ctx.strokeStyle = '#0284C7';
    ctx.lineWidth = 6 * pUrStart.scale;
    ctx.lineCap = 'round';
    ctx.stroke();

    // External Urethral Sphincter (pelvic floor muscle loop)
    const pSphincter = this.project({ x: 0, y: 32, z: 14 });
    ctx.beginPath();
    ctx.ellipse(pSphincter.x, pSphincter.y, 20 * pSphincter.scale, 8 * pSphincter.scale, 0, 0, Math.PI * 2);
    ctx.strokeStyle = '#0A2E5C';
    ctx.lineWidth = 4 * pSphincter.scale;
    ctx.stroke();

    ctx.restore();
  }

  // --- INTERACTIVE HOTSPOTS ---

  drawHotspots() {
    const ctx = this.ctx;
    const time = Date.now() * 0.003;

    this.hotspots.forEach(h => {
      const p = this.project(h.coords);
      h.projected = p; // cache for click tests

      // Only draw if facing towards the camera (z > -120)
      if (p.z > -140) {
        ctx.save();

        // Pulsing radar ripple
        const pulse = (Math.sin(time + p.x) + 1) * 0.5;
        const rippleRad = (8 + pulse * 7) * p.scale;

        ctx.beginPath();
        ctx.arc(p.x, p.y, rippleRad, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 124, 0, ${0.4 - pulse * 0.25})`;
        ctx.fill();

        // Outer white ring
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6.5 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.strokeStyle = '#F57C00';
        ctx.lineWidth = 2.5 * p.scale;
        ctx.stroke();

        // Center Navy Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#0A2E5C';
        ctx.fill();

        // Label pill
        const label = h.title.split('(')[0].trim();
        ctx.font = '600 10.5px Plus Jakarta Sans, Inter, sans-serif';
        const txtWidth = ctx.measureText(label).width;

        const pillX = p.x + 10;
        const pillY = p.y - 12;
        const pillW = txtWidth + 14;
        const pillH = 19;

        ctx.fillStyle = 'rgba(10, 46, 92, 0.88)';
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(pillX, pillY, pillW, pillH, 8) : ctx.rect(pillX, pillY, pillW, pillH);
        ctx.fill();
        ctx.strokeStyle = '#FFA000';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(label, pillX + 7, pillY + 13.5);

        ctx.restore();
      }
    });
  }

  checkHotspotClick(clickX, clickY) {
    let matched = null;
    let minDist = 26; // click tolerance radius in pixels

    this.hotspots.forEach(h => {
      if (h.projected && h.projected.z > -140) {
        const dx = clickX - h.projected.x;
        const dy = clickY - h.projected.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
          minDist = dist;
          matched = h;
        }
      }
    });

    if (matched) {
      if (window.kyguAudio) window.kyguAudio.playTap();
      this.activeHotspot = matched;
      if (typeof this.onHotspotClick === 'function') {
        this.onHotspotClick(matched);
      }
    }
  }
}

window.KyGU3DViewer = KyGU3DViewer;
