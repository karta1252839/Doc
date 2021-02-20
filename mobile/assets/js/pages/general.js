
var loading_layer;

$(document).ready(function () {
    modelSizing();

    //var url = window.location.href;
    //if ((url.indexOf('index') > -1) || (url.indexOf('livecasino') > -1) || (url.indexOf('sportsbook') > -1) || (url.indexOf('card') > -1) || (url.indexOf('slotgame') > -1) || (url.indexOf('lottery') > -1) || (url.indexOf('arcade') > -1)) {
    //    var announceNotice_doNotDisplayAgain = $.cookie("announceNotice_doNotDisplayAgain");
    //    if (!announceNotice_doNotDisplayAgain) {
    //        setTimeout(function () { $('#modal_memberNotification').toggleClass('show-modal'); }, 1000);
    //    }
    //}

    var isLogedin = $('#isLogedin').val();
    if (isLogedin == "true") {
        //Kai update *upmenu* start
        $('#memberCenter').click(e => {
            e.preventDefault()
            $('.UpMenu').toggle()
        })

        window.addEventListener('click', function (e) {
            if ($(e.target).hasClass('memberCenter') || $(e.target).parents().is($('.memberCenter')))
                return false;

            var div = $('.UpMenu');
            if (div.is(':visible')) {
                if (!$(e.target).parents().andSelf().is(div)) {
                    div.hide();
                }
            }
        });
        //Kai update *upmenu* end
    }

    $('.memberNotificationBtn').click(function () {
        location.href = "/notice";
    });

    $('#close_memberNotification').click(function () {
        $('#modal_memberNotification').removeClass('show-modal');
    });

    $('.doNotDisplayAgainBtn').click(function () {
        var thisName = $(this).data('name');
        doNotDisplayAgain(thisName);
        if (thisName == "announceNotice") {
            $(this).parents('.modal-container').removeClass('show-modal');
        }
    });

    $("#GOTOP").click(function () {
        jQuery("html,body").animate({
            scrollTop: 0
        }, 400);
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 120) {
            $("#GOTOP").fadeIn(300).addClass("active");
        } else {
            $("#GOTOP").stop().fadeOut(300).removeClass("active");
        }
    });

    $('.contactBtn').click(function () {
        var color = {
            header: 'linear-gradient(to top, rgb(92, 177, 210), rgb(19, 86, 187)) rgb(136, 160, 185)',
            background: 'linear-gradient(to top, #38c9ff 0%, #1a4b7f 50%, #0b2351 100%)'
        }

        var message = {
            title: '聯系我們',
            content: ""
        }

        showlayer(color, message, $('#ContactLayer'), $('#ContactLayerWrap'));
    });

    $('.feedbackBtn').click(function () {
        if (isLogedin == 'true') {
            var color = {
                header: 'linear-gradient(to top, rgb(92, 177, 210), rgb(19, 86, 187)) rgb(136, 160, 185)',
                background: 'linear-gradient(to top, #38c9ff 0%, #99b4e8 100%)'
            }

            var message = {
                title: '意見反饋',
                content: ""
            }

            showlayer(color, message, $('#FeedbackLayer'), $('#FeedbackLayerWrap'));
        }
        else {
            alertMSG('請登入會員帳號');
        }
    });

    $('.starBtn').click(function () {
        var thisTitle = '#' + $(this).parents('.sugTitle').attr('id');

        $(thisTitle).find('.starBtn').removeClass('schecked');
        $(this).addClass('schecked');
    });

    $('.submitreqzxc').click(function () {
        //$('#login-btn').prop('disabled', true);
        showLoading();

        if ($('#sug1').find('.schecked').length == "") {
            alertMSG("請選完評價.");
            closeLoading();
            return;
        }

        if ($('#sug2').find('.schecked').length == "") {
            alertMSG("請選完評價.");
            closeLoading();
            return;
        }

        if ($('#sug3').find('.schecked').length == "") {
            alertMSG("請選完評價.");
            closeLoading();
            return;
        }

        if ($('#sug4').find('.schecked').length == "") {
            alertMSG("請選完評價.");
            closeLoading();
            return;
        }

        var Star1 = $('#sug1').find('.schecked').data('gid');
        var Star2 = $('#sug2').find('.schecked').data('gid');
        var Star3 = $('#sug3').find('.schecked').data('gid');
        var Star4 = $('#sug4').find('.schecked').data('gid');
        var Txt_comment = $('#myTextarea').val();

        var paramSuggestion = {
            star1: Star1,
            star2: Star2,
            star3: Star3,
            star4: Star4,
            txt_comment: Txt_comment,
        }
        //console.log("ajax");
        $.ajax({
            url: "/handlers/Feedback.ashx",
            type: 'POST',
            //async: false,
            data: JSON.stringify(paramSuggestion),
            //data: param,
            contentType: "application/json",
            dataType: 'JSON',
            success: function (result) {
                //alertMSG(result.d);
                if (result) {
                    //console.log(result.d);
                    var o = result;
                    var msg = o.msg;
                    if (o.code == "0") {
                        closeLoading();
                        alertMSG('提交成功');
                        $('.starBtn.schecked').removeClass('schecked');
                        $('#myTextarea').val('');
                    }
                    else {
                        alertMSG('提交失敗');
                    }
                }
            },
            error: function (xhr) {
                //alertMSG("error");
            }
        });
    });
});

// tab & panel
$(function () {
    let lastTab = 0;

    $('.container_tab').each(function () {
        let $tabList = $(this).find('.genericNavBox'),
            $tabAnchors = $tabList.find('.tab'),
            $tabPanels = $(this).find('.panel');

        $tabAnchors.each(function (currentTab, obj) {
            $(obj).on('click', function (e) {
                e.preventDefault();
                // console.log($tabPanels.eq(currentTab));
                $tabPanels.eq(lastTab).css({ display: 'none' });
                $tabPanels.eq(currentTab).css({ display: 'block' });
                lastTab = currentTab;

                // Add active class to the tab which was clicked!!
                let $this = $(obj);
                // console.log($this.attr('href'));
                if ($this.hasClass('active')) {
                    return;
                }

                $tabAnchors.removeClass('active');
                $this.addClass('active');

            });
        });


        //$tabAnchors.eq(0).trigger('click');
    });
});

$(function () {
    //const loginBtn = document.getElementById('loginBtn');
    //const close_login = document.getElementById('close_login');
    //const modal_login = document.getElementById('modal_login');

    //loginBtn.addEventListener('click', () => {
    //    modal_login.classList.add('show-mobileModal');
    //});

    //close_login.addEventListener('click', () =>
    //    modal_login.classList.remove('show-mobileModal')
    //  );

    //alert(is_accessBlog);
    var hostname = window.location.hostname;
    if (is_accessBlog == "1" && (hostname.indexOf('999xc.net') > -1 || location.hostname === "localhost")) {
        $(".blogitem").show();
        $(".blogshowitem").hide();
    }

    $('#loginBtn').click(function () {
        $('#modal_login').addClass('show-mobileModal');
        $('#form_login .username').focus();

        $('.footer_beforelogin').hide();
    });
    $('#close_login').click(function () {
        $('#modal_login').removeClass('show-mobileModal');
        $('.footer_beforelogin').show();
    });

    $('.menuMainMobile .menu_text').click(function () {
        if ($('#isLogedin').val() == "false") {
            $('.menuMainMobile .closeBtn').click();
            $('#loginBtn').click();
        }
    });

    $('.presetDate').click(function () {
        var type = $(this).parents('.panel').data('type');
        var preset = $(this).data('preset');
        PresetSearchDate(type, preset);
    });
});

CheckPlayerSession = function () {
    $.ajax({
        url: "/handlers/CheckPlayerSession.ashx",
        type: 'POST',
        async: true,
        contentType: "application/json",
        dataType: 'JSON',
        success: function (result) {
            if (result.Data != "" && result.Data != null) {
                switch (result.Data) {
                    case "SessionExpired":
                    case "PlayerSessionNotFound":
                        window.PLAYER_SESSION = 0;
                        window.location.href = "/";
                        break;
                    default:
                        window.PLAYER_SESSION = 1;
                        break;
                }
            }

        },
    });
    setTimeout(function () {
        CheckPlayerSession();
    }, 5000);
}

showLoading = function () {
    //alert('asd');
    loading_layer = layer.open({ type: 2 });
}

closeLoading = function () {
    layer.close(loading_layer);
}

alertMSG = function (msg) {
    var index = layer.open({
        content: msg
        , btn: 'OK'
    });
}

alertConfirmMSG = function (msg, callback) {
    var index = layer.open({
        content: msg
        , btn: ['确认', '取消']
        , yes: function (index) {
            layer.close(index);
            if (callback)
                callback();
        }
    });
}

alertMSGConfirmSubmit = function (msg, callback) {
    var index = layer.open({
        content: msg
        , btn: ['確認', '取消']
        , yes: function () {
            layer.close(index);

            if (callback)
                callback();
        }
        , no: function () {
            layer.close(index);
        }
    });
}


alertMSGRes = function (msg, redirect) {
    var index = layer.open({
        content: msg
        , btn: 'OK'
        , yes: function () {
            layer.close(index);
            if (redirect) {
                window.location = redirect;
            } else {
                if (window.location.pathname.toLowerCase() == '/register')
                    window.location = '/';
                else
                    window.location.reload(true);
            }
        }
    });
}

alertMSGLogin = function (msg, referrer) {
    var index = layer.open({
        content: msg
        , btn: ['登入', '立即註冊']
        , yes: function () {
            window.location = '/login';
        }
        , no: function () {
            layer.close(index);
            //open register form
            window.location = '/join';
        }
    });
}


alertMSGCallback = function (msg, callback) {

    var index = layer.open({
        content: msg,
        btn: 'OK',
        shadeClose: false,
        yes: function () {
            layer.close(index);
            if (callback)
                callback();
        }
    });
};


alertMSGWithdraw = function (callback) {

    var content = "<div>";
    content += "<p style='text-align: left;'>如當日出款次數超過2次，會收取出款手續費用，如同意的話系統會自動批准該筆取款<p>";
    content += "<p style='margin-top: 1.5em;'><label for='withdrawNotice_doNotDisplayAgain' class='checkbox-inline'><input type='checkbox' id='withdrawNotice_doNotDisplayAgain' class='withdrawNotice_doNotDisplayAgain'>不再顯示</label></input></p>";
    content += "</div>";

    var index = layer.open({
        title: '提款提示',
        shadeClose: false,
        content: content,
        btn: ['同意', '取消'],
        yes: function () {

            /* COOKIES */
            var doNotDisplayAgain = $('.withdrawNotice_doNotDisplayAgain').is(":checked");
            if (doNotDisplayAgain) {
                var currentDate = new Date();
                var expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 0, 0, 0);
                $.cookie("withdrawNotice_doNotDisplayAgain", currentDate, { expires: expirationDate, path: "/" });
            }

            layer.close(index);

            callback();
        },
        no: function () {
            layer.close(index);
        }
    });
};


getRouteUrlParameter = function (sParam) {
    var value = window.location.pathname;

    var sub = value.split('/');
    if (sub.indexOf(sParam) > -1) {
        return sub[sub.indexOf(sParam) + 1];
    } else {
        return null;
    }
};


SetPopupOpenerClickEvent = function (url) {
    var event = "window.open('" + url + "', '_blank')";
    $('#btnPopupOpener')
        .attr('onclick', event);
}

PresetSearchDate = function (type, preset) {
    var date = new Date();
    var currentMonth = date.getMonth();
    var currentDate = date.getDate();
    var currentYear = date.getFullYear();
    var currentDay = date.getDay();
    var startDate = '';
    var endDate = '';

    if (preset == 'lastweek') {
        if (type == 'turnover') {
            startDate = new Date(currentYear, currentMonth, currentDate - currentDay - 6, 0, 0);
            endDate = new Date(currentYear, currentMonth, currentDate - currentDay + 1, 0, 0);
        }
        else {
            startDate = new Date(currentYear, currentMonth, currentDate - currentDay - 6);
            endDate = new Date(currentYear, currentMonth, currentDate - currentDay);
        }
    }
    else if (preset == 'thisweek') {
        var firstday = date.getDay(), firstdate = date.getDate() - firstday + (firstday == 0 ? -6 : 1);
        var lastday = date.getDay(), lastdate = date.getDate() - lastday + 7;
        if (type == 'turnover') {
            startDate = new Date(currentYear, currentMonth, firstdate, 0, 0);
            endDate = new Date(currentYear, currentMonth, lastdate + 1, 0, 0);
        }
        else {
            startDate = new Date(currentYear, currentMonth, firstdate);
            endDate = new Date(currentYear, currentMonth, lastdate);
        }
    }
    else if (preset == 'today') {
        if (type == 'turnover') {
            startDate = new Date(currentYear, currentMonth, currentDate, 0, 0);
            endDate = new Date(currentYear, currentMonth, currentDate + 1, 0, 0);
        }
        else {
            startDate = new Date(currentYear, currentMonth, currentDate);
            endDate = new Date(currentYear, currentMonth, currentDate);
        }
    }
    else if (preset == 'yesterday') {
        if (type == 'turnover') {
            startDate = new Date(currentYear, currentMonth, currentDate - 1, 0, 0);
            endDate = new Date(currentYear, currentMonth, currentDate, 0, 0);
        }
        else {
            startDate = new Date(currentYear, currentMonth, currentDate - 1);
            endDate = new Date(currentYear, currentMonth, currentDate - 1);
        }
    }
    else if (preset == 'lastmonth') {
        startDate = new Date(currentYear, currentMonth - 1, 1);
        endDate = new Date(currentYear, currentMonth, 0);
    }
    else if (preset == 'thismonth') {
        startDate = new Date(currentYear, currentMonth, 1);
        endDate = new Date(currentYear, currentMonth + 1, 0);
    }

    if (type == 'turnover') {
        $('.panel[data-type="' + type + '"]').find('.datepickerFromDate').datetimepicker("setDate", startDate);
        $('.panel[data-type="' + type + '"]').find('.datepickerToDate').datetimepicker("setDate", endDate);
    }
    else {
        $('.panel[data-type="' + type + '"]').find('.datepickerFromDate').datepicker("setDate", startDate);
        $('.panel[data-type="' + type + '"]').find('.datepickerToDate').datepicker("setDate", endDate);
    }
    $('.panel[data-type="' + type + '"]').find('.btnSearch').click();
}

$(window).resize(function () {
    modelSizing();
});

modelSizing = function () {
    var height = window.innerHeight;
    height = height - 100;
    $('.modalResize').not().css('max-height', height + 'px');
    height = height - 127;
    $('.modalWindow__content').not('.modalWindow__content--SP').css('max-height', height + 'px');
    height = height - 20;
    $('#modal_memberNotification #announcePanel').css('height', height + 'px');
    height = height + 114;
    $('.layui-m-layercont').css('max-height', height + 'px');
}

doNotDisplayAgain = function (name) {
    var currentDate = new Date();
    var expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 0, 0, 0);
    $.cookie(name + '_doNotDisplayAgain', currentDate, { expires: expirationDate, path: "/" });
}