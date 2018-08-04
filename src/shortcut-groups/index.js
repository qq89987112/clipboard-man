
const _default = require("./default");
const notifier = require('node-notifier');

let groups = {
    weapp:require("./weapp")
}

let curGroup;

let obj = {
    switch(group){
        notifier.notify({title:'快捷键组',message:`已切换至${group}`,sound: true});
        curGroup&&curGroup.destory();
        curGroup = groups[group];
        curGroup.init(obj);
    },
    next(){

    },
    last(){

    }
};
_default.init(obj);


module.exports = obj;