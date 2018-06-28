const keyboard = require("../js/keyboard");
const storage = require("../js/storage");
const utils = require("../js/utils");
const glob = require("glob").sync;
const fse = require("fs-extra");
const {globalShortcut,clipboard} = require('electron')

/**
 * test
 *      $searcher?wrapper=<value&bind=F1&searchAddr=D:/test/**\/*.Test
 * 
 * 后期考虑加入百度搜索
 */

module.exports = {
    validate:/^\$searcher.+/,
    handle(result){
        // 优先获取命令中的searchAddr
        let 
            searchAddr = params.searchAddr || storage.searcher.searchAddr,
            wrapper = params.wrapper || storage.searcher.wrapper;
        let [name,params] = utils.parseLineToObject(result[0]);
        if(!searchAddr){
            keyboard.output("找不到搜索目录,请指定 $searcher?searchAddr=D:/test/**/*.Test");
            return;
        }
        
        // 更新searchAddr
        storage.searcher.searchAddr = searchAddr;
        storage.searcher.wrapper = wrapper;

        

        globalShortcut.register("s",()=>{
            const results = [];
            glob(searchAddr).map(item=>{
                let 
                    fileContent = fse.readFileSync(item),
                    reg = new RegExp(wrapper.replace("value",clipboard.readText()),"g");
                fileContent.replace(reg,item=>{
                    console.log(item);
                })
            });
        });
      
    }
}