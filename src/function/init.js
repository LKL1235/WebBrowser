const { BrowserWindow, BrowserView, Menu, globalShortcut } = require('electron');
const path = require('node:path')
const { createMenuTemplate } = require('../component/menu');
const { goto } = require('./navigation');
const { setProxy } = require('./proxy');

function createWindow( withTitle ) {
    return new Promise((resolve, reject) => {
        const MainWindow = new BrowserWindow({
            width: 400,
            height: 300,
            webPreferences: {
                nodeIntegration: true,  // 允许在渲染进程中使用 Node.js 功能（可选）
                nodeIntegrationInSubFrames: true,
                preload: path.join(path.dirname(__dirname), 'preload.js')
            },
            // frame: true, // 显示标题栏
            frame: withTitle, // 隐藏标题栏
            // titleBarStyle: 'hidden', // 隐藏标题栏
            // titleBarOverlay: false, // 使窗口标题栏覆盖整个窗口
        });
        win = MainWindow;
        resolve(MainWindow);
        // 可选：打开 DevTools 调试工具
        // MainWindow.webContents.openDevTools();
        // reject('Window failed to create');
    });
}

function createBrowserView(window) {
    return new Promise((resolve, reject) => {
        view = new BrowserView();
        // 自适应大小
        view.setAutoResize({ width: true, height: true });
        // 默认大小
        view.setBounds({ x: 0, y: 30, width: 400, height: 270 });
        // 导航变化事件，用于更新地址栏
        view.webContents.on('did-navigate', (event, url) => {
            window.webContents.send('url-change', url);
            console.log(`did-navigate: ${url}`);
        });
        // 页内导航变化事件，用于更新地址栏
        view.webContents.on('did-navigate-in-page', (event, url) => {
            window.webContents.send('url-change', url);
            console.log(`did-navigate-in-page: ${url}`);
        });
        resolve(view);
    })

}

function createMenu(MainWindow, view) {
    menuTemplate = createMenuTemplate(MainWindow, view);

    // 创建菜单对象
    const menu = Menu.buildFromTemplate(menuTemplate);

    // 将菜单添加到应用程序的菜单栏
    Menu.setApplicationMenu(menu);
}

function keyBind(window, browserView) {

    globalShortcut.register("CommandOrControl+G", () => {
        goto(window);
    });
    globalShortcut.register("alt+H", () => {
        const isFrameVisible = window.isMenuBarVisible();
        window.setMenuBarVisibility(!isFrameVisible);
        bounds = browserView.getBounds();
        console.log(`BrowserView: ${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`);
        if (bounds.y != 0) {
            browserView.setBounds({ x: 0, y: 0, width: bounds.width, height: bounds.height+30 })
        }else{
            browserView.setBounds({ x: 0, y: 30, width: bounds.width, height: bounds.height-30 })
        }
    });
    globalShortcut.register("CommandOrControl+H", () => {
        window.isVisible() ? window.minimize() : window.restore();
    });
    globalShortcut.register("CommandOrControl+Backspace", () => {
        browserView.webContents.goBack();
    });
    globalShortcut.register("CommandOrControl+Enter", () => {
        browserView.webContents.goForward();
    });
    globalShortcut.register("CommandOrControl+R", () => {
        browserView.webContents.reload();
    });
    globalShortcut.register("CommandOrControl+Shift+R", () => {
        window.reload();
    });
    globalShortcut.register("CommandOrControl+P", () => {
        setProxy(browserView);
    });
}

module.exports = {
    createWindow,
    createBrowserView,
    createMenu,
    keyBind
};