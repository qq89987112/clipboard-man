function template() {

    return {
        parameters: {

        },
        requestLib: {

        },
        //放在文件夹里时有用
        events: {},
        compile(params, context) {
            const {} = params;

            context && context.notify(undefined, undefined, {

            });
            return `
            .material-icon{
  display: inline-block;
  border: 1px solid #20a0ff;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  background-color: #20a0ff;
  color: white;
  box-shadow: 0 0 10px #666;
  cursor: pointer;
}
        `
        }
    }
}