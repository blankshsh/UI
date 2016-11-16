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
        var wrpname = cfg.name + 'loginbox';
        //console.log(wrpname);
        var loginbox_ = $('<div id="' + wrpname + '">');
        var h1_ = $('<h1 id="hold">');
        var btn_sure = $('<span class="btnSure">');
        var btn_cancel = $('<span class="btnCancel">');
        var size = $('<i id="changesize">');
        loginbox_.append(h1_).append(btn_sure).append(btn_cancel).append(size);
        $("body").prepend(loginbox_);
        me.bind(wrpname, cfg);
    },
    bind: function(wrpname, cfg) {
        var me = this;
        console.log(wrpname);
        wrpname = '#' + wrpname;
        me.box = $(wrpname);
        //console.log(wrpname);
        //console.log(me.box);
        me.title = $('' + wrpname + ' #hold');
        me.btnSure = $('' + wrpname + ' .btnSure');
        me.btnCancel = $('' + wrpname + ' .btnCancel');
        me.span = $('' + wrpname + ' span');
        me.loginbtn = $("#login");
        me.size = $('' + wrpname + " #changesize");
        me.assignment(wrpname, cfg);
    },
    assignment: function(wrpname, cfg) {
        var me = this;
        console.log(cfg);
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
        me.span.css({
            "width": "100px",
            "height": "40px",
            "display": "inline-block",
            "border-radius": "10px",
            "text-align": "center",
            "line-height": "40px",
            "cursor": "pointer",
            "-webkit-user-select": "none",
            "min-width": "100px",
            "min-height": "40px",
            "overflow": "hidden"
        });
        me.btnSure.css({
            "color": "#fff",
            "background-color": "#227700",
            "position": "absolute",
            "left": "50%",
            "top": "60%",
            "transform": "translate(-100%)",
            "margin-left": "-50px"
        });
        me.btnCancel.css({
            "color": "#fff",
            "background-color": "#ff0000",
            "position": "absolute",
            "left": "50%",
            "top": "60%",
            "margin-left": "50px"
        });
        me.size.css({
            "background": "#000",
            //"background": "transparent",
            "display": "block",
            "width": "20px",
            "height": "20px",
            "position": "absolute",
            "bottom": "0",
            "right": "0",
            "cursor": "se-resize"
        });
        me.box.css(cfg.box);
        me.title.css(cfg.title);
        me.span.css(cfg.span);
        me.btnSure.css(cfg.btnSure);
        me.btnCancel.css(cfg.btnCancel);
        cfg.title.text = cfg.title.text || "欢迎登录";
        cfg.btnSure.text = cfg.btnSure.text || "登录";
        cfg.btnCancel.text = cfg.btnCancel.text || "取消";
        me.title.text(cfg.title.text);
        me.btnSure.text(cfg.btnSure.text);
        me.btnCancel.text(cfg.btnCancel.text);
        me.click(wrpname, cfg);
    },
    click: function(wrpname, cfg) {
        var me = this;
        me.loginbtn.on("click", function() {
            //处理冒泡
            var e = window.event || event;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
            me.box.toggle();
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
        me.move(wrpname, cfg);
        me.changesize(wrpname, cfg);
    },
    move: function(wrpname, cfg) {
        //点击拖动事件
        var left, top;
        var me = this;
        var hold_ = '' + wrpname + ' #hold';
        //console.log(hold_);
        $(document).delegate(hold_, 'mousedown', function(e) {
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
            //console.log(hold_);
            var target = $this.parents(wrpname);
            //console.log(target);
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
            document.onclick = null;
            setTimeout(function() {
                document.onclick = function() {
                    me.box.hide();
                }
            }, 50)
        }
    },
    changesize: function(wrpname, cfg) {
        //点击变换大小事件
        var me=this;
        var width, height;
        console.log(me.box);
        var top = me.box.offsetTop;
        var left = me.box.offsetLeft;
        var me = this;
        var hold_ = '' + wrpname + ' #changesize';
        //console.log(hold_);
        $(document).delegate(hold_, 'mousedown', function(e) {
            width = e.clientX, height = e.clientY, $this = $(this).css('cursor', 'se-resize');
            this.setCapture ? (
                this.setCapture(),
                this.onmousemove = function(ev) {
                    mouseMove(ev || event);
                },
                this.onmouseup = mouseUp
            ) : $(document).bind("mousemove", mouseMove).bind("mouseup", mouseUp);
        });

        function mouseMove(e) {
            //console.log(hold_);
            var target = $this.parents(wrpname);
            var widthsize = e.clientX - width;
            var heightsize = e.clientY - height;
            //console.log(target.height());
            //console.log(widthsize);
            width = e.clientX;
            height = e.clientY;
            target.height(target.height() + heightsize + "px");
            target.width(target.width() + widthsize + "px") ;
            // target.css({
            //     "left":left,
            //     "top":top
            // })
        }

        function mouseUp(e) {
            var el = $this.css('cursor', 'se-resize').get(0);
            el.releaseCapture ?
                (
                    el.releaseCapture(),
                    el.onmousemove = el.onmouseup = null
                ) : $(document).unbind("mousemove", mouseMove).unbind("mouseup", mouseUp);
            document.onclick = null;
            setTimeout(function() {
                document.onclick = function() {
                    me.box.hide();
                }
            }, 50)
        }
    }

}
