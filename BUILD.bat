@echo off
setlocal EnableDelayedExpansion
title Wheatstone Bridge PAT1 — Build Script

:: ═══════════════════════════════════════════════════════════════════
::  Wheatstone Bridge PAT 1 — Electron Build Script
::  Orbit TVET College · MANKWE Campus · MJ MAAKE
::  Usage: Place this file INSIDE the wheatstone-bridge-electron folder
::         and double-click it (or run from Command Prompt).
:: ═══════════════════════════════════════════════════════════════════

echo.
echo  ============================================================
echo   Wheatstone Bridge PAT1 ^| Electron Build Script
echo   Orbit TVET College ^· MANKWE Campus
echo  ============================================================
echo.

:: ── Step 0: Move to the folder where this .bat lives ──────────────
cd /d "%~dp0"
echo [INFO] Working directory: %CD%
echo.

:: ── Step 1: Check Node.js is installed ────────────────────────────
echo [1/4] Checking Node.js installation...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] Node.js was NOT found on this PC.
    echo.
    echo  Please install Node.js LTS from:
    echo    https://nodejs.org/
    echo.
    echo  After installing, re-run this script.
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%v in ('node --version') do set NODE_VER=%%v
for /f "tokens=*" %%v in ('npm --version')  do set NPM_VER=%%v
echo  [OK] Node.js %NODE_VER%   npm %NPM_VER%
echo.

:: ── Step 2: Check package.json exists ─────────────────────────────
if not exist "package.json" (
    echo  [ERROR] package.json not found in %CD%
    echo  Make sure BUILD.bat is placed inside the
    echo  wheatstone-bridge-electron folder.
    echo.
    pause
    exit /b 1
)

:: ── Step 3: Install dependencies ──────────────────────────────────
echo [2/4] Installing dependencies (first run downloads ~200 MB)...
echo  This may take several minutes — please wait.
echo.
call npm install
if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] npm install failed.
    echo  Check your internet connection and try again.
    echo  If behind a school proxy, see README.md for proxy setup.
    echo.
    pause
    exit /b 1
)
echo.
echo  [OK] Dependencies installed.
echo.

:: ── Step 4: Build the Windows exe ─────────────────────────────────
echo [3/4] Building Windows executable (installer + portable)...
echo  This may take 3-8 minutes — please wait.
echo.
call npm run build:win
if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] Build failed.
    echo  Check the output above for details.
    echo.
    pause
    exit /b 1
)
echo.

:: ── Step 5: Done — open the dist folder ───────────────────────────
for /f "tokens=*" %%v in ('node -p "require('./package.json').version"') do set APP_VER=%%v
echo [4/4] Build complete!
echo.
echo  ============================================================
echo   Output files are in:  %CD%\dist\
echo.
echo   - "Wheatstone-Bridge-PAT1-Setup-!APP_VER!.exe"     ^<-- Installer
echo   - "Wheatstone-Bridge-PAT1-Portable-!APP_VER!.exe"  ^<-- Portable
echo  ============================================================
echo.

:: Open the dist folder in Windows Explorer
if exist "dist\" (
    explorer "dist\"
)

echo  Press any key to exit.
pause >nul
endlocal
