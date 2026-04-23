@echo off
title AUDIRA ZENITH - PRODUCTION SYNC
color 0B
cls

echo ============================================================
echo      AUDIRA ZENITH COMMAND CENTER - PRODUCTION SYNC
echo ============================================================
echo.
echo [1] Checking Local Environment...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python tidak ditemukan! Harap install Python terlebih dahulu.
    pause
    exit /b
)

echo [2] Initiating Deployment to 192.168.100.156...
echo ------------------------------------------------------------
python deploy.py
echo ------------------------------------------------------------

if %errorlevel% equ 0 (
    echo.
    echo [SUCCESS] Project telah berhasil di-push ke server produksi!
    echo [SUCCESS] Akses di: http://192.168.100.156:3000
    echo.
) else (
    echo.
    echo [FAILED] Terjadi kesalahan saat deployment.
    echo Periksa log di atas untuk detail error.
    echo.
)

echo ============================================================
echo Tekan tombol apapun untuk keluar...
pause >nul
