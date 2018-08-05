const superdog = require("../js/superdog");
const templateMaker = require("../js/templateMaker");
const keyboard = require("../js/keyboard");
const path = require("path");
const jsBeautify = require("js-beautify");
const fse = require("fs-extra");
const {clipboard} = require('electron');
/**
 * 只供快捷键绑定使用,因为需要使用剪切板来传递数据
 */
module.exports = {
    validate: /\$template-gui/,
    handle(result) {
        keyboard.copy();
        new superdog().start("./template-gui.html",clipboard.readText());
    }
}