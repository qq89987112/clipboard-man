let electron = require("electron");
let {remote} = electron;
let win = remote.getCurrentWindow();

let notifies = [];

win.on('$notify',(params)=>{
    notifies.forEach(item=>item(params))
});

Vue.prototype.$onNotify = (cb=()=>{})=>{
    notifies.push(cb);
}

Vue.prototype.$closeWindow = win.close.bind(win);


Vue.prototype.$getWindow = function(){
    return win;
}


Vue.prototype.$setResult = function(result,shouldClose=true){
    win.setResult(result);
    shouldClose&&this.$closeWindow();
};

Vue.prototype.$getParams = function(){
    return win.__params__;
};

