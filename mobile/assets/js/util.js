function formatNumber(money, roundDigit) {
    var roundAmount = 1;
    for (var i = 0; i < roundDigit; i++) {
        roundAmount = roundAmount * 10;
    }
    var s = (Math.round(money * roundAmount) / roundAmount).toString();
    var rs = s.indexOf('.');
    if (rs < 0 && roundDigit > 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + roundDigit) {
        s += '0';
    }
    s = "<span class='auto'>" + s + "</span>";
    return s;

}

function tr_move(tra) {
    tra.style.backgroundColor = '#f1f1f1';
    //    tra.style.color = '#000';
}

function tr_out(tra) {
    tra.style.backgroundColor = '';
    //   tra.style.color = '#fff';
}

function tr_moveBtn(tra) {
    tra.className = 'btn2m';
}
function tr_outBtn(tra) {
    tra.className = 'btn2';
}


function formartTime(time, num) {
    var d = toServerTime(time);
    var month = d.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var day = d.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    if (num == 1) {
        var hours = d.getHours();
        if (hours < 10) {
            hours = "0" + hours;
        }
        var minutes = d.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        var seconds = d.getSeconds();
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return d.getFullYear() + "-" + month + "-" + day + " " + hours + ":"
				+ minutes + ":" + seconds;
    } else if (num == 3) {
        var hours = d.getHours();
        if (hours < 10) {
            hours = "0" + hours;
        }
        var minutes = d.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        var seconds = d.getSeconds();
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return month + "-" + day + " " + new Array("日", "一", "二", "三", "四", "五", "六")[d.getDay()] + " " + hours + ":"
				+ minutes + ":" + seconds;
    } else if (num == 4) {
        var hours = d.getHours();
        if (hours < 10) {
            hours = "0" + hours;
        }
        var minutes = d.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        var seconds = d.getSeconds();
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return month + "-" + day + " " + hours + ":"
				+ minutes + ":" + seconds + " " + new Array("日", "一", "二", "三", "四", "五", "六")[d.getDay()];
    } else {
        return d.getFullYear() + "-" + month + "-" + day;
    }
}

function toServerTime(date) {
    var offset = new Date().getTimezoneOffset() + 480;
    return new Date(date + offset * 60000);
}

function Format1(money, roundDigit) {
    roundDigit = 5;
    var roundAmount = 1;
    for (var i = 0; i < roundDigit; i++) {
        roundAmount = roundAmount * 10;
    }
    var s = (Math.round(money * roundAmount) / roundAmount).toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + roundDigit) {
        s += '0';
    }
    return s;

}

function Format(money, roundDigit) {
    var newMoney = "";
    var da = "";
    var N = "";
    var arr = new Array();
    var para = money.toString().split('.');
    if (para.length > 0) {
        if (para[0].length > 3) {
            for (var i = 1; i < para[0].length; i++) {
                if (para[0].length > 3) {
                    if (para[0].length - 3 * i > 0) {
                        da = para[0].substr(0, para[0].length - 3 * i);
                        arr[i - 1] = para[0].substr(para[0].length - 3 * i, 3);
                    }

                } else {
                    arr[0] = para[0];
                }
            }
            for (var j = arr.length - 1; j >= 0; j--) {
                newMoney = newMoney + "," + arr[j];
            }
        } else {
            newMoney = para[0];
        }

        if (para.length == 2) {
            if (para[1].length > roundDigit - 1) {
                N = para[1].substr(0, roundDigit);
            } else if (para[1].length == roundDigit - 1) {
                N = para[1];
                for (var jj = para[1].length; jj < roundDigit; jj++) {
                    N = N + "0";
                }
            } else if (para[1].length == 0) {
                for (var jj = 0; jj < roundDigit; jj++) {
                    N = N + "0";
                }
            }
        } else {
            for (var jj = 0; jj < roundDigit; jj++) {
                N = N + "0";
            }
        }
        if (N.length > 0) {
            return da + newMoney + "." + N;
        } else {
            return da + newMoney;
        }
    }
}

function alphaOnly(obj) {
    obj.value = obj.value.replace(/[\W]/g, '');
}

function digitOnly(obj) {
    obj.value = obj.value.replace(/\D/g, '');
}

function To_RMB(obj) {

    var whole = obj.value;
    whole = whole.replace(/\D/g, '');
    // obj.value = whole;
    var num;
    var dig;
    if (whole.indexOf(".") == -1) {
        num = whole;
        dig = "";
    }
    else {
        num = whole.substr(0, whole.indexOf("."));
        dig = whole.substr(whole.indexOf(".") + 1, whole.length);
    }

    var i = 1;
    var len = num.length;

    //var dw2 = new Array("","万","亿");
    //var dw1 = new Array("十","百","千");
    var dw2 = new Array("", "", "");
    var dw1 = new Array("", "", ",");
    var dw = new Array("", "1", "2", "3", "4", "5", "6", "7", "8", "9");
    var k1 = 0;
    var k2 = 0;
    var str = "";

    for (i = 1; i <= len; i++) {
        var n = num.charAt(len - i);
        if (n == "0") {
            if (k1 != 0)
                str = str.substr(1, str.length - 1);
        }

        str = dw[Number(n)].concat(str);

        if (len - i - 1 >= 0) {
            if (k1 != 3) {
                str = dw1[k1].concat(str);
                k1++;
            }
            else {
                k1 = 0;
                var temp = str.charAt(0);
                if (temp == "万" || temp == "亿")
                    str = str.substr(1, str.length - 1);
                str = dw2[k2].concat(str);
            }
        }


        if (k1 == 3) {
            k2++;
        }

    }
    if (str.length >= 2) {
        if (str.substr(0, 2) == "一十") str = str.substr(1, str.length - 1);
    }
    document.getElementById("RMB_XY").innerHTML = str;
}

function checkFromToDate(fromDateTime, toDateTime) {
    if (Date.parse(delimiterConvert(fromDateTime)) <= Date.parse(delimiterConvert(toDateTime))) {
        return true;
    } else {
        return false;
    }
}
function delimiterConvert(val) {
    return val.replace('-', '/').replace('-', '/');
}

//function checkEndTime(fromDateTime,toDateTime, TimeOne, TimeTwo){
//    if (Date.parse(fromDateTime +" " + TimeOne) <= Date.parse(toDateTime +" " + TimeTwo)) {
//    	 return true;
//    } else {
//    	return false;
//    }
//} 

function checkEndTime(fromDateTime, toDateTime, TimeOne, TimeTwo) {

    var startTime = fromDateTime;
    var start = new Date(startTime.replace("-", "/").replace("-", "/") + " " + TimeOne);
    var endTime = toDateTime;
    var end = new Date(endTime.replace("-", "/").replace("-", "/") + " " + TimeTwo);
    if (end < start) {
        return false;
    }
    return true;
}


$.fn.onlyNum = function () {
    $(this).keypress(function (event) {
        var eventObj = event || e;
        var keyCode = eventObj.keyCode || eventObj.which;
        //if (keyCode == 46 || keyCode == 8 ||  (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) ) {
        if (keyCode == 8 || (keyCode >= 48 && keyCode <= 57))
            return true;
        else
            return false;
    }).focus(function () {
        //禁用输入法
        this.style.imeMode = 'disabled';
    }).bind("paste", function () {
        //获取剪切板的内容
        /*
       var clipboard = window.clipboardData.getData("Text");
       if (/^\d+$/.test(clipboard))
               return true;
           else
               return false;
       */
    });
};

$.fn.onlyFloat = function () {
    $(this).keypress(function (event) {
        var eventObj = event || e;
        var keyCode = eventObj.keyCode || eventObj.which;
        //if (keyCode == 46 || keyCode == 8 ||  (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) ) {
        if (keyCode == 46 || keyCode == 8 || (keyCode >= 48 && keyCode <= 57))
            return true;
        else
            return false;
    }).focus(function () {
        //禁用输入法
        this.style.imeMode = 'disabled';
    }).bind("paste", function () {
        //获取剪切板的内容
        /*
       var clipboard = window.clipboardData.getData("Text");
       if (/^\d+$/.test(clipboard))
               return true;
           else
               return false;
       */
    });
};



$.fn.onlyAlpha = function () {
    $(this).keypress(function (event) {
        var eventObj = event || e;
        var keyCode = eventObj.keyCode || eventObj.which;
        if (keyCode == 8 || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122))
            return true;
        else
            return false;
    }).focus(function () {
        this.style.imeMode = 'disabled';
    }).bind("paste", function () {
        /*
       var clipboard = window.clipboardData.getData("Text");
       if (/^[a-zA-Z]+$/.test(clipboard))
           return true;
       else
           return false;
       */
    });
};

$.fn.onlyNumAlpha = function () {
    $(this).keypress(function (event) {
        var eventObj = event || e;
        var keyCode = eventObj.keyCode || eventObj.which;
        if (keyCode == 8 || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122))
            return true;
        else
            return false;
    }).focus(function () {
        this.style.imeMode = 'disabled';
    }).bind("paste", function () {
        /*
       var clipboard = window.clipboardData.getData("Text");
       if (/^(\d|[a-zA-Z])+$/.test(clipboard))
           return true;
       else
           return false;
       */
    });
};

var currtime;
function getthedate() {
    var mydate = toServerTime(currtime);
    currtime = currtime + 1000;
    var year = mydate.getYear();
    if (year < 1000)
        year += 1900;
    //var day = mydate.getDay();
    var month = mydate.getMonth() + 1;
    if (month < 10)
        month = "0" + month;
    var daym = mydate.getDate();
    if (daym < 10)
        daym = "0" + daym;
    var hours = mydate.getHours();
    var minutes = mydate.getMinutes();
    var seconds = mydate.getSeconds();
    if (hours < 10)
        hours = "0" + hours;
    if (minutes <= 9)
        minutes = "0" + minutes;
    if (seconds <= 9)
        seconds = "0" + seconds;
    //change font size here GMT+8: 2014-04-22 00:49:49
    //    var cdate = "GMT+7: "+year + "-" + month + "-" + daym + " " + hours + ":" + minutes + ":" + seconds;
    var cdate = year + "-" + month + "-" + daym + " " + hours + ":" + minutes + ":" + seconds;
    if (document.all)
        document.all.clock.innerHTML = cdate;
    else if (document.getElementById)
        document.getElementById("clock").innerHTML = cdate;
    else
        document.write(cdate);
}

function formatNumberWinLoss(money, roundDigit) {
    var span = "";
    if (money > 0) {
        span = "<span class='font_b'><span class='auto font_b'>";
    } else if (money < 0) {
        span = "<span class='font_r'>-<span class='auto font_r'>";
        money = Math.abs(money);
    }
    var roundAmount = 1;
    for (var i = 0; i < roundDigit; i++) {
        roundAmount = roundAmount * 10;
    }
    var s = (Math.round(money * roundAmount) / roundAmount).toString();
    var rs = s.indexOf('.');
    if (rs < 0 && roundDigit > 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + roundDigit) {
        s += '0';
    }
    return span + s + "</span></span>";

}
function formatNumberComm(money, roundDigit) {
    var span = "";
    if (money > 0) {
        span = "<span class=''><span class='auto'>";
    } else if (money < 0) {
        span = "<span class='font_r'>-<span class='auto font_r'>";
        money = Math.abs(money);
    }
    var roundAmount = 1;
    for (var i = 0; i < roundDigit; i++) {
        roundAmount = roundAmount * 10;
    }
    var s = (Math.round(money * roundAmount) / roundAmount).toString();
    var rs = s.indexOf('.');
    if (rs < 0 && roundDigit > 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + roundDigit) {
        s += '0';
    }
    return span + s + "</span></span>";

}

function pcOrMobileShow() {
    if ('undefined' != typeof ($)) {
        $(function () {

            /* bbin資訊站*/
            var wrap = $('.bbininfo-wrap')
            var bbinBtn = $('.btn-bbininfo');

            //進站5秒後縮進去
            //hover出現
            bbinBtn.hover(picOut, picIn);

            //click叉叉關閉
            $('#bbininfo-btn-close').click(function () {
                wrap.css({ display: 'none' });
            });

            function picIn() {
                wrap.stop().animate({ 'right': '-240px' }, 1500, function () {
                    bbinBtn.addClass('bbin-jump');
                });
            }
            function picOut() {
                bbinBtn.removeClass('bbin-jump');
                wrap.stop().animate({ 'right': $(this).css('right') }, 750);
            }
            function bbfadeOut() {
                $('.bbin-toppic').stop().animate({ 'opacity': 0 }, 1000, bbfadeIn);
            }
            function bbfadeIn() {
                $('.bbin-toppic').stop().animate({ 'opacity': 1 }, 1000, bbfadeOut);
            }

            function togglePic(id, arr, cssset, s) {
                var self = this;
                self._i = 0;
                self._timer = null;
                x = arr[0];
                y = arr[1];
                self.run = function () {
                    if (arr[self._i]) {
                        $(id).css(cssset, arr[self._i]);
                    }
                    self._i == 0 ? self._i++ : self._i = 0;
                    self._timer = setTimeout(function () {
                        self.run(id, arr, s);
                    }, s);
                }
                self.run();
            }


            //	        bbinfoSlider();
        });
    }
}

function modifyPcOrMobile(language, pcOrMobile) {
    location.href = "home?t=" + pcOrMobile + "&l=" + language + "";
}


function changeAmount(id) {
    $("#DminA").html($("#minA" + id).val());
    $("#DmaxA").html($("#maxA" + id).val());
    /*findGoodsThreeWeiFu();*/
}
function changeAmountThreeWeiFu(id) {
    $("#DminA").html($("#minA" + id).val());
    $("#DmaxA").html($("#maxA" + id).val());
    findGoodsThreeWeiFu();
}

function getAllNumber() {
    var o = {
    };
    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/getAllNumber?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: true,
        timeout: 50000,
        beforeSend: function (xmlhttprequest) {
        },
        success: function (data) {
            if (data) {
                if (data.success) {
                    $("#memberNumCountBuffer").html(data.memberNumCountBuffer);
                    $("#betCountBuffer").html(data.betCountBuffer);
                    $("#payMoneyAmountBuffer").html(data.payMoneyAmountBuffer);
                    $("#pwAmountBuffer").html(data.pwAmountBuffer);
                }
            }
        },
        error: function (xmlhttprequest, error) {
        },
        complete: function () {
        }
    });
}

function getAllNumberBWCP() {
    var o = {
    };
    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/getAllNumber?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: true,
        timeout: 50000,
        beforeSend: function (xmlhttprequest) {
        },
        success: function (data) {
            if (data) {
                if (data.success) {
                    $("#memberNumCountBuffer").html(data.memberNumCountBuffer + 100000);
                    $("#betCountBuffer").html(data.betCountBuffer);
                    $("#payMoneyAmountBuffer").html(data.payMoneyAmountBuffer + 100000);
                    $("#pwAmountBuffer").html(data.pwAmountBuffer + 30000000);
                }
            }
        },
        error: function (xmlhttprequest, error) {
        },
        complete: function () {
        }
    });
}

function getAllNumberZhongFuCP() {
    var o = {
    };
    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/getAllNumber?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: true,
        timeout: 50000,
        beforeSend: function (xmlhttprequest) {
        },
        success: function (data) {
            if (data) {
                if (data.success) {
                    $("#memberNumCountBuffer").html(data.memberNumCountBuffer);
                    $("#betCountBuffer").html(data.betCountBuffer);
                    $("#payMoneyAmountBuffer").html(data.payMoneyAmountBuffer);
                    $("#pwAmountBuffer").html(data.pwAmountBuffer);
                }
            }
        },
        error: function (xmlhttprequest, error) {
        },
        complete: function () {
        }
    });
}

function getAllNumberFengHuang() {
    var o = {
    };
    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/getAllNumber?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: true,
        timeout: 50000,
        beforeSend: function (xmlhttprequest) {
        },
        success: function (data) {
            if (data) {
                if (data.success) {
                    $("#memberRegisterNum").html(data.memberNumCountBuffer);
                    $("#betAmountBuffer").html(data.payMoneyAmountBuffer);
                }
            }
        },
        error: function (xmlhttprequest, error) {
        },
        complete: function () {
        }
    });
}

function getWalletByProduct(product) {
    var wallet = "null";
    var o = {
        product: product
    };
    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/getWalletByProduct?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: false,
        timeout: 20000,
        beforeSend: function (xmlhttprequest) {
        },
        success: function (data) {
            if (data) {
                if (data.success == true) {
                    if (data.wallet != "null") {
                        wallet = data.wallet;
                    }
                }
            }
        },
        error: function (xmlhttprequest, error) {
        },
        complete: function () {
        }
    });
    return wallet;
}

/*JS控制所有跳转链接加推广码*/
function URLModify(ref) {
    var ref = ref;
    var nodes = document.all;
    for (var i = 0; i < nodes.length; i++) {
        var a = $(nodes[i]).attr("href");
        var b = $(nodes[i]).attr("onclick");
        a += "";
        b += "";
        if (a.indexOf("../app/") != -1) {
            if (a.indexOf("?") != -1) {
                $(nodes[i]).attr("href", a + "&ref=" + ref);
            } else {
                $(nodes[i]).attr("href", a + "?ref=" + ref);
            }
        }
        if (b.indexOf("window.location.href") != -1) {
            if (b.indexOf("../app/") != -1) {
                var c = b.substring(b.indexOf("/") - 2, b.lastIndexOf("'"));
                if (c.indexOf("?") != -1) {
                    if (c.indexOf("ref=") != -1) {
                        $(nodes[i]).attr("onclick", "window.location.href='" + c + "'");
                    } else {
                        $(nodes[i]).attr("onclick", "window.location.href='" + c + "&ref=" + ref + "'");
                    }
                } else {
                    $(nodes[i]).attr("onclick", "window.location.href='" + c + "?ref=" + ref + "'");
                }
            }
        } else if (b.indexOf("self.location.href") != -1) {
            if (b.indexOf("../app/") != -1) {
                var d = b.substring(b.indexOf("/") - 2, b.lastIndexOf("'"));
                if (d.indexOf("?") != -1) {
                    if (d.indexOf("ref=") != -1) {
                        $(nodes[i]).attr("onclick", "self.location.href='" + d + "'");
                    } else {
                        $(nodes[i]).attr("onclick", "self.location.href='" + d + "&ref=" + ref + "'");
                    }
                } else {
                    $(nodes[i]).attr("onclick", "self.location.href='" + d + "?ref=" + ref + "'");
                }
            }
        }
    }
}

/*
 * toJoinNowFc:进入注册页面的方式,location:进注册页面；popUp:弹出注册框
 * */
function popupDivNew(div_id, path, languageType, site, imgName, toJoinNowFc) {
    if ($("#pop-div").length > 0) {
        $("#pop-div").remove();
    }
    var imgHtml = "";
    var toJoinNowFcHtml = "";
    if (imgName.indexOf(".swf") != -1) {
        imgHtml = '<embed src="' + path + '/images/' + languageType + '/' + site + '/pc/' + imgName + '" quality="high" wmode="transparent" type="application/x-shockwave-flash" class="poplogoS">';
    } else {
        imgHtml = '<img src="' + path + '/images/' + languageType + '/' + site + '/pc/' + imgName + '"  quality="high" class="poplogoP">'
    }
    if (toJoinNowFc == "location") {
        toJoinNowFcHtml = '<a onclick="locationPageJump(\'joinNow\')">注册</a>';
    } else if (toJoinNowFc == "popUp") {
        toJoinNowFcHtml = '<a onclick="locationPageJump(\'joinNow\')">注册</a>';
    }
    var onlineService = "";
    var o = {
    };
    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/getAllWebInfoMation?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: true,
        timeout: 50000,
        beforeSend: function (xmlhttprequest) {
        },
        success: function (data) {
            if (data) {
                if (data.success) {
                    if (data.webInfoMationPoMap == null) {
                        onlineService = "";
                    } else if (data.webInfoMationPoMap.ONLINE != undefined) {
                        onlineService = data.webInfoMationPoMap.ONLINE[0][0];
                    } else {
                        onlineService = "";
                    }
                    var htmlLoginDiv = '<div id="pop-div" class="pop-box">'
                        + '<div class="logo-title">'
                        + '<div class="ysClose"  onclick="hideDiv(\'pop-div\');"></div>'
                        + imgHtml
                        + '</div>'
                        + '<div class="tc_title_h">'
                        + '<div class="login_title">会员登录</div>'
                        + '</div>'
                        + '<div class="pop-box-body">'
                        + '<div class="pop-box_header"></div>'
                        + '<input type="text" value="用户名" name="txtLoginUsername2" id="txtLoginUsername2" maxlength="16" class="login_password" onkeyup="javascript:loginEnter2(event.keyCode);" onfocus="changeNull2(this,\'username\');" onblur="changeMessage2(this,\'username\');" />'
                        + '<input type="text" value="密码" name="txtLoginPasswordText2" id="txtLoginPasswordText2" class="login_password" maxlength="20" onfocus="changePasswordText2();" /> '
                        + '<input type="password" name="txtLoginPassword2" id="txtLoginPassword2" class="login_password" maxlength="20" style="display: none;" onblur="changePassword2();" />'
                        + '<div style="float: left;">'
                        + '<input type="text" class="login_password2" value="验证码" id="txtLoginCode2" name="txtLoginCode2" maxlength="4" autocomplete="off" onkeyup="javascript:loginEnter2(event.keyCode);" onBlur="if(this.value==\'\'){this.value=this.defaultValue;}" onFocus="if(this.value == this.defaultValue){this.value = \'\';}" style="width: 80px; float: left;" />'
                        + '<img id="checkLoginCodeImage2" onClick="changeLoginCode2()" id="attach_pic" src="' + path + '/app/checkCode/image">'
                        + '</div>'
                        + '<div class="hezi">'
                        + '<div class="hezi_left">'
                        + toJoinNowFcHtml
                        + '</div>'
                        + '<div class="hezi_right">'
                        + '<a onclick="onlineService(\'' + onlineService + '\');">忘记密码？ </a>'
                        + '</div>'
                        + '</div>'
                        + '<div class="loginon_btn" id="loginDiv">'
                        + '<a onclick="javascript:loginFormSubmit2();">登录</a>'
                        + '</div>'
                        + '</div>'
                        + '</div>';
                    $("body").append(htmlLoginDiv);

                    popupDiv("pop-div");


                }
            }
        },
        error: function (xmlhttprequest, error) {
        },
        complete: function () {
            hideRegister();
        }
    });
}

//乐彩主盘去掉注册
function hideRegister() {
    if (site == "leCai") {
        if (webMode == "COMPLEX") {

            $(".hezi .hezi_left").hide();
        }
    }
};


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

/*JS控制验证码刷新*/
$(function () {
    if ($("#pop-div").length > 0) {
        $("#txtLoginCode").focus(
				function () {
				    changeLoginCode();
				}
		);
        $("#txtLoginCode2").focus(
				function () {
				    changeLoginCode2();
				}
		);
    }
});

/*JS控制同步添加 引用报表js代码*/
$(document).ready(function () {
    var webUrl = document.location.href;
    var webName = "";
    var versionNumber = ""; //版本号
    for (var i = -1, arr = []; (i = webUrl.indexOf("/", i + 1)) > -1; arr.push(i));	//遍历获取的‘/’的下标
    webName = webUrl.substring(arr[2], arr[3]);	//取链接第三第四个‘/’间的值（项目名）http://xxx.com/项目名/app/xxx
    //预留添加版本号功能，思考中...
    if (webUrl.indexOf("WinLoss") != -1) {
        $("head").append('<script type="text/javascript" src="' + webName + '/scripts/reportGfcLotteryPj.js"></script>');
    }

    //添加public.js
    //	$("body").append('<script type="text/javascript" src="' + webName + '/scripts/public.js"></script>');
    $("title").after('<script type="text/javascript" src="' + webName + '/scripts/public.js"></script>');
    /*$("title").after('<link type="text/css" rel="stylesheet" href="' + webName + '/css/pulletin.css">')*/
});

//新公告弹窗
function bulletin() {
    var imgHtml = "";
    var o = {};
    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/getAnnounceListAll?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: true,
        timeout: 50000,
        beforeSend: function (xmlhttprequest) {
        },
        success: function (data) {
            if (data) {
                if (data.success) {
                    imgHtml = '<div class="pulletin-dialog" id="pulletin-dialog">'
						+ '<div class="pulletin-dialog-new">'
						+ '<div class="pulletin-dialog-header">'
						+ '<a class="pulletin-dialog-close" onclick="pulletinClose();">×</a>'
						+ '<div class="pulletin-dialog-header-title">平台公告</div>'
						+ '</div>'
						+ '<div class="pulletin-dialog-content">'
						+ '<div class="pulletin-side-left">';
                    for (var i = 0; i < data.resultList.length; i++) {
                        imgHtml += '<div class="pulletin-side-item">'
                            + '<a>'
                            + '<span>'
                            + data.resultList[i][0]
                            + '</span>'
                            + '</a>'
                            + '</div>';
                    }
                    imgHtml += '</div>'
						+ '<div class="pulletin-side-right">';
                    for (var j = 0; j < data.resultList.length; j++) {
                        imgHtml += '<div class="pulletin-notice-display">'
                            + '<div class="pulletin-notice-text">'
                            + '<div class="pulletin-fleft pulletin-notice-item">'
                            + '<p>'
                            + data.resultList[j][0]
                            + '</p>'
                            + '</div>'
                            + '<div class="pulletin-fright">'
                            + '【'
                            + '<span>'
                            + data.resultList[j][1]
                            + '</span>'
                            + '】'
                            + '</div>'
                            + '</div>'
                            + '</div>';
                    }
                    imgHtml += '</div>'
						+ '</div>'
						+ '</div>'
						+ '</div>'
						+ '<div class="pulletin-ui-popup-backdrop"></div>'
						+ '<script type="text/javascript">'
						+ '$(function(){'
						+ '$(".pulletin-side-item:eq(0) a").addClass("pulletin-active");'
						+ '$(".pulletin-side-right .pulletin-notice-display:eq(0)").css("display","block");'
						+ '$(".pulletin-side-item").click(function(){'
						+ 'var $this = $(this);'
						+ 'var index = $this.index();'
						+ '$(".pulletin-side-item a").removeClass("pulletin-active");'
						+ '$(".pulletin-notice-display").hide();'
						+ '$(".pulletin-side-item a").eq(index).addClass("pulletin-active");'
						+ '$(".pulletin-notice-display").eq(index).show();'
						+ '})'
						+ '});'
						+ 'function pulletinClose(){'
						+ '$(".pulletin-dialog").remove();'
						+ '$(".pulletin-ui-popup-backdrop").remove();'
						+ '}'
						+ '</script>';

                    $("body").append(imgHtml);
                    var div_obj = $("#pulletin-dialog");
                    var posLeft = ($(window).width() - div_obj.width()) / 2;
                    div_obj.css({ "left": posLeft }).fadeIn();
                    $(".pulletin-ui-popup-backdrop").css("background", "url(../images/all/pulletin/popup-bgg8.png)");

                    function fadeIn() {
                        $('#pulletin-dialog').show(1000, function () { });
                    }
                    fadeIn();
                }
            }
        },
        error: function (xmlhttprequest, error) {
        },
        complete: function () {
        }
    });
}
/*获取链接参数*/
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}