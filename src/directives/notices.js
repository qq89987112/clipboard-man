import keyboard from "../js/keyboard";
import store from "../../../store";
import utils from "../js/utils";

export default {
    validate:/^\$notices/,
    handle(result){
        let [name,params] = utils.parseLineToObject(result[0]);
        let modifier = params.modifier;
        let {notices} = store.getState();
        keyboard.output(notices.map((item, index) => `$$${index}：${JSON.stringify(Object.entries(item.params).reduce((prev, cur) => {
            prev[cur[0]] = modifier ? cur[1].slice(0, modifier) : '...';
            return prev;
        }, {}))}`).join('\r\n').trim());
    }
}