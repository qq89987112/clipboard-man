const utils = require("../js/utils")
const storage = require("../js/storage")
const keyboard = require("../js/keyboard")
const fse = require("fs-extra");
const path = require("path");

/**
 * 根据屏幕截图快速在指定目录中查找到相似图片并列出
 */
module.exports = {
    validate:/^\$pix2code\?(.+)/,
    handle(result){
        let global = storage.storage||{};
        let [name,params={}] = utils.parseLineToObject(result[0]);
        let {url,file} = params;
        
    }
}