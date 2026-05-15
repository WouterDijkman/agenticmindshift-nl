@echo off
echo Verwijder git locks...
del /f "%~dp0.git\index.lock" 2>nul
del /f "%~dp0.git\HEAD.lock" 2>nul
del /f "%~dp0.git\refs\heads\master.lock" 2>nul
cd /d "%~dp0"
echo Commit layout fixes...
git add -A
git commit -m "fix: layout fixes — remove clip-paths, fix text overlap, correct cream palette, responsive nav"
git log --oneline -3
echo.
echo Klaar! Druk op een toets om te sluiten.
pause
