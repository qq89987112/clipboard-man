const keyboard = require("../js/keyboard");
const utils = require("../js/utils");
const http = require("http");
const path = require("path");
const nodemailer = require("nodemailer");
const config = require(path.resolve("./config.js"));
const moment = require('moment');
const iconv = require('iconv-lite');

const emailOptions = {
    from: config.email.user, // 发送邮箱
    to: config.email.user, // 接受邮箱
    subject: `警告`, // 标题
    html: `您的stock有预警条件被触发!` // 内容
}

const transporter = config.email ? nodemailer.createTransport({
    host: 'smtp.qq.com', // 设置服务
    port: 465, // 端口
    sercure: true, // 是否使用TLS，true，端口为465，否则其他或者568
    auth: config.email
  }) : undefined;


const sendMail = (subject,html,callBack=()=>{})=>{
    if(!transporter.$isSending&&!transporter.$diable){
        transporter.$isSending = true;
        transporter.sendMail({
            ...emailOptions,
            subject,
            html
        },(error,info)=>{
            transporter.$isSending = false;
            if(error){
                console.log('邮件发送失败：'+error);
            }else{
                console.log('Message sent: ' + info.response);
            }
            callBack(error);
        });
    }
  
}

const watchers = {

}

/**
 * test
 *      $stock.C1809
 *      $stock.watch?code=C1809&max=1800
 *              => $stock.watch //自动读取最近的配置
 */


module.exports =  {
    validate:/^\$stock.+/,
    handle(result){
        let [name,params] = utils.parseLineToObject(result[0]);
        let fetch = (code,cb=()=>{})=>{
                http.get(`http://hq.sinajs.cn/list=${code}`,res => {
                    let html = [],len = 0;
                    res.on('data', function(chunk) {
                        html.push(chunk);
                        len += chunk.length;
                    });
                    res.on("end",()=>{
                        let v;
                        v = Buffer.concat(html, len);
                        v = iconv.decode(v, 'gb2312');
                        let responseReg = /="(.+)"/;
                        result = responseReg.exec(v);
                        if (result) {
                            result = result[1];
                            result = result.split(",");
                            // 0：豆粕连续，名字
                            // 1：145958，不明数字（难道是数据提供商代码？）
                            // 2：3170，开盘价
                            // 3：3190，最高价
                            // 4：3145，最低价
                            // 5：3178，昨日收盘价 （2013年6月27日）
                            // 6：3153，买价，即“买一”报价
                            // 7：3154，卖价，即“卖一”报价
                            // 8：3154，最新价，即收盘价
                            // 9：3162，结算价
                            // 10：3169，昨结算
                            // 11：1325，买 量
                            // 12：223，卖 量
                            // 13：1371608，持仓量
                            // 14：1611074，成交量
                            // 15：连，大连商品交易所简称
                            // 16：豆粕，品种名简称
                            // 17：2013-06-28，日期
                            cb(result[8],result,v);
                        } else {
                            keyboard.output(`找不到正确的接口返回：${v}`.trim());
                        }
                    })
                }).on('error', (e) => {
                    console.error(`错误: ${e.message}`);
                  });
           
        }

        let code = params.code;
        let handle = watchers[code];
        switch(params.modifier){
            case 'cancel':
                clearInterval(handle);
                delete watchers[code];
            break;
            case 'watch':
                let {max,min} = params;
                let instance = watchers[code];
                if(instance){
                    keyboard.output(`已存在${code}的监听器!`);
                    return;
                }
                clearInterval(handle);

                hanndle = setInterval(()=>{
                    fetch(code,(v,result)=>{
                        let 
                            time =new moment().format("YYYY-MM-DD HH:mm:ss"),
                            subject,
                            html=`${result[0]}的当前值为:${v},${[max&&`max值为:${max}`,min&&`min值为:${min}`].filter(i=>i)}`;
                            console.log(`${time} ${html}`);
                            // console.log(`时间   品种    `);
                            // node 10 以上
                            // console.table([{"时间":time,"编码":code,"当前值":v,"MAX值":max,"MIN值":min}])
                        if(v<=min){
                            subject = `${result[0]}已经跌出预设min:${min},值为:${v}`;
                            sendMail(subject,html,()=>keyboard.messageBox(subject,"警告"));
                            
                        }else if(v>=max){
                            subject = `${result[0]}已经超出预设max:${max},值为:${v}`;
                            sendMail(subject,html, ()=>keyboard.messageBox(subject,"警告"));
                           
                        }
                    });
                },2000)

                watchers[code] = handle;

            break;
            default:
                fetch(params.modifier,(v,values)=>keyboard.output(values[8]))
            break;
        }
        
    }
}