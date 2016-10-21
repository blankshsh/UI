function g_i(name) {
    return document.getElementById(name);
}

function create(name) {
    return document.createElement(name);
}
var LoginBox = {
    /*
        init() //创建获取传输的内容
        base()//创建页面元素
        bind() //绑定元素
        assignment() //创建样式（为元素添加样式）
        click()//点击事件
        move() //移动事件
    */
    init: function(cfg) {
        cfg = cfg || {};
        //console.log(cfg);
        cfg.name = cfg.name || "";
        cfg.box = cfg.box || {};
        cfg.title = cfg.title || {};
        cfg.span = cfg.span || {};
        cfg.btnSure = cfg.btnSure || {};
        cfg.btnCancel = cfg.btnCancel || {};
        // console.log(cfg);
        // console.log(cfg.title);
        // console.log(cfg.btnSure);
        // console.log(cfg.btnCancel);
        var me = this;
        //运行创建内容函数
        me.base(cfg);
    },
    base: function(cfg) {
        var me = this;
        name_ = cfg.name;
        //创建元素
        var loginbox_ = create('div'),
            h1_ = create('h1'),
            btn_sure = create('span'),
            btn_cancel = create('span');
        loginbox_.id = name_ + 'loginbox';
        h1_.id = name_ + "hold";
        btn_sure.id = name_ + "btnSure";
        btn_cancel.id = name_ + "btnCancel";
        //添加元素
        loginbox_.appendChild(h1_);
        loginbox_.appendChild(btn_sure);
        loginbox_.appendChild(btn_cancel);
        document.body.appendChild(loginbox_);
        //运行绑定函数（绑定元素）
        me.bind(name_, cfg);
    },
    bind: function(name_, cfg) {
        //绑定元素
        var me = this;
        me.box = g_i(name_ + 'loginbox');
        me.title = g_i(name_ + "hold");
        me.btnSure = g_i(name_ + "btnSure");
        me.btnCancel = g_i(name_ + "btnCancel");
        me.span = me.box.getElementsByTagName('span');
        me.loginbtn = g_i("login");
        //运行添加样式函数
        me.assignment(name_, cfg);
    },
    assignment: function(name_, cfg) {
        //添加样式
        var me = this;
        me.box.style.cssText += "display:none;width: 500px;height: 200px;background-color: #f0f0f0;border-radius: 15px;position: fixed;left: 50%;top: 50%;transform: translate(-50%, -50%);min-width: 500px;min-height: 200px";
        me.title.style.cssText += "margin:0px;display:block;text-align:center;padding:15px;line-height:40px;cursor:move;-webkit-user-select:none;font-weight:normal;font-size:20px";
        var span_ = me.span;
        for (var i = 0; i < span_.length; i++) {
            span_[i].style.cssText += "overflow:hidden;white-space: nowrap;text-overflow:ellipsis;width: 100px; height: 40px;max-width:180px;max-height:60px;display: inline-block; text-align: center;cursor: pointer;-webkit-user-select: none;min-width: 100px;min-height: 40px;overflow: hidden；font-size:14px;vertical-align: middle;border-radius:10px;";

        }
        me.btnSure.style.cssText += "color: #fff;background-color: #357ebd;border-color: #428bca;position: absolute;left: 50%;top: 60%;transform: translate(-100%);margin-left: -50px";
        me.btnCancel.style.cssText += "color: #fff; background-color: #d9534f; border-color: #d43f3a;position: absolute;left: 50%;top: 60%;margin-left: 50px";
        me.box.style.cssText += cfg.box.css;
        for (var i = 0; i < me.span.length; i++) {
            me.span[i].style.cssText += cfg.span.css;
            var lineheight_ = Number(me.span[i].style.height.replace(/px$/, ''));
            var maxheight_ = Number(me.span[i].style.maxHeight.replace(/px$/, ''));
            // console.log(maxheight_);
            lineheight_ < maxheight_ ? span_[i].style.lineHeight = lineheight_ + "px" : span_[i].style.lineHeight = maxheight_ + "px";
        }
        //获取用户新建的样式 并覆盖样式表
        me.btnSure.style.cssText += cfg.btnSure.css;
        me.btnCancel.style.cssText += cfg.btnCancel.css;
        //判断用户是否自定义文本内容
        !cfg.title.text ? me.title.textContent = "欢迎登录" : me.title.textContent = cfg.title.text;
        !cfg.btnSure.text ? me.btnSure.textContent = "登录" : me.btnSure.textContent = cfg.btnSure.text;
        !cfg.btnCancel.text ? me.btnCancel.textContent = "取消" : me.btnCancel.textContent = cfg.btnCancel.text;
        //运行绑定点击事件函数
        me.click(name_, cfg);
    },
    click: function(name_, cfg) {
        //点击事件
        var me = this;
        me.loginbtn.addEventListener('click', function() {
            //处理冒泡
            var e = window.event || event;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
            me.box.style.display = me.box.style.display == 'block' ? 'none' : 'block';
        })
        me.btnSure.addEventListener('click', function() {
            me.box.style.display = "none";
        })
        me.btnCancel.addEventListener('click', function() {
            me.box.style.display = "none";
        })
        me.box.addEventListener('click', function() {
            //处理冒泡
            var e = window.event || event;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
        })
        document.onclick = function() {
            me.box.style.display = "none";
        };
        //运行点击拖动函数
        me.move(name_, cfg);
    },
    move: function(name_, cfg) {
        //点击拖动事件
        var me = this;
        //创建储存位移值元素
        var clientX, clientY, moving;
        var mouseDown = function(event) {
            event = event || window.event;
            clientX = event.clientX;
            clientY = event.clientY;
            moving = !0;
            //鼠标move 运行mouseMove()函数
            document.onmousemove = function(e) {
                    mouseMove(e);
                }
                //鼠标up  解除绑定跟onmousemove onmouseup
                //解除document.onclick事件 处理移动范围过大造成的误触隐藏事件
                //使用延时器 重新添加document.onclick隐藏box的事件
            document.onmouseup = function(e) {
                event = event || window.event;
                document.onmouseup = null;
                document.onmousemove = null;
                document.onclick = null;
                setTimeout(function() {
                        document.onclick = function() {
                            me.box.style.display = "none";
                        }
                    }, 50)
                    // me.title.removeEventListener('mousedown', mouseDownHandler);
                    // me.title.removeEventListener('mousemove', mouseMoveHandler);
                    // me.title.removeEventListener('mouseup', mouseUpHandler);
            }
        };
        var mouseMove = function(event) {
            //拖动事件的主函数
            if (!moving) return;
            event = event || window.event;
            //新建拖动后的元素位置
            var newClientX = event.clientX;
            var newClientY = event.clientY;
            //获取元素离top left的距离
            var top = me.box.offsetTop;
            var left = me.box.offsetLeft;
            //计算元素应该距离left和top的最小值
            var min_t = (Number(me.box.style.height.replace(/px$/, '')) / 2 || 0);
            var min_l = (Number(me.box.style.width.replace(/px$/, '')) / 2 || 0);
            //计算元素应该距离left和top的最大值
            var max_t = window.innerHeight - (Number(me.box.style.height.replace(/px$/, '')) / 2 || 0);
            var max_l = window.innerWidth - (Number(me.box.style.width.replace(/px$/, '')) / 2 || 0);
            //赋值最终的拖动距离
            newleft = left + (newClientX - clientX);
            newtop = top + (newClientY - clientY);
            //console.log(newleft);
            //判读输出  box.left box.top必须在最小值和最大值之间
            var endleft = Math.max(newleft, min_l);
            var endleft = Math.min(endleft, max_l);
            var endtop = Math.max(newtop, min_t);
            var endtop = Math.min(endtop, max_t);
            //赋值最终计算结果给被拖动的元素
            me.box.style.left = endleft + "px";
            me.box.style.top = endtop + "px";
            //新位置记录赋值
            clientX = newClientX;
            clientY = newClientY;
        };
        //绑定鼠标拖动的监听事件
        me.title.addEventListener('mousedown', mouseDown);
        //当窗口改变时 运行重排列
        window.onresize = function(e) {
            //console.log(me.box);
            me.box.style.left = "50%";
            me.box.style.top = "50%";
        }
    }
}
