const fse = require('fs-extra');
const storage = require("./storage.json");
module.exports = new Proxy(storage,{
    get(target, key, receiver) {
        let result = Reflect.get(target, key, receiver);
        // 应该裹一层proxy才是
        result = result || {};
        target[key] = result;
        return result;
    },
    set(target, key,value, receiver){

        // if(typeof value ==='object'){
        //     value = new Proxy(value,{
        //         set(target, key,value, receiver){
        //             let result = Reflect.set(target, key, value, receiver);
        //             fse.outputFileSync("./src/js/storage.json",JSON.stringify(storage,undefined,'\t'));
        //             return result;
        //         }
        //     });
        // }

        let result = Reflect.set(target, key, value, receiver);
        fse.outputFileSync("./src/js/storage.json",JSON.stringify(storage,undefined,'\t'));
        return result;
    }
});