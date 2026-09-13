# Pengembangan Website Portofolio FAJRIELDEV

## Ringkasan

Website ini adalah pengembangan dari project Profil Siswa pada Tugas 1. Pada project ini saya menggunakan Next.js, React, dan Tailwind CSS.

Beberapa bagian yang ditambahkan adalah tampilan dengan Tailwind CSS, beberapa komponen agar kode lebih rapi, halaman detail proyek menggunakan slug, tampilan yang bisa menyesuaikan ukuran layar, dan halaman 404 jika halaman yang dibuka tidak tersedia.

## Fitur yang Ditambahkan

### 1. Tailwind CSS

Tailwind CSS digunakan untuk mengatur tampilan website supaya lebih menarik dan bisa menyesuaikan dengan ukuran layar.

Beberapa penggunaannya seperti:

* Mengatur layout dan jarak antar bagian.
* Mengatur warna dan tulisan.
* Membuat card dan button.
* Menambahkan efek hover dan transition.
* Membuat tampilan untuk HP dan desktop.

### 2. Komponen Baru

Beberapa bagian website dibuat menjadi komponen sendiri di dalam folder `components/`. Tujuannya supaya kode lebih mudah diatur dan komponen yang sama bisa digunakan kembali.

Contohnya:

* `Navbar.tsx` untuk bagian menu navigasi.
* `Footer.tsx` untuk bagian bawah website.
* `ProjectCard.tsx` untuk menampilkan project.
* `SectionHeader.tsx` untuk bagian judul setiap section.

### 3. Dynamic Route Proyek

Pada website ini saya juga menambahkan halaman detail untuk setiap project menggunakan dynamic route `[slug]`.

Struktur filenya:

```text
src/app/proyek/[slug]/page.tsx
```

Setiap project mempunyai slug yang digunakan pada URL. Jadi, ketika slug yang dipilih sesuai dengan data project, halaman detail project akan ditampilkan.

Contohnya:

```text
localhost:3000/proyek/nextjs-v2
localhost:3000/proyek/sistem-iventaris
```

Di halaman detail tersebut terdapat beberapa informasi seperti judul project, gambar, deskripsi, teknologi yang digunakan, dan link project.

### 4. Halaman 404

Saya juga menambahkan halaman 404 untuk menangani alamat atau slug yang tidak ditemukan.

Misalnya ketika membuka:

```text
localhost:3000/proyek/999
```

Jika project dengan slug tersebut tidak ada, maka website akan menampilkan halaman **404 Not Found**.

## Kesimpulan

Dari pengembangan ini, website Profil Siswa menjadi lebih rapi dan menarik. Website juga sudah bisa menyesuaikan tampilan di berbagai ukuran layar. Selain itu, adanya dynamic route membuat setiap project bisa memiliki halaman detail sendiri berdasarkan slug yang digunakan.
