# CONVENTIONS.md - Technical Standards for Audira Zenith

## 1. Coding Standards
- **Frontend**: React (Functional Components), TypeScript (Strict), Tailwind CSS.
- **Backend**: Laravel 11+, PSR-12, Strict Typing.
- **Naming**: 
    - Variables/Functions: `camelCase`
    - Classes/Components: `PascalCase`
    - Files: Match Component/Class Name.
    - DB Columns: `snake_case`.

## 2. Infrastructure & Port Management
- **Nginx Proxy**: Berjalan di port `8080`. Digunakan untuk API (`/api`) dan Storage (`/storage`).
- **Frontend Dev**: Berjalan di port `3000` (host) -> `5173` (container).
- **Backend URL**: Selalu gunakan `http://localhost:8080`.
- **Storage URL**: Selalu gunakan `http://localhost:8080/storage`.

## 3. Asset & Storage Rules
- Gambar tidak boleh di-hardcode ke folder `public/` frontend.
- Semua gambar dinamis harus diambil dari Backend Storage.
- Gunakan konstanta `STORAGE_URL` dari `services/api.ts`.
- Format gambar disarankan `.png` atau `.webp` dengan ukuran optimal (max 500KB untuk logo, 2MB untuk banner).

## 4. Git Standards
- **Conventional Commits**:
    - `feat:` Fitur baru.
    - `fix:` Perbaikan bug (termasuk perbaikan path gambar).
    - `docs:` Perubahan dokumentasi.
    - `refactor:` Perubahan kode tanpa merubah fungsi.
- **Branching**: `main` adalah branch utama. Gunakan feature branch jika mengerjakan fitur besar.

## 5. Security & QA Standards (Engineering POWERFUL)
- **Zero Trust**: Jangan pernah percaya pada input dari user/frontend. Validasi semua di Backend.
- **Audit Logs**: Setiap perubahan status pesanan wajib dicatat siapa yang mengubah dan kapan.
- **Error Handling**: Jangan pernah menampilkan error database asli ke user (Generic error messages only).

## 6. Marketing & UX Standards (Marketing/Product Skills)
- **Visual Aesthetic**: Gunakan standar *Neo-Brutalist* yang berani, tapi tetap memperhatikan keterbacaan (Accessibility).
- **SEO Pods**: Setiap halaman GameDetail wajib memiliki metadata SEO: `og:title`, `og:description`, dan `og:image`.
- **Conversion focus**: Tombol "Order Now" harus menonjol dan memiliki feedback visual saat di-klik (Micro-interactions).

## 7. Deployment & Compliance Checklist
- [ ] `./save.bat` dijalankan setelah setiap milestone.
- [ ] Scan kerentanan sederhana pada dependensi (`npm audit` / `composer audit`).
- [ ] Pastikan tidak ada kredensial API yang bocor ke `.env.example`.
- [ ] `storage:link` sudah terverifikasi aktif.

---
*Dibuat berdasarkan standar claude-skills-main.*
