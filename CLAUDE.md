# CLAUDE.md - Audira Zenith Engineering Standards

## Core Operating Guidelines
1. **Architecture Synchronization**: Proyek ini menggunakan arsitektur Decoupled (React + Laravel API). Selalu pastikan sinkronisasi antara API Layer (Port 8080) dan Frontend (Port 3000). Gunakan Environment Variables (`.env`) untuk koneksi lintas kontainer.
2. **Asset Integrity**: Gambar adalah elemen krusial UX Gaming. Selalu verifikasi Symlink (`storage:link`) dan pastikan path di Database bersifat relatif. Dilarang keras melakukan hardcoding URL pada file logic/komponen.
3. **Neo-Brutalist Aesthetic**: Pertahankan identitas visual premium dengan kontras tinggi, border tebal, dan tipografi Space Grotesk/Inter. Setiap komponen baru wajib mengikuti pola desain yang sudah ada untuk menjaga konsistensi brand.
4. **Efficiency**: Hindari membaca keseluruhan file besar jika tidak diperlukan; baca blok fungsi terkait saja.
5. **Speed**: Proses harus super efisien: minim command, minim file read, langsung ke target.
6. **Modularity**: Jangan mencampur banyak fungsi/logic dalam satu file; pecah ke module kecil yang jelas tanggung jawabnya.
7. **Initiative**: Jika ada inisiatif di luar request user, **wajib minta persetujuan dulu** sebelum eksekusi.

## Documentation Standards (MANDATORY)
8. Setiap file yang dibuat atau diubah **wajib** memiliki header doc singkat di bagian paling atas file.
9. Header doc **wajib** berisi minimal:
   - **Purpose**: Tujuan file/module.
   - **Usage**: Dipakai oleh siapa (caller/route/controller).
   - **Dependencies**: Dependensi utama (service/repo/API).
   - **Main Functions**: Daftar fungsi public/utama.
   - **Side Effects**: Side effect penting (DB read/write, HTTP call, file I/O).
10. Jika file sudah punya header doc, **wajib update** agar tetap akurat setelah perubahan.
11. Dilarang menambah/mengubah logic tanpa menyesuaikan header doc.
12. Format header harus ringkas, konsisten, dan mudah dipindai cepat (maksimal efisien untuk tracing).

## Database & Query Standards (Senior DBA Level)
13. **Cost Optimization**: Rancang query dengan prinsip **minimum cost, minimum I/O, minimum lock contention**.
14. **Performance Evaluation**: Selalu evaluasi cardinality/selectivity filter, pemakaian index yang tepat, join order & strategy, serta dampak ke CPU/Memory/Disk/Network.
15. **Resource Efficiency**: Hindari pola boros resource (proses berulang, temp table tidak perlu, write berlapis, N+1 query) jika bisa diselesaikan dengan rencana query yang lebih ringkas.
16. **Strategy Selection**: Pilih strategi paling efisien sesuai konteks (upsert/merge/batch/incremental/query rewrite), bukan template tunggal.
17. **Scalability**: Pastikan aman untuk skala besar: transactional consistency tepat, locking minimal, dan tetap cepat saat data tumbuh.
18. **Justification**: Before finalizing DB-heavy changes, briefly explain efficiency rationale, trade-offs, and performance risks avoided (in English/Indonesian).

---
*Reference Technical Details in [CONVENTIONS.md](CONVENTIONS.md).*
