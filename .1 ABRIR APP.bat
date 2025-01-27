@echo off
REM Abrir Windows Terminal con dos pestañas para ejecutar los comandos

REM Primera pestaña: Ejecutar ionic serve en el directorio correspondiente
start wt.exe new-tab -p "Windows PowerShell" -d "D:\Proyecto TAV Ionic Angular\Ayudantes" powershell -NoExit -Command "ionic serve"

REM Segunda pestaña: Ejecutar node server.js en el directorio correspondiente
start wt.exe new-tab -p "Windows PowerShell" -d "D:\Proyecto TAV Ionic Angular\Ayudantes\dbcasa" powershell -NoExit -Command "node server.js"
