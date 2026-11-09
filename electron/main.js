const { app, BrowserWindow, Menu, dialog, shell } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

let win = null;

function createWindow() {
  Menu.setApplicationMenu(null);
  win = new BrowserWindow({
    width: 480,
    height: 860,
    minWidth: 360,
    minHeight: 560,
    backgroundColor: '#EEF1F8',
    icon: path.join(__dirname, '..', 'build', 'icon.png'),
    autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, sandbox: true }
  });
  win.loadFile(path.join(__dirname, '..', 'web', 'index.html'));
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

function setupUpdates() {
  if (!app.isPackaged) return;
  autoUpdater.autoDownload = true;
  autoUpdater.on('update-downloaded', (info) => {
    dialog
      .showMessageBox(win, {
        type: 'info',
        buttons: ['Reiniciar agora', 'Depois'],
        defaultId: 0,
        cancelId: 1,
        title: 'Atualização pronta',
        message: 'A versão ' + info.version + ' do Nekolingo está pronta.',
        detail: 'Reinicie o app para usar a versão nova. Seu progresso fica salvo.'
      })
      .then((r) => {
        if (r.response === 0) autoUpdater.quitAndInstall();
      });
  });
  autoUpdater.on('error', () => {});
  const check = () => autoUpdater.checkForUpdates().catch(() => {});
  check();
  setInterval(check, 4 * 60 * 60 * 1000);
}

app.on('second-instance', () => {
  if (win) {
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.whenReady().then(() => {
  createWindow();
  setupUpdates();
});

app.on('window-all-closed', () => app.quit());
