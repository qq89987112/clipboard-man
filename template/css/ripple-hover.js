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
            .ripple-hover {
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);

  &::before,&::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #000 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(0,0);
    opacity: .2;
    transition: 0s;
  }

  &:hover:after {
    transform: scale(10,10);
    opacity: 0;
    transition: transform .5s, opacity 1s;
  }

  // 以下内容控制移开时的效果
  // &::before{
  //   transform: scale(0,0);
  //   opacity: .1;
  //   transition: transform .5s, opacity 1s;
  // }
  
  // &:hover::before{
  //   transform: scale(10,10);
  //   opacity: 0.1;
  //   transition: 0s;
  // }
}
        `
        }
    }
}