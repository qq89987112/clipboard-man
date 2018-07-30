const utils = require("../js/utils")
const storage = require("../js/storage")
const keyboard = require("../js/keyboard")
const fse = require("fs-extra");
const path = require("path");

/**
 * web-utils 中的接口测试功能
 */
module.exports = {
    validate:/^\$api-test/,
    handle(result){
        let [name,params={}] = utils.parseLineToObject(result[0]);
        let {url,file} = params;

    }
}