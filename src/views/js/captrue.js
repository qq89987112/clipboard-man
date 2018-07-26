function captrue(rect) {
  return new Promise((resolve, reject) => {
    const electron = require('electron')
    const desktopCapturer = electron.desktopCapturer
    const electronScreen = electron.screen
    const shell = electron.shell

    const fs = require('fs')
    const os = require('os')
    const path = require('path')

    const thumbSize = determineScreenShotSize()
    let options = {
      types: ['screen'],
      thumbnailSize: thumbSize
    }

    desktopCapturer.getSources(options, function (error, sources) {
      if (error) return reject(error)

      sources.forEach(function (source) {
        if (source.name === 'Entire screen' || source.name === 'Screen 1') {
          const screenshotPath = path.join(os.tmpdir(), 'screenshot.png')

          fs.writeFile(screenshotPath, source.thumbnail.crop(rect).toPNG(), function (error) {
            if (error) return reject(error)
            // shell.openExternal('file://' + screenshotPath)
            resolve(screenshotPath);
          })
        }
      })
    })

    function determineScreenShotSize() {
      const screenSize = electronScreen.getPrimaryDisplay().workAreaSize
      const maxDimension = Math.max(screenSize.width, screenSize.height)
      return {
        width: maxDimension * window.devicePixelRatio,
        height: maxDimension * window.devicePixelRatio
      }
    }
  })
}