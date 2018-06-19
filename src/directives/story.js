const utils = require("../js/utils")
const storage = require("../js/storage")
const keyboard = require("../js/keyboard")
const fse = require("fs-extra");
const path = require("path");

/**
 * test
 *      $story?file=D:\飞剑问道.txt
 *      $story
 */
let 
    curFile = {
        content:'',
        uri:'',
        line:0
    };
module.exports = {
    validate:/^\$story\?(.+)/,
    handle(result){
        let global = storage.storage||{};
        let [name,params={}] = utils.parseLineToObject(result[0]);
        let {line=curFile.line,modifier,file} = params;
        if(file){
            curFile = {
                content:'',
                uri:'',
                line:0
            }
            curFile.uri = file;
            curFile.content = fse.readFileSync(file).split("\n");
            keyboard.output(curFile.content[curFile.line++]);
        }else{
            
        }
    }
}