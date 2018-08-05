
const _default = require("./default");
// const notifier = require('node-notifier');
const {Notification} = require('electron')
let groups = {
    weapp:require("./weapp")
}

let curGroup;

let obj = {
    switch(group){
        // notifier.notify({title:'快捷键组',message:`已切换至${group}`,sound: true});
        new Notification({title:'快捷键组',body:`已切换至${group}`}).show();
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