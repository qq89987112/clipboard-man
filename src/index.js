const child_process = require('child_process');
const handle = require("./handle");
const iohook = require("iohook");
const clipboard = require( 'win-clipboard' );

//  这个不可以拦截。
// const id = iohook.on('keydown', (e) => {
//     console.log(e)
//     //  win 3675
//     // ctl 29
//     // alt 56
//     // shift 42
// });

//  这个不可以拦截。ctrl+f1
iohook.registerShortcut([60],(...params)=>{
    let
    tempClipboardContent = clipboard.getText(),
    clipboardContent;

    child_process.execSync("wscript ./src/vbs/copy.vbs");
    clipboardContent = clipboard.getText();

    if(!handle(clipboardContent)){
        clipboard.setText(tempClipboardContent);
    }
});
// handle("$stock.watch?code=C1809&max=1800&min=1760");
iohook.start();