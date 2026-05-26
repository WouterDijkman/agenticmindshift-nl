@echo off
echo Killing existing dev server...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000') do taskkill /f /pid %%a 2>nul
timeout /t 1 /nobreak >nul
echo Starting Next.js dev server...
cd /d "C:\Users\annik\Downloads\agenticmindshift-nl"
npm run dev
