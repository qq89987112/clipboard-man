const fs = require("fs");
const path = require("path");

module.exports = {


    /**
     *  用于从剪贴板的模板代码中生成系统的template文件
     *  params = [
     *       {
     *           name:'name',
     *           type:'type'
     *       }
     *   ]
     */
    make({template, params = [], defaultValues,notices={}}) {
        let typeDefaultValues = {
            Object: '{a:1,b:2,c:3}',
            Array: '[1]', // 本是 [1,2,3,4,5] 的,但是为了不写array参数时,默认是一个,就只能这样写了。
            Number: '123',
            String: '"12345"'
        };

        if (defaultValues) {
            defaultValues = Object.entries(defaultValues).reduce((total,cur)=>{
                let
                    value = cur[1],
                    type = Object.prototype.toString.call(value);

                switch (type){
                    case "[object Array]":
                        value = `[${value.map(i=>`"${i}"`)}]`;
                        break;
                    case "[object String]":
                        value = `"${value}"`;
                        break;
                    case "[object Number]":
                        break;
                    case "[object Object]":
                        value = JSON.stringify(value)
                        break;
                    default:
                        break;
                }
                total[cur[0]] = value;
                return total;
            },{})
        }

        // 不能用这个, 多行字符串将丢失
        // notices = JSON.stringify(notices,undefined,'\t');
        let objectKeyValue = Object.entries(notices).map((cur)=>{
             return `${cur[0]}:\`${cur[1]}\``
        }).join(",\r\n");

        notices = `{
                ${objectKeyValue}
        }`;


        return `
                function template() {

return {
    parameters:{
        ${params.map(i => `${i.name}:${i.type}`)}
    },
    requestLib:{

    },
    //放在文件夹里时有用
    events:{
    },
    compile(params,context) {
        const {${params.map(i => `${i.name}=${defaultValues ? defaultValues[i.name] : typeDefaultValues[i.type]}`)}} = params;
        
         context&&context.notify(undefined,undefined,${notices});
        return \`
            ${template}
        \`
    }
}
}`;
    },
    converTextToTemplate(templateText){
        return eval(`(${templateText})`)();
    },
    compile(templateText,params={}){
        let template = this.converTextToTemplate(templateText);
        return template.compile(params);
    },
    compilePath(path,params={}){
        return this.compile(fs.readFileSync(path),params);
    },
    directiveDemoPath(filePath){
        let template = this.converTextToTemplate(fs.readFileSync(filePath));
        let parameters = template.parameters;
        // JSON.stringify(Object.entries(parameters).map(i => i[0]));
        return `${path.basename(filePath,".js")}?${Object.entries(parameters).map(i => {
            let demoValues = {
                [Array]:`${key}=1,2,3,4`,
                [String]:`${key}=${key}`,
            }
            return i[0] == 'rest' ? '' : demoValues[i[1]];
        }).filter(i => i).join("&")}`;

    },
    // 拿不到 commandName
    // demo(templateText){
      
    // },
    demoPath(filePath){
        let fileContent = fs.readFileSync(filePath);
        let template = this.converTextToTemplate(fileContent);
        let parameters = template.parameters;
        parameters = Object.entries(parameters).reduce((total,cur)=> {
            let demoValues = {
                [Array]:['1','2','3','4'],
                [String]:`something-here`,
                // 'rest':''
            }
            ;
            total[cur[0]] = demoValues[cur[1]]||'';
            return total;
        },{})

        return this.compile(fileContent,parameters);
    }
}