const keyboard = require("../js/keyboard");
const utils = require("../js/utils");
const store = require("../js/storage");
/**
 * test
 *      $$0.css
 */
module.exports = {
    validate:/\$\$([0-19]).+/,
    handle(result){
        let notices 
        let [name,params] = utils.parseLineToObject(result[0]);
        let modifier = params.modifier;
        result = result[1];
        let notice = store.notices[result];
        
        if(notice===undefined){
            keyboard.output(`错误的索引值:${result}`);
        }else{
            // keyboard.output(`\r\n${modifier ? notice.params[modifier] : notice}\r\n`);
            keyboard.output(`${modifier ? notice.params[modifier].trim() : notice}`);
        }
        
    }
}