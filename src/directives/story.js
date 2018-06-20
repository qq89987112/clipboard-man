const utils = require("../js/utils")
const storage = require("../js/storage")
const keyboard = require("../js/keyboard")
const fse = require("fs-extra");
const path = require("path");
const {globalShortcut,BrowserWindow} = require('electron')
/**
 * test
 *      $story?file=D:\飞剑问道.txt
 *      $story.view
 *              按住S的时候显示窗口,且为半透明。
 */
let 
    curFile = {
        content:'',
        uri:'',
        line:0
    };

let program = {
    file(params){
        let {line=curFile.line,modifier,file} = params;
        curFile = {
            content:'',
            uri:'',
            line:0
        }
        curFile.uri = `${file.name}.${file.modifier}`;
        curFile.content = fse.readFileSync(curFile.uri, 'utf-8').toString().split("\n");
        const readLine = (line)=>{
            curFile.line = line||curFile.line;
            keyboard.output(`${curFile.line}:${curFile.content[curFile.line++]||"已经全部读完!"}`);
        }

        readLine();
        
        globalShortcut.register("s",()=>{
            keyboard.backout();
            readLine();
        });
        globalShortcut.register("w",()=>{
            let line = curFile.line - 2;
            readLine(line < 0 ? 0 : line);
        });
    },
    view(params){
        let {line=curFile.line,modifier,file} = params;
        let win = new BrowserWindow({width: 80, height: 20,frame:false,center:true});
        win.loadFile(path.resolve("./src/views/story-setting.html"));
        win.show();
    }
}
module.exports = {
    validate:/^\$story(.+)/,
    handle(result){
        let global = storage.storage||{};
        let [name,params={}] = utils.parseLineToObject(result[0]);
        (program[params.modifier]||(()=>{}))(params);
    }
}