const utils = require("../js/utils")
const storage = require("../js/storage")
const superdog = require("../js/superdog");
const axios = require("axios");
const {clipboard} = require('electron');

/**
 * web-utils 中的接口测试功能
 * 使用快捷键运行指令时,clipboard里是url地址时,则进行请求,并进行相应的gui操作。
 * 否则按照普通的指令处理
 * 
 * gui：
 *      1、分为四段：模板列表、目标代码、历史url表(可设置别名,方便变量引用)、url返回值
 * 
 * 
 * modifier:
 *      result  快捷键查看剪贴板中的最近返回数据
 *      get     快捷键访问剪贴板中的url
 *      post    快捷键访问剪贴板中的url
 */
module.exports = {
    validate:/^\$api-driver/,
    handle(result){
        let 
            clipboard = result[0],
            urlReg = /(?:http)|(?:https):\/\/.+/;

        let [name,params={}] = utils.parseLineToObject(clipboard);
        let {method = "GET"} = params;
        method = method.toUpperCase();
        
        let promise = Promise.resolve(name);

        if(!urlReg.test(clipboard)){
            promise = superdog.start(`./api-test/get-url.html`).then(result=>{
                method = result.method.toUpperCase();
                return `${result.protocol}${result.url}`;
            });
        }

        promise.then(url=>{
            let request = Promise.reject("错误的方法");
            
            if(method === 'POST'){
                request = superdog.start(`./api-test/getParams.html`).then(params=>axios.post(url,params));
            }else if(method === 'GET'){
                request = axios.get(url);
            }
            request.then(result=>{
                superdog.start(`./api-test/test-result.html`,{
                    url,
                    result:result.data,
                    method
                }).then(result=>clipboard.writeText(result))
            }).catch(error=>{
                console.error(error);
            })
        })
        
        let {url,file} = params;

     
    }
}