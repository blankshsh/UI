
#调用LoginBox 
```ruby
demo实现内容：
点击登录按钮：显示或隐藏登录框
关闭登录框：点击确定、取消或者页面
拖动效果：点击登录框的标题，便能拖动页面；
细节处理：  1阻止点击事件的冒泡传递
            2计算left top的最大最小值
             设置拖动登录框无法超出显示页面的边距
            3处理onmouseup后不解绑事件就会造成拖动bug
            4处理拖动时鼠标超出页面外时误触页面的click事件
             处理方法为mouseup后解绑click事件
             并设置setTimeout在短时间内在重新绑定click事件
            5在页面大小发生变化时 重写元素的位置
``` 
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
    name: "blank",//name接口为元素组合创建不重复的id
    box: {
        //css 以""方式写入需要自写的样式
        css:"width:500px;height: 600px"
    },
    span: {
        css:"width:300px;height:600px"
    },
    title: {
        //text接口 可以为能显示文本的内容创建自定义的文本
        text: "登录框"
    },
    btnSure: {
        text: "确定",
        css:"text-align:left",
        text:'确定登录框登录框登录框登录框登录框',
    },
    btnCancel: {
        text: "错误"
    }
})

    JS说明
    单例模式封装
    /*
        init() //创建获取传输的内容
        base()//创建添加页面元素
        bind() //绑定页面元素
        assignment() //为页面元素添加样式
        click()//绑定点击事件
        move() //点击拖动事件
    */
   
``` 
