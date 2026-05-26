@echo off
echo Killing Node processes on port 3000/3001...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000 " ^| findstr "LISTENING"') do taskkill /F /PID %%a 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3001 " ^| findstr "LISTENING"') do taskkill /F /PID %%a 2>nul
timeout /t 2 /nobreak >nul

echo Clearing .next cache...
if exist .next rmdir /s /q .next
echo Cache cleared.

echo Starting dev server...
set PATH=C:\nvm4w\nodejs;%PATH%
cd /d "C:\Users\annik\Downloads\agenticmindshift-nl"
npm run dev
