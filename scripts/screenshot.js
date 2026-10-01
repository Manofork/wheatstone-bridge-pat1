/**
 * Captures the main window to docs/screenshots/main-window.png.
 * Usage: npm run screenshot  (needs internet for MathJax and fonts)
 */
const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

app.whenReady().then(async () => {
  const win = new BrowserWindow({
    width: 1360,
    height: 920,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, '..', 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  await win.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));
  await new Promise(r => setTimeout(r, 5000)); // allow MathJax and fonts to settle
  const image = await win.webContents.capturePage();
  const outDir = path.join(__dirname, '..', 'docs', 'screenshots');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'main-window.png'), image.toPNG());
  console.log('Saved docs/screenshots/main-window.png');
  app.quit();
});
