const child_process = require('child_process');
const electron = require('electron')
const iconv = require('iconv-lite');
// const {globalShortcut} = require('electron')
// Cannot read property 'register' of undefined
// globalShortcut.register("F2",()=>{
//     console.log("F2");
// });

// const child = child_process.spawn(electron,[require.resolve("./main.js")],{stdio:"inherit"});
const child = child_process.spawn(electron,[require.resolve("./main.js")]);

// 以下内容无效
// let str = "";
// child.stdout.on("readable",chunk=>{
//     str = "";
// })
// child.stdout.on("data",chunk=>{
//     str+=chunk;
// })
// child.stdout.on("end",()=>{
//     console.log(str);
// })

// 解决乱码
child.stdout.on('data', function (data) {
    var buffer = new Buffer(data);
    // var str = iconv.decode(buffer, 'utf-8').replace(/\s+/g,"");
    var str = iconv.decode(buffer, 'utf-8');
    console.log(str.trim());
});