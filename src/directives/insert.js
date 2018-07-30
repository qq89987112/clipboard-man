const utils = require("../js/utils")
const storage = require("../js/storage")
const keyboard = require("../js/keyboard")
const fse = require("fs-extra");
const path = require("path");

/**
 * 用electron做模板导航创建功能,并将结果作为"插入"。
 *  接口请求驱动（vue）：
 *      基础页面(接口请求+显示【可在结果中选择需要显示的字段】)
 *      element表页面(接口请求+分页+reLoad)
 *  router页面插入配置
 */
module.exports = {
    validate:/^\$insert/,
    handle(result){
        let [name,params={}] = utils.parseLineToObject(result[0]);
        let {url,file} = params;

    }
}