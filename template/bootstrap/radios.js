
                function template() {

return {
    parameters:{
        
    },
    requestLib:{

    },
    //放在文件夹里时有用
    events:{
    },
    compile(params,context) {
        const {} = params;
        
         context&&context.notify(undefined,undefined,{
                
        });
        return `
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
  <label class="btn btn-secondary active">
    <input type="radio" name="options" id="option1" autocomplete="off" checked> Active
  </label>
  <label class="btn btn-secondary">
    <input type="radio" name="options" id="option2" autocomplete="off"> Radio
  </label>
  <label class="btn btn-secondary">
    <input type="radio" name="options" id="option3" autocomplete="off"> Radio
  </label>
</div>
        `
    }
}
}