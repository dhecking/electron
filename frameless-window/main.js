const {
  app,
  BrowserWindow
} = require('electron');

let win;

app.on('window-all-closed', function () {
  console.log('app.window-all-closed');
  app.quit();
});

app.on('ready', function () {

  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

  win = new BrowserWindow({
    frame: false,
    width: 360,
    height: 300,
    transparent: true,
    webPreferences: {
      //allowEval: false,
      nodeIntegration: true
    }
  });

  win.loadURL('file://' + __dirname + '/index.html');
  win.openDevTools();

  win.on('closed', function () {
    console.log('win.closed');
    win = null;
  });
});