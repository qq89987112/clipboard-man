const keyboard = require("../js/keyboard");
const utils = require("../js/utils");
const storage = require("../js/storage");
/**
 * test
 *      $global.set?a=1
 */
module.exports = {
    validate:/^\$global.+/,
    handle(result){
        let 
            [name,params={}] = utils.parseLineToObject(result[0]),
            global = storage.global||{};
        if (params.modifier === 'set') {
            let {rest,modifier,...paramsClone} = params;
            Object.entries(paramsClone).forEach(i=>global[i[0]]=i[1]);
            storage.global = global;
            keyboard.output("设置成功!");
        }else{

        }
    }
}