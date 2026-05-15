@echo off
cd /d "C:\Users\annik\Downloads\agenticmindshift-nl"
echo Starting... > dev_log.txt
echo PATH: %PATH% >> dev_log.txt
where npm >> dev_log.txt 2>&1
npm run dev >> dev_log.txt 2>&1
echo DONE >> dev_log.txt
pause
