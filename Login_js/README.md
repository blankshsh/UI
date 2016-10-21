
#调用LoginBox 
##调用LoginBox.init()就能使用登录弹窗组件。
###此弹窗由一个h1标题栏，两个span构建的按钮组成。
###各个接口对应的元素
###name>>为整体添加一个自定义名字，防止id冲突。
###box>>弹窗外包装
###title>>标题h1元素
###span>>按钮的span元素
###btnSure>>确认按钮
###btnCancel>>取消按钮
###弹窗组件已定义基础样式，也可复写样式。
```ruby  

1)	直接使用LoginBox.init();创建弹框
2)  使用接口自定义样式
    所有内容均有默认样式，可只选择需要的接口
    LoginBox.init({
        name:"blank",
        box:{
            width:500,
            height:600
        },
        span:{
            width:30,
            height:30
        },
        title: {
            text:"登录框"
        },
        btnSure: {
            text:"确定"
            //"text-align": "left",
            //text:"确定登录框登录框登录框登录框登录框"
        },
        btnCancel:{
            text:"错误"
        }
    })

``` 
