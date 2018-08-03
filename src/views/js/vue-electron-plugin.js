let electron = require("electron");
let {remote} = electron;
let win = remote.getCurrentWindow();

let notifies = {};

win.$notify = (name,params)=>{
        let name = item.name;
        if(name){
            let arr = notifies[name] || [];
            arr.forEach(item=>item(params))
        }
}

Vue.prototype.$onNotify = (name,cb=()=>{})=>{
    if(name){
        let arr = notifies[name] || [];
        arr.push(cb);
        notifies[name] = arr;
    }
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

