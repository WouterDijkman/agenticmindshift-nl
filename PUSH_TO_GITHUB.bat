@echo off
echo ============================================
echo  Agentic Mindshift - GitHub Push Script
echo ============================================
echo.

cd /d "%~dp0"

echo [1/6] Verwijder git locks...
if exist ".git\index.lock" del /f ".git\index.lock" && echo       index.lock verwijderd.
if exist ".git\config.lock" del /f ".git\config.lock" && echo       config.lock verwijderd.

echo.
echo [2/6] Remote instellen...
git remote remove origin 2>nul
git remote add origin https://github.com/WouterDijkman/agenticmindshift-nl.git
echo       Remote: https://github.com/WouterDijkman/agenticmindshift-nl.git

echo.
echo [3/6] Stage alle wijzigingen...
git add -A
if %errorlevel% neq 0 (
    echo FOUT bij git add.
    pause
    exit /b 1
)

echo.
echo [4/6] Commit...
git commit -m "feat: Factum Capital reframe + scorecard redesign voor 4 momenten"
if %errorlevel% neq 0 (
    echo Niets te committen, of commit mislukt.
    pause
    exit /b 1
)

echo.
echo [5/6] Push naar GitHub...
git push -u origin master
if %errorlevel% neq 0 (
    echo Probeer ook: git push -u origin main
    git push -u origin main
)

echo.
echo [6/6] Klaar! Alles staat op GitHub.
echo https://github.com/WouterDijkman/agenticmindshift-nl
echo.
pause
