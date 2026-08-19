B-SSCOS STATIC FRONTEND
======================

Cara buka:
1. Pastikan semua fail berada di dalam folder yang sama.
2. Buka index.html menggunakan pelayar web.

Kandungan kemas kini:
- Lupa kata laluan dan log keluar pada halaman Login.
- Tiada butang log keluar pada halaman Pesanan.
- Chatbot yang sama pada semua halaman.
- Chatbot dinamakan BukhariBot dan merangkumi pesanan, harga, stok,
  pembatalan, waktu operasi, lokasi, pembayaran dan masalah login.
- Semua item Pesanan dipaparkan pada halaman Stok kecuali Saham Koperasi.
- Paparan saiz terperinci untuk T-Shirt PJ, Seluar PJ, T-Shirt Rasmi dan
  T-Shirt Rumah Sukan.
- Kata laluan pengguna: minimum 6 aksara, huruf besar, huruf kecil dan simbol.
- Indikator kekuatan kata laluan dengan tanda hijau bagi setiap syarat.
- Ciri troli global dan Add to Cart telah dibuang. Pengguna membuat pilihan
  terus pada halaman Pesanan dan menyemak Ringkasan Pesanan di halaman sama.
- Draf pesanan disimpan automatik dalam localStorage.
- Pilihan Bahasa Melayu dan English menyeluruh pada semua halaman. Navbar,
  kandungan, borang, senarai item, stok, troli, sejarah pesanan, mesej sistem,
  FAQ dan BukhariBot akan bertukar mengikut bahasa yang dipilih.
- Pautan Facebook dan TikTok dikemas kini; ikon Instagram dibuang.

PENTING:
Versi ini ialah frontend statik sahaja. Akaun, sesi login dan reset kata laluan
disimpan dalam localStorage pelayar. Tiada database, API atau backend digunakan.
Chatbot memberikan jawapan automatik yang disimpan dalam bsscos-chatbot.js dan
tidak menghantar pertanyaan pengguna ke mana-mana server.
Fungsi troli, bahasa dan indikator kata laluan berada dalam bsscos-ui.js serta
bsscos-ui.css. Pastikan semua fail ini kekal dalam folder yang sama.
