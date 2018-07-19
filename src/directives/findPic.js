const utils = require("../js/utils")
const storage = require("../js/storage")
const keyboard = require("../js/keyboard")
const fse = require("fs-extra");
const path = require("path");
const {BrowserWindow} = require('electron');




// const electron = require('electron')
// const desktopCapturer = electron.desktopCapturer
// const electronScreen = electron.screen
// const shell = electron.shell

// const fs = require('fs')
// const os = require('os')
// const path = require('path')

// const screenshot = document.getElementById('screen-shot')
// const screenshotMsg = document.getElementById('screenshot-path')

// screenshot.addEventListener('click', function (event) {
//   screenshotMsg.textContent = '正在采集屏幕...'
//   const thumbSize = determineScreenShotSize()
//   let options = { types: ['screen'], thumbnailSize: thumbSize }

//   desktopCapturer.getSources(options, function (error, sources) {
//     if (error) return console.log(error)

//     sources.forEach(function (source) {
//       if (source.name === 'Entire screen' || source.name === 'Screen 1') {
//         const screenshotPath = path.join(os.tmpdir(), 'screenshot.png')

//         fs.writeFile(screenshotPath, source.thumbnail.toPng(), function (error) {
//           if (error) return console.log(error)
//           shell.openExternal('file://' + screenshotPath)
//           const message = `截图保存到: ${screenshotPath}`
//           screenshotMsg.textContent = message
//         })
//       }
//     })
//   })
// })

// function determineScreenShotSize () {
//   const screenSize = electronScreen.getPrimaryDisplay().workAreaSize
//   const maxDimension = Math.max(screenSize.width, screenSize.height)
//   return {
//     width: maxDimension * window.devicePixelRatio,
//     height: maxDimension * window.devicePixelRatio
//   }
// }


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
        
        let win = new BrowserWindow({width: 800, height: 600,frame:false,center:true,fullscreen:true,opacity:0.5});
        win.loadFile(path.resolve("./src/views/screenshot.html"));

        win.setResult = function(result){
            console.log(result);
        }
        
        

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