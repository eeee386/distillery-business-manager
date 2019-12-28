const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const fs = require("fs");
const ipc = require('electron').ipcMain;


let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({ width: 900, height: 680 });
    mainWindow.loadURL(
        isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.webContents.openDevTools();
    const fun = () => {
        console.log('open');
        const data = fs.readFileSync(`./data.json`, 'utf-8');
        console.log(data);
        mainWindow.webContents.executeJavaScript(`
        alert(${JSON.stringify(data)});
        window.rehydratedStore = JSON.parse(${JSON.stringify(data)});
    `, true)
        .then((result) => console.log('restored: ', result))
        .catch((err) => console.log(err));
    }
    fun();
    mainWindow.on("close", (e) =>{
        mainWindow.webContents.executeJavaScript(`
            window.store.getState();
        `, true)
        .then((result) => {
            fs.writeFileSync(`./data.json`, JSON.stringify(result.tables.tables), {flag: 'w'});  
        }).catch((e) => console.log(e));
    });
    mainWindow.on("closed", async () => {
        mainWindow = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});