const keyboard = require("../js/keyboard");
const utils = require("../js/utils");
const templateMaker = require("../js/templateMaker");
const path = require("path");
const fse = require("fs-extra");

/**
 * 
 *  抽取文件夹里的所有模板,调用.demo制作成相应的snippet
 * 
 *  test
 *      $snippet.vscode?input=D:\code\github\clipboard-man\template&output=C:\Users\Administrator\AppData\Roaming\Code\User\snippets\test
 *      $snippet.vscode?input=D:\code\github\clipboard-man\template&output=C:\Users\Administrator\AppData\Roaming\Code\User\snippets\test
 */
module.exports = {
    validate: /^\$snippet.+/,
    handle(result,context) {
        let [name, params = {}] = utils.parseLineToObject(result[0]), {
            input,
            output,
            modifier
        } = params;



        if (!input) {
            context.output("请指定输入目录!");
            return;
        }

        if (!output) {
            context.output("请指定输出目录!");
            return;
        }

        input = path.normalize(input);
        output = path.normalize(output);

        let json = {};



        // 生成到相同路径
        let parseContent = _path => {
            //    let content = fse.readFileSync(_path);
            // 
            let [category,directiveName] = _path.split(path.sep).slice(-2);
            let name = `${category}.${directiveName}`;
            try {
                json[name] = {
                    "scope": "javascript,typescript,html",
                    "prefix": name,
                    "body": templateMaker.demoPath(_path).split(/\n/g),
                    "description":name
                }
            } catch (e) {
                console.log(_path,"的demo解析错误")
                console.error(e);
            }

        }

        let readDir = dir => {
            if (fse.statSync(dir).isDirectory()) {
                fse.readdirSync(dir).forEach(item => readDir(path.join(dir, item)));
            } else if (path.extname(dir) == '.js') {
                parseContent(dir);
            }
        }

        readDir(input);

        let extnames = {
            vscode:"code-snippets"
        }

        let extname = `.${extnames[modifier]||modifier}`;

        fse.outputFileSync(output+extname, JSON.stringify(json,undefined,'\t'));

        context.output(`已经在${output+extname}生成成功!`);
    }
}