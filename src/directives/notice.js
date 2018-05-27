const keyboard = require("../js/keyboard");
const store = require("../../../store");
const utils = require("../js/utils");

module.exports = {
    validate:/\$\$([0-19]).+/,
    handle(result){
        let [name,params] = utils.parseLineToObject(result[0]);
        let modifier = params.modifier;
        result = result[1];
        let notice = store.getState().notices[result];

        // keyboard.output(`\r\n${modifier ? notice.params[modifier] : notice}\r\n`);
        keyboard.output(`${modifier ? notice.params[modifier].trim() : notice}`);
    }
}