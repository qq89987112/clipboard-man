const fse = require('fs-extra');
const storage = require("./storage.json");
module.exports = new Proxy(storage,{
    // get(target, key, receiver) {
    //     return Reflect.get(target, key, receiver);
    // },
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