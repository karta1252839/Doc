var selected_channel_type = 6;        //mart

$(function () {
    var depoMarketCheck = JSON.parse(CheckPlayerAllowMart());
    if (depoMarketCheck.code == 0 || depoMarketCheck.code == "0") {
        var allow = depoMarketCheck.data;
        if (!allow) {
            alertMSGCallback("請洽客服開通", function () {
                location.href = "/deposit";
            });
        }
    }
    else {
        alertMSGCallback(depoPGCheck.msg, function () {
            location.href = "/deposit";
        });
    }

    var ddl_pgate = $('.container_depomart .ddl_pgate_mart');
    BindMart(selected_channel_type, ddl_pgate); //mart
    GetBindPromotion();

    $('.container_depomart .ddl_pgate_mart').change(function (e) {
        var x = $(this);
        var selected_pgid = $(x).val();
        var ddl_pbank = $('.container_depomart .ddl_pbank_mart');
        BindPGBank(selected_pgid, selected_channel_type, ddl_pbank);
        GetPGDepoAmtSetting(selected_pgid, selected_channel_type);
    });

    $('.btnDepo_mart').click(function () {
        SubmitDepositMartForm();
    });

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
    //    window.location.href = window.location.href.toLowerCase().replace('mdeposit_supermarket', 'mdeposit_pg');
    //});

    //$('.btnToggleDepoType2').click(function () {
    //    showLoading();
    //    window.location.href = window.location.href.toLowerCase().replace('mdeposit_supermarket', 'mdeposit_cash');
    //});
});

BindMart = function (channelType, ddl) {

    var param = {
        channelType: channelType,
        includeInactive: false,
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
                        var ddl_pbank = $('.container_depomart .ddl_pbank_mart');
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
                    alertMSG(msg);
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

SubmitDepositMartForm = function () {
    var depoMarketCheck = JSON.parse(CheckPlayerAllowMart());
    if (depoMarketCheck.code == 0 || depoMarketCheck.code == "0") {
        var allow = depoMarketCheck.data;
        if (!allow) {
            alertMSG("請洽客服開通");
            return false;
        }
    }
    else {
        alertMSG(depoMarketCheck.msg);
        return false;
    }

    var param = {
        pgate: $('.container_depomart .ddl_pgate_mart option:selected').val(),
        pbank: $('.container_depomart .ddl_pbank_mart option:selected').val(),
        txtPGDepoAmt: $('.container_depomart .depo_mart_amt').val(),
        pg_promotion: $('.container_depomart .ddl_promotion option:selected').val(),
        hid_gateType: $('#hid_gateType').val(),
    };
    var launch = false;
    showLoading();
    $.ajax(
        {
            url: "/handlers/DepositMart.ashx",
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
            error: function (e) {
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
                                $('.container_depomart span[class=minamt]').text(numberWithCommas(parseFloat(minAmt).toFixed(0)));
                            if (maxAmt)
                                $('.container_depomart span[class=maxamt]').text(numberWithCommas(parseFloat(maxAmt).toFixed(0)));
                            $('#div_limit_mart').show();
                        } catch (err) {
                        }
                        if (parseInt(pgId) > 0) {
                            $('#div_limit_mart').show();
                        } else {
                            $('#div_limit_mart').hide();
                        }
                    };
                } else {
                    alertMSG(msg);
                }

            }
        },
        error: function (xhr) {
            var msg = eval("(" + xhr.responseText + ")");
            alertMSG(msg);
        }
    });
};

//CheckPlayerAllowMart = function () {
//    $.ajax({
//        url: "/handlers/CheckPlayerAllowMart.ashx",
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
//                    var allow = o.data;
//                    if (!allow) {
//                        alertMSGCallback("請洽客服開通", function () {
//                            location.href = "/mobile/mdeposit_cash.aspx";
//                        });
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