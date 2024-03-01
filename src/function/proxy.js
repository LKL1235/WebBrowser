
let proxyServer = null;

const prompt = require('electron-prompt');
const { session } = require('electron');

function setProxy(view) {
    // 弹出对话框获取代理服务器地址
    prompt({
        title: 'Set Proxy',
        label: 'Enter proxy server address:',
        value: '',
        inputAttrs: {
            type: 'text'
        },
        type: 'input'
    }).then((result) => {
        if (result === null) {
            // 用户点击取消按钮
            return;
        }

        proxyServer = result;
        view.webContents.reload();
        // 设置代理
        session.defaultSession.setProxy({
            proxyRules: proxyServer,
            proxyBypassRules: 'localhost'
        }, () => {
            console.log('Proxy set:', proxyServer);
        });
    }).catch((err) => {
        console.error(err);
    });
}

function applyProxySettings() {
    if (proxyServer) {
        session.defaultSession.setProxy({
            proxyRules: proxyServer,
            proxyBypassRules: 'localhost'
        }, () => {
            console.log('Proxy set:', proxyServer);
        });
    }
}


module.exports = {
    setProxy,
    applyProxySettings
};