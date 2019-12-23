const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
/*const PouchDB = require("pouchdb-browser");
const fs = require('fs');*/

let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({ width: 900, height: 680 });
    mainWindow.loadURL(
        isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
    );
    console.log(electron.ipcRenderer);

    mainWindow.on("closed", async () => {
        /*PouchDB.plugin(find);
        const db = new PouchDB('Distillation');
        await this.db.createIndex({
            index: {fields: ['name', 'taxID']}
        });
        const response = await db.find({selector: {}});
        const data = Object.assign({}, response);
        console.log('data: ', data);
        fs.writeFileSync('data.json', data);
        alert('did it work?');*/
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