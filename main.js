const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false,
    transparent: true,
  })

  win.loadFile('index.html')

  win.webContents.on('zoom-changed', (event, zoomDirection) => {
    let zoom = win.webContents.getZoomFactor();

    switch (zoomDirection) {
      case 'in':
        win.webContents.zoomFactor = zoom + 0.2;
        break;
      case 'out':
        win.webContents.zoomFactor = zoom - 0.2;
        break;
    }
  })
}

app.whenReady().then(() => setTimeout(createWindow, 1000))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})