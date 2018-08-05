const path = require("path");
const {
    BrowserWindow
} = require('electron');

class Superdog {

    constructor(options) {
        let win = this._win = new BrowserWindow(Object.assign({
            // width: 800,
            // height: 600,
            // frame: false,
            // center: true,
            // fullscreen: true,
            autoHideMenuBar: true,
            show: false,
        }, options));

        win.once('ready-to-show', () => {
            win.show()
        })
    }

    /**
     * superdog.make(`
     *       <template>
     *       </template>
     *       <script>
     *       </script>
     *   `)
     */
    static make() {

    }

    // promise = superdog.startAsync(`./api-test/getParams.html`).then(params=>axios.post(url,params));
    startAsync(url, params) {
        let win = this._win;
        return new Promise((resolve, reject) => {
            win.__params__ = params;
            win.setResult = resolve;
            win.loadFile(path.resolve("./src/views", url));
        })
    }

    start(url, params) {
        let win = this._win;
        win.setResult = (...params) => {
            let onResult = win.onResult || (() => {});
            onResult(...params);
        };
        win.__params__ = params;
        win.loadFile(path.resolve("./src/views", url));
        return win;
    }
}

module.exports = Superdog;