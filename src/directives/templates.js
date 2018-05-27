const keyboard = require("../js/keyboard");
const utils = require("../js/utils");
const path = require("path");
const glob = require("glob").sync;

module.exports = {
    validate:/^\$templates$/,
    handle(result){
        let
            [name,params] = utils.parseLineToObject(result[0]),
            modifier = params.modifier,
            fileAddr;

        if (modifier) {
            fileAddr = path.resolve(`./template/${modifier}/**.js`);
        } else {
            fileAddr = path.resolve("./template/**/**.js");
        }
        let templates = glob(fileAddr);
        keyboard.output("\r\n目前的模板列表如下：\r\n" + templates.map((item, index) => `${index + 1}：${item}`).join('\r\n') + "\r\n");
    }
}