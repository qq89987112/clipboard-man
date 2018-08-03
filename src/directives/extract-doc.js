const keyboard = require("../js/keyboard");
const utils = require("../js/utils");
const path = require("path");
const fse = require("fs-extra");

/**
 * 
 *  抽取文件夹里,js文件的相关注释
 * 
 * 
 * 
 *  test
 *      $extract-doc?input=E:\test\common&output=E:\docs\weapp-common
 *      $extract-doc?input=E:\test\common&output=E:\docs\weapp-common\total (不能带.md 有bug)
 */
module.exports = {
    validate:/^\$extract-doc.+/,
    handle(result){
        let 
            [name,params={}] = utils.parseLineToObject(result[0]),
            {input,output} = params;
            
            if(!input){
                keyboard.output("请指定输入目录!");
                return;  
            }
            
            if(!output){
                keyboard.output("请指定输出目录!");
                return;
            }

            input = path.normalize(input);
            output = path.normalize(output);

            let annotationReg = /\/\*([\s\S]+?)\*\/[\s\S]+?function(.+)\(/g;
            

            // 生成到不同路径
            if(false){
                let parseContent = content=>{
                    let 
                        result = "",
                        markDown ="";
    
                    while(result = annotationReg.exec(content)){
                        let 
                            docContent = result[1].replace(/\*/g,"").trim(),
                            funcName = result[2].trim();
    
                            markDown += "## "+funcName+"\r\n\r\n"+docContent+"\r\n\r\n";
                    }
    
                    return "# 文档\r\n\r\n"+markDown+"\r\n\r\n";
                }
    
                let readDir = dir=>{
                     if(fse.statSync(dir).isDirectory()){
                        fse.readdirSync(dir).forEach(item=>readDir(path.join(dir,item)));
                     }else if(path.extname(dir)=='.js'){
                        let markDown = parseContent(fse.readFileSync(dir));
                        fse.outputFileSync(path.join(output,dir.replace(input,"")),markDown);
                     }
                }
                
                readDir(input);
                
            }else{
                // 生成到相同路径
                let totalContent = "# docs\r\n";
                let parseContent = _path=>{
                    let 
                        result = "",
                        markDown ="",
                        content = fse.readFileSync(_path);
    
                    while(result = annotationReg.exec(content)){
                        let 
                            docContent = result[1].replace(/\*/g,"").trim(),
                            funcName = result[2].trim();
    
                            markDown += "### "+funcName+"\r\n\r\n"+docContent+"\r\n\r\n";
                    }
    
                    totalContent+="## "+path.basename(_path)+"\t\t"+_path+"\r\n\r\n"+markDown+"\r\n\r\n";
                }
    
                let readDir = dir=>{
                     if(fse.statSync(dir).isDirectory()){
                        fse.readdirSync(dir).forEach(item=>readDir(path.join(dir,item)));
                     }else if(path.extname(dir)=='.js'){
                        parseContent(dir);
                     }
                }
                
                readDir(input);
                fse.outputFileSync(output,totalContent);
            }
          
            
            keyboard.output(`已经在${output}生成成功!`);
    }
}