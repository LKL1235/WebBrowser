const { contextBridge, ipcRenderer } = require('electron/renderer');

// 安全地注入 api 对象给渲染进程使用
contextBridge.exposeInMainWorld('URLBar', {
    goto: (url) => {
        ipcRenderer.invoke('goto', url);
    },
    backward: () => {
        ipcRenderer.invoke('backward');
    },
    forward: () => {
        ipcRenderer.invoke('forward');
    },
    reload: () => {
        ipcRenderer.invoke('reload');
    },
    // 监听 url 变化
    onUrlChange: (callback) => {
        ipcRenderer.on('url-change', (event, url) => callback(url));
    }
});