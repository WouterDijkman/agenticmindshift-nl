@echo off
cd /d "C:\Users\annik\Downloads\agenticmindshift-nl"
if exist ".git\index.lock" (
    del ".git\index.lock"
    echo Deleted index.lock
)
git add -A
git commit -m "Fix: clip-paths verwijderd, section overflow fixed, mobile CTA full-width"
echo.
echo === Starting dev server ===
npm run dev
