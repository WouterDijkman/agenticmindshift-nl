@echo off
echo ============================================
echo  Agentic Mindshift - GitHub Push Script
echo ============================================
echo.

cd /d "%~dp0"

echo [1/4] Verwijder git locks...
if exist ".git\index.lock" del /f ".git\index.lock"
if exist ".git\config.lock" del /f ".git\config.lock"

echo.
echo [2/4] Remote instellen...
git remote remove origin 2>nul
git remote add origin https://github.com/WouterDijkman/agenticmindshift-nl.git
echo       Remote: https://github.com/WouterDijkman/agenticmindshift-nl.git

echo.
echo [3/4] Stage + commit (als er iets nieuws is)...
git add -A
git commit -m "feat: Factum Capital reframe + scorecard redesign voor 4 momenten" 2>nul
echo       (niets te committen = al gedaan, doorgaan naar push)

echo.
echo [4/4] Push naar GitHub...
git push -u origin master
if %errorlevel% neq 0 (
    echo.
    echo Probeer ook main branch...
    git push -u origin main
)

echo.
echo ============================================
echo  Klaar! Check: https://github.com/WouterDijkman/agenticmindshift-nl
echo ============================================
echo.
pause
