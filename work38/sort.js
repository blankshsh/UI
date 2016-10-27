var cfg = {
    width: "150px",
    height: "40px",
    Content: ['姓名', '语文', '数学', '英语', '总分'],
    score: [
        ['小红', '70', '80', '90'],
        ['小明', '50', '90', '95'],
        ['张三', '60', '60', '80'],
        ['李四', '90', '80', '95'],
        ['王五', '70', '60', '75']
    ]
}
var wrptab = document.getElementById('tab');
wrptab.style.borderCollapse = "collapse";


var create = {
    //console.log(cfg);
    title: function(cfg) {
        //创建添加标题内容
        var row_length = cfg.Content.length, //行数
            col_length = cfg.score.length + 1; //列数
        var this_ = this;
        var tr_ = document.createElement('tr');
        for (var j = 0; j < row_length; j++) {
            var th_ = document.createElement('th');
            th_.innerHTML = cfg.Content[j];
            th_.style.width = cfg.width;
            th_.style.height = cfg.height;
            th_.style.position = "relative";
            th_.style.border = "1px solid #ccc";
            th_.style.color = "#fff";
            th_.style.backgroundColor = "#333";
            //console.log(th_);
            tr_.appendChild(th_);
            //console.log(tr_);
        }
        wrptab.appendChild(tr_);
        this_.score(cfg, row_length, col_length);
    },
    score: function(cfg, row_length, col_length) {
        //创建添加成绩
        var this_ = this;
        for (var i = 0; i < col_length - 1; i++) {
            //循环设置名字为th样式
            var tr_ = document.createElement('tr');
            var th_ = document.createElement('th');
            th_.innerHTML = cfg.score[i][0];
            th_.style.width = cfg.width;
            th_.style.height = cfg.height;
            th_.style.position = "relative";
            th_.style.border = "1px solid #ccc";
            tr_.appendChild(th_);
            //再次添加循环
            //写入成绩为td样式
            for (var k = 0; k < row_length - 2; k++) {
                var td_ = document.createElement('td');
                td_.innerHTML = cfg.score[i][k + 1];
                td_.style.width = cfg.width;
                td_.style.height = cfg.height;
                td_.style.position = "relative";
                td_.style.textAlign = "center";
                td_.style.border = "1px solid #ccc";
                tr_.appendChild(td_);
            }

            //计算成绩总和并输出为td格式
            var td_ = document.createElement('td');
            td_.innerHTML = sum(i);

            function sum(i) {
                var sum = 0;
                for (var s = 1; s < col_length - 2; s++) {
                    //console.log(cfg.score[i][s]);
                    sum += Number(cfg.score[i][s]);
                }
                return sum;
                //console.log(sum);
            }
            //console.log(td_);
            td_.style.width = cfg.width;
            td_.style.height = cfg.height;
            td_.style.position = "relative";
            td_.style.textAlign = "center";
            td_.style.border = "1px solid #ccc";
            tr_.appendChild(td_);
            wrptab.appendChild(tr_);
        }
        wrptab.style.margin = "100px auto";
        this_.btn(cfg);
    },
    btn: function(cfg) {
        var wrptab = document.getElementById('tab');
        var tr01 = wrptab.childNodes[0].childNodes;
        //console.log(tr01);
        addbtnup(cfg);
        addbtndown(cfg);

        function btnclick(divNode, flag, cfg) {
            divNode.addEventListener('click', function(eve) {
                //console.log(cfg)
                var row_length = cfg.Content.length,
                    col_length = cfg.score.length;
                var content = eve.target.parentNode.innerHTML.split('<')[0],
                    tab = document.getElementById('tab'),
                    listNum = cfg.Content.indexOf(content),
                    oldList = [],
                    newList = [],
                    trList = tab.childNodes;
                //取出要排序的数据，保存在数组中
                for (var i = 0; i < col_length; i++) {
                    console.log(trList[i + 1].childNodes[listNum].innerHTML);
                    oldList.push(trList[i + 1].childNodes[listNum].innerHTML);
                    console.log(oldList);
                }

                for (var i = 0; i < oldList.length - 1; i++) {
                    var max = oldList[i];
                    if (max > oldList[i + 1]) {
                        max = oldList[i + 1]
                    }
                }





                //得到所要求经排序后的数组
                //降序排序
                // newList = sortList.sort(sortNumber);
                // //需要升序则取反
                // if (!flag) {
                //     newList = newList.reverse();
                // }
                // //获得当前列的数据分布情况
                // sortList = [];
                // for (i = 0; i < col_length; i++) {
                //     sortList.push(trList[i+1].childNodes[listNum].innerHTML);
                // }
                // //根据前后两个数组，重新排序列表项
                // changeOrder(newList, sortList);

                // function sortNumber(a, b) {
                //     return b - a;
                // }
                // //根据排序结果重新排列行序
                // function changeOrder(newList, oldList) {
                //     var len = newList.length,
                //         pos_before,
                //         pos_now,
                //         trList = tab.childNodes,
                //         tempNode = document.createElement('tr'),
                //         temp;
                //     for (var k = 0; k < len; k++) {
                //         //记录当前值在新表中位置，并寻找当前值在原表中的位置
                //         pos_now = k;
                //         pos_before = oldList.indexOf(newList[k]);
                //         //如果当前值在两个表中的位置不一样，则交换两个节点的内容
                //         if (pos_now !== pos_before) {
                //             tempNode.innerHTML = trList[pos_before + 1].innerHTML;
                //             trList[pos_before + 1].innerHTML = trList[pos_now + 1].innerHTML;
                //             trList[pos_now + 1].innerHTML = tempNode.innerHTML;
                //             //更新表的内容
                //             temp = oldList[pos_before];
                //             oldList[pos_before] = oldList[pos_now];
                //             oldList[pos_now] = temp;
                //         }
                //     }
                // }
            }, false);
            return divNode;
        }

        function addbtnup(cfg) {
            for (var i = 1; i < tr01.length; i++) {
                //console.log(tr01[i]);
                var span_ = document.createElement('span');
                span_.style.cssText = "display:block;width: 0px;height: 0px;border-left: 8px solid transparent;border-right: 8px solid transparent;cursor: pointer;position: absolute;right: 30px;border-bottom: 10px solid rgb(255, 255, 255);top: 9px;"
                btnclick(span_, false, cfg);
                tr01[i].appendChild(span_);

            }
        }

        function addbtndown(cfg) {
            for (var i = 1; i < tr01.length; i++) {
                //console.log(tr01[i]);
                var span_ = document.createElement('span');
                span_.style.cssText = "display:block;width: 0px;height: 0px;border-left: 8px solid transparent;border-right: 8px solid transparent;cursor: pointer;position: absolute;right: 30px;border-top: 10px solid rgb(255, 255, 255);top: 23px;"
                btnclick(span_, true, cfg);
                tr01[i].appendChild(span_);
            }
        }

    }
}

create.title(cfg);
