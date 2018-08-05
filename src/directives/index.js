const api = require("./api")
const css = require("./css")
const notice = require("./notice")
const notices = require("./notices")
const stock = require("./stock")
const template = require("./template")
const templates = require("./templates")
const global = require("./global")
const rss = require("./rss")
const story = require("./story")
const searcher = require("./searcher")
const findPic = require("./findPic")
const pix2code = require("./pix2code")
const ocr = require("./ocr")
const apiDriver = require("./api-driver")
const extractDoc = require("./extract-doc")
const snippet = require("./snippet")

module.exports =  {
    global,
    api,
    css,
    notice,
    notices,
    stock,
    template,
    templates,
    rss,
    story,
    searcher,
    findPic,
    pix2code,
    ocr,
    apiDriver,
    extractDoc,
    snippet
}