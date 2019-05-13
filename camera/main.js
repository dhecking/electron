const {
  app,
  BrowserWindow
} = require('electron');

let win;
let initOpacity = 1.0;
let initHeight = 720;
let initWidth = 1280;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform != 'darwin')
    app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function () {

  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

  // Create the browser window.
  win = new BrowserWindow({
    frame: false,
    width: initWidth,
    height: initHeight,
    transparent: true,
    webPreferences: {
      //nodeIntegration: false,
      //allowEval: false,
    }
  });

  // and load the index.html of the app.
  win.loadURL('file://' + __dirname + '/index.html');
  win.setResizable(false);
  win.setMenuBarVisibility(false);
  win.setMenu(null);
  win.setOpacity(initOpacity);
  //win.openDevTools();

  win.once('ready-to-show', () => {
    console.log('ready-to-show');
    win.show();
  })

  win.webContents.on('context-menu', function (e, params) {
    console.log('context-menu');
  });

  //let contents = win.webContents
  //console.log(contents);

  win.webContents.on('before-input-event', (event, input) => {
    //console.log('before-input-event');
    if (input.type == "keyDown") {
      if (input.key == "-") {
        updateOpacity(-0.1);
      } else if (input.key == "=") {
        updateOpacity(+0.1);
      } else if (input.key == "0") {
        win.setOpacity(1.0);
      }

    }

    // For example, only enable application menu keyboard shortcuts when
    // Ctrl/Cmd are down.
    //win.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)
  })

  // Emitted when the window is closed.
  win.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  function updateOpacity(amount) {
    win.setOpacity(win.getOpacity() + amount);
    //console.log('win.opacity: ' + win.getOpacity());
  }

});