@echo off
cd /d "C:\Users\annik\Downloads\agenticmindshift-nl"
copy /b "app\globals.css" +,, "app\globals.css" >nul 2>&1
copy /b "app\layout.tsx" +,, "app\layout.tsx" >nul 2>&1
copy /b "app\(marketing)\page.tsx" +,, "app\(marketing)\page.tsx" >nul 2>&1
copy /b "app\(marketing)\layout.tsx" +,, "app\(marketing)\layout.tsx" >nul 2>&1
copy /b "components\ScrollRevealInit.tsx" +,, "components\ScrollRevealInit.tsx" >nul 2>&1
echo Files touched - Turbopack watcher triggered.
timeout /t 2 /nobreak >nul
