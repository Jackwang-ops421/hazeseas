@echo off
chcp 65001 >nul
echo 正在从服务器下载 haze_seas 文章...

set DEST=%USERPROFILE%\Desktop\haze_seas_output

if not exist "%DEST%" mkdir "%DEST%"

scp -r converter:/home/seo/seoscout-main/output/haze_seas "%DEST%"

if %errorlevel% equ 0 (
    echo ✅ 下载完成: %DEST%
) else (
    echo ❌ 下载失败
)

pause
