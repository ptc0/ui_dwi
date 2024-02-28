//
// File: main.js
// Creator: ptc0
//
// Description: electron side off the application
//

const devActive = false // TODO: implement dev tools

const path = require('path');
const { app, BrowserView, BrowserWindow } = require("electron");

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: "ptc0's discord webhook interactor",
        width: 500,
        height: 600,
        maximizable: false,
    });

    mainWindow.loadFile(path.join(__dirname, './app/index.html'));
    mainWindow.setResizable(false)
}

app.whenReady().then(() => {
    createMainWindow()
    
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow()
        }
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})