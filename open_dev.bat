@echo off
cd /d "C:\Users\annik\Downloads\agenticmindshift-nl"
start "AgenticMindshift Dev" cmd /k "npm run dev"
timeout /t 5 /nobreak >nul
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" "http://localhost:3000"
