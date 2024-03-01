const prompt = require('electron-prompt');

function goto(view) {
    prompt({
        title: 'Goto Where',
        label: 'Enter url address:',
        value: 'https://',
        inputAttrs: {
            type: 'url'
        },
        type: 'input',
        height: 180
    }).then((result) => {
        if (result === null) {
            // 用户点击取消按钮
            return;
        }
        console.log(result);
        view.webContents.loadURL(result);
    })

}



module.exports = {
    goto
};