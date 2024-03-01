
const { setProxy, applyProxySettings } = require('../function/proxy');
const { goto } = require('../function/navigation');

// 创建菜单模板
const createMenuTemplate = (MainWindow, view) => {
    const menuTemplate = [
        {
            role: 'viewMenu',
            submenu: [
                {
                    role: 'ForceReload',
                    accelerator: 'CmdOrCtrl+Shift+R',
                },
                {
                    role: 'toggleDevTools',
                    accelerator: 'CmdOrCtrl+Shift+I',
                },
                {
                    label: 'resetZoom',
                    accelerator: 'CmdOrCtrl+0',
                    click: () => {
                        view.webContents.setZoomLevel(0);
                        zoomLevel = view.webContents.getZoomLevel();
                        console.log(`current zoom level:${zoomLevel}`);
                    }
                },
                {
                    label: 'ZoomIn',
                    accelerator: 'CommandOrControl+=', // 绑定额外的快捷键
                    click: () => {
                        zoomLevel=view.webContents.getZoomLevel();
                        view.webContents.setZoomLevel(zoomLevel + 1);
                        console.log(`current zoom level:${zoomLevel + 1}`);
                    }
                },
                {
                    label: 'ZoomOut',
                    accelerator: 'CommandOrControl+-', // 绑定额外的快捷键
                    click: () => {
                        zoomLevel=view.webContents.getZoomLevel();
                        view.webContents.setZoomLevel(zoomLevel - 1);
                        console.log(`current zoom level:${zoomLevel - 1}`);
                    }
                },
                {
                    role: 'togglefullscreen',
                    accelerator: 'F11',
                }
            ]
        },
        {   
            label: 'Navigation',
            submenu: [
                {
                    label: 'goto',
                    accelerator: 'CmdOrCtrl+G',
                    click: goto.bind(null, view)
                }
            ]
        },
        {
            label: 'Options',
            submenu: [
                {
                    label: 'Set Proxy',
                    click: setProxy.bind(null, view)
                },
                {
                    label: 'Refresh',
                    accelerator: 'CmdOrCtrl+R',
                    click: () => {
                        view.webContents.reload();
                        applyProxySettings();
                    }
                },
                {
                    label: 'Hide Menu And Title Bar',
                    // accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I', //跨平台
                    accelerator: 'Alt+H',
                    click: () => {
                        const isFrameVisible = MainWindow.isMenuBarVisible();
                        MainWindow.setMenuBarVisibility(!isFrameVisible);

                    }
                },
                {
                    label: 'Hide Window',
                    // accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I', //跨平台
                    accelerator: 'CmdOrCtrl+H',
                    click: () => {
                        MainWindow.isVisible() ? MainWindow.minimize() : MainWindow.restore();

                    }
                }
            ]
        },
        {
            label: "backward",
            accelerator: 'CommandOrControl+Backspace',
            click: () => {
                view.webContents.goBack();
            }
        },
        {
            label: "forward",
            accelerator: 'CommandOrControl+Enter',
            click: () => {
                view.webContents.goForward();
            }
        }
    ];
    return menuTemplate;
}

module.exports = {
    createMenuTemplate
};