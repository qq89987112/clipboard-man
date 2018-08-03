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
    // promise = superdog.startAsync(`./api-test/getParams.html`).then(params=>axios.post(url,params));
    startAsync(url,params){
        return new Promise((resolve,reject)=>{
            let win = new BrowserWindow({
                // width: 800,
                // height: 600,
                // frame: false,
                // center: true,
                // fullscreen: true,
                autoHideMenuBar:true
            });
            win.loadFile(path.resolve("./src/views",url));
            win.setResult = resolve;
            win.__params__ = params;
        })
    },
    // let win = start();
    //  win.onResult = ()=>{}
    start(url,params){
        let win = new BrowserWindow({
            autoHideMenuBar:true
        });
        win.loadFile(path.resolve("./src/views",url));
        win.setResult = (...params)=>{
            let onResult = win.onResult ||(()=>{});
            onResult(...params);
        };
        win.__params__ = params;
        return win;
    }
}