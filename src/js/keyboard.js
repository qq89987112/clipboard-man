const child_process = require("child_process");
const {clipboard} = require('electron');

module.exports =  {
    messageBox(message,title){
        child_process.execSync(`wscript ./src/vbs/messageBox.vbs ${message} ${title}`);
    },
    copy(){
        child_process.execSync(`wscript ./src/vbs/copy.vbs`);
    },
    backout(str){
        this.sendKeys("^{z}")
        str&&this.output(str);
    },
    sendKeys(keys){
        child_process.execSync(`wscript ./src/vbs/sendKeys.vbs "${keys}"`);
    },
    output(message){
        clipboard.writeText(message);
        child_process.execSync("wscript ./src/vbs/paste.vbs");
    },
    /**
     *   keyboard.options(`文件路径已经存在文件:${fileAddr},是否继续？`,["是","否"]).then((selects)=>{
     *        let select = selects[0];
     *    });
     * @param tooltip
     * @param list
     * @return {Promise<any>}
     */
    options(tooltip,list){
        this.output(`\r\n${tooltip}：\r\n${list.map((item,index)=>`${index+1}:${item}`).join('\r\n')}\r\n`);
        return new Promise((resolve, reject) => {
            let shortcuts = Array.from(Array(list.length).keys()).map((index) => ({
                key: index + 1 + "",
                type: '函数回调',
                cb:()=> {
                    store.dispatch({
                        type: "SHORTCUT_RELOAD",
                        shortcuts
                    })
                    resolve([index]);
                    // 为了 撤回一下 方便清屏输出新内容
                    this.sendKeys("^{z}")
                }
            }));

            store.dispatch({
                type: "SHORTCUT_TEMPORARY",
                shortcuts
            })
        })
    }
}