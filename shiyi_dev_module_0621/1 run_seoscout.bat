@echo off
chcp 65001 >nul
echo ========================================
echo  Haze Seas SEO 文章生成
echo ========================================
echo.

ssh converter "cd /home/seo/seoscout-main && export PATH=\$HOME/.local/bin:\$PATH && seoscout run --keywords 4keywords_hazeseas.json"

echo.
echo ========================================
echo 运行完成
echo ========================================
pause
