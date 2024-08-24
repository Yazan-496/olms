@echo off

:: Step 1: Start XAMPP MySQL and Apache services
echo Starting XAMPP services...
"C:\xampp\xampp_start.exe"

:: Wait for XAMPP services to start
timeout /t 2 /nobreak

:: Step 2: Navigate to the Laravel project directory and run Composer
echo Starting Laravel project...
cd /d "C:\Users\Batool\Desktop\project\olms-backend"
start cmd /c "php artisan serve"

:: Wait for Laravel project to start
timeout /t 2 /nobreak

:: Step 3: Navigate to the React project directory and run npm
echo Starting React project...
cd /d "C:\Users\Batool\Desktop\olms-frontend"
start cmd /c "npm run dev"

:: Wait for React project to start
timeout /t 2 /nobreak

:: Step 4: Open the project in the browser
echo Opening project in browser...
start "" "http://localhost:5173"

:: Step 5: Close CMD window
exit
