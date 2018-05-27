
const handle = require("./handle");
const iohook = require("iohook");

//  这个不可以拦截。
// const id = iohook.on('keydown', (e) => {
//     // console.log(e)
//     switch(e.keycode){
//         //F4
//         case 62:
            
//             handle();
//         break;
//     }
// });

//  这个不可以拦截。
iohook.registerShortcut([62],()=>{
    handle();
});

iohook.start();