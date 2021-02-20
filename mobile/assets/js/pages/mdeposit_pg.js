$(function () {
    var channelType = $('.container_depopg').data('channeltype');
    var depoPGCheck = JSON.parse(CheckPlayerAllowPG());
    if (depoPGCheck.code == 0 || depoPGCheck.code == "0") {
        var cc_allow = depoPGCheck.data[0].allow;
        var atm_allow = depoPGCheck.data[1].allow;
        if (channelType == 3) {
            if (!cc_allow) {
                alertMSGCallback("請洽客服開通", function () {
                    location.href = "/deposit";
                });
            }
        }
        else {
            if (!atm_allow) {
                alertMSGCallback("請洽客服開通", function () {
                    location.href = "/deposit";
                });
            }
        }
    }
    else {
        alertMSGCallback(depoPGCheck.msg, function () {
            location.href = "/deposit";
        });
    }

    BindPG(channelType, $('.container_depopg').find('.ddl_pgate_pg'));
    GetBindPromotion();

    $('.container_depopg .ddl_pgate_pg').change(function (e) {
        var x = $(this);
        var selected_pgid = $(x).val();
        var selected_channel_type = $(this).parents('.container_depopg').data('channeltype');


        var ddl_pbank = $(this).parents('.container_depopg').find('.ddl_pbank');
        BindPGBank(selected_pgid, selected_channel_type, ddl_pbank);

        if (selected_channel_type == 5) { //virtual bank
            //console.log('go GetPGDepoAmtSetting');
            GetPGDepoAmtSetting(selected_pgid, selected_channel_type);
        } else {
            $('#div_fee').show();
        }
    });

    $('.btnDepo_pg').click(function () {
        SubmitDepositPGForm();
    });

    //$('.container_depopg .rblPGtype').change(function (e) {

    //    var x = $(this);

    //    var selected_channel_type = $(x).find('input[type=radio]:checked').val();

    //    var ddl_pgate_pg = $('.container_depopg #ddl_pgate_pg');
    //    BindPG(selected_channel_type, ddl_pgate_pg);

    //    $('#hid_gateType').val(selected_channel_type);
    //    $('.container_depopg #div_fee, .container_depopg #div_limit').hide();

    //    return false;
    //});


    //$('.currency').css('text-align', 'right');
    //$('.currency').focus(function () {
    //    var value = $(this).val();
    //    $(this).val(value.replace(/\,/g, '').replace('.00', ''));
    //});
    //$('.currency').blur(function () {
    //    var value = $(this).val();
    //    var curr_pattern = /^\d+(\.\d{0,2})?$/;
    //    if (value) {
    //        value = value.split('.')[0];
    //        if (!curr_pattern.test(value)) {
    //            $(this).val('0.00');
    //        } else {
    //            $(this).val(value + '.00');
    //            $(this).val(numberWithCommas($(this).val()));
    //        }
    //    } else {
    //        $(this).val('0.00');
    //    }
    //});

    //$('.btnToggleDepoType').click(function () {
    //    showLoading();
    //    window.location.href = window.location.href.toLowerCase().replace('mdeposit_pg', 'mdeposit_cash');
    //});
    //$('.btnToggleDepoType2').click(function () {
    //    showLoading();
    //    window.location.href = window.location.href.toLowerCase().replace('mdeposit_pg', 'mdeposit_supermarket');
    //});
});

BindPG = function (channelType, ddl) {

    var param = {
        channelType: channelType
    }
    showLoading();
    $.ajax({
        url: "/handlers/GetPG.ashx",
        type: 'POST',
        data: JSON.stringify(param),
        contentType: "application/json",
        dataType: 'JSON',
        success: function (result) {
            closeLoading();
            if (result) {

                var o = result;
                var code = o.code;
                var msg = o.msg;

                if (code == 0) {
                    if (o.data) {
                        //$(ddl).empty();
                        $(ddl).find('option[value!="0"]').remove();
                        var data = JSON.parse(o.data);
                        $.each(data, function (k, i) {
                            $(ddl).append($("<option></option>").val(i.PGID).html(i.BankName + ' (' + i.PGName_Custom1 + ')'));
                        });
                        var ddl_pbank = $('.container_depopg .ddl_pbank');
                        if (ddl_pbank)
                            $(ddl_pbank).empty();

                        var cnt = data.length;
                        if (cnt <= 1) {
                            $(ddl).val($(ddl).find("option:eq(1)").val()).trigger('change');
                            $(ddl).addClass('readonly').css("pointer-events", "none");
                        } else {
                            $(ddl).removeClass('readonly').css("pointer-events", "");
                        }
                    };
                } else {
                    //alertMSG(msg);
                }

              

            }
        },
        error: function (xhr) {
        }
    });
};

BindPGBank = function (pgId, channelType, ddl) {

    if (pgId <= 0)
        return false;


    var param = {
        pgId: pgId,
        channelType: channelType
    }

    //showLoading();
    $.ajax({
        url: "/handlers/GetPGBank.ashx",
        type: 'POST',
        data: JSON.stringify(param),
        contentType: "application/json",
        dataType: 'JSON',
        success: function (result) {
            //closeLoading();
            if (result) {
                var o = result;
                var code = o.code;
                var msg = o.msg;

                if (code == 0) {
                    if (o.data) {
                        $(ddl).empty();
                        var data = JSON.parse(o.data);
                        $.each(data, function (k, i) {
                            $(ddl).append($("<option></option>").val(i.ID).html(i.BankName));
                        });
                    };
                } else {
                    alertMSG(msg);
                }

            }
        },
        error: function (xhr) {
        }
    });
};

SubmitDepositPGForm = function () {
    var channelType = $('.container_depopg').data('channeltype');
    var depoPGCheck = JSON.parse(CheckPlayerAllowPG());
    if (depoPGCheck.code == 0 || depoPGCheck.code == "0") {
        var cc_allow = depoPGCheck.data[0].allow;
        var atm_allow = depoPGCheck.data[1].allow;
        if (channelType == 3) {
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
    else {
        alertMSG(depoPGCheck.msg);
        return false;
    }

    var param = {
        pgate: $('.container_depopg').find('.ddl_pgate_pg option:selected').val(),
        pbank: $('.container_depopg').find('.ddl_pbank option:selected').val(),
        txtPGDepoAmt: $('.container_depopg').find('.txtPGDepoAmt').val(),
        pg_promotion: $('.container_depopg').find('.ddl_promotion option:selected').val(),
        hid_gateType: $('.container_depopg').data('channeltype')
    };

    var launch = false;

    showLoading();
    $.ajax(
        {
            url: "/handlers/DepositPG.ashx",
            type: 'POST',
            data: JSON.stringify(param),
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (e) {
                var o = JSON.parse(e);
                closeLoading();
                if (o) {
                    var code = o.code;
                    if (code == 0) {
                        var url = '/mobile' + o.msg;
                        if (url) {
                            SetPopupOpenerClickEvent(url);
                            launch = true;
                        }
                    } else {
                        alertMSG(o.msg);
                    }
                }
            },
            error: function (xhr) {
                var msg = eval("(" + xhr.responseText + ")");
                alertMSG(msg);
                return false;
            }
        });

    if (launch == true)
        $('#btnPopupOpener').trigger('click');

    return false;
};


GetPGDepoAmtSetting = function (pgId, channelType) {

    var param = {
        pgId: pgId,
        channelType: channelType,
    }
    showLoading();
    $.ajax({
        url: "/handlers/GetPGDepoAmtSetting.ashx",
        type: 'POST',
        data: JSON.stringify(param),
        contentType: "application/json",
        dataType: 'JSON',
        success: function (result) {
            closeLoading();
            if (result) {
                var o = result;
                var code = o.code;
                var msg = o.msg;

                if (code == 0) {
                    if (o.data) {
                        var r = JSON.parse(o.data)[0];
                        var minAmt = r.Deposit_Min;
                        var maxAmt = r.Deposit_Max;
                        try {
                            if (minAmt)
                                $('.container_depopg[data-channeltype="' + channelType + '"] span[class=minamt]').text(numberWithCommas(parseFloat(minAmt).toFixed(0)));
                            if (maxAmt)
                                $('.container_depopg[data-channeltype="' + channelType + '"] span[class=maxamt]').text(numberWithCommas(parseFloat(maxAmt).toFixed(0)));
                        } catch (err) {
                        }

                        if (parseInt(pgId) > 0) {
                            $('#div_limit').show();
                        } else {
                            if (channelType == 5)
                                $('#div_limit').hide();
                        }
                    };
                } else {
                    alertMSG(msg);
                }

            }
        },
        error: function (xhr) {
        }
    });
};

//CheckPlayerAllowPG = function () {
//    $.ajax({
//        url: "/handlers/CheckPlayerAllowPG.ashx",
//        type: 'POST',
//        async: true,
//        contentType: "application/json",
//        dataType: 'JSON',
//        success: function (result) {
//            if (result) {
//                var o = result;
//                var code = o.code;
//                var msg = o.msg;

//                if (code == 0) {

//                    var cc_allow = o.data[0].allow;
//                    var atm_allow = o.data[1].allow;

//                    //web
//                    if (!cc_allow && !atm_allow) {
//                        alertMSGCallback("請洽客服開通", function () {
//                            location.href = "/mobile/mdeposit_cash.aspx";
//                        });
//                    }
//                    else {
//                        if (!cc_allow) {
//                            $(':radio#MainContent_rblChannelType_1').attr('checked', true).trigger('change');
//                            $(':radio#MainContent_rblChannelType_0').bind('click', function () {
//                                alertMSGCallback("請洽客服開通", function () {
//                                    $(':radio#MainContent_rblChannelType_1').trigger('click');
//                                });
//                            });
//                        } else if (!atm_allow) {
//                            $(':radio#MainContent_rblChannelType_0').attr('checked', true).trigger('change');
//                            $(':radio#MainContent_rblChannelType_1').bind('click', function () {
//                                alertMSGCallback("請洽客服開通", function () {
//                                    $(':radio#MainContent_rblChannelType_0').trigger('click');
//                                });
//                            });
//                        }
//                    }
//                } else {
//                    alertMSG(msg);
//                }

//            }
//        },
//        error: function (xhr) {
//        }
//    });
//};