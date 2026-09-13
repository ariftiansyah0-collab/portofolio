# Pengembangan Website Portofolio FAJRIELDEV

## Ringkasan

Website ini merupakan pengembangan lanjutan dari project Profil Siswa pada Tugas 1 menggunakan **Next.js, React, dan Tailwind CSS**.

Pada pengembangan ini ditambahkan styling menggunakan Tailwind CSS, beberapa komponen baru, halaman detail proyek menggunakan dynamic route berbasis **slug**, tampilan responsif, serta halaman 404 untuk menangani URL yang tidak ditemukan.

## Fitur yang Ditambahkan

### 1. Tailwind CSS

Tailwind CSS digunakan untuk membuat tampilan website lebih modern dan responsif.

Penerapannya meliputi:

* Layout dan spacing.
* Warna dan typography.
* Card dan button.
* Hover dan transition.
* Responsive design untuk smartphone dan desktop.

### 2. Komponen Baru

Beberapa bagian website dibuat menjadi komponen di dalam folder `components/` agar kode lebih terstruktur dan dapat digunakan kembali.

Contoh komponen:

* `Navbar.tsx` — navigasi website.
* `Footer.tsx` — bagian footer.
* `ProjectCard.tsx` — menampilkan kartu proyek.
* `SectionHeader.tsx` — menampilkan judul section.

### 3. Dynamic Route Proyek

Ditambahkan halaman detail proyek menggunakan **dynamic route** dengan parameter `[slug]`.

Struktur file:

```text
src/app/proyek/[slug]/page.tsx
```

Setiap proyek memiliki slug yang digunakan sebagai URL halaman detail.

Contoh:

```text
localhost:3000/proyek/nextjs-v2
localhost:3000/proyek/sistem-iventaris
```

Slug digunakan untuk mencari data proyek yang sesuai dan menampilkan informasi seperti judul, gambar, deskripsi, teknologi, serta link project.

### 4. Halaman 404

Jika pengguna mengakses slug proyek yang tidak tersedia, website akan menampilkan halaman **404 Not Found**.

Contoh pengujian:

```text
localhost:3000/proyek/999
```

### 5. Pengujian Responsif

Website diuji menggunakan **Chrome DevTools** pada ukuran layar smartphone **375px** untuk memastikan tampilan tetap rapi dan responsif pada perangkat mobile.

**Screenshot pengujian:**

```text
![Responsive 375px](./public/screenshots/responsive-375.png)
```

### 6. Pengujian 404

Pengujian dilakukan dengan mengakses URL proyek yang tidak tersedia:

```text
localhost:3000/proyek/999
```

Hasil pengujian menampilkan halaman 404.

**Screenshot pengujian:**

```text
![404 Project](./public/screenshots/404.png)
```

## Kesimpulan

Pengembangan ini membuat website Profil Siswa menjadi lebih **modern, responsif, terstruktur**, serta memiliki halaman detail proyek yang dinamis menggunakan **slug pada Next.js**.
