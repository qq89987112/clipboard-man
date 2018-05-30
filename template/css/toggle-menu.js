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
            .toggle-menu{
            background-color: #20a0ff;
            position: absolute;
            right: 20px;
            bottom: 20px;
            width: 37px;
            height: 37px;
            transition: 
                width .3s ease,
                border-radius 0.6s ease,
                background-color 0.6s ease,
                border-color 0.6s ease;
            overflow: hidden;
            border-radius: 50%;
            white-space: nowrap;
            border: 1px solid transparent;

            &:hover{
                width: 180px;
                border-radius: 5px;
                background-color: transparent;
                border-color:#20a0ff;
                .material-icon{
                    opacity: 0;
                    display: none;
                }
                .operation{
                    display: block;
                }
            }

            .material-icon{
                width: 37px;
                height: 37px;
                line-height: 37px;
                display: block;
                margin: 0 auto;
                opacity: 1;
                background-color: transparent;
                box-shadow: none;
                border: none;
            }

            .operation{
                padding: 5px;
                display: none;
            }
        }
        `
        }
    }
}