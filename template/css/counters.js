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
            // 注意 for遍历的是counters
.counters{
  counter-increment:num;  
  .counter{
    &::before{
      content:counter(num);
      display: inline-block;
      border: 1px solid #20a0ff;
      border-radius: 50%;
      width: 15px;
      height: 15px;
      line-height: 15px;
      text-align: center;
      background-color: #20a0ff;
      font-size: 12px;
      margin-right: 15px;
      color: white;
    }
  }
}
        `
        }
    }
}