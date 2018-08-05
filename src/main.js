const {app,clipboard,globalShortcut,Notification} = require('electron')
const child_process = require('child_process');
const handle = require("./handle")();


app.on("ready",()=>{
    require("./shortcut-groups")
    globalShortcut.register("F2",()=>{
        let
            tempClipboardContent = clipboard.readText(),
            clipboardContent;

            child_process.execSync("wscript ./src/vbs/copy.vbs");
            clipboardContent = clipboard.readText();

            if(!handle(clipboardContent)){
                clipboard.writeText(tempClipboardContent);
            }
    });
    
    globalShortcut.register("F3",()=>{
        handle('$api-driver');
    });
    console.log("opened!");
})
// 默认是退出应用,需要显式写出来
app.on('window-all-closed', () => {
    // app.quit()
})