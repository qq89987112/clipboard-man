const child_process = require('child_process');
const handle = require("./handle");
const electron = require('electron')

// const {globalShortcut} = require('electron')
// Cannot read property 'register' of undefined
// globalShortcut.register("F2",()=>{
//     console.log("F2");
// });

const child = child_process.spawn(electron,[require.resolve("./main.js")],{stdio:"inherit"});