@echo off
echo ========================================
echo    INVENTORY MANAGEMENT SYSTEM
echo ========================================
echo.

echo [1/4] Checking MongoDB...
"C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ MongoDB not found! Please install MongoDB first.
    pause
    exit /b 1
)
echo ✅ MongoDB found

echo.
echo [2/4] Creating data directory...
if not exist "C:\data\db" mkdir "C:\data\db"
if not exist "C:\data\log" mkdir "C:\data\log"
echo ✅ Data directory ready

echo.
echo [3/4] Starting MongoDB...
start "MongoDB_Server" "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath "C:\data\db" --logpath "C:\data\log\mongod.log"
timeout /t 3 /nobreak >nul
echo ✅ MongoDB started

echo.
echo [4/4] Setting up database...
node create-collection.js
if %errorlevel% neq 0 (
    echo ❌ Database setup failed!
    pause
    exit /b 1
)
echo ✅ Database ready

echo.
echo ========================================
echo 🎉 SYSTEM READY!
echo ========================================
echo.
echo 📋 Next steps:
echo 1. Open Postman
echo 2. Import: Inventory_API.postman_collection.json
echo 3. Start testing APIs at: http://localhost:3000
echo.
echo 📖 See POSTMAN_GUIDE.md for detailed instructions
echo.
echo Press any key to start the server...
pause >nul

echo.
echo 🚀 Starting Node.js server...
npm start