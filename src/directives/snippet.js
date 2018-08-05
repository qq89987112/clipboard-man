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
 *      $snippet.vscode?input=E:\test\common&output=E:\docs\weapp-common
 */
module.exports = {
    validate: /^\$snippet.+/,
    handle(result) {
        let [name, params = {}] = utils.parseLineToObject(result[0]), {
            input,
            output
        } = params;

        

        if (!input) {
            keyboard.output("请指定输入目录!");
            return;
        }

        if (!output) {
            keyboard.output("请指定输出目录!");
            return;
        }

        input = path.normalize(input);
        output = path.normalize(output);

       

        // 生成到相同路径
        let totalContent = "# docs\r\n";
        let parseContent = _path => {
            let
                result = "",
                markDown = "",
                content = fse.readFileSync(_path);

            while (result = annotationReg.exec(content)) {
                let
                    docContent = result[1].replace(/\*/g, "").trim(),
                    funcName = result[2].trim();

                markDown += "### " + funcName + "\r\n\r\n" + docContent + "\r\n\r\n";
            }

            totalContent += "## " + path.basename(_path) + "\t\t" + _path + "\r\n\r\n" + markDown + "\r\n\r\n";
        }

        let readDir = dir => {
            if (fse.statSync(dir).isDirectory()) {
                fse.readdirSync(dir).forEach(item => readDir(path.join(dir, item)));
            } else if (path.extname(dir) == '.js') {
                parseContent(dir);
            }
        }

        readDir(input);
        fse.outputFileSync(output, totalContent);

        keyboard.output(`已经在${output}生成成功!`);
    }
}