
const { app, ipcMain, BrowserView } = require('electron');
const path = require('node:path')
const { createWindow, createBrowserView, createMenu, keyBind } = require('./function/init')

app.whenReady().then(() => {
    const args = process.argv.slice(2);
    let withTitle = false;
    if (args.includes('--with-title')){
        withTitle = true;
    }
    let browserView = null;
    // 监听渲染进程的 goto 事件
    ipcMain.handle('goto', (event, url) => {
        console.log(`goto: ${url}`);
        browserView.webContents.loadURL(url)
            .then(() => {
                console.log(`goto ${url} Success`);
            }).catch((err) => {
                console.log(`goto error: ${err}`);
            })
    });
    // 监听渲染进程的 backward 事件
    ipcMain.handle('backward', (event) => {
        console.log('backward');
        browserView.webContents.goBack();
    });
    // 监听渲染进程的 forward 事件
    ipcMain.handle('forward', (event) => {
        console.log('forward');
        browserView.webContents.goForward();
    });
    // 监听渲染进程的 reload 事件
    ipcMain.handle('reload', (event) => {
        console.log('reload');
        browserView.webContents.reload();
    });

    createWindow( withTitle )
        .then((window) => {
            // 创建 BrowserView, 在window创建之后
            createBrowserView(window)
                .then((view) => {
                    window.setBrowserView(view);
                    // 创建菜单, 在view创建之后
                    createMenu(window, view);
                    window.loadFile(path.join(__dirname, 'component', 'address-bar.html'));
                    browserView = view;
                    console.log(`BrowserView ${view.getBounds().height}`);
                    console.log("whenReady: Ready");
                    keyBind(window, browserView);
                })

        })
        .catch((err) => {
            console.log("whenReady: " + err);
        });
});

