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
            // <div class="steps">
  //      <div class="step">1</div>
  //      <div class="step">2</div>
  //      <div class="step active">3</div>
  //      <div class="step">4</div>
  //      <div class="step">5</div>
  // </div>

  .steps{
    overflow:hidden;
    position:relative;
    z-index: 1;
  //   not active
    .step.active ~ .step{
      color:#999;
      &::before{
        background-color:#999;
      }
      &::after{
        background-color:#999;
      }
    }
    .step{
      position:relative;
      float:left;
      width:6em;
      text-align: center;
      
      &.active::after{
        background-color:#999 !important;
      }
      //dot
      &::before{
        content:'';
        display:block;
        background-color:#20a0ff;
        margin:0 auto;
        width: 10px;
        height: 10px;
        border-radius:50%;
      }
      // line
      &:not(:last-of-type)::after{
        content:'';
        display:block;
        height:1px;
        background-color:#20a0ff;
        position:absolute;
        left:50%;
        width:100%;
        top:5px;
        z-index:-1;
      }
    }
  }
        `
        }
    }
}