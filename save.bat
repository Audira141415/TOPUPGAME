@echo off
cls
echo ===========================================
echo    AUDIRA ZENITH - AUTO GIT PUSH
echo ===========================================
echo.

:: Cek apakah sudah ada folder .git
if not exist .git (
    echo [SYSTEM] Initializing Git Repository...
    git init
    git remote add origin https://github.com/Audira141415/TOPUPGAME.git
)

set /p msg="Masukkan Pesan Commit (Contoh: Update Dashboard): "

if "%msg%"=="" (
    set "msg=Update Project Topup Game"
)

echo.
echo [1/3] Menambahkan file...
git add .

echo [2/3] Melakukan Commit...
git commit -m "%msg%"

echo [3/3] Melakukan Push ke GitHub...
git branch -M main
git push -u origin main

echo.
echo ===========================================
echo    BERHASIL! KODE SUDAH TER-PUSH KE CLOUD
echo ===========================================
pause
