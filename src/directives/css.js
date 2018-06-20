const keyboard = require("../js/keyboard");
const glob = require("glob").sync;
const {parse,stringify} = require("himalaya");
const scssfmt = require('scssfmt')
const {clipboard} = require('electron');

/**
 * test
 * 
 *  $css`
 *      <div style="margin-right:10px;" class="a" >
 *          <div class="b" style="background:red;"></div>
 *          <div class="c">
 *      </div>
 *  `
 * 
 * 
 */
module.exports = {
    // validate:/^\$css`([\s\S]+?)`/,
    validate:/^<.+>[\s\S]+<\/[a-zA-Z]+>$/,
    handle(result){
        let htmlStr = result[0];
        let html = parse(htmlStr);

        function generateCss(elements = []) {
            // 对象里头的函数代码无法被编译成低版本的JS？
            elements = elements || [];
            return elements.map(item => {
                let attributes = item.attributes || [];
                let css = attributes.find(i => i.key === 'class');
                let style = attributes.find(i => i.key === 'style');
                if (css) {
                    css = css.value;
                }
                if (style) {
                    style = style.value;
                }
                return css ? `.${css}{${style?`
                            ${style}
                            `:''}${generateCss(item.children)}
                        }` : generateCss(item.children)
            }).filter(i => i).join("\r\n")
        }

        // 当生成成功时,去掉$css`` style=""
        let cssResult = scssfmt(generateCss(html));
        console.log(cssResult);
        keyboard.output(htmlStr.replace(/style=["'].+?["'] ?/g,""));
        clipboard.writeText(cssResult);
    }}