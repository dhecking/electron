const {
  app,
  BrowserWindow
} = require('electron');
const path = require('path');

let win;

app.on('window-all-closed', function () {
  if (process.platform != 'darwin')
    app.quit();
});

let ppapi_flash_path;

// Specify flash path.
// On Windows, it might be /path/to/pepflashplayer.dll
// On OS X, /path/to/PepperFlashPlayer.plugin
// On Linux, /path/to/libpepflashplayer.so
if (process.platform == 'win32') {
  ppapi_flash_path = path.join(__dirname, 'lib/pepflashplayer.dll');
} else if (process.platform == 'linux') {
  ppapi_flash_path = path.join(__dirname, 'libpepflashplayer.so');
} else if (process.platform == 'darwin') {
  ppapi_flash_path = path.join(__dirname, 'PepperFlashPlayer.plugin');
}

app.commandLine.appendSwitch('ppapi-flash-path', ppapi_flash_path);
console.log(ppapi_flash_path);

// Specify flash version, for example, v18.0.0.203
app.commandLine.appendSwitch('ppapi-flash-version', '18.0.0.203');

app.on('ready', function () {
  win = new BrowserWindow({
    'width': 800,
    'height': 600,
    'webPreferences': {
      'plugins': true
    }
  });
  win.loadURL('http://www.adobe.com/software/flash/about/');
  win.openDevTools();
});