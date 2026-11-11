export const profile = {
  name: 'Yazid Habibi Tambunan',
  subtitle: 'Siswa SMA kelas 12 yang belajar membangun aplikasi dan ingin mendalami sains data.',
  tagline: 'Catatan portofolio dan eksplorasi, vol. 02',
  marqueeText: 'BELAJAR • EKSPLORASI • MEMBANGUN • SAINS DATA',
  email: 'yazid2505@student.abudzar.sch.id',
  github: 'https://github.com/YazidHabibi',
  githubLabel: 'github.com/YazidHabibi',
};

export const navItems = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'tentang', label: 'Tentang' },
  { id: 'fokus', label: 'Fokus' },
  { id: 'target', label: 'Target' },
  { id: 'proyek', label: 'Proyek' },
  { id: 'pengalaman', label: 'Pengalaman' },
  { id: 'keahlian', label: 'Keahlian' },
  { id: 'kontak', label: 'Kontak' },
];

export const heroBadges = [
  { label: 'Flutter 89%', tone: 'ice' },
  { label: 'JS 83%', tone: 'ice' },
  { label: 'Python & SQL · Sedang Dipelajari', tone: 'learning' },
];

export const terminalScript = [
  { type: 'cmd', text: 'python belajar_data.py' },
  { type: 'out', tone: 'muted', text: 'Membuka catatan latihan Yazid ...' },
  { type: 'out', tone: 'code', text: '>>> nilai = [78, 82, 90, 74]' },
  { type: 'out', tone: 'code', text: '>>> sum(nilai) / len(nilai)' },
  { type: 'out', tone: 'ok', text: '    81.0' },
  { type: 'cmd', text: 'sql latihan_select.sql' },
  { type: 'out', tone: 'code', text: 'SELECT nama, nilai FROM latihan WHERE nilai > 75;' },
  { type: 'out', tone: 'ok', text: 'OK  3 baris ditemukan' },
  { type: 'out', tone: 'muted', text: 'Masih belajar, terus mencoba setiap hari.' },
];

export const about = {
  heading: 'Mengubah Rasa Ingin Tahu Menjadi Keahlian',
  paragraphs: [
    'Perjalanan saya dimulai dari rasa penasaran: bagaimana sebuah aplikasi bekerja di balik layar. Dari situ saya belajar HTML dan CSS, lalu JavaScript, hingga membuat tampilan web sendiri.',
    'Saya lanjut mencoba Dart dan Flutter untuk membangun aplikasi mobile. Setiap proyek kecil mengajarkan hal baru: sabar, membaca pesan error dengan teliti, dan memperbaikinya pelan-pelan.',
    'Kini saya ingin menjadi Data Analyst di masa depan. Saya sedang belajar Python dan SQL karena percaya data yang dibaca dengan teliti bisa menjadi cerita yang berguna bagi banyak orang.',
  ],
  values: [
    {
      icon: 'Compass',
      title: 'Rasa Ingin Tahu',
      desc: 'Saya suka membongkar cara kerja sesuatu, lalu mencoba membuat versi saya sendiri.',
    },
    {
      icon: 'Repeat',
      title: 'Konsistensi Belajar',
      desc: 'Sedikit demi sedikit setiap hari lebih berarti daripada belajar sekali dalam semalam.',
    },
    {
      icon: 'Handshake',
      title: 'Kolaborasi',
      desc: 'Belajar bersama teman membuat ide saya lebih jelas dan lebih kuat.',
    },
  ],
};

export const focusAreas = [
  {
    icon: 'BarChart3',
    title: 'Python & Analisis Data',
    desc: 'Ingin mendalami pandas dan NumPy untuk membersihkan, menjelajahi, dan memvisualisasikan data.',
    tags: ['Ingin Dipelajari', 'Python', 'Pandas'],
    wide: true,
  },
  {
    icon: 'Database',
    title: 'SQL & Database Querying',
    desc: 'Ingin menguasai kueri SELECT, filter, agregasi, dan JOIN untuk membaca data dari basis data.',
    tags: ['Ingin Dipelajari', 'SQL'],
    wide: false,
  },
  {
    icon: 'Smartphone',
    title: 'Web & Mobile Development',
    desc: 'Sudah membangun antarmuka web dan aplikasi mobile sederhana sebagai latihan.',
    tags: ['Flutter', 'JavaScript', 'React'],
    wide: false,
  },
  {
    icon: 'Network',
    title: 'Arsitektur Sistem',
    desc: 'Memahami bagaimana tampilan, logika, dan penyimpanan data saling terhubung dalam sebuah aplikasi.',
    tags: ['Minat', 'Sistem'],
    wide: true,
  },
];

export const roadmap = [
  {
    phase: 'Saat Ini',
    title: 'Dasar Python & SQL',
    status: 'Sedang berjalan',
    desc: 'Memahami variabel, perulangan, kueri SELECT, dan cara menyaring data.',
  },
  {
    phase: 'Jangka Pendek',
    title: 'Proyek analisis data mandiri',
    status: 'Direncanakan',
    desc: 'Mengambil dataset publik, membersihkannya, lalu menuliskan temuan sederhana.',
  },
  {
    phase: 'Jangka Panjang',
    title: 'Kuliah di Sains Data atau Teknologi',
    status: 'Tujuan',
    desc: 'Melanjutkan pendidikan tinggi di bidang sains data untuk berkarier sebagai Data Analyst.',
  },
];

export const projects = [
  {
    icon: 'Wallet',
    title: 'Personal Finance Tracker',
    subtitle: 'Aplikasi pencatatan arus kas & analisis anggaran harian.',
    desc: 'Eksplorasi pembuatan aplikasi untuk mencatat transaksi harian, mengelompokkan pengeluaran, serta menghitung ringkasan statistik arus keuangan secara terstruktur.',
    tags: ['Flutter', 'Dart', 'Logika Keuangan'],
    github: 'https://github.com/YazidHabibi/FinanceTracker',
    demo: 'https://financetrack-project.vercel.app/',
    metric: 'Arus Kas & Analisis',
    accent: 'ice',
  },
  {
    icon: 'Activity',
    title: 'BMI & Health Calculator',
    subtitle: 'Kalkulator indikator massa tubuh & analisis parameter fisik.',
    desc: 'Aplikasi perhitungan Indeks Massa Tubuh (BMI) interaktif yang menerapkan logika formula kesehatan dasar untuk memberikan gambaran kondisi fisik pengguna.',
    tags: ['Flutter', 'Dart', 'Kalkulasi Data'],
    github: 'https://github.com/YazidHabibi/BMI-calculator',
    demo: 'https://bmicalculator-project.vercel.app/',
    metric: 'Parameter Kesehatan',
    accent: 'teal',
  },
  {
    icon: 'FileText',
    title: 'Personal Note & Task App',
    subtitle: 'Sistem manajemen catatan digital & pengorganisasian tugas.',
    desc: 'Proyek antarmuka digital untuk mengelola catatan harian dan daftar prioritas tugas dengan struktur state management yang bersih dan responsif.',
    tags: ['JavaScript', 'React JS', 'Manajemen Data'],
    github: 'https://github.com/YazidHabibi/NoteApp',
    metric: 'Struktur Data Ringkas',
    accent: 'slate',
  },
  {
    icon: 'AppWindow',
    title: 'Aplikasi Waktu Sholat',
    subtitle: 'Jadwal sholat harian yang akurat sesuai lokasi Anda.',
    desc: 'Aplikasi yang menampilkan waktu sholat lima waktu berdasarkan lokasi pengguna, lengkap dengan hitung mundur menuju waktu sholat berikutnya.',
    tags: ['Dart', 'Flutter', 'Proyek Sekolah'],
    github: 'https://github.com/YazidHabibi/ProjectAkhirTahun',
    metric: 'Jadwal & Hitung Mundur',
    accent: 'ice',
  },
];

export const journal = {
  title: 'Catatan Kepemimpinan Organisasi (OSIS)',
  role: 'Ketua Seksi OSIS',
  kicker: 'Catatan Singkat Pengalaman',
  paragraphs: [
    'Menjadi ketua seksi di OSIS mengajarkan saya bahwa memimpin bukan soal memberi perintah, tapi memastikan semua orang tahu apa yang sedang dikerjakan dan mengapa.',
    'Kami mengelola daftar kehadiran dan catatan kegiatan dalam satu tabel bersama. Dari situ saya belajar bahwa data yang rapi membuat keputusan jadi jauh lebih mudah, dan kebiasaan kecil seperti mencatat ulang saat ada perubahan sangat berguna.',
    'Kegiatan kami menjangkau lebih dari 100 siswa. Ketika ada kendala di lapangan, saya belajar mengurai masalah menjadi bagian-bagian kecil, lalu mencari jalan keluar bersama tim.',
  ],
  takeaways: [
    { icon: 'Users', title: 'Kerja Sama Tim', text: 'Membagi tugas dengan jelas membuat tim bergerak lebih cepat.' },
    { icon: 'FolderKanban', title: 'Pengelolaan Data', text: 'Catatan yang rapi mempermudah evaluasi setiap kegiatan.' },
    { icon: 'Puzzle', title: 'Pemecahan Masalah', text: 'Masalah besar lebih mudah dihadapi jika dipecah menjadi langkah kecil.' },
  ],
};

export const skillGroups = [
  {
    title: 'Pengembangan Antarmuka',
    items: [
      { name: 'JavaScript', level: 83 },
      { name: 'HTML / CSS', level: 80 },
      { name: 'React JS', level: 70 },
    ],
  },
  {
    title: 'Pengembangan Mobile',
    items: [{ name: 'Dart & Flutter', level: 89 }],
  },
  {
    title: 'Data & Basis Data',
    items: [
      { name: 'Python', learning: true },
      { name: 'SQL', learning: true },
    ],
  },
];

export const contact = {
  headline: 'MARI BERDISKUSI & BERKOLABORASI',
  subtext: 'Terbuka untuk diskusi proyek, belajar bersama, atau sekadar bertukar ide tentang teknologi dan data.',
};  