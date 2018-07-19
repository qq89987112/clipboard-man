const utils = require("../js/utils")
const storage = require("../js/storage")
const keyboard = require("../js/keyboard")
const fse = require("fs-extra");
const path = require("path");
const {BrowserWindow} = require('electron');

/**
 * 根据屏幕截图快速在指定目录中查找到相似图片并列出
 * 
 * test
 *      
 *       $findPic
 */
module.exports = {
    validate:/^\$findPic\??(.*)/,
    handle(result){
        let global = storage.storage||{};
        let [name,params={}] = utils.parseLineToObject(result[0]);
        let {url,file} = params;
        
        let win = new BrowserWindow({width: 800, height: 600,frame:false,center:true});
        win.loadFile(path.resolve("./src/views/screenshot.html"));

        // const imghash = require('imghash');
        // const hamming = require('hamming-distance');

        // imghash.hashraw
        // const hash1 = imghash.hash('./image1.png');
        // const hash2 = imghash.hash('./image2.png');

        // Promise.all([hash1, hash2]).then((results) => {
        //     const dist = hamming(results[0], results[1]);
        //     console.log(`Distance between images is: ${dist}`);
        //     if (dist <= 20) {
        //     console.log('Images are similar');
        //     } else {
        //     console.log('Images are NOT similar');
        //     }
        // });

    }
}