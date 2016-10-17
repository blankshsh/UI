var moving = {
    init: function(cfg) {
        cfg = cfg || {};
        cfg.box = cfg.box || {};
        cfg.title = cfg.title || {};
        cfg.button = cfg.button || {};
        cfg.btnSure = cfg.btnSure || {};
        cfg.btnCancel = cfg.btnCancel || {};
        // console.log(cfg);
        // console.log(cfg.title);
        // console.log(cfg.btnSure);
        // console.log(cfg.btnCancel);
        var me = this;
        me.base(); //组件（创建内容）
        me.bind(); //绑定（绑定元素）
        me.assignment(cfg); //创建样式（为元素添加样式）
        me.click(); //点击事件
        me.move(); //移动事件
    },
    base: function() {
        var me = this;
        var loginbox_ = $('<div id="loginbox">');
        var h1_ = $('<h1 id="hold">');
        var btn_sure = $('<button class="btnSure">');
        var btn_cancel = $('<button class="btnCancel">');
        loginbox_.append(h1_).append(btn_sure).append(btn_cancel);
        $("body").prepend(loginbox_);

    },
    bind: function() {
        var me = this;
        me.box = $("#loginbox");
        me.title = $("#hold");
        me.btnSure = $(".btnSure");
        me.btnCancel = $(".btnCancel");
        me.button = $("button");
        me.loginbtn = $("#login");
    },
    assignment: function(cfg) {
        var me = this;
        //console.log(cfg);
        //console.log(me.hold);
        me.box.css({
            "width": "500px",
            "height": "200px",
            "background-color": "#f0f0f0",
            "border-radius": "10px",
            "position": "fixed",
            "left": "50%",
            "top": "50%",
            "transform": "translate(-50%, -50%)",
            "display": "none",
            "min-width": "500px",
            "min-height": "200px",
        });
        me.title.css({
            "display": "block",
            "text-align": "center",
            "padding": "10px",
            "line-height": "40px",
            "cursor": "move",
            "-webkit-user-select": "none",
            "font-weight": "normal",
            "font-size": "20px"
        });
        me.button.css({
            "width": "100px",
            "height": "40px",
            "display": "inline-block",
            "border-radius": "10px",
            "text-align": "center",
            "line-height": "40px",
            "cursor": "pointer",
            "-webkit-user-select": "none",
            "min-width":"100px",
            "min-height": "40px",
            "overflow":"hidden"
        });
        me.btnSure.css({
            "color": "#fff",
            "background-color": "#227700",
            "position": "absolute",
            "left": "50%",
            "top": "60%",
            "transform": "translate(-100%)",
            "margin-left":"-50px"
        });
        me.btnCancel.css({
            "color": "#fff",
            "background-color": "#ff0000",
            "position": "absolute",
            "left": "50%",
            "top": "60%",
            "margin-left":"50px"
        });
        me.box.css(cfg.box);
        me.title.css(cfg.title);
        me.button.css(cfg.button);
        me.btnSure.css(cfg.btnSure);
        me.btnCancel.css(cfg.btnCancel);
        cfg.title.text = cfg.title.text || "欢迎登录";
        cfg.btnSure.text = cfg.btnSure.text || "登录";
        cfg.btnCancel.text = cfg.btnCancel.text || "取消";
        me.title.text(cfg.title.text);
        me.btnSure.text(cfg.btnSure.text);
        me.btnCancel.text(cfg.btnCancel.text);
    },
    click: function() {
        var me = this;
        me.loginbtn.on("click", function() {
            //处理冒泡
            var e = window.event || event;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
            me.box.show();
        })
        me.btnSure.on("click", function() {
            me.box.hide();
        })
        me.btnCancel.on("click", function() {
            me.box.hide();
        })
        me.box.on("click", function(event) {
            //处理冒泡
            var e = window.event || event;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
        })
        document.onclick = function() {
            me.box.hide();
        }
    },
    move: function() {
        //点击拖动事件
        var left, top;
        var me = this;
        $(document).delegate('#hold', 'mousedown', function(e) {
            left = e.clientX, top = e.clientY, $this = $(this).css('cursor', 'move');
            this.setCapture ? (
                this.setCapture(),
                this.onmousemove = function(ev) {
                    mouseMove(ev || event);
                },
                this.onmouseup = mouseUp
            ) : $(document).bind("mousemove", mouseMove).bind("mouseup", mouseUp);
        });

        function mouseMove(e) {
            var target = $this.parents('#loginbox');
            var l = Math.max((e.clientX - left + Number(target.css('margin-left').replace(/px$/, '')) || 0), -target.position().left);
            var t = Math.max((e.clientY - top + Number(target.css('margin-top').replace(/px$/, '')) || 0), -target.position().top);
            l = Math.min(l, $(window).width() - target.width() - target.position().left);
            t = Math.min(t, $(window).height() - target.height() - target.position().top);
            left = e.clientX;
            top = e.clientY;
            target.css({
                'margin-left': l,
                'margin-top': t
            });
        }

        function mouseUp(e) {
            var el = $this.css('cursor', 'default').get(0);
            el.releaseCapture ?
                (
                    el.releaseCapture(),
                    el.onmousemove = el.onmouseup = null
                ) : $(document).unbind("mousemove", mouseMove).unbind("mouseup", mouseUp);
        }
    }
}
