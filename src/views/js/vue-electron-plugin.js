let electron = require("electron");
let {remote} = electron;
let win = remote.getCurrentWindow();

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