# UI
#login //UI弹窗登录组件可拖动
#调用moving.init()就能使用
moving.init({
		//有默认样式
		//微软雅黑 文本居中 页面fixed居中 字体为20px
		//提供css接口，可以直接自行定义CSS，以及text接口用来定义文本内容
		box:{
            // width:500,
            // height:600
        },
        button:{
            // width:30,
            // height:30
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