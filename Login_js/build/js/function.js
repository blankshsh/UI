function g_i(name) {
    return document.getElementById(name);
}

function g_c(name) {
    return document.getElementsByClassName(name);
}

function g_t(name) {
    return document.getElementsByTagName(name);
}

function create(name) {
    return document.createElement(name);
}
var LoginBox = {
    /*
        init //组件（创建内容）
        bind(); //绑定（绑定元素）
        assignment(); //创建样式（为元素添加样式）
        click(); //点击事件
        move(); //移动事件
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
        me.base(cfg); //组件（创建内容）
    },
    base: function(cfg) {
        //console.log(name);
        var me = this;
        name_ = cfg.name;
        //console.log(name_);
        var loginbox_ = create('div'),
            h1_ = create('h1'),
            btn_sure = create('span'),
            btn_cancel = create('span');
        loginbox_.id = name_ + 'loginbox';
        h1_.id = name_ + "hold";
        btn_sure.id = name_ + "btnSure";
        btn_cancel.id = name_ + "btnCancel";
        loginbox_.appendChild(h1_);
        loginbox_.appendChild(btn_sure);
        loginbox_.appendChild(btn_cancel);
        document.body.appendChild(loginbox_);
        //console.log(loginbox_);
        me.bind(name_, cfg);
    },
    bind: function(name_, cfg) {
        var me = this;
        me.box = g_i(name_ + 'loginbox');
        me.title = g_i(name_ + "hold");
        me.btnSure = g_i(name_ + "btnSure");
        me.btnCancel = g_i(name_ + "btnCancel");
        me.span = me.box.getElementsByTagName('span');
        me.loginbtn = g_i("login");
        //aba=me.box.childNodes[0].className;
        // console.log(me.box);
        // console.log(me.title);
        // console.log(me.btnSure);
        // console.log(me.btnCancel);
        // console.log(me.span);
        // console.log(me.loginbtn);
        me.assignment(name_, cfg);
    },
    assignment: function(name_, cfg) {
        var me = this;
        me.box.style.cssText += "display:none;width: 500px;height: 200px;background-color: #f0f0f0;border-radius: 10px;position: fixed;left: 50%;top: 50%;transform: translate(-50%, -50%);min-width: 500px;min-height: 200px";
        me.title.style.cssText += "display:block;text-align:center;padding:10px;line-height:40px;cursor:move;-webkit-user-select:none;font-weight:normal;font-size:20px";
        var span_ = me.span;
        for (var i = 0; i < span_.length; i++) {
            span_[i].style.cssText += "white-space: nowrap;text-overflow:ellipsis;width: 100px;height: 40px;max-width:180px;max-height:60px;display: inline-block;border-radius: 10px;text-align: center;line-height: 40px;cursor: pointer;-webkit-user-select: none;min-width: 100px;min-height: 40px;overflow: hidden";
        }
        me.btnSure.style.cssText += "color: #fff;background-color: #227700;position: absolute;left: 50%;top: 60%;transform: translate(-100%);margin-left: -50px";
        me.btnCancel.style.cssText += "color: #fff;background-color: #ff0000;position: absolute;left: 50%;top: 60%;margin-left: 50px";
        me.box.style.cssText += cfg.box.css;
        for (var i = 0; i < me.span.length; i++) {
            //console.log(me.span[i]);
            //console.log(cfg.span.css);
            me.span[i].style.cssText += cfg.span.css;
        }
        me.btnSure.style.cssText += cfg.btnSure.css;
        me.btnCancel.style.cssText += cfg.btnCancel.css;
        !cfg.title.text ? me.title.textContent = "欢迎登录" : me.title.textContent = cfg.title.text;
        !cfg.btnSure.text ? me.btnSure.textContent = "登录" : me.btnSure.textContent = cfg.btnSure.text;
        !cfg.btnCancel.text ? me.btnCancel.textContent = "取消" : me.btnCancel.textContent = cfg.btnCancel.text;
        me.click(name_, cfg);
    },
    click: function(name_, cfg) {
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
        }
        me.move(name_, cfg);
    },
    move: function(name_, cfg) {
        //点击拖动事件
        var me = this;
        var clientX, clientY, moving;
        var mouseDown = function(event) {
            event = event || window.event;
            clientX = event.clientX;
            clientY = event.clientY;
            moving = !0;
            document.onmousemove = function(e) {
                mouseMove(e);
            }
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
        }
        var mouseMove = function(event) {
            if (!moving) return;
            event = event || window.event;
            var newClientX = event.clientX;
            var newClientY = event.clientY;
            var top = me.box.offsetTop;
            var left = me.box.offsetLeft;
            var min_t = (Number(me.box.style.height.replace(/px$/, '')) / 2 || 0);
            var min_l = (Number(me.box.style.width.replace(/px$/, '')) / 2 || 0);
            var max_t = window.innerHeight - (Number(me.box.style.height.replace(/px$/, '')) / 2 || 0);
            var max_l = window.innerWidth - (Number(me.box.style.width.replace(/px$/, '')) / 2 || 0);
            newleft = left + (newClientX - clientX);
            newtop = top + (newClientY - clientY);
            console.log(newleft);
            if (newleft < min_l) {
                me.box.style.left = min_l + "px";
                console.log(me.box.style.left);
            } else if (newleft > max_l) {
                me.box.style.left = max_l + "px";

            } else {
                me.box.style.left = newleft + "px"
            }
            if (newtop < min_t) {
                me.box.style.top = min_t + "px"
            } else if (newtop > max_t) {
                me.box.style.top = max_t + "px";
            } else {
                me.box.style.top = newtop + "px"
            }
            clientX = newClientX;
            clientY = newClientY;
        }
        me.title.addEventListener('mousedown', mouseDown);
        //me.documentclick();
        window.onresize = function(e) {
                console.log(me.box);
                me.box.style.left = "50%";
                me.box.style.top = "50%";
        }
    },

}
