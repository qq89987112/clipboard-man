const path = require("path");
const { BrowserWindow } = require('electron');

module.exports = {
    /**
     * superdog.make(`
     *       <template>
     *       </template>
     *       <script>
     *       </script>
     *   `)
     */
    make(){

    },
    start(url){
        return new Promise((resolve,reject)=>{
            let win = new BrowserWindow({
                width: 800,
                height: 600,
                frame: false,
                center: true,
                fullscreen: true
            });
            win.loadFile(path.resolve("./src/views",url));
            win.setResult = resolve;
        })
    },
    startSync(){
        
    }
}