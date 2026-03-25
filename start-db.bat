@echo off
echo Starting MongoDB...
start "MongoDB" "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath "C:\data\db" --logpath "C:\data\log\mongod.log" --fork
timeout /t 5 /nobreak > nul
echo MongoDB started. Running setup script...
node setup-db.js
pause