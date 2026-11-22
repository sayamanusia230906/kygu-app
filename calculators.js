/**
 * KyGU (Know Your GU) - Clinical Calculators Module
 * 4 Evidence-based medical calculators with automatic clinical interpretation
 */

const KyGUCalculators = {
  // 1. eGFR Calculator (CKD-EPI 2021 & Cockcroft-Gault)
  calculateEGFR(data) {
    const age = parseFloat(data.age);
    const gender = data.gender; // 'male' or 'female'
    const weight = parseFloat(data.weight);
    const scr = parseFloat(data.scr); // serum creatinine in mg/dL

    if (isNaN(age) || isNaN(scr) || scr <= 0 || age <= 0) {
      return { error: 'Harap masukkan usia dan nilai kreatinin serum yang valid.' };
    }

    // CKD-EPI 2021 (Race-free equation recommended by KDIGO)
    let ckdEpi = 0;
    if (gender === 'female') {
      const kappa = 0.7;
      const alpha = -0.241;
      const minScr = Math.min(scr / kappa, 1);
      const maxScr = Math.max(scr / kappa, 1);
      ckdEpi = 142 * Math.pow(minScr, alpha) * Math.pow(maxScr, -1.200) * Math.pow(0.9938, age) * 1.012;
    } else {
      const kappa = 0.9;
      const alpha = -0.302;
      const minScr = Math.min(scr / kappa, 1);
      const maxScr = Math.max(scr / kappa, 1);
      ckdEpi = 142 * Math.pow(minScr, alpha) * Math.pow(maxScr, -1.200) * Math.pow(0.9938, age);
    }

    // Cockcroft-Gault formula (CrCl in mL/min)
    let crcl = null;
    if (!isNaN(weight) && weight > 0) {
      crcl = ((140 - age) * weight) / (72 * scr);
      if (gender === 'female') crcl *= 0.85;
    }

    const egfrVal = Math.round(ckdEpi * 10) / 10;
    const crclVal = crcl !== null ? Math.round(crcl * 10) / 10 : null;

    // KDIGO Staging
    let stage = '';
    let stageClass = '';
    let description = '';
    let recommendation = '';

    if (egfrVal >= 90) {
      stage = 'Stadium G1 (Normal / Tinggi)';
      stageClass = 'stage-normal';
      description = 'Fungsi filtrasi ginjal berada dalam batas normal.';
      recommendation = 'Pertahankan pola hidup sehat, asupan cairan optimal (2–2.5 L/hari), dan kontrol tekanan darah serta gula darah.';
    } else if (egfrVal >= 60) {
      stage = 'Stadium G2 (Penurunan Ringan)';
      stageClass = 'stage-mild';
      description = 'Terdapat penurunan laju filtrasi glomerulus tingkat ringan.';
      recommendation = 'Evaluasi faktor risiko (hipertensi, diabetes, obat nefrotoksik), cek urinalisis berkala untuk mendeteksi proteinuria.';
    } else if (egfrVal >= 45) {
      stage = 'Stadium G3a (Penurunan Ringan–Sedang)';
      stageClass = 'stage-moderate';
      description = 'Penurunan fungsi filtrasi ginjal derajat ringan hingga sedang.';
      recommendation = 'Konsultasikan ke dokter spesialis penyakit dalam/nefrologi. Pantau tekanan darah ketat, batasi konsumsi garam & evaluasi obat harian.';
    } else if (egfrVal >= 30) {
      stage = 'Stadium G3b (Penurunan Sedang–Berat)';
      stageClass = 'stage-moderate-severe';
      description = 'Penurunan fungsi filtrasi ginjal tingkat moderat-berat.';
      recommendation = 'Wajib pemantauan rutin dokter spesialis. Waspadai komplikasi seperti anemia renal, gangguan kalsium-fosfat, dan asidosis metabolik.';
    } else if (egfrVal >= 15) {
      stage = 'Stadium G4 (Penurunan Berat)';
      stageClass = 'stage-severe';
      description = 'Kerusakan fungsi ginjal tingkat lanjut/berat.';
      recommendation = 'Perlu persiapan terapi pengganti ginjal (hemodialisis, CAPD, atau rencana transplantasi ginjal) di bawah supervisi nefrolog.';
    } else {
      stage = 'Stadium G5 (Gagal Ginjal Terminal / ESRD)';
      stageClass = 'stage-terminal';
      description = 'Gagal ginjal stadium akhir (End-Stage Renal Disease).';
      recommendation = 'Kondisi kritis: Memerlukan terapi pengganti ginjal segera (dialisis rutin atau transplantasi) untuk menjaga homeostasis tubuh.';
    }

    return {
      egfr: egfrVal,
      crcl: crclVal,
      stage,
      stageClass,
      description,
      recommendation
    };
  },

  // 2. Urine Output Calculator (ml/kgBB/jam)
  calculateUrineOutput(data) {
    const volume = parseFloat(data.volume); // ml
    const weight = parseFloat(data.weight); // kg
    const hours = parseFloat(data.hours);   // hours

    if (isNaN(volume) || isNaN(weight) || isNaN(hours) || volume < 0 || weight <= 0 || hours <= 0) {
      return { error: 'Harap isi volume urin (ml), berat badan (kg), dan durasi (jam) dengan benar.' };
    }

    const rate = Math.round((volume / (weight * hours)) * 100) / 100;

    let status = '';
    let statusClass = '';
    let clinicalMeaning = '';
    let actionAdvice = '';

    if (rate < 0.1) {
      status = 'Anuria (< 0.1 ml/kgBB/jam)';
      statusClass = 'rate-anuria';
      clinicalMeaning = 'Produksi urin hampir berhenti total. Indikator kuat syok hipovolemik berat, obstruksi saluran kemih total, atau nekrosis tubular akut masif.';
      actionAdvice = 'KONDISI GAWAT DARURAT! Segera bawa ke IGD rumah sakit terdekat untuk evaluasi hemodinamik dan kateterisasi diagnostik.';
    } else if (rate < 0.5) {
      status = 'Oliguria (< 0.5 ml/kgBB/jam)';
      statusClass = 'rate-oliguria';
      clinicalMeaning = 'Produksi urin di bawah batas normal minimal. Mengindikasikan dehidrasi berat, hipoperfusi ginjal prarenal, atau tanda awal Acute Kidney Injury (AKI).';
      actionAdvice = 'Waspada dehidrasi dan penurunan fungsi ginjal. Tingkatkan hidrasi secara bertahap jika tidak ada kontraindikasi (misal gagal jantung), dan segera periksakan ke fasilitas kesehatan.';
    } else if (rate <= 1.5) {
      status = 'Normal (0.5 – 1.5 ml/kgBB/jam)';
      statusClass = 'rate-normal';
      clinicalMeaning = 'Laju produksi urin sangat ideal dan adekuat. Perfusi darah ke ginjal optimal dan keseimbangan cairan terjaga dengan baik.';
      actionAdvice = 'Bagus sekali! Pertahankan hidrasi harian yang seimbang sesuai aktivitas fisik.';
    } else {
      status = 'Poliuria (> 1.5 – 3.0+ ml/kgBB/jam)';
      statusClass = 'rate-polyuria';
      clinicalMeaning = 'Pengeluaran urin dalam jumlah berlebih. Dapat disebabkan asupan cairan sangat banyak, konsumsi kafein/diuretik, diabetes melitus (diuresis glukosuria), atau defisiensi hormon ADH (diabetes insipidus).';
      actionAdvice = 'Jika tidak sedang minum air berlebih atau mengonsumsi obat diuretik, lakukan pemeriksaan kadar gula darah dan konsultasikan dengan dokter jika disertai rasa haus terus-menerus.';
    }

    return {
      rate,
      totalVolume: volume,
      weight,
      hours,
      status,
      statusClass,
      clinicalMeaning,
      actionAdvice
    };
  },

  // 3. Daily Fluid Requirement (Holliday-Segar & Adult Standard)
  calculateFluidRequirement(data) {
    const weight = parseFloat(data.weight);
    const activity = data.activity || 'sedang'; // 'ringan', 'sedang', 'berat'
    const weather = data.weather || 'normal';   // 'normal', 'panas'

    if (isNaN(weight) || weight <= 0) {
      return { error: 'Harap masukkan berat badan (kg) yang valid.' };
    }

    // Holliday-Segar Formula
    let holliday = 0;
    if (weight <= 10) {
      holliday = weight * 100;
    } else if (weight <= 20) {
      holliday = 1000 + (weight - 10) * 50;
    } else {
      holliday = 1500 + (weight - 20) * 20;
    }

    // Adult standard rule of thumb: 30-35 ml/kg
    const adultMin = Math.round(weight * 30);
    const adultMax = Math.round(weight * 35);

    // Apply activity & weather multiplier to baseline
    let multiplier = 1.0;
    if (activity === 'sedang') multiplier += 0.1;
    if (activity === 'berat') multiplier += 0.25;
    if (weather === 'panas') multiplier += 0.15;

    const targetHolliday = Math.round(holliday * multiplier);
    const targetAdult = Math.round(((adultMin + adultMax) / 2) * multiplier);

    // Recommended daily intake (rounded to nearest 50 ml)
    const recommendedMl = Math.round(targetAdult / 50) * 50;
    const glasses = Math.round((recommendedMl / 250) * 10) / 10;

    return {
      weight,
      recommendedMl,
      glasses,
      hollidayMl: targetHolliday,
      adultRange: `${adultMin} – ${adultMax} ml`,
      breakdown: {
        pagi: Math.round(recommendedMl * 0.35),
        siang: Math.round(recommendedMl * 0.40),
        malam: Math.round(recommendedMl * 0.25)
      },
      tips: [
        'Minum 1–2 gelas setelah bangun pagi untuk memicu metabolisme ginjal.',
        'Jangan menunggu haus untuk minum, rasa haus muncul saat tubuh sudah kehilangan 1–2% cairan.',
        'Kurangi porsi minum 2 jam sebelum tidur untuk mencegah terbangun kencing di malam hari (nokturia).'
      ]
    };
  },

  // 4. IPSS (International Prostate Symptom Score)
  calculateIPSS(answers, qol) {
    if (!answers || answers.length !== 7) {
      return { error: 'Harap lengkapi semua 7 pertanyaan gejala IPSS.' };
    }

    let totalScore = 0;
    for (let i = 0; i < 7; i++) {
      totalScore += parseInt(answers[i] || 0, 10);
    }

    const qolScore = parseInt(qol || 0, 10);

    let severity = '';
    let severityClass = '';
    let clinicalSummary = '';
    let recommendation = '';

    if (totalScore <= 7) {
      severity = 'Gejala Ringan (Skor 0–7)';
      severityClass = 'ipss-mild';
      clinicalSummary = 'Gejala obstruksi dan iritasi saluran kemih bagian bawah berada dalam derajat minimal.';
      recommendation = 'Lakukan observasi berkala (watchful waiting), kurangi asupan kafein dan alkohol, hindari menahan kencing, dan lakukan pemeriksaan ulang tahunan.';
    } else if (totalScore <= 19) {
      severity = 'Gejala Sedang (Skor 8–19)';
      severityClass = 'ipss-moderate';
      clinicalSummary = 'Terdapat gejala pembesaran prostat (BPH) atau gangguan berkemih yang cukup bermakna.';
      recommendation = 'Disarankan berkonsultasi dengan dokter untuk pemeriksaan fisik (colok dubur/DRE) dan evaluasi terapi medikamentosa (misalnya Alpha-blocker seperti Tamsulosin).';
    } else {
      severity = 'Gejala Berat (Skor 20–35)';
      severityClass = 'ipss-severe';
      clinicalSummary = 'Gejala berkemih sangat mengganggu dan berisiko tinggi menyebabkan komplikasi retensi urin atau gangguan fungsi ginjal.';
      recommendation = 'Segera konsultasikan ke dokter spesialis Urologi. Pemeriksaan USG prostat, residu urin (PVR), uroflowmetri, dan pertimbangan terapi kombinasi atau tindakan bedah (TURP) sangat dianjurkan.';
    }

    // Quality of life label
    const qolLabels = [
      'Sangat Senang (Delighted)',
      'Puas (Pleased)',
      'Sebagian Besar Puas (Mostly Satisfied)',
      'Campuran Antara Puas & Tidak (Mixed)',
      'Sebagian Besar Tidak Puas (Mostly Dissatisfied)',
      'Tidak Bahagia (Unhappy)',
      'Sangat Menderita (Terrible)'
    ];

    return {
      totalScore,
      qolScore,
      qolText: qolLabels[qolScore] || 'Tidak diketahui',
      severity,
      severityClass,
      clinicalSummary,
      recommendation
    };
  }
};

window.KyGUCalculators = KyGUCalculators;
