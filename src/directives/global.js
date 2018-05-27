const keyboard = require("../js/keyboard");
const store = require("../../../store");
const utils = require("../js/utils");
const global = require("../js/global");

module.exports = {
    validate:/^\$global.+/,
    handle(result){
        let [name,params={}] = utils.parseLineToObject(result[0]);
        if (params.modifier === 'set') {
            let {rest,modifier,...paramsClone} = params;
            Object.entries(paramsClone).forEach(i=>global[i[0]]=i[1]);
            keyboard.output("设置成功!");
        }else{

        }
    }
}