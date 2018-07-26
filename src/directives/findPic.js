const utils = require("../js/utils")
const storage = require("../js/storage")
const keyboard = require("../js/keyboard")
const fse = require("fs-extra");
const path = require("path");
const { BrowserWindow } = require('electron');


/**
 * 根据屏幕截图快速在指定目录中查找到相似图片并列出
 * 
 * test
 *      
 *       $findPic
 */
module.exports = {
    validate: /^\$findPic\??(.*)/,
    handle(result) {
        let global = storage.storage || {};
        let [name, params = {}] = utils.parseLineToObject(result[0]);
        let {
            url,
            file
        } = params;

        let win = new BrowserWindow({
            width: 800,
            height: 600,
            frame: false,
            center: true,
            fullscreen: true,
            opacity: 0.5
        });

        win.loadFile(path.resolve("./src/views/screenshot.html"));
       

        win.setResult = function (result) {
            console.log(result);
            win.close();
            const imghash = require('imghash');
            const hamming = require('hamming-distance');
            const glob = require('glob').sync;

            // imghash.hashraw
            const hash1 = imghash.hash(result);

            glob("C:/Users/dell/Desktop/test/*.*").forEach(item=>{
                let hash2 = imghash.hash(item);
                Promise.all([hash1, hash2]).then((results) => {
                    const dist = hamming(results[0], results[1]);
                        // console.log(`Distance between images is: ${dist}`);
                    if (dist <= 20) { // 20
                        console.log(`${item} image are similar:${dist}`);
                    } else {
                        // console.log('Images are NOT similar');
                    }
                });
            });

            
        }



    

    }
}