# Pokemon Explorer

Aplikasi web untuk mengeksplorasi detail Pokémon, ability, status, evolusi, dan bentuk alternatif. Proyek ini dibangun menggunakan **React**, **TypeScript**, **Tailwind CSS**, dan **TanStack React Query**. Aplikasi ini menggunakan **PokéAPI** untuk mengambil dan menampilkan data Pokémon.

## Daftar Isi

- [Fitur](#fitur)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Persyaratan Sistem](#persyaratan-sistem)
- [Instalasi dan Menjalankan Proyek Secara Lokal](#instalasi-dan-menjalankan-proyek-secara-lokal)
- [Catatan Pendekatan dan Keputusan](#catatan-pendekatan-dan-keputusan)
- [Masalah yang Diketahui dan Perbaikan](#masalah-yang-diketahui-dan-perbaikan)

## Fitur

- Menampilkan daftar Pokémon dengan pagination.
- Pencarian Pokémon berdasarkan nama.
- Menampilkan detail Pokémon, termasuk ability, stats, evolusi, dan bentuk alternatif.
- Menyimpan Pokémon ke dalam **Pokedex** (seperti fitur keranjang).
- **Pokedex** dapat dilihat di navbar dan dilengkapi dengan fitur hapus Pokémon.

## Teknologi yang Digunakan

- **React**: Library JavaScript untuk membangun antarmuka pengguna.
- **TypeScript**: Superset dari JavaScript yang menambahkan tipe statis opsional.
- **Tailwind CSS**: Framework CSS yang memudahkan penggunaan utility-first.
- **TanStack React Query**: Library untuk pengelolaan data dan cache pengambilan data dari API.
- **PokéAPI**: API publik yang menyediakan data Pokémon.
- **Axios**: Library untuk menangani permintaan HTTP ke API.

## Persyaratan Sistem

- **Node.js** versi 16 atau lebih baru
- **npm** atau **yarn** untuk mengelola dependensi

## Instalasi dan Menjalankan Proyek Secara Lokal

Ikuti langkah-langkah berikut untuk menjalankan proyek secara lokal di komputer Anda:

1. Clone repositori:
   ```bash
   git clone https://github.com/abibinyun/pokeapi-fe.git
   ```
2. Masuk ke Direktori Proyek:
   ```bash
   cd pokeapi-fe
   ```
3. Instalasi Dependensi:
   ```bash
   npm install
   ```
   atau
   ```bash
   yarn install
   ```
4. Menjalankan Proyek:

   ```bash
   npm start
   ```

   atau

   ```bash
   yarn start
   ```

# Catatan dan Komentar

## Pendekatan dan Keputusan

- **Pendekatan Pengembangan**: Proyek ini menggunakan React dengan TypeScript untuk pengembangan front-end, yang memberikan keuntungan berupa pengetikan statis dan pemeliharaan kode yang lebih baik. Kami juga menggunakan Tailwind CSS untuk styling, yang memudahkan pengaturan desain dengan kelas utilitas.

- **Manajemen State**: Untuk manajemen state, kami menggunakan konteks React (`usePokedex`) yang memungkinkan state global seperti Pokedex untuk diakses di berbagai komponen aplikasi tanpa prop drilling yang berlebihan.

- **Pengambilan Data**: Kami menggunakan `react-query` untuk pengambilan data dari PokeAPI. Ini mempermudah manajemen status permintaan data (seperti loading dan error) dan caching, sehingga meningkatkan performa aplikasi.

- **Routing**: Kami menggunakan `@tanstack/react-router` untuk routing, yang mendukung fitur seperti nested routing dan lazy loading.

## Masalah yang Dikenal

- **Pengalaman Hover Dropdown**: Saat ini, ada masalah dengan dropdown Pokedex yang muncul saat hover. Dropdown seharusnya hanya muncul ketika hover pada ikon Pokedex, tetapi kadang muncul juga saat hover di area kosong di sekitar dropdown. Ini mungkin memerlukan perbaikan pada CSS untuk memastikan dropdown hanya muncul sesuai keinginan.

- **Pencarian Pokémon**: Fitur pencarian saat ini tidak melakukan debounce, sehingga bisa jadi tidak responsif jika pengguna mengetik dengan cepat. Implementasi debounce perlu ditambahkan untuk meningkatkan performa pencarian.

- **Integrasi API**: Meskipun integrasi API sudah berjalan, ada beberapa kasus di mana data mungkin tidak ditampilkan dengan benar, seperti informasi evolusi dan bentuk alternatif Pokémon. Ini mungkin terkait dengan cara data diambil dan diolah dari PokeAPI.

## Perbaikan dan Peningkatan

- **Debounce pada Pencarian**: Menambahkan debounce pada pencarian Pokémon untuk menghindari permintaan API yang berlebihan setiap kali pengguna mengetik. Ini dapat memperbaiki performa aplikasi dan memberikan pengalaman pengguna yang lebih baik.

- **Optimasi Dropdown**: Memperbaiki masalah dengan dropdown Pokedex sehingga hanya muncul saat hover pada ikon Pokedex, dengan memperbarui CSS dan logika tampilan.

- **Penambahan Fitur**: Dengan waktu lebih, beberapa fitur tambahan bisa dipertimbangkan, seperti sistem rating atau filter pencarian yang lebih lanjut, serta penambahan fitur uji coba otomatis (unit testing) untuk meningkatkan keandalan aplikasi.

- **Peningkatan Dokumentasi**: Menyediakan dokumentasi tambahan mengenai struktur proyek dan cara kontribusi bagi pengembang lain yang ingin berkontribusi pada proyek ini.

---
