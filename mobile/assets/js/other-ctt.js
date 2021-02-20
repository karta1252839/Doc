/*//客服链接
function onlineService() {
	var openUrl = "http://chat56.live800.com/live800/chatClient/chatbox.jsp?companyID=841307&configID=127143&jid=5298340705";//弹出窗口的url
	var iWidth=800; //弹出窗口的宽度;
	var iHeight=600; //弹出窗口的高度;
	var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
	var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;	
	window.open(openUrl,"","height="+iHeight+", width="+iWidth+", top="+iTop+", left="+iLeft);return false;
}
//qq链接
function openQQ() {
//	window.location.href="tencent://message/?uin=3222222253&Site=qq&Menu=yes";
}
function openQQ1() {
	window.location.href="tencent://message/?uin=836675888&Site=qq&Menu=yes";
}
function openQQ2() {
	window.location.href="tencent://message/?uin=846675888&Site=qq&Menu=yes";
}*/

//客服链接
function onlineService(link) {
    //
    var openUrl = link;//弹出窗口的url
    var iWidth = 800; //弹出窗口的宽度;
    var iHeight = 600; //弹出窗口的高度;
    var iTop = (window.screen.availHeight - 30 - iHeight) / 2; //获得窗口的垂直位置;
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; //获得窗口的水平位置;
    window.open(openUrl, "", "height=" + iHeight + ", width=" + iWidth + ", top=" + iTop + ", left=" + iLeft); return false;
}
//qq链接
function openQQ(qqNum) {
    window.location.href = "tencent://message/?uin=" + qqNum + "&Site=qq&Menu=yes";
}

/*if($(".right-content").size() > 0){
	if($(".left-nav").size() > 0){
		if ($(".right-content").height() < $(".left-nav").height()) {
			$(".left-nav").height($(".left-nav dl").height())
		} else {
			$(".left-nav").height($(".right-content").height())
		}
	}
}
*/
function shake(element, className, times) {
    var i = 0,
        t = false,
        o = element.attr("class"),
        c = "",
        times = times || 2;
    if (t) return;
    t = setInterval(function () {
        i++;
        c = i % 2 ? o + ' ' + className : o;
        element.attr("class", c);

        if (i == 2 * times) {
            clearInterval(t);
            element.removeClass(className);
        }
    }, 500);
};
$(function () {
    //domready 就闪动
    shake($(".box"), "resd", -1);
    shake($(".box1"), "resd1", -1);
});
//悬浮窗
$(function () {
    $("#xyzp").attr("href", "http://www.qcai168.cc/");
})


function chooseLineLotto() {
    layer.open({
        title: [
		        '请选择线路：'
        ]
		, content: ''
		, btn: ['线路1', '线路2', '线路3']
		, anim: 'up'
		, shadeClose: true
		, yes: function (index, layero) {
		    playGameMobile('LOTTO_IG', '', '1');//按钮【按钮一】的回调
		}, btn2: function (index, layero) {
		    playGameMobile('LOTTO_IG', '', '2');//按钮【按钮二】的回调
		}, btn3: function (index, layero) {
		    playGameMobile('LOTTO_IG', '', '3');//按钮【按钮三】的回调
		}
		, cancel: function () {
		    //右上角关闭回调
		}
    });
}
function chooseLineLottery() {
    layer.open({
        title: [
		        '请选择线路：'
        ]
		, content: ''
		, btn: ['线路1', '线路2', '线路3']
		, anim: 'up'
		, shadeClose: true
		, yes: function (index, layero) {
		    playGameMobile('LOTTERY_IG', '2', '1');//按钮【按钮一】的回调
		}, btn2: function (index, layero) {
		    playGameMobile('LOTTERY_IG', '2', '2');//按钮【按钮二】的回调
		}, btn3: function (index, layero) {
		    playGameMobile('LOTTERY_IG', '2', '3');//按钮【按钮三】的回调
		}
		, cancel: function () {
		    //右上角关闭回调
		}
    });
}



function popupDiv(div_id) {
    var div_obj = $("#" + div_id);
    var posLeft = ($(window).width() - div_obj.width()) / 2;
    var posTop = ($(window).height() - div_obj.height()) / 2;
    //添加并显示遮罩层
    $("<div id='mask'></div>").addClass("mask").appendTo("body").fadeIn(200);
    //fadeIn() 方法使用淡入效果来显示被选元素
    div_obj.css({ "top": posTop + 55, "left": posLeft - 39 }).fadeIn();
}

function hideDiv(div_id) {
    $("#mask").remove();
    //fadeOut() 方法使用淡出效果来隐藏被选元素
    $("#" + div_id).fadeOut();
}

$(function () {
    $(".public_opss dl dd").hover(
        function () {
            $(this).find(".daskssss").stop().delay(50).animate({ "top": 0, opacity: 0.8 }, 300)
        },
        function () {
            $(this).find(".daskssss").stop().animate({ "top": -200, opacity: 0 }, 300)
        }

    )
})
$(function () {
    $(".main_content dl").hover(
        function () {
            $(this).find(".dask").stop().delay(50).animate({ "top": 0, opacity: 0.8 }, 300)
        },
        function () {
            $(this).find(".dask").stop().animate({ "top": -10, opacity: 0 }, 300)
        }

    )
})

function AddFavorite(sURL, sTitle) {
    sURL = encodeURI(sURL);
    try {
        window.external.addFavorite(sURL, sTitle);
    } catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "");
        } catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加！");
        }
    }
}
//设为首页
function SetHome(url) {
    if (document.all) {
        document.body.style.behavior = 'url(#default#homepage)';
        document.body.setHomePage(url);
    } else {
        alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!");
    }
}


function hidSv() {
    $(".forget").hide();
}
function shoSv() {
    $(".forget").show();
}

function munMover(leftPx) {
    function followTopNav() {
        $(".mainnav-back")
            .stop()
            .animate({
                left: leftPx
            }, "normal");
    }
    followTopNav();

    $("ul.mainnav-ul>li").hover(
        function () {
            $(".mainnav-back").stop().animate({
                left: $(this).position().left
            }, "normal");
        },
        function () {
            followTopNav();
        }
    );
}


function bindOnclick(isLogin) { }

//banner
/**
 *  浮動 (預設右上 top:150)
 *  @example   $("#id").Float();
 *  @param {topSide:150,floatRight:0|1,side:5,close:ID}
 */
$.fn.Float = function (obj) {
    var that = this;

    var lock = {
        topSide: 150,
        floatRight: 1,
        side: 5, //margin
        init: function () {
            var el = that, ua = navigator.userAgent;
            el.css({
                'position': 'absolute',
                'z-index': '1000',
                'top': this.topSide
            });

            if (ua.toLowerCase().indexOf('360se') > -1) {
                this.isBlock = true;
            } else if (ua.toLowerCase().indexOf("theworld") > 0) {
                this.isBlock = true;
            } else if (ua.toLowerCase().indexOf("msie 7") > 0) {
                this.side = -1;
            }
            this.floatRight == 1 ? el.css('right', this.side) : el.css('left', this.side);
            var locker = this;
            setInterval(function () {
                locker.lock.call(locker);
            }, 20);

            if (this.close != undefined) {
                this.closeFloat();
            }
            if (this.floatRight == 1) {
                $(window).resize(function () {
                    $(this).scrollLeft(0);
                    el.css('right', 5);
                });
            }
        },
        lockTop: function (el, position, page, scroll, icon) {
            var top = el.css('top');
            var y = scroll.top + icon.topSide,
                offsetTop = (y - parseInt(top)) / 20;
            if (this.isBlock) {
                offsetTop = (y - parseInt(top));
            }
            var topSide = parseInt(top) + offsetTop;
            if ((topSide + position.height) < page.height) {
                el.css('top', topSide);
            }
        },
        lockLeft: function (el, scroll, icon) {
            var left = el.css('left');
            var x = scroll.left + icon.side,
                offsetLeft = (x - parseInt(left)) / 20;
            el.css('left', parseInt(left) + offsetLeft);
        },
        lockRight: function (el, scroll, icon) {
            var right = el.css('right');
            var d = document;
            if (scroll.left == 0) {
                var x = icon.side,
                    offsetRight = (Math.abs(x) - Math.abs(parseInt(right))) / 20;
                el.css('right', Math.abs(parseInt(right)) + offsetRight);
            } else {
                var x = scroll.left - icon.side,
                    offsetRight = (Math.abs(x) - Math.abs(parseInt(right))) / 20;
                right = -(Math.abs(parseInt(right)) + offsetRight) + "px";
                el.css('right', right);
            }
        },
        lock: function () {
            var el = that,
               position = this.currentPosition(el),
               win = this.windowDimension(),
               scroll = this.scrollPosition(),
               page = this.pageDimension(),
               icon = this;
            this.lockTop(el, position, page, scroll, icon);
            if (this.floatRight == 1) {
                this.lockRight(el, scroll, icon);
            } else {
                this.lockLeft(el, scroll, icon);
            }
            if (this.isBlock) {
                if (this.lastTop != el.css('top')) {
                    el.css('visibility', "hidden");
                    this.lastTop = el.css('top');
                } else {
                    el.css('visibility', "visible");
                }
            }
        },
        currentPosition: function (el) {
            var offset = el.offset();
            return {
                /* top: offset.top,
                 left: offset.left,*/
                width: el.outerWidth(),
                height: el.outerHeight()
            };
        },
        windowDimension: function () {
            if ((typeof innerWidth != "undefined" && innerWidth != 0) && (typeof innerHeight != "undefined" && innerHeight != 0)) {
                return {
                    width: innerWidth,
                    height: innerHeight
                };
            }
            var d = document;
            return {
                width: Math.min(d.body.clientWidth, d.documentElement.clientWidth),
                height: Math.min(d.body.clientHeight, d.documentElement.clientHeight)
            };
        },
        scrollPosition: function () {
            var d = document;
            return {
                top: Math.max(d.body.scrollTop, d.documentElement.scrollTop),
                left: Math.max(d.body.scrollLeft, d.documentElement.scrollLeft)
            };
        },
        pageDimension: function () {
            var d = document;
            return {
                width: Math.max(d.body.scrollWidth, d.documentElement.scrollWidth),
                height: Math.max(d.body.scrollHeight, d.documentElement.scrollHeight)
            };
        },
        closeFloat: function () {
            that.find('#' + this.close).click(function () {
                that.hide();
            }).css('cursor', 'pointer');
        }
    };
    if (obj) $.extend(lock, obj);
    lock.init();
};

function sss(banneres) {
    //banner图点击处理
    var bannerPcOrMp = $("#DeviceMode").val();
    /*var banneres = $("#banner_link").val();*/
    /*alert(banneres);*/
    if (banneres == null || banneres == "") {
        return false;
    } else {
        if (bannerPcOrMp == 'PC') {
            if (banneres.indexOf("/app/") != -1) {
                if (banneres.indexOf("/app/promotion")) {
                    window.location.href = banneres + "?source=banner";
                } else {
                    window.location.href = banneres;
                }
            } else {
                window.open(banneres);
            }
        } else {
            if (banneres.indexOf("/app/") != -1) {
                if (banneres.indexOf("/app/home") != -1 || banneres.indexOf("/app/joinNow") != -1) {
                    window.location.href = banneres;
                } else if (banneres.indexOf("/app/promotion") != -1) {
                    $("#bottomNavClose").click();
                    $("#zhedie .acc_top").click();
                    $("#zhedie .sub_top div a").first().click();
                    window.location.href = "#zhedie";
                } else {
                    var endIndex;
                    if (banneres.indexOf("?") != -1) {
                        endIndex = banneres.lastIndexOf("?");
                    } else {
                        endIndex = banneres.lenght;
                    }
                    var newsForPage = banneres.substring(banneres.lastIndexOf("/"), endIndex);
                    window.location.href = banneres.replace(newsForPage, "/loginPage");
                }
            } else {
                window.open(banneres);
            }
        }
    }
};