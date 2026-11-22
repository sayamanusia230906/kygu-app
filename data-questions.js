/**
 * KyGU (Know Your GU) - Question Bank
 * EXACTLY 60 High-Quality Medical Questions (20 Easy, 20 Medium, 20 Hard)
 * Comprehensive explanations sourced from Guyton & Hall Medical Physiology Unit V & Clinical Urology
 */

const KyGUQuestions = {
  easy: [
    {
      id: 'e1',
      question: 'Organ utama dalam sistem urinaria yang berfungsi menyaring darah dan memproduksi urin adalah...',
      options: ['Ginjal (Ren)', 'Hati (Hepar)', 'Pankreas', 'Kandung Kemih (Vesika Urinaria)'],
      correct: 0,
      badge: 'Anatomi Dasar',
      explanation: 'Ginjal adalah organ utama penyaring darah (~180 L filtrat per hari) yang membuang sisa metabolisme dan mempertahankan keseimbangan cairan serta elektrolit tubuh.'
    },
    {
      id: 'e2',
      question: 'Saluran berbentuk tabung berotot yang mengalirkan urin dari ginjal menuju kandung kemih dinamakan...',
      options: ['Uretra', 'Ureter', 'Duktus Deferens', 'Tubulus Kolektivus'],
      correct: 1,
      badge: 'Anatomi Saluran Kemih',
      explanation: 'Ureter (sepanjang 25–35 cm pada orang dewasa) menghantarkan urin dari pelvis renalis ke kandung kemih melalui gelombang kontraksi peristaltik berkala.'
    },
    {
      id: 'e3',
      question: 'Satuan unit fungsional terkecil di dalam ginjal yang bertugas membentuk urin adalah...',
      options: ['Nefron', 'Neuron', 'Alveolus', 'Lobulus'],
      correct: 0,
      badge: 'Fisiologi Nefron',
      explanation: 'Setiap ginjal manusia normal memiliki sekitar 800.000 hingga 1.000.000 nefron fungsional yang terdiri dari glomerulus dan sistem tubulus renalis.'
    },
    {
      id: 'e4',
      question: 'Manakah warna urin yang mencerminkan status hidrasi tubuh yang paling optimal dan sehat?',
      options: ['Merah muda kemerahan', 'Kuning pucat / jernih terang', 'Cokelat pekat seperti teh', 'Putih susu berbusa'],
      correct: 1,
      badge: 'Skala Warna Urin',
      explanation: 'Urin berwarna kuning pucat jernih menandakan tubuh mendapat cairan yang cukup dan ginjal mengekskresikan zat sisa dengan konsentrasi seimbang.'
    },
    {
      id: 'e5',
      question: 'Rata-rata volume kapasitas normal kandung kemih orang dewasa sebelum timbul keinginan kuat untuk berkemih adalah...',
      options: ['50 – 100 ml', '100 – 150 ml', '300 – 400 ml', '1.000 – 1.500 ml'],
      correct: 2,
      badge: 'Kapasitas Kandung Kemih',
      explanation: 'Pada volume 300–400 ml, regangan pada dinding otot detrusor dan leher kandung kemih mencetuskan refleks miksi yang dihantarkan ke medula spinalis segmen sakral.'
    },
    {
      id: 'e6',
      question: 'Kondisi produksi urin kurang dari 500 ml/24 jam atau <0.5 ml/kgBB/jam pada orang dewasa disebut...',
      options: ['Poliuria', 'Oliguria', 'Disuria', 'Hematuria'],
      correct: 1,
      badge: 'Istilah Klinis Urin',
      explanation: 'Oliguria didefinisikan sebagai pengeluaran urin <0.5 ml/kgBB/jam (atau <400-500 ml/hari), merupakan tanda peringatan dini adanya dehidrasi berat atau penurunan fungsi filtrasi ginjal.'
    },
    {
      id: 'e7',
      question: 'Berapa anjuran asupan air putih harian yang umum direkomendasikan untuk orang dewasa sehat dengan aktivitas normal?',
      options: ['500 ml (2 gelas)', '1.000 ml (4 gelas)', '2.000 – 2.500 ml (8–10 gelas)', '4.000 – 5.000 ml (16–20 gelas)'],
      correct: 2,
      badge: 'Pedoman Hidrasi',
      explanation: 'Kebutuhan cairan rata-rata orang dewasa adalah 30–35 ml/kgBB/hari, atau sekitar 2.000–2.500 ml (8–10 gelas) untuk mengganti insensible water loss dan volume urin harian.'
    },
    {
      id: 'e8',
      question: 'Rasa nyeri atau sensasi terbakar saat buang air kecil dalam istilah medis dikenal dengan...',
      options: ['Disuria', 'Anuria', 'Nokturia', 'Enuresis'],
      correct: 0,
      badge: 'Gejala Klinis',
      explanation: 'Disuria adalah rasa nyeri, perih, atau panas saat miksi, yang umumnya menandakan adanya inflamasi atau infeksi pada uretra atau kandung kemih (sistitis).'
    },
    {
      id: 'e9',
      question: 'Otot dinding kandung kemih yang berkontraksi saat proses berkemih (miksi) dinamakan otot...',
      options: ['Otot Detrusor', 'Otot Psoas Mayor', 'Otot Sartorius', 'Otot Rektus Abdominis'],
      correct: 0,
      badge: 'Anatomi Kandung Kemih',
      explanation: 'Otot detrusor adalah lapisan otot polos yang mengelilingi korpus kandung kemih. Kontraksinya mampu meningkatkan tekanan intravesika hingga 40–60 mmHg untuk mengosongkan urin.'
    },
    {
      id: 'e10',
      question: 'Bakteri penyebab paling sering (sekitar 75–90%) dari Infeksi Saluran Kemih (ISK) tanpa komplikasi adalah...',
      options: ['Escherichia coli', 'Mycobacterium tuberculosis', 'Staphylococcus aureus', 'Streptococcus pneumoniae'],
      correct: 0,
      badge: 'Mikrobiologi ISK',
      explanation: 'Escherichia coli uropatogenik (UPEC) yang berasal dari flora normal saluran cerna bagian bawah adalah penyebab utama ISK melalui jalur asenden.'
    },
    {
      id: 'e11',
      question: 'Urin yang berwarna kemerahan atau merah muda (hematuria) dapat disebabkan oleh...',
      options: ['Adanya sel darah merah dalam urin', 'Kekurangan vitamin C', 'Konsumsi air putih berlebihan', 'Konsumsi makanan tinggi garam'],
      correct: 0,
      badge: 'Interpretasi Urin',
      explanation: 'Hematuria (adanya eritrosit di urin) dapat berasal dari batu saluran kemih, infeksi saluran kemih berat, glomerulonefritis, trauma, atau tumor urogenital.'
    },
    {
      id: 'e12',
      question: 'Kelenjar reproduksi pria yang melingkari uretra tepat di bawah leher kandung kemih adalah...',
      options: ['Kelenjar Tiroid', 'Kelenjar Prostat', 'Kelenjar Adrenal', 'Kelenjar Hipofisis'],
      correct: 1,
      badge: 'Sistem Genito Pria',
      explanation: 'Kelenjar prostat membungkus uretra pars prostatika. Pembesaran prostat (BPH) sering kali menekan saluran uretra sehingga pancaran urin melemah.'
    },
    {
      id: 'e13',
      question: 'Tiga proses utama yang terjadi di ginjal dalam pembentukan urin secara berurutan adalah...',
      options: [
        'Filtrasi -> Reabsorpsi -> Sekresi',
        'Sekresi -> Filtrasi -> Reabsorpsi',
        'Digesti -> Absorpsi -> Ekskresi',
        'Osmosis -> Difusi -> Sirkulasi'
      ],
      correct: 0,
      badge: 'Fisiologi Ginjal',
      explanation: 'Pembentukan urin dimulai dari (1) Filtrasi glomerulus, diikuti (2) Reabsorpsi zat terlarut & air di tubulus kembali ke darah, dan (3) Sekresi zat sisa tambahan ke tubulus.'
    },
    {
      id: 'e14',
      question: 'Saluran terakhir yang membawa urin keluar dari kandung kemih menuju dunia luar disebut...',
      options: ['Ureter', 'Uretra', 'Epididimis', 'Vasa Rekta'],
      correct: 1,
      badge: 'Anatomi Saluran Kemih',
      explanation: 'Uretra adalah saluran ekskresi akhir urin. Uretra wanita lebih pendek (~4 cm) dibandingkan uretra pria (~20 cm), sehingga wanita lebih rentan terkena ISK.'
    },
    {
      id: 'e15',
      question: 'Tanda klinis dehidrasi ringan hingga sedang yang paling mudah diamati sendiri adalah...',
      options: ['Urin berwarna kuning pekat dan rasa haus meningkat', 'Urin berwarna jernih tidak berwarna', 'Frekuensi BAK meningkat drastis', 'Keringat berlebih dan kencing lancar'],
      correct: 0,
      badge: 'Pemantauan Mandiri',
      explanation: 'Saat tubuh kekurangan cairan, hipofisis melepaskan hormon ADH sehingga ginjal memekatkan urin (warna kuning pekat) dan memicu rangsangan haus.'
    },
    {
      id: 'e16',
      question: 'Sfingter uretra yang bekerja secara sadar (volunter) di bawah kendali saraf somatik adalah...',
      options: ['Sfingter Uretra Eksterna', 'Sfingter Uretra Interna', 'Sfingter Pilorus', 'Sfingter Kardia'],
      correct: 0,
      badge: 'Persarafan Miksi',
      explanation: 'Sfingter uretra eksterna tersusun dari otot rangka yang dipersarafi oleh nervus pudendus (saraf somatik), memungkinkan kita menahan kencing secara sadar.'
    },
    {
      id: 'e17',
      question: 'Manakah kebiasaan harian yang terbukti efektif mencegah pembentukan batu ginjal kalsium oksalat?',
      options: ['Minum air putih cukup minimal 2–2.5 liter per hari', 'Menahan buang air kecil selama mungkin', 'Mengurangi minum air putih', 'Mengonsumsi suplemen kalsium berlebihan tanpa air'],
      correct: 0,
      badge: 'Pencegahan Nefrolitiasis',
      explanation: 'Asupan cairan yang cukup mempertahankan volume urin yang tinggi sehingga menurunkan konsentrasi dan supersaturasi kristal kalsium serta oksalat di ginjal.'
    },
    {
      id: 'e18',
      question: 'Hormon yang dihasilkan oleh ginjal dan berfungsi merangsang sumsum tulang memproduksi sel darah merah adalah...',
      options: ['Eritropoietin (EPO)', 'Insulin', 'Tiroksin', 'Kortisol'],
      correct: 0,
      badge: 'Hormon Ginjal',
      explanation: 'Eritropoietin disekresikan oleh sel interstisial peritubulus ginjal sebagai respons terhadap hipoksia jaringan, untuk memicu eritropoiesis di sumsum tulang.'
    },
    {
      id: 'e19',
      question: 'Kondisi sering terbangun di malam hari untuk buang air kecil lebih dari 2 kali disebut...',
      options: ['Nokturia', 'Polidipsia', 'Anuria', 'Pneumaturia'],
      correct: 0,
      badge: 'Gejala Saluran Kemih',
      explanation: 'Nokturia adalah buang air kecil berkali-kali pada saat tidur malam hari, sering dikaitkan dengan BPH, konsumsi cairan larut malam, atau gagal jantung.'
    },
    {
      id: 'e20',
      question: 'Zat sisa metabolisme protein utama yang disaring oleh ginjal dan diekskresikan dalam urin adalah...',
      options: ['Ureum (Urea)', 'Bilirubin Terkonjugasi', 'Glukosa', 'Albumin'],
      correct: 0,
      badge: 'Ekskresi Sisa Metabolik',
      explanation: 'Ureum merupakan produk akhir metabolisme asam amino di hati yang dibersihkan oleh filtrasi glomerulus dan diekskresikan dalam jumlah besar di urin.'
    }
  ],

  medium: [
    {
      id: 'm1',
      question: 'Nilai Laju Filtrasi Glomerulus (LFG / GFR) normal pada orang dewasa muda yang sehat adalah sekitar...',
      options: ['50 ml/menit', '80 ml/menit', '125 ml/menit (180 L/hari)', '500 ml/menit'],
      correct: 2,
      badge: 'Fisiologi LFG',
      explanation: 'LFG normal orang dewasa adalah ~125 ml/menit (atau ~180 liter filtrat per hari), yang setara dengan fraksi filtrasi sekitar 20% dari aliran plasma ginjal.'
    },
    {
      id: 'm2',
      question: 'Sawar filtrasi glomerulus (glomerular filtration barrier) terdiri atas tiga lapisan utama, yaitu...',
      options: [
        'Endotel berfenestra, membran basalis, dan sel epitel podosit',
        'Endotel kapiler, otot polos sirkuler, dan adventisia',
        'Mukosa, submukosa, dan muskularis eksterna',
        'Korteks ginjal, medula ginjal, dan kapsula fibrosa'
      ],
      correct: 0,
      badge: 'Ultrastruktur Glomerulus',
      explanation: 'Sawar filtrasi glomerulus mencegah lolosnya sel darah dan molekul protein besar (seperti albumin) berkat muatan negatif proteoglikan dan slit pores podosit.'
    },
    {
      id: 'm3',
      question: 'Hormon Antidiuretik (ADH / Vasopresin) meningkatkan reabsorpsi air di tubulus distal dan duktus koligens dengan cara merangsang penyisipan...',
      options: ['Akuaporin-2 (AQP-2)', 'Transporter SGLT-2', 'Pompa H+-K+-ATPase', 'Ko-transporter NKCC2'],
      correct: 0,
      badge: 'Mekanisme Selular ADH',
      explanation: 'ADH berikatan dengan reseptor V2, meningkatkan cAMP dan menginduksi translokasi vesikel kanal air Akuaporin-2 ke membran luminal duktus koligens.'
    },
    {
      id: 'm4',
      question: 'Sebagian besar (~65%) air, ion natrium, klorida, serta 100% glukosa dan asam amino yang difiltrasi akan direabsorpsi di bagian...',
      options: ['Tubulus Proksimal', 'Ansa Henle Desenden', 'Tubulus Distal Akhir', 'Duktus Koligens Medula'],
      correct: 0,
      badge: 'Fisiologi Tubulus',
      explanation: 'Tubulus proksimal memiliki luas permukaan absorpsi raksasa berkat brush border mikrovili dan banyak mitokondria, menyerap kembali ~65% filtrat dan seluruh nutrien.'
    },
    {
      id: 'm5',
      question: 'Mekanisme countercurrent multiplier yang sangat krusial dalam menciptakan gradien hiperosmotik di medula ginjal berlangsung di organel nefron...',
      options: ['Ansa Henle (Lengkung Henle)', 'Kapsula Bowman', 'Tubulus Kontortus Distalis', 'Arteriol Eferen'],
      correct: 0,
      badge: 'Pemekatan Urin',
      explanation: 'Segmen tebal asendens ansa Henle secara aktif memompa Na-K-2Cl tanpa air, sementara segmen tipis desendens permeabel terhadap air, menghasilkan gradien hingga 1.200 mOsm/L.'
    },
    {
      id: 'm6',
      question: 'Berdasarkan rumus Cockcroft-Gault dan CKD-EPI, faktor manakah yang berkorelasi terbalik dengan nilai estimasi laju filtrasi glomerulus (eGFR)?',
      options: ['Kadar Kreatinin Serum', 'Tinggi Badan', 'Volume Urine 24 jam', 'Kadar Hemoglobin'],
      correct: 0,
      badge: 'Kalkulator Klinis',
      explanation: 'Semakin tinggi konsentrasi kreatinin serum dalam darah, semakin rendah nilai eGFR, menandakan penurunan fungsi filtrasi ginjal yang memburuk.'
    },
    {
      id: 'm7',
      question: 'Diuretik golongan "Loop" seperti Furosemid bekerja dengan cara menghambat transporter spesifik di segmen tebal asendens ansa Henle, yaitu...',
      options: ['Ko-transporter 1-Na+, 2-Cl-, 1-K+ (NKCC2)', 'Ko-transporter Na+-Cl- (NCCT)', 'Kanal ENaC luminal', 'Enzim Karbonik Anhidrase'],
      correct: 0,
      badge: 'Farmakologi Ginjal',
      explanation: 'Furosemid menghambat transporter NKCC2 di pars asendens tebal ansa Henle, menghambat reabsorpsi 25% natrium dan merusak gradien osmotik medula ginjal.'
    },
    {
      id: 'm8',
      question: 'Aldosteron meningkatkan reabsorpsi natrium dan sekresi kalium terutama melalui aksinya pada sel...',
      options: ['Sel Prinsipalis di duktus koligens', 'Sel Interkalatus tipe A', 'Podosit kapsula Bowman', 'Sel Mesangial intraglomerulus'],
      correct: 0,
      badge: 'Endokrinologi Ginjal',
      explanation: 'Aldosteron menstimulasi pompa Na+/K+-ATPase basolateral dan kanal ENaC luminal pada sel prinsipalis, memicu retensi natrium serta pembuangan ion kalium ke urin.'
    },
    {
      id: 'm9',
      question: 'Seorang pasien laki-laki 68 tahun mengeluh kencing terputus-putus, harus mengejan, dan merasa tidak lampias. Gejala ini khas untuk sindrom...',
      options: ['Lower Urinary Tract Symptoms (LUTS) akibat BPH', 'Sistitis bakterial akut', 'Nefropati diabetik stadium awal', 'Sindrom Nefrotik'],
      correct: 0,
      badge: 'Urologi Klinis',
      explanation: 'Obstruksi leher kandung kemih akibat pembesaran prostat jinak (BPH) menyebabkan spektrum gejala obstruktif LUTS yang diukur dengan kuesioner IPSS.'
    },
    {
      id: 'm10',
      question: 'Refleks miksi dipicu oleh regangan dinding kandung kemih yang sinyal sensoriknya dihantarkan ke medula spinalis melalui...',
      options: ['Nervus Pelvikus (Segmen Sakral S2–S3)', 'Nervus Iskiadikus', 'Nervus Femoralis', 'Nervus Frenikus'],
      correct: 0,
      badge: 'Neuroanatomi Miksi',
      explanation: 'Serat sensorik regangan dinding kandung kemih berjalan bersama nervus pelvikus menuju kornu dorsalis medula spinalis segmen S2–S3 untuk memicu lengkung refleks miksi.'
    },
    {
      id: 'm11',
      question: 'Diuretik hemat kalium (potassium-sparing) seperti Spironolakton bekerja dengan mekanisme...',
      options: [
        'Antagonis kompetitif reseptor mineralokortikoid (aldosteron)',
        'Inhibisi enzim anhidrase karbonat di tubulus proksimal',
        'Blokade reseptor beta-1 adrenergik',
        'Peningkatan tekanan onkotik plasma kapiler'
      ],
      correct: 0,
      badge: 'Farmakologi Ginjal',
      explanation: 'Spironolakton bersaing dengan aldosteron menduduki reseptor intraseluler, menghambat ekspresi kanal Na+ dan menurunkan sekresi K+, sehingga kalium tidak terbuang.'
    },
    {
      id: 'm12',
      question: 'Glukosa mulai muncul di dalam urin (glukosuria) pada orang diabetes melitus saat kadar glukosa plasma melampaui ambang ginjal (renal threshold), yaitu sekitar...',
      options: ['80 – 100 mg/dL', '120 – 140 mg/dL', '180 – 200 mg/dL', '350 – 400 mg/dL'],
      correct: 2,
      badge: 'Transpor Maksimum',
      explanation: 'Ambang ginjal untuk glukosa adalah ~180-200 mg/dL. Melebihi nilai ini, beban terfiltrasi melampaui kapasitas transporter SGLT2/SGLT1 (Tm ~375 mg/menit) sehingga glukosa bocor ke urin.'
    },
    {
      id: 'm13',
      question: 'Jika seorang pasien memiliki berat badan 60 kg dan memproduksi urin 120 ml selama 4 jam pemantauan, maka laju produksi urinnya adalah...',
      options: ['0.2 ml/kgBB/jam (Oliguria)', '0.5 ml/kgBB/jam (Normal batas bawah)', '1.2 ml/kgBB/jam (Normal)', '2.5 ml/kgBB/jam (Poliuria)'],
      correct: 1,
      badge: 'Kalkulator Klinis Urin',
      explanation: 'Perhitungan: 120 ml / (60 kg x 4 jam) = 120 / 240 = 0.5 ml/kgBB/jam. Nilai ini berada tepat di ambang batas normal minimal produksi urin.'
    },
    {
      id: 'm14',
      question: 'Pemeriksaan mikroskopis urin menemukan gambaran "buffy coat" atau leukositosis masif disertai silinder leukosit (WBC cast). Hal ini mengarah pada infeksi di...',
      options: ['Pielonefritis akut (Ginjal)', 'Uretritis non-gonore', 'Sistitis sederhana', 'Prostatitis kronis'],
      correct: 0,
      badge: 'Urinalisis Diagnostik',
      explanation: 'Silinder leukosit (WBC cast) terbentuk di dalam lumen tubulus ginjal, merupakan tanda patognomonik infeksi/inflamasi pada parenkim ginjal atas (pielonefritis akut).'
    },
    {
      id: 'm15',
      question: 'Komplikasi demineralisasi tulang (osteomalasia / osteodistrofi renal) pada penyakit ginjal kronis terutama diakibatkan oleh...',
      options: [
        'Penurunan aktivasi 1,25-dihidroksivitamin D3 dan retensi fosfat',
        'Kelebihan sekresi kalsitonin oleh kelenjar paratiroid',
        'Penurunan penyerapan kalium di usus halus',
        'Peningkatan ekskresi natrium tubulus proksimal'
      ],
      correct: 0,
      badge: 'Patofisiologi CKD',
      explanation: 'Ginjal yang rusak gagal mengaktifkan vitamin D menjadi kalsitriol (1,25-(OH)2-D3) dan meretensi fosfat, memicu hiperparatiroidisme sekunder yang mengikis kalsium tulang.'
    },
    {
      id: 'm16',
      question: 'Mengapa wanita secara anatomi memiliki risiko jauh lebih tinggi mengalami infeksi saluran kemih (sistitis) dibandingkan pria?',
      options: [
        'Uretra wanita lebih pendek dan muaranya dekat dengan anus',
        'Kandung kemih wanita memiliki kapasitas 2 kali lebih besar',
        'Otot detrusor wanita tidak memiliki persarafan parasimpatis',
        'Wanita tidak memiliki sfingter uretra eksterna'
      ],
      correct: 0,
      badge: 'Faktor Risiko ISK',
      explanation: 'Uretra wanita hanya berukuran ~4 cm (pria ~20 cm) dan letak orifisium uretra eksterna sangat dekat dengan area perianal, memudahkan kolonisasi bakteri uropatogenik asenden.'
    },
    {
      id: 'm17',
      question: 'Sel pada aparatus jukstaglomerulus yang berfungsi menyensor perubahan konsentrasi NaCl pada cairan tubulus distal adalah...',
      options: ['Sel Makula Densa', 'Sel Jukstaglomerulus (Granular)', 'Sel Podosit', 'Sel Interkalatus'],
      correct: 0,
      badge: 'Umpan Balik Tubuloglomerulus',
      explanation: 'Sel makula densa mendeteksi pengiriman NaCl di tubulus distal. Bila konsentrasi NaCl turun, makula densa memicu dilatasi arteriol aferen dan pelepasan renin.'
    },
    {
      id: 'm18',
      question: 'Batu saluran kemih yang terbentuk akibat infeksi bakteri penghasil enzim urease (seperti Proteus mirabilis) dan sering membentuk batu cetak tanduk rusa (staghorn) adalah batu...',
      options: ['Batu Struvit (Magnesium Amonium Fosfat)', 'Batu Asam Urat murni', 'Batu Sistin murni', 'Batu Kalsium Oksalat dihidrat'],
      correct: 0,
      badge: 'Urolitiasis',
      explanation: 'Enzim urease memecah urea menjadi amonia dan karbonat, meningkatkan pH urin menjadi sangat basa (>7.2) yang memfasilitasi presipitasi kristal struvit membentuk batu tanduk rusa.'
    },
    {
      id: 'm19',
      question: 'Kondisi di mana kandung kemih meregang terisi penuh namun tidak dapat berkontraksi akibat kerusakan saraf sensorik sakral (seperti pada tabes dorsalis) sehingga urin menetes terus-menerus disebut...',
      options: ['Overflow Incontinence (Inkontinensia Paradoksal)', 'Stress Incontinence murni', 'Urge Incontinence', 'Automatic Bladder'],
      correct: 0,
      badge: 'Neurogenic Bladder',
      explanation: 'Kerusakan akar saraf sensorik dorsal menghilangkan sensasi regang kandung kemih (atoni kandung kemih). Urin terakumulasi hingga melebihi tekanan sfingter dan menetes keluar.'
    },
    {
      id: 'm20',
      question: 'Pada orang dewasa dengan berat 70 kg, fraksi curah jantung (cardiac output) yang mengalir menuju kedua ginjal dalam kondisi istirahat normal adalah...',
      options: ['Sekitar 5%', 'Sekitar 12%', 'Sekitar 22% (1.100 ml/menit)', 'Sekitar 50%'],
      correct: 2,
      badge: 'Hemodinamik Renal',
      explanation: 'Ginjal menerima sekitar 22% dari total curah jantung (~1.100 ml/menit) meskipun berat kedua ginjal hanya 0.4% dari total berat tubuh, mencerminkan tingginya kebutuhan filtrasi plasma.'
    }
  ],

  hard: [
    {
      id: 'h1',
      question: 'Mengapa konsentrasi protein plasma dalam kapiler glomerulus meningkat sekitar 20% saat darah mengalir dari ujung arteriol aferen ke arteriol eferen?',
      options: [
        'Karena sekitar 20% plasma air disaring ke dalam kapsula Bowman (fraksi filtrasi = 0.20)',
        'Karena sel mesangial aktif menyintesis protein albumin di dalam kapiler',
        'Karena terjadi sekresi aktif protein dari tubulus proksimal ke dalam glomerulus',
        'Karena pemecahan asam amino di medula ginjal'
      ],
      correct: 0,
      badge: 'Tekanan Onkotik Glomerulus',
      explanation: 'Fraksi filtrasi normal adalah LFG / RPF = 125 / 650 ≈ 0.20. Sekitar seperlima volume cairan plasma disaring keluar tanpa protein, sehingga protein yang tertinggal menjadi pekat dan meningkatkan πG dari 28 ke 36 mmHg.'
    },
    {
      id: 'h2',
      question: 'Pada keadaan penurunan tekanan perfusi arteri ginjal (hipoperfusi), Angiotensin II secara fisiologis mempertahankan LFG melalui mekanisme utama...',
      options: [
        'Konstriksi selektif arteriol eferen glomerulus',
        'Dilatasi masif kapiler peritubulus',
        'Penghambatan total sintesis prostaglandin intrarenal',
        'Penurunan tekanan osmotik koloid plasma'
      ],
      correct: 0,
      badge: 'Autoregulasi Renal',
      explanation: 'Arteriol eferen sangat sensitif terhadap Angiotensin II. Konstriksi eferen meningkatkan tekanan hidrostatik kapiler glomerulus (PG), mencegah penurunan drastis LFG saat tekanan arteri sistemik turun.'
    },
    {
      id: 'h3',
      question: 'Pemberian obat golongan ACE Inhibitor atau ARB pada pasien dengan stenosis arteri renalis bilateral berat dapat memicu gagal ginjal akut karena...',
      options: [
        'Menghilangkan vasokonstriksi arteriol eferen oleh Angiotensin II yang menopang tekanan hidrostatik glomerulus',
        'Menyebabkan nekrosis koagulativa sel epitel tubulus distal',
        'Meningkatkan tekanan hidrostatik kapsula Bowman melebihi 60 mmHg',
        'Menghambat sekresi hormon aldosteron di zona fasikulata adrenal'
      ],
      correct: 0,
      badge: 'Farmakologi Klinis Guyton',
      explanation: 'Pada stenosis arteri renalis berat, LFG sangat bergantung pada konstriksi arteriol eferen oleh Angiotensin II. Penghambatan Angiotensin II mendilatasi arteriol eferen sehingga tekanan filtrasi glomerulus anjlok.'
    },
    {
      id: 'h4',
      question: 'Berdasarkan hukum Starling, gaya neto yang mendorong filtrasi pada kapiler glomerulus normal manusia adalah +10 mmHg. Manakah kombinasi nilai daya yang tepat?',
      options: [
        'PG = 60 mmHg (dorong), PB = 18 mmHg (lawan), πG = 32 mmHg (lawan)',
        'PG = 30 mmHg (dorong), PB = 10 mmHg (lawan), πG = 10 mmHg (lawan)',
        'PG = 85 mmHg (dorong), PB = 35 mmHg (lawan), πG = 40 mmHg (lawan)',
        'PG = 45 mmHg (dorong), PB = 25 mmHg (lawan), πG = 10 mmHg (lawan)'
      ],
      correct: 0,
      badge: 'Dinamika Filtrasi Glomerulus',
      explanation: 'Tekanan filtrasi neto = PG - PB - πG + πB = 60 - 18 - 32 + 0 = +10 mmHg. Nilai ini mendorong pembentukan ultrafiltrat glomerulus bebas protein ke ruang Bowman.'
    },
    {
      id: 'h5',
      question: 'Pada sindrom nefrotik dengan kelainan minimal (minimal change disease), proteinuria masif terjadi terutama akibat...',
      options: [
        'Hilangnya muatan negatif polianion proteoglikan pada membran basalis glomerulus dan podosit',
        'Penyumbatan mekanis pada duktus Bellini di papila medula ginjal',
        'Peningkatan tekanan darah arteri sistemik di atas 200 mmHg',
        'Mutasi kanal ENaC pada sel interkalatus'
      ],
      correct: 0,
      badge: 'Patologi Glomerulus',
      explanation: 'Normalnya, albumin (berdiameter 6 nm dengan muatan negatif) ditolak secara elektrostatik oleh muatan negatif sawar glomerulus (8 nm). Hilangnya muatan negatif ini menyebabkan albumin bocor bebas ke filtrat.'
    },
    {
      id: 'h6',
      question: 'Zat manakah yang memiliki karakteristik difiltrasi bebas di glomerulus, tidak direabsorpsi, dan tidak disekresikan di tubulus, sehingga nilai klirensnya tepat sama dengan LFG?',
      options: ['Inulin', 'Asam Para-aminohipurat (PAH)', 'Glukosa', 'Ureum'],
      correct: 0,
      badge: 'Uji Klirens Renal',
      explanation: 'Inulin difiltrasi bebas tanpa reabsorpsi atau sekresi sama sekali (Klirens = 125 ml/menit). PAH digunakan untuk mengukur aliran plasma ginjal (RPF) karena disekresikan hampir 90% dalam sekali lintasan.'
    },
    {
      id: 'h7',
      question: 'Berapakah nilai fraksi filtrasi (filtration fraction) jika seorang pasien memiliki LFG sebesar 100 ml/menit dan aliran plasma ginjal (RPF) sebesar 500 ml/menit?',
      options: ['0.10 (10%)', '0.20 (20%)', '0.50 (50%)', '0.80 (80%)'],
      correct: 1,
      badge: 'Perhitungan Fisiologi',
      explanation: 'Fraksi Filtrasi (FF) = LFG / RPF = 100 ml/menit / 500 ml/menit = 0.20 atau 20%.'
    },
    {
      id: 'h8',
      question: 'Resirkulasi ureum dari duktus koligens medula bagian dalam menuju ansa Henle diperantarai oleh transporter spesifik yang distimulasi oleh ADH, yaitu...',
      options: ['UT-A1 dan UT-A3', 'SGLT-1 dan SGLT-2', 'GLUT-4', 'NHE-3'],
      correct: 0,
      badge: 'Transporter Ureum',
      explanation: 'Transporter urea UT-A1 (apikal) dan UT-A3 (basolateral) pada duktus koligens medula dalam diaktivasi oleh ADH, menyumbang 40-50% hiperosmolaritas interstisium medula (~500-600 mOsm/L).'
    },
    {
      id: 'h9',
      question: 'Peran pembuluh darah kapiler vasa rekta sebagai countercurrent exchanger di medula ginjal adalah...',
      options: [
        'Mencegah pencucian zat terlarut hiperosmotik dari interstisium medula karena bentuk lengkung U-nya',
        'Memompa ion kalium secara aktif melawan gradien elektrokimia tinggi',
        'Menyaring protein albumin kembali ke dalam pelvis renalis',
        'Menyekresi asam para-aminohipurat langsung ke duktus koligens'
      ],
      correct: 0,
      badge: 'Vasa Rekta Countercurrent',
      explanation: 'Bentuk U pada vasa rekta dan aliran darah yang lambat (<5% RBF total) memungkinkan pertukaran pasif zat terlarut dan air tanpa menghilangkan gradien osmotik yang dibangun oleh ansa Henle.'
    },
    {
      id: 'h10',
      question: 'Sindroma Bartter adalah kelainan genetik autosomal resesif yang mengganggu fungsi transportasi ion pada segmen tebal asendens ansa Henle, dengan gejala klinis menyerupai efek penggunaan kronis obat...',
      options: ['Furosemid (Loop Diuretic)', 'Hidroklorotiazid', 'Spironolakton', 'Asetazolamid'],
      correct: 0,
      badge: 'Sindroma Tubulopati',
      explanation: 'Sindroma Bartter melibatkan mutasi pada gen NKCC2, ROMK, atau CLCNKB di pars asendens ansa Henle, memicu kehilangan garam masif, aktivasi RAAS sekunder, hipokalemia, dan alkalosis metabolik persis seperti efek Furosemid.'
    },
    {
      id: 'h11',
      question: 'Sindroma Gitelman merupakan kelainan mutasi genetik pada ko-transporter natrium-klorida (NCCT) peka-tiazid yang berlokasi di...',
      options: ['Tubulus distal bagian awal (convoluted tubule)', 'Tubulus kontortus proksimal segmen S1', 'Duktus koligens medula luar', 'Kapsula glomerulus viseral'],
      correct: 0,
      badge: 'Sindroma Tubulopati',
      explanation: 'Sindroma Gitelman disebabkan defek mutasi SLC12A3 penyandi kotransporter Na-Cl di tubulus distal awal, menyebabkan kehilangan Na/Cl, hipokalemia, dan hipokalsiuria (berbeda dari Bartter yang hiperkalsiuria).'
    },
    {
      id: 'h12',
      question: 'Sindroma Liddle ditandai oleh hipertensi berat usia muda, hipokalemia, dan alkalosis metabolik dengan kadar renin dan aldosteron yang rendah (pseudohiperaldosteronisme). Penyebab mutasinya adalah...',
      options: [
        'Aktivitas berlebihan (gain-of-function) konstitutif kanal natrium ENaC di tubulus koligens',
        'Defisiensi 21-hidroksilase adrenal kongenital',
        'Agenesis pembuluh darah arteri renalis unilateral',
        'Resistensi reseptor V2 vasopresin di tubulus distal'
      ],
      correct: 0,
      badge: 'Sindroma Liddle',
      explanation: 'Mutasi genetik ENaC mencegah degradasi ubiquitin sehingga kanal ENaC terus terbuka di membran sel prinsipalis, memicu reabsorpsi Na+ masif dan hipertensi yang responsif terhadap Amilorid.'
    },
    {
      id: 'h13',
      question: 'Sistem dapar utama di dalam lumen tubulus ginjal yang mengikat ion hidrogen (H+) bebas berlebih pada kondisi asidosis kronis dan membentuk HCO3- baru bagi darah adalah...',
      options: ['Sistem dapar amonia-amonium (NH3 / NH4+) dan fosfat', 'Sistem dapar hemoglobin darah merah', 'Sistem dapar laktat-piruvat', 'Sistem dapar glukosa-glikogen'],
      correct: 0,
      badge: 'Keseimbangan Asam Basa',
      explanation: 'Ginjal memproduksi amonium (NH4+) dari metabolisme glutamin di tubulus proksimal. Pada asidosis kronis, ekskresi NH4+ dapat meningkat hingga 500 mEq/hari untuk mendapar asam dan memasok HCO3- baru.'
    },
    {
      id: 'h14',
      question: 'Perhitungan Anion Gap plasma dihitung dengan rumus [Na+] - ([HCO3-] + [Cl-]). Manakah kondisi asidosis metabolik dengan peningkatan Anion Gap (High Anion Gap Metabolic Acidosis)?',
      options: [
        'Ketoasidosis Diabetikum dan Asidosis Laktat',
        'Diare sekretorik profus',
        'Asidosis Tubulus Renalis (RTA)',
        'Pemberian infus NaCl 0.9% berlebihan'
      ],
      correct: 0,
      badge: 'Anion Gap Klinis',
      explanation: 'Akumulasi asam unmeasured seperti asam asetoasetat/beta-hidroksibutirat (pada DKA) atau asam laktat meningkatkan anion gap (>12 mEq/L). Diare dan RTA menyebabkan asidosis hiperkloremik dengan anion gap normal.'
    },
    {
      id: 'h15',
      question: 'Fenomena "Isostenuria" pada pasien dengan kehilangan >75–80% nefron fungsional pada penyakit ginjal kronis ditandai oleh...',
      options: [
        'Berat jenis urin menetap sekitar 1.010 (osmolaritas ~300 mOsm/L), sama dengan filtrat glomerulus',
        'Berat jenis urin selalu sangat tinggi melampaui 1.045',
        'Urin berbusa dengan pH selalu di bawah 4.0',
        'Kemampuan pemekatan urin meningkat dua kali lipat'
      ],
      correct: 0,
      badge: 'Penyakit Ginjal Kronis Guyton',
      explanation: 'Isostenuria terjadi karena nefron yang tersisa mengalami solute diuresis aliran cepat, melumpuhkan mekanisme countercurrent sehingga ginjal tidak mampu lagi memekatkan maupun mengencerkan urin dari nilai plasma 1.010.'
    },
    {
      id: 'h16',
      question: 'Pada alkalosis metabolik berat akibat muntah-muntah isi lambung terus-menerus, kompensasi fisiologis ginjal yang berlangsung adalah...',
      options: [
        'Penurunan sekresi H+ oleh tubulus dan peningkatan ekskresi HCO3- ke dalam urin',
        'Peningkatan sekresi H+ oleh sel interkalatus tipe A',
        'Peningkatan pembentukan ion amonium dari glutamin',
        'Penghambatan total pengeluaran natrium di lengkung Henle'
      ],
      correct: 0,
      badge: 'Regulasi Renal Asam Basa',
      explanation: 'Saat konsentrasi HCO3- plasma meningkat tajam, beban terfiltrasi HCO3- melampaui kemampuan reabsorpsi tubulus proksimal, sehingga kelebihan bikarbonat diekskresikan dalam urin yang bersifat basa.'
    },
    {
      id: 'h17',
      question: 'Kerusakan pada pons batang otak atau lesi medula spinalis transversal parsial di atas segmen sakral yang menghilangkan sinyal inhibisi kortikal akan memicu kondisi...',
      options: [
        'Uninhibited Neurogenic Bladder (refleks miksi hiperaktif dan sering)',
        'Atonic Bladder dengan retensi urin total',
        'Paralisis otot detrusor permanen tanpa kontraksi',
        'Batu staghorn bilateral'
      ],
      correct: 0,
      badge: 'Neuro-Urologi',
      explanation: 'Ketiadaan sinyal inhibisi desenden dari korteks serebri menyebabkan pusat miksi sakral tereksitasi terus-menerus, sehingga sedikit urin saja di kandung kemih langsung mencetuskan refleks miksi tak terkendali.'
    },
    {
      id: 'h18',
      question: 'Hormon Paratiroid (PTH) memengaruhi penanganan elektrolit di tubulus ginjal dengan efek ganda yang spesifik, yaitu...',
      options: [
        'Meningkatkan reabsorpsi Kalsium (Ca2+) di tubulus distal dan menghambat reabsorpsi Fosfat (PO43-) di tubulus proksimal',
        'Menghambat reabsorpsi Kalsium dan merangsang retensi Fosfat',
        'Meningkatkan ekskresi Kalsium dan Kalium bersamaan',
        'Menghambat sekresi asam urat di lengkung Henle'
      ],
      correct: 0,
      badge: 'Kalsium & Fosfat Guyton',
      explanation: 'PTH menstimulasi reabsorpsi Ca2+ di tubulus distal dan lengkung tebal asendens, namun menurunkan transpor maksimum (Tm) fosfat di tubulus proksimal sehingga fosfat terbuang ke urin.'
    },
    {
      id: 'h19',
      question: 'Pada penderita Diabetes Insipidus Sentral, respons klinis khas yang membedakannya dari Diabetes Insipidus Nefrogenik setelah injeksi Desmopressin (analog sintetik ADH) adalah...',
      options: [
        'Volume urin menurun drastis dan osmolaritas urin meningkat tajam dalam 2 jam',
        'Tidak ada perubahan volume maupun osmolaritas urin sama sekali',
        'Terjadi glukosuria masif disertai ketoasidosis',
        'Urin berubah warna menjadi kemerahan'
      ],
      correct: 0,
      badge: 'Diagnostik Endokrin Ginjal',
      explanation: 'Diabetes insipidus sentral disebabkan oleh defisiensi sekresi ADH hipofisis posterior; pemberian Desmopressin eksogen mengoreksi defek ini seketika. Pada tipe nefrogenik, tubulus resisten terhadap ADH sehingga tidak merespons.'
    },
    {
      id: 'h20',
      question: 'Berdasarkan konsep klirens bersihan air bebas (free-water clearance, CH2O), jika laju aliran urin V = 1.0 ml/menit, Uosm = 600 mOsm/L, dan Posm = 300 mOsm/L, maka nilai CH2O adalah...',
      options: ['-1.0 ml/menit (Konservasi air / pemekatan urin)', '+1.0 ml/menit', '0 ml/menit', '+2.0 ml/menit'],
      correct: 0,
      badge: 'Klirens Air Bebas Guyton',
      explanation: 'Cosm = (Uosm x V) / Posm = (600 x 1.0) / 300 = 2.0 ml/menit. Maka CH2O = V - Cosm = 1.0 - 2.0 = -1.0 ml/menit. Nilai negatif membuktikan ginjal menghemat air dan membentuk urin yang pekat.'
    }
  ]
};

window.KyGUQuestions = KyGUQuestions;
