/**
 * Wheatstone Bridge PAT 1 — Electron Main Process
 * Orbit TVET College · MANKWE Campus · Electrical Principles & Practice L4
 * Designed & Developed by MJ MAAKE
 */

const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1360,
    height: 920,
    minWidth: 900,
    minHeight: 650,
    title: 'Wheatstone Bridge PAT 1 — Electrical Principles & Practice L4',
    backgroundColor: '#f3efe5',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  // ── Application Menu ──────────────────────────────────────────────
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Print / Save as PDF…',
          accelerator: 'CmdOrCtrl+P',
          click: () => {
            mainWindow.webContents.print(
              { silent: false, printBackground: true },
              (success, errorType) => {
                if (!success && errorType !== 'cancelled') {
                  dialog.showErrorBox('Print Error', `Could not print: ${errorType}`);
                }
              }
            );
          }
        },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Alt+F4',
          click: () => app.quit()
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'zoomIn',    label: 'Zoom In',    accelerator: 'CmdOrCtrl+=' },
        { role: 'zoomOut',   label: 'Zoom Out',   accelerator: 'CmdOrCtrl+-' },
        { role: 'resetZoom', label: 'Reset Zoom', accelerator: 'CmdOrCtrl+0' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Toggle Full Screen' },
        { type: 'separator' },
        {
          label: 'Reload Page',
          accelerator: 'F5',
          click: () => mainWindow.reload()
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About This Tool',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About',
              message: 'Wheatstone Bridge PAT 1 Calculator',
              detail:
                'Electrical Principles & Practice · Level 4\n\n' +
                'Designed & Developed by MJ MAAKE\n' +
                'Orbit TVET College — MANKWE Campus\n\n' +
                'Email: manoke@hotmail.co.za\n\n' +
                'Based on: DHET – Reviewed Practical Assessment Tasks\n' +
                'for Vocational Subjects – ICASS and ISAT\n' +
                'Lecturer\'s Guide (01 January 2024), pp. 8–15.',
              buttons: ['OK']
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// ── IPC: print triggered from renderer button ──────────────────────
ipcMain.on('print-page', () => {
  if (mainWindow) {
    mainWindow.webContents.print(
      { silent: false, printBackground: true },
      (success, errorType) => {
        if (!success && errorType !== 'cancelled') {
          dialog.showErrorBox('Print Error', `Could not print: ${errorType}`);
        }
      }
    );
  }
});

// ── App lifecycle ──────────────────────────────────────────────────
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  app.quit();
});
