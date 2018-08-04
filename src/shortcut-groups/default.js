const {globalShortcut} = require('electron')

// 比直接定义成变量然后 `${SHIFT} + F1` 的好处是可以控制+号
let prefix = key=>`SHIFT + ${key}`;


module.exports = {
    init(shortcutGroups){
        this.destory();
        shortcutGroups.switch('weapp');
        globalShortcut.register(prefix('F1'),()=>shortcutGroups.switch('weapp'));
    },
    destory(){

    }
}

