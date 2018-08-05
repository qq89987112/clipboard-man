const {globalShortcut} = require('electron')
const keyboard = require('../js/keyboard')
const beautify = require('js-beautify');
let prefix = key=>`CTRL + ${key}`;


module.exports = {
    init(shortcutGroups){
        this.destory();
        let requestTemplate = `
            wx.$request("url").then(params=>{
                
            })
        `;
        globalShortcut.register(prefix('F1'),()=> keyboard.output(beautify.js(requestTemplate)));
        globalShortcut.register(prefix('F2'),()=> keyboard.output(beautify.js(`
            func(){
                ${requestTemplate}
            }
        `)));
    },
    destory(){

    }
}


