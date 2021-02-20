var loading_layer;
var selected_channel_type_mart = 6;        //mart
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
        $('#deposit').click(function () {
            CheckDepositBank();
            BindDepositBank();
            BindPG(3, $('.container_depopg[data-channeltype="3"]').find('.ddl_pgate_pg'));
            BindPG(5, $('.container_depopg[data-channeltype="5"]').find('.ddl_pgate_pg'));
            GetDepoWithSetting();
            GetPlayerBankInfo();
            GetBindBankList();
            GetBindPromotion();
            var ddl_pgate_mart = $('.container_depomart .ddl_pgate_mart');
            BindMart(selected_channel_type_mart, ddl_pgate_mart); //mart
            $('.container_withdraw .w_password').val('');
        });

        $('#switchPoints').click(function () {
            $('.walletIcon[data-val=0]').click();
            bind_transferFrom();
        });
    }

    $('.doNotDisplayAgainBtn').click(function () {
        var thisName = $(this).data('name');
        doNotDisplayAgain(thisName);
        if (thisName == "announceNotice") {
            $(this).parents('.modal-container').removeClass('show-modal');
        }
    });

    $('.modalSwitch').click(function () {
        var name = $(this).data('name');
        modalSwitch(name, $(this));
    });

    $('.modalLayer').click(function () {
        $(this).parents('.modal-container').removeClass('show-modal');
        $('body').css('overflow-y', 'auto');
    });

    $('.feedbackBtn').click(function () {
        if (isLogedin == 'true') {
            var size = {
                width: '640px',
                height: 'auto'
            }

            var color = {
                header: 'linear-gradient(to top, #375EAA 0%, #324F6F 50%, #273246 100%)',
                background: 'linear-gradient(to top, #0b2351 0%, #1a4b7f 50%, #0b2351 100%)'
            }

            var message = {
                title: '意見反饋',
                content: $('#FeedbackLayer')
            }

            showlayer(size, color, message);
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
                        closelayer();
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

    window.addEventListener('click', function (e) {
        if ($(e.target).hasClass('drawerBox') || $(e.target).parents().is($('.drawerBox')))
            return false;

        var div = $('.drawerBox');
        if (div.hasClass('active')) {
            if (!$(e.target).parents().andSelf().is(div)) {
                div.removeClass('active');
            }
        }
    });
});
// deposit & withdraw modal
(function () {
    let lastTab = 0;

    $('#depositModal').each(function () {
        let $tabList = $(this).find('.depositNav'),
            $tabAnchors = $tabList.find('.depositTab'),
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


        $tabAnchors.eq(0).trigger('click');
    });
})();
// transaction modal
(function () {
    let lastTab = 0;

    $('#transactionModal').each(function () {
        let $tabList = $(this).find('.transactionNav'),
            $tabAnchors = $tabList.find('.transactionTab'),
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


        $tabAnchors.eq(0).trigger('click');
    });
})();
// deposit panel
$(function () {
    const state = {
        lastPanelTab: 0
    };
    $('#depositPanel').each(function () {
        let $panelTabList = $(this).find('.panelNav'),
            $panelTabAnchors = $panelTabList.find('.panelNav__tab'),
            $boxes = $(this).find('.box');

        $panelTabAnchors.each(function (currentTab, obj) {
            $(obj).on('click', function (e) {
                e.preventDefault();
                var depoType = $(obj).attr('data-depotype');
                if (depoType != 'manual') {
                    if (depoType == 'cc' || depoType == 'atm') {
                        var depoPGCheck = JSON.parse(CheckPlayerAllowPG());
                        if (depoPGCheck.code == 0 || depoPGCheck.code == "0") {
                            var cc_allow = depoPGCheck.data[0].allow;
                            var atm_allow = depoPGCheck.data[1].allow;
                            if (depoType == 'cc') {
                                if (!cc_allow) {
                                    alertMSG("請洽客服開通");
                                    return false;
                                }
                            }
                            else {
                                if (!atm_allow) {
                                    alertMSG("請洽客服開通");
                                    return false;
                                }
                            }
                        }
                        else
                            alertMSG(depoPGCheck.msg);
                    }
                    else {
                        var depoMarketCheck = JSON.parse(CheckPlayerAllowMart());
                        if (depoMarketCheck.code == 0 || depoMarketCheck.code == "0") {
                            var allow = depoMarketCheck.data;
                            if (!allow) {
                                alertMSG("請洽客服開通");
                                return false;
                            }
                        }
                        else
                            alertMSG(depoMarketCheck.msg);
                    }
                }
                // console.log($tabPanels.eq(currentTab));
                $boxes.eq(state.lastPanelTab).css({ display: 'none' });
                $boxes.eq(currentTab).css({ display: 'block' });
                state.lastPanelTab = currentTab;

                // Add active class to the tab which was clicked!!
                let $this = $(obj);
                // console.log($this.attr('href'));
                if ($this.hasClass('active')) {
                    return;
                }

                $panelTabAnchors.removeClass('active');
                $this.addClass('active');

            });
        });

        var isLogedin = $('#isLogedin').val();
        if (isLogedin == "true") {
            var depoPGCheck = JSON.parse(CheckPlayerAllowPG());
            if (depoPGCheck.code == 0 || depoPGCheck.code == "0") {
                var cc_allow = depoPGCheck.data[0].allow;
                var atm_allow = depoPGCheck.data[1].allow;
                if (cc_allow && atm_allow)
                    $panelTabAnchors.eq(0).trigger('click');
                else if (!cc_allow && !atm_allow)
                    $panelTabAnchors.eq(2).trigger('click');
                else {
                    if (cc_allow)
                        $panelTabAnchors.eq(1).trigger('click');
                    if (atm_allow)
                        $panelTabAnchors.eq(0).trigger('click');
                }
            }
            else {
                alertMSG(depoPGCheck.msg);
                $panelTabAnchors.eq(2).trigger('click');
            }
        }
    });
});

$(function () {
    //$('.mainNav .tab_deposit').click(function() {
    //    CheckPlayerAllowPG();
    //    CheckPlayerAllowMart();
    //});
    var hostname = window.location.hostname;
    if (is_accessBlog == "1" && (hostname.indexOf('999xc.net') > -1 || location.hostname === "localhost")) {
        $(".blogitem").show();
    }

    $('.presetDate').click(function () {
        var type = $(this).parents('.panel').data('type');
        var preset = $(this).data('preset');
        PresetSearchDate(type, preset);
    });
});

$(function () {
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
    loading_layer = layer.load(0, { time: 10 * 5000, shade: [0.5, '#f5f5f5'] }); //0代表加载的风格，支持0-2
}

closeLoading = function () {
    layer.close(loading_layer);
}

alertMSG = function (msg) {
    var index = layer.alert(msg, {
        skin: 'layer-ext-moon',
        title: '信息',
        btn: 'OK',
        closeBtn: 0,
        success: function () {
            $(document).on('keydown', function () {
                if (event.keyCode == 13) {
                    layer.close(index);
                }
            });
        }
    });
};

alertConfirmMSG = function (msg, callback) {
    var index = layer.confirm(msg, {
        btn: ['确认', '取消'] //按钮
    }, function () {
        layer.close(index);
        if (callback)
            callback();
    }, function () {

    });
}



alertMSGRes = function (msg, redirect) {
    var index = layer.alert(msg, {
        skin: 'layer-ext-moon',
        title: '信息',
        btn: 'OK',
        closeBtn: 0,
        yes: function () {
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
    alertMSG(msg);
}


alertMSGCallback = function (msg, callback) {
    var index = layer.alert(msg, {
        skin: 'layer-ext-moon',
        title: '信息',
        btn: 'OK',
        closeBtn: 0,
        yes: function () {
            layer.close(index);
            if (callback)
                callback();
        }
    });
}

alertMSGWithdraw = function (callback) {

    var content = "<div style='padding:1em;overflow-wrap: break-word;'>";
    content += "<p><strong>如當日出款次數超過2次，會收取出款手續費用，如同意的話系統會自動批准該筆取款</strong><p>";
    content += "<p style='margin-top: 2em;'><label for='withdrawNotice_doNotDisplayAgain'><input type='checkbox' id='withdrawNotice_doNotDisplayAgain' class='withdrawNotice_doNotDisplayAgain'>不再顯示</label></input></p>";
    content += "</div>";

    var index = layer.open({
        type: 1,
        skin: 'layer-ext-moon',
        closeBtn: 1,
        title: '提款提示',
        anim: 2,
        area: ['360px', '210px'],
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

GetDepoWithSetting = function () {
    $.ajax(
        {
            url: "/handlers/GetDepoWithSetting.ashx",
            type: 'POST',
            cache: false,
            async: true,
            contentType: false,
            processData: false,
            dataType: "JSON",
            success: function (result) {
                var o = result;
                var code = o.code;
                switch (code) {
                    case 0:
                        if (o.data) {
                            var json = JSON.parse(o.data);
                            //alert(json.Withdraw);
                            //$("#min_withdraw").html(json.Withdraw);
                            $.each(json, function (key, item) {
                                $("#min_deposit").html(item.Deposit);
                                $("#hid_min_deposit").val(item.Deposit);

                                $("#min_withdraw").html(item.Withdraw);
                                $("#hid_min_withdraw").val(item.Withdraw);
                            });


                        }
                        break;
                    case 592:
                        location.href = '/';
                        break;
                }
            },
            error: function (e) {
            }
        });
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

// mainFunc span hover effect
$(function () {
    $('.mainFunc span').each((i, obj) => {
        console.log($(obj));
        $(obj).hover(
            () => {
                $(obj).css('color', '#ffdc00')
                $(obj).children().css('color', '#ffdc00')
            },
            () => {
                $(obj).css('color', '#ffffff')
                $(obj).children().css('color', '#ffffff')
            }
        )
    })
})
// tooltips
$(document).ready(function () {
    $('.tip').tooltipster({
        theme: 'tooltipster-borderless'
    });
});

$(window).resize(function () {
    modelSizing();
});

modelSizing = function () {
    var height = window.innerHeight;
    height = height - 33;
    $('.modalResize.modalWindow').css('height', 'unset');
    $('.modalResize').not().css('max-height', height + 'px');
    height = height - 60;
    $('.modalResize .modalWindow__content').css('height', 'unset');
    $('.modalResize .modalWindow__content').css('max-height', height + 'px');
    height = height - 100;
    $('#announcePanel').css('max-height', height + 'px');
}

doNotDisplayAgain = function (name) {
    var currentDate = new Date();
    var expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 0, 0, 0);
    $.cookie(name + '_doNotDisplayAgain', currentDate, { expires: expirationDate, path: "/" });
}

modalSwitch = function (name, thisBtn) {
    if (name == 'close') {
        $(thisBtn).parents('.modal-container').removeClass('show-modal');
        $('body').css('overflow-y', 'auto');
    }
    else {
        $('.modal-container[data-name="' + name + '"]').addClass('show-modal');
        $('body').css('overflow-y', 'hidden');
    }
}