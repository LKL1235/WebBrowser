const addressInput = document.getElementById('address-input'); // URL 输入框
const loadButton = document.getElementById('load-button'); // 加载按钮
const backwardButton = document.getElementById('backward-button'); // 后退按钮
const forwardButton = document.getElementById('forward-button'); // 前进按钮
const reloadButton = document.getElementById('reload-button'); // 刷新按钮

loadButton.addEventListener('click', () => {
    let url = addressInput.value;
    if (url) {
        console.log(url)
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'http://' + url;
        }
        window.URLBar.goto(url); // 使用 Electron 的 ipcRenderer 发送消息给主进程，以加载指定网址
    }
});

addressInput.addEventListener('keydown', function (event) {
    console.log(event.key)
    if (event.key === 'Enter') {
        // 在这里执行按下 Enter 键后的操作
        let url = addressInput.value;
        if (url) {
            console.log(url)
            if (!url.startsWith('http://') || !url.startsWith('https://')) {
                url = 'http://' + url;
            }
            window.URLBar.goto(url); // 使用 Electron 的 ipcRenderer 发送消息给主进程，以加载指定网址
        }
    }
});

backwardButton.addEventListener('click', () => {
    window.URLBar.backward(); // 使用 Electron 的 ipcRenderer 发送消息给主进程，以后退
});

forwardButton.addEventListener('click', () => {
    window.URLBar.forward(); // 使用 Electron 的 ipcRenderer 发送消息给主进程，以前进
});

reloadButton.addEventListener('click', () => {
    window.URLBar.reload(); // 使用 Electron 的 ipcRenderer 发送消息给主进程，以刷新
});

window.URLBar.onUrlChange((url) => {
    console.log('url change')
    addressInput.value = url;
})