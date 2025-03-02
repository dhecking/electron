const {
  app,
  BrowserWindow
} = require('electron');

let mainWindow;

app.on('window-all-closed', () => {
  if (process.platform != 'darwin')
    app.quit();
});

app.setPath("userData", __dirname + "/saved_recordings");

app.on('ready', () => {

  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});