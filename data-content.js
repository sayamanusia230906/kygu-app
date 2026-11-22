/**
 * KyGU (Know Your GU) - Medical Content Database
 * 5 Organ System Modules (Normal vs Pathology), Urine Color Chart, Today Fun Facts & Clinical Guidelines
 */

const KyGUContent = {
  // 1. Five Main GU Organ Modules
  modules: [
    {
      id: 'renal',
      title: 'Kesehatan Ginjal (Renal)',
      subtitle: 'Filtrasi, Regulasi Cairan, Elektrolit & Endokrin',
      icon: '🩺',
      anatomyId: 'kidney',
      color: '#0A2E5C',
      normal: {
        summary: 'Ginjal adalah sepasang organ retroperitoneal seukuran kepalan tangan (~150 gram) yang menerima 22% curah jantung untuk menyaring sisa metabolisme dan mempertahankan homeostasis.',
        sections: [
          {
            title: 'Anatomi Makroskopis & Mikroskopis',
            points: [
              'Terdiri dari korteks luar dan medula dalam yang memiliki 8–10 piramid ginjal.',
              'Setiap ginjal memiliki 800.000–1.000.000 nefron sebagai unit fungsional penyaring.',
              'Kompleks nefron: Glomerulus yang dibungkus kapsula Bowman, tubulus kontortus proksimal (PCT), ansa Henle (lengkung Henle), tubulus kontortus distal (DCT), dan duktus koligens.',
              'Aparatus jukstaglomerulus (sel makula densa & sel jukstaglomerulus) mengatur hemodinamik dan pelepasan hormon renin.'
            ]
          },
          {
            title: 'Fungsi Fisiologis Utama Ginjal',
            points: [
              'Filtrasi Glomerulus: Menyaring ~180 liter plasma per hari (LFG ~125 ml/menit) melalui sawar berfenestra dan podosit bermuatan negatif.',
              'Reabsorpsi Selektif: Menyerap kembali 99% air dan garam, serta 100% glukosa dan asam amino kembali ke sirkulasi peritubulus.',
              'Ekskresi Zat Sisa: Membuang produk akhir metabolisme seperti ureum, kreatinin, asam urat, obat-obatan, dan toksin.',
              'Fungsi Endokrin: Menghasilkan Eritropoietin (pematangan eritrosit), 1,25-dihidroksivitamin D3 / kalsitriol (penyerapan kalsium usus), serta Renin (regulasi tekanan darah).'
            ]
          },
          {
            title: 'Tips Menjaga Kesehatan Ginjal',
            points: [
              'Cukupi kebutuhan cairan harian (2–2.5 L/hari) untuk memfasilitasi filtrasi sisa zat terlarut.',
              'Batasi asupan garam natrium (<2 g natrium atau 5 g garam dapur per hari).',
              'Kontrol tekanan darah (<130/80 mmHg) dan kadar gula darah secara teratur.',
              'Hindari penggunaan obat antinyeri NSAID (seperti ibuprofen, diklofenak) jangka panjang tanpa pengawasan medis.'
            ]
          }
        ]
      },
      pathology: {
        diseases: [
          {
            name: 'Gagal Ginjal Akut (Acute Kidney Injury / AKI)',
            description: 'Penurunan fungsi filtrasi ginjal yang terjadi secara mendadak (dalam hitungan jam hingga hari), ditandai oleh penurunan LFG, oliguria/anuria, dan peningkatan kadar kreatinin serta urea serum.',
            subtypes: [
              'Prarenal: Akibat hipoperfusi ginjal (dehidrasi berat, syok perdarahan, sepsis, gagal jantung).',
              'Intrarenal: Kerusakan langsung parenkim ginjal (Nekrosis Tubular Akut / ATN akibat iskemia berat atau nefrotoksin seperti aminoglikosida/kontras radiologi, glomerulonefritis akut).',
              'Pascarenal: Hambatan mekanis aliran urin bilateral (batu ureter, hipertrofi prostat, keganasan panggul).'
            ],
            symptoms: 'Volume urin berkurang drastis (<0.5 ml/kg/jam), pembengkakan pada tungkai, sesak napas (asidosis metabolik/edema paru), mual, lemas, dan disorientasi.',
            redFlags: 'Pengeluaran urin berhenti total (anuria), sesak napas berat, kejang, atau kadar kalium serum melonjak >6.5 mEq/L (risiko henti jantung).'
          },
          {
            name: 'Penyakit Ginjal Kronis (Chronic Kidney Disease / CKD)',
            description: 'Kerusakan struktural atau penurunan fungsi ginjal yang menetap selama lebih dari 3 bulan dengan implikasi kesehatan serius. Berakhir pada penyakit ginjal stadium akhir (ESRD).',
            etiology: 'Penyebab tersering: Diabetes Melitus tipe 2 (nefropati diabetik) dan Hipertensi esensial kronis, diikuti glomerulonefritis kronis dan penyakit ginjal polikistik.',
            symptoms: 'Awalnya sering tanpa gejala (silent disease). Pada stadium lanjut: lemas kronis (anemia renal), edema anasarka, nafsu makan hilang, gatal uremik, mual, napas berbau urin (foetor uremicus).',
            redFlags: 'Gejala uremia berat, kelebihan cairan refrakter di paru, perikarditis uremik, atau ensefalopati uremik yang memerlukan hemodialisis cito.'
          },
          {
            name: 'Sindrom Nefrotik vs Sindrom Nefritik',
            description: 'Sindrom Nefrotik ditandai oleh proteinuria masif (>3.5 g/24 jam), hipoalbuminemia (<3.0 g/dL), edema anasarka hebat, dan hiperkolesterolemia akibat hilangnya muatan negatif sawar glomerulus. Sindrom Nefritik ditandai oleh hematuria (kencing merah/cokelat), hipertensi, dan oliguria akibat inflamasi aktif glomerulus.'
          }
        ]
      }
    },
    {
      id: 'ureter',
      title: 'Ureter & Saluran Kemih Atas',
      subtitle: 'Transpor Peristaltik & Dinamika Pelvis Renalis',
      icon: '💧',
      anatomyId: 'ureter',
      color: '#0A2E5C',
      normal: {
        summary: 'Ureter adalah dua saluran pipa muskular berpasangan (panjang 25–35 cm) yang menghubungkan pelvis renalis dengan kandung kemih melalui gerakan peristaltik aktif.',
        sections: [
          {
            title: 'Struktur & Mekanisme Transpor',
            points: [
              'Dinding ureter terdiri dari mukosa transisional, lapisan otot polos ganda (longitudinal & sirkuler), dan adventisia terluar.',
              'Gelombang peristaltik dipicu oleh sel pacemaker intrisik di kalises pelvis renalis dengan frekuensi 1–5 kontraksi per menit.',
              'Ureter menembus dinding kandung kemih secara miring (oblik) sepanjang 1–2 cm di area trigonum, menciptakan katup alami anti-refluks.'
            ]
          },
          {
            title: 'Refleks Ureterorenal',
            points: [
              'Ureter kaya akan serabut saraf sensorik nyeri aferen.',
              'Bila terjadi sumbatan (seperti batu ureter), kontraksi spasme yang hebat akan memicu nyeri kolik hebat dan refleks vasokonstriksi arteriol ginjal untuk menekan pembentukan urin berlebih.'
            ]
          }
        ]
      },
      pathology: {
        diseases: [
          {
            name: 'Batu Saluran Kemih (Ureterolitiasis / Kolik Ureter)',
            description: 'Batu ginjal yang turun dan tersangkut di lumen ureter, paling sering pada 3 titik penyempitan anatomis: Ureteropelvic Junction (UPJ), persilangan vasa iliaka, dan Ureterovesical Junction (UVJ).',
            symptoms: 'Nyeri kolik pinggang yang menjalar ke lipat paha atau skrotum/labia secara tiba-tiba dan hilang timbul, hematuria, mual muntah, keringat dingin.',
            redFlags: 'Nyeri hebat disertai demam tinggi menggigil (obstruksi ureter terinfeksi / pyonephrosis — merupakan kedaruratan urologi yang memerlukan nefrostomi/stenting segera).'
          },
          {
            name: 'Refluks Vesikoureter (VUR)',
            description: 'Kondisi aliran balik urin dari kandung kemih ke ureter dan ginjal akibat kelainan kongenital panjang intramural ureter yang terlalu pendek.',
            symptoms: 'Sering terjadi pada anak-anak berupa infeksi saluran kemih berulang dan demam, jika dibiarkan dapat merusak medula ginjal (reflux nephropathy).'
          }
        ]
      }
    },
    {
      id: 'bladder',
      title: 'Kandung Kemih (Vesika Urinaria)',
      subtitle: 'Reservoir Urin, Otot Detrusor & Refleks Miksi',
      icon: '🛡️',
      anatomyId: 'bladder',
      color: '#FFA000',
      normal: {
        summary: 'Kandung kemih adalah organ berongga elastis berdinding otot polos detrusor yang berfungsi mengumpulkan dan menyimpan urin hingga waktu berkemih yang terkontrol.',
        sections: [
          {
            title: 'Anatomi Vesika Urinaria',
            points: [
              'Terdiri dari korpus utama yang berlipat-lipat (rugae) dan leher kandung kemih berbentuk corong.',
              'Trigonum vesicae adalah area segitiga licin di dasar posterior di antara dua orifisium ureter dan orifisium uretra interna.',
              'Sfingter uretra interna tersusun dari anyaman otot detrusor yang berkontraksi secara involunter untuk mencegah kebocoran.'
            ]
          },
          {
            title: 'Refleks Miksi & Sistometrogram',
            points: [
              'Pada volume urin 150–200 ml, mulai terasa sensasi pengisian ringan.',
              'Pada volume 300–400 ml, reseptor regang di uretra posterior dan detrusor mengaktifkan saraf parasimpatis nervus pelvikus (S2–S3).',
              'Pusat miksi di Pons dan Korteks Serebri memberi kontrol inhibisi volunter hingga individu siap buang air kecil di toilet.'
            ]
          }
        ]
      },
      pathology: {
        diseases: [
          {
            name: 'Sistitis (Infeksi Kandung Kemih)',
            description: 'Inflamasi pada dinding mukosa kandung kemih yang paling sering disebabkan oleh invasi bakteri Escherichia coli asenden.',
            symptoms: 'Disuria (perih/terbakar saat kencing), polakisuria (sering kencing sedikit-sedikit), urgensi (rasa mendesak tak tertahankan), nyeri tekan suprapubik, urin keruh atau berbau menyengat.',
            redFlags: 'Muncul demam tinggi, nyeri ketuk pinggang (CVA tenderness), atau hematuria nyata (tanda infeksi menjalar ke ginjal menjadi pielonefritis).'
          },
          {
            name: 'Kandung Kemih Neurogenik (Neurogenic Bladder)',
            description: 'Disfungsi kandung kemih akibat gangguan persarafan neurologis:',
            subtypes: [
              'Spastic / Reflex Bladder: Akibat lesi medula spinalis di atas sakrum, detrusor berkontraksi spontan tanpa kontrol otak.',
              'Flaccid / Atonic Bladder: Akibat lesi arkus sakral (tabes dorsalis, neuropati diabetik), kandung kemih meregang besar tanpa sensasi regang, menyebabkan overflow incontinence.'
            ]
          },
          {
            name: 'Overactive Bladder (OAB)',
            description: 'Sindrom kontraksi otot detrusor yang mendadak dan tidak terkontrol dengan atau tanpa kebocoran urin (urge incontinence), sangat mengganggu kualitas hidup.'
          }
        ]
      }
    },
    {
      id: 'urethra',
      title: 'Uretra & Saluran Kemih Bawah',
      subtitle: 'Pengosongan Akhir, Sfingter & Resistensi Aliran',
      icon: '⚡',
      anatomyId: 'urethra',
      color: '#0A2E5C',
      normal: {
        summary: 'Uretra adalah saluran pembuangan akhir yang menghubungkan leher kandung kemih dengan meatus uretra eksterna, diatur oleh sfingter interna dan eksterna.',
        sections: [
          {
            title: 'Perbedaan Uretra Pria dan Wanita',
            points: [
              'Pria: Panjang 18–20 cm, memiliki 4 bagian (pars preprostatika, prostatika, membranasea, dan spongiosa/penis). Berfungsi ganda untuk miksi dan ejakulasi.',
              'Wanita: Panjang hanya 3.5–4 cm, berjalan lurus dari kandung kemih ke vestibulum vagina, hanya berfungsi untuk berkemih.'
            ]
          },
          {
            title: 'Mekanisme Kontinensia Volunter',
            points: [
              'Sfingter Uretra Eksterna terletak di diafragma urogenital, tersusun atas serabut otot rangka volunter yang dipersarafi oleh nervus pudendus.',
              'Memungkinkan individu menghentikan pancaran urin secara sadar di tengah miksi bila diperlukan.'
            ]
          }
        ]
      },
      pathology: {
        diseases: [
          {
            name: 'Striktur Uretra',
            description: 'Penyempitan lumen uretra akibat jaringan parut fibrosa pasca-infeksi (gonore/klamidia), cedera kateterisasi, atau trauma selangkangan (straddle injury).',
            symptoms: 'Pancaran kencing bercabang atau menyebar, mengecil lambat, waktu miksi menjadi sangat lama, rasa tidak tuntas.',
            redFlags: 'Retensi urin akut (sama sekali tidak bisa kencing dengan kandung kemih membuncit tegang di suprapubik).'
          },
          {
            name: 'Uretritis Spesifik & Non-Spesifik',
            description: 'Infeksi pada uretra yang biasanya ditularkan melalui kontak seksual (Neisseria gonorrhoeae atau Chlamydia trachomatis).',
            symptoms: 'Disuria hebat di ujung kemaluan, keluarnya cairan nanah (duh tubuh) putih, kuning, atau kehijauan dari meatus uretra.'
          }
        ]
      }
    },
    {
      id: 'genito',
      title: 'Sistem Genitalia & Reproduksi Terkait (Genito)',
      subtitle: 'Prostat, Testis, Saluran Reproduksi & Kelenjar Aksesori',
      icon: '🧬',
      anatomyId: 'prostate',
      color: '#F57C00',
      normal: {
        summary: 'Sistem genitalia pria memiliki hubungan anatomis dan fungsional yang sangat erat dengan saluran kemih bawah, terutama melalui kelenjar prostat dan uretra.',
        sections: [
          {
            title: 'Anatomi Kelenjar Prostat & Organ Terkait',
            points: [
              'Prostat berbentuk seperti buah kenari (~20 gram) yang mengelilingi uretra pars prostatika.',
              'Menghasilkan cairan prostat alkali (~30% volume semen) yang kaya seng, asam sitrat, dan enzim PSA untuk menunjang viabilitas sperma.',
              'Kelenjar bulbouretral (Cowper) mensekresi cairan pelumas mukus bening pembersih uretra sebelum ejakulasi.',
              'Duktus ejakulatorius menyatu ke uretra di daerah verumontanum.'
            ]
          }
        ]
      },
      pathology: {
        diseases: [
          {
            name: 'Benign Prostatic Hyperplasia (BPH)',
            description: 'Proliferasi jinak sel stroma dan epitel pada zona transisi prostat yang dipengaruhi oleh hormon dihidrotestosteron (DHT) seiring bertambahnya usia pria >50 tahun.',
            symptoms: 'Gejala LUTS: Pancaran urin melemah (weak stream), hesistansi (menunggu lama sebelum mulai kencing), intermitensi, menetes di akhir (terminal dribbling), nokturia, dan sering kencing.',
            redFlags: 'Retensi urin akut, hematuria makroskopis, terbentuknya batu kandung kemih sekunder, atau hidronefrosis bilateral akibat bendungan kronis.'
          },
          {
            name: 'Prostatitis Akut & Kronis',
            description: 'Infeksi bakteri atau peradangan non-bakterial pada parenkim kelenjar prostat.',
            symptoms: 'Nyeri perineum atau di belakang skrotum, nyeri saat ejakulasi atau buang air besar, demam menggigil pada tipe akut.'
          },
          {
            name: 'Kanker Prostat (Adenokarsinoma Prostat)',
            description: 'Keganasan tersering pada pria usia lanjut yang berkembang terutama di zona perifer prostat. Skrining melibatkan pemeriksaan colok dubur (DRE) dan kadar serum Prostate-Specific Antigen (PSA).'
          }
        ]
      }
    }
  ],

  // 2. Six Clinical Urine Color Scales
  urineColorScale: [
    {
      id: 'clear',
      name: 'Jernih (Transparan / Bening)',
      colorHex: '#F0F9FF',
      borderHex: '#BAE6FD',
      status: 'Overhidrasi (Kelebihan Cairan)',
      badgeClass: 'badge-overhydrated',
      clinicalMeaning: 'Urin sangat encer dengan berat jenis rendah mendekati 1.002–1.005. Osmolaritas cairan tubulus menurun karena sekresi ADH minimal.',
      actionAdvice: 'Status cairan tubuh sangat penuh. Anda dapat sedikit mengurangi porsi minum untuk menjaga keseimbangan elektrolit darah agar tidak terjadi hiponatremia encer.',
      hydrationRating: 'Sangat Penuh (100%)'
    },
    {
      id: 'pale_yellow',
      name: 'Kuning Pucat / Sedang (Ideal)',
      colorHex: '#FEF08A',
      borderHex: '#FACC15',
      status: 'Hidrasi Optimal & Normal',
      badgeClass: 'badge-optimal',
      clinicalMeaning: 'Konsentrasi zat terlarut (urobilin/urokrom) berada dalam kisaran fisiologis yang seimbang sempurna (berat jenis 1.010–1.020).',
      actionAdvice: 'Kerja luar biasa! Pertahankan pola minum harian Anda saat ini. Ginjal Anda bekerja dalam kondisi optimal.',
      hydrationRating: 'Optimal (80–90%)'
    },
    {
      id: 'dark_yellow',
      name: 'Kuning Pekat / Emas Tua',
      colorHex: '#EAB308',
      borderHex: '#CA8A04',
      status: 'Dehidrasi Ringan – Sedang',
      badgeClass: 'badge-mild-dehydration',
      clinicalMeaning: 'Ginjal mengaktifkan hormon ADH untuk mereabsorpsi air di duktus koligens, menyebabkan urin terkonsentrasi untuk menghemat air tubuh.',
      actionAdvice: 'Segera minum 1–2 gelas air putih (250–500 ml). Tingkatkan asupan cairan terutama jika sedang berolahraga atau berada di tempat bersuhu panas.',
      hydrationRating: 'Kurang Cairan (50–65%)'
    },
    {
      id: 'amber_brown',
      name: 'Cokelat Pekat / Seperti Teh',
      colorHex: '#92400E',
      borderHex: '#78350F',
      status: 'Dehidrasi Berat atau Tanda Penyakit',
      badgeClass: 'badge-severe',
      clinicalMeaning: 'Menandakan dehidrasi berat atau adanya pigmen bilirubin dalam urin (gangguan hepatobilier) atau mioglobin (rabdomiolisis akibat cedera otot berat).',
      actionAdvice: 'Segera lakukan rehidrasi masif dengan air putih atau cairan elektrolit oral. Jika warna teh tetap bertahan setelah minum cukup, segera konsultasikan ke dokter untuk pemeriksaan tes fungsi hati dan urinalisis.',
      hydrationRating: 'Kritis Dehidrasi (< 30%)'
    },
    {
      id: 'red_pink',
      name: 'Kemerahan / Pink (Hematuria)',
      colorHex: '#F87171',
      borderHex: '#DC2626',
      status: 'Kemungkinan Darah dalam Urin (Hematuria)',
      badgeClass: 'badge-danger',
      clinicalMeaning: 'Dapat disebabkan oleh eritrosit bebas (batu ginjal, infeksi saluran kemih berat, glomerulonefritis, trauma, tumor kandung kemih/ginjal) atau konsumsi zat pigmen seperti buah bit/obat rifampisin.',
      actionAdvice: 'Jangan diabaikan! Bila Anda tidak sedang mengonsumsi buah bit atau obat rifampisin, segera periksakan diri ke dokter atau spesialis Urologi untuk pemeriksaan urinalisis mikroskopis dan USG ginjal.',
      hydrationRating: 'Perlu Evaluasi Medis Segera'
    },
    {
      id: 'cloudy_foamy',
      name: 'Keruh / Berbusa Tebal',
      colorHex: '#E2E8F0',
      borderHex: '#94A3B8',
      status: 'Infeksi (Puriuria) atau Proteinuria',
      badgeClass: 'badge-warning',
      clinicalMeaning: 'Kekeruhan sering disebabkan adanya sel darah putih (leukosituria/pus) atau endapan kristal fosfat. Urin berbusa tebal yang sulit hilang menandakan kebocoran protein albumin dalam jumlah tinggi (proteinuria / sindrom nefrotik).',
      actionAdvice: 'Periksakan spesimen urin ke laboratorium untuk urinalisis lengkap (tes carik celup protein dan leukosit esterase) serta kultur urin.',
      hydrationRating: 'Waspada Infeksi / Kerusakan Glomerulus'
    }
  ],

  // 3. Today Fun Fact Trivia Database
  funFacts: [
    {
      id: 1,
      title: 'Penyaring Raksasa Tubuh',
      content: 'Setiap hari, kedua ginjal Anda menyaring sekitar 180 liter cairan darah — setara dengan mengisi 90 botol air galon besar! Namun, 99% cairan tersebut diserap kembali ke dalam darah, sehingga hanya sekitar 1.5–2 liter yang dikeluarkan sebagai urin.',
      source: 'Guyton & Hall Fisiologi Kedokteran Bab 26'
    },
    {
      id: 2,
      title: 'Aliran Darah Istimewa',
      content: 'Meskipun berat kedua ginjal hanya mencakup 0.4% dari total berat badan manusia, ginjal menerima hingga 22% dari seluruh curah jantung (sekitar 1.100 ml darah per menit)! Ginjal adalah organ dengan pasokan darah terpadat per gram jaringan.',
      source: 'Guyton & Hall Fisiologi Kedokteran Bab 26'
    },
    {
      id: 3,
      title: 'Pabrik Pemekat Urin yang Ajaib',
      content: 'Melalui sistem "Countercurrent Multiplier" di ansa Henle dan resirkulasi ureum, medula ginjal mampu menciptakan konsentrasi zat terlarut hingga 1.200–1.400 mOsm/L di bagian ujungnya — empat kali lebih pekat daripada darah Anda!',
      source: 'Guyton & Hall Fisiologi Kedokteran Bab 28'
    },
    {
      id: 4,
      title: 'Kapasitas Elastis Kandung Kemih',
      content: 'Kandung kemih manusia dapat meregang menampung 300–400 ml urin tanpa peningkatan tekanan yang berarti berkat tonus intrinsik dan lipatan dinding mukosa (rugae). Refleks berkemih baru aktif memicu sensasi mendesak saat volume melebihi 400 ml.',
      source: 'Guyton & Hall Fisiologi Kedokteran Bab 26'
    },
    {
      id: 5,
      title: 'Jangan Menunggu Sampai Sangat Haus!',
      content: 'Mekanisme rasa haus di hipotalamus baru terpicu saat konsentrasi natrium plasma meningkat sekitar 2 mEq/L atau saat tubuh kehilangan sekitar 1–2% cairan. Minumlah secara teratur sepanjang hari sebelum sinyal haus muncul.',
      source: 'Guyton & Hall Fisiologi Kedokteran Bab 28'
    },
    {
      id: 6,
      title: 'Ginjal Pengendali Tulang & Darah',
      content: 'Selain membuang sisa kencing, ginjal adalah pabrik hormon penting: memproduksi Eritropoietin (EPO) yang merangsang sumsum tulang membentuk sel darah merah, dan mengaktifkan Kalsitriol (Vitamin D3) untuk menguatkan tulang.',
      source: 'Guyton & Hall Fisiologi Kedokteran Bab 26 & 29'
    }
  ],

  // 4. FAQ & About KyGU
  faqs: [
    {
      q: 'Apa itu fitur Bladder Diary (Catatan Berkemih) dan bagaimana cara menggunakannya?',
      a: 'Bladder Diary adalah catatan harian mandiri untuk merekam asupan minum harian Anda serta frekuensi dan karakteristik buang air kecil (BAK). Catatan ini sangat berharga untuk dokter urologi guna mendeteksi pola overactive bladder, poliuria, atau inkontinensia urin.'
    },
    {
      q: 'Bagaimana akurasi rumus kalkulator eGFR di aplikasi KyGU?',
      a: 'Aplikasi KyGU menggunakan formula CKD-EPI (2021) race-free dan Cockcroft-Gault yang merupakan baku emas klinis internasional yang direkomendasikan oleh KDIGO (Kidney Disease: Improving Global Outcomes).'
    },
    {
      q: 'Mengapa warna urin saya berbeda-beda setiap waktu?',
      a: 'Warna urin sangat dipengaruhi oleh tingkat hidrasi tubuh (pigmen urokrom), makanan yang dikonsumsi (seperti buah bit atau wortel), konsumsi vitamin B kompleks, serta kondisi medis seperti penyakit liver atau infeksi saluran kemih.'
    },
    {
      q: 'Berapa jumlah air minum yang ideal bagi penderita gagal ginjal?',
      a: 'Pada orang sehat, target hidrasi adalah 2.000–2.500 ml/hari. Namun bagi pasien penyakit ginjal kronis stadium lanjut (terutama yang menjalani dialisis) atau gagal jantung, asupan cairan harus dibatasi ketat sesuai anjuran nefrolog (biasanya volume urin 24 jam + 500 ml insensible loss).'
    },
    {
      q: 'Apakah skor IPSS dapat mendiagnosis kanker prostat secara pasti?',
      a: 'Tidak. IPSS adalah kuesioner terstandar untuk mengukur tingkat keparahan gejala saluran kemih bawah (LUTS) akibat pembesaran prostat, bukan alat diagnosis kanker. Diagnosis definitif memerlukan pemeriksaan colok dubur, kadar PSA darah, USG transrektal, dan biopsi jika dicurigai.'
    }
  ]
};

window.KyGUContent = KyGUContent;
