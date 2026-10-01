/**
 * Preload script — bridges renderer ↔ main process safely.
 * Exposes only a minimal API via contextBridge.
 */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  /** Trigger the native print dialog from the renderer */
  print: () => ipcRenderer.send('print-page'),
});
