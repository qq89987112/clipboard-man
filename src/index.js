const child_process = require('child_process');
const handle = require("./handle");
const iohook = require("iohook");
const clipboard = require( 'win-clipboard' );

//  这个不可以拦截。
// const id = iohook.on('keydown', (e) => {
//     // console.log(e)
//     switch(e.keycode){
//         //F4
//         case 62:
            
//             handle();
//         break;
//     }
// });

//  这个不可以拦截。F10
iohook.registerShortcut([68],()=>{
    let
    tempClipboardContent = clipboard.getText(),
    clipboardContent;

    child_process.execSync("wscript ./src/vbs/copy.vbs");
    clipboardContent = clipboard.getText();

    if(!handle(clipboardContent)){
        clipboard.setText(tempClipboardContent);
    }
});
handle("$stock.watch?code=C1809&max=1800&min=1760");
iohook.start();