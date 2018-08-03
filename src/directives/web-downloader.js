const keyboard = require("../js/keyboard");
const utils = require("../js/utils");
const path = require("path");
const fse = require("fs-extra");

/**
 * 
 *  用于下载整个web(尽量能保持原貌),方便进行本地关键字查询
 * 
 */
module.exports = {
    validate:/^\$extract-doc.+/,
    handle(result){
        let 
            [name,params={}] = utils.parseLineToObject(result[0]),
            global = storage.global||{},
            {input,output} = params;
            
            if(!input){
                keyboard.output("请指定输入目录!");
                return;  
            }
            
            if(!output){
                keyboard.output("请指定输出目录!");
                return;
            }

            let annotationReg = /1/g;

            let parseContent = content=>{
                let result = "";

                while(result = annotationReg.exec()){
                    let content = result[0].replace("*","");
                    
                }
            }

            let readDir = dir=>{
                 if(fse.statSync(dir).isDirectory()){
                    fse.readdirSync(dir).forEach(item=>readDir(path.join(dir,item)));
                 }else{
                    let markDown = parseContent(parseContent);
                    fse.outputFileSync(path.join(output,dir.replace(input,"")),markDown);
                 }
            }
            
            
        if (params.modifier === 'set') {
            let {rest,modifier,...paramsClone} = params;
            Object.entries(paramsClone).forEach(i=>global[i[0]]=i[1]);
            storage.global = global;
            keyboard.output("设置成功!");
        }else{

        }
    }
}