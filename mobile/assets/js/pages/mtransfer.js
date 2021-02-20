
var wallet_list = [1, 10, 12, 21, 24, 25, 32, 44, 46, 51, 53, 55, 62, 65, 67, 69, 70, 71];
//var wallet_list = [1, 6];
var timeout = 20; //max wallet get balance seconds

$(function () {
    bind_transferFrom();
});

$(function () {
    //fe_transfer
    $('.btnTransfer').click(function () {
        var wal_from = $('#ddlTFrom').find(":selected").val();
        var wal_to = $('#ddlTTo').find(":selected").val();
        var amt = $('#txtTranferAmount').val();

        var param = {
            trf_from: wal_from,
            trf_to: wal_to,
            trf_amt: amt
        };

        showLoading();
        $.ajax(
        {
            url: "/handlers/TransferCredit.ashx",
            type: 'POST',
            data: JSON.stringify(param),
            cache: false,
            contentType: false,
            processData: false,
            success: function (e) {
                var o = JSON.parse(e);
                closeLoading();
                if (o) {
                    var code = o.code;
                    if (code == 0) {
                        alertMSGCallback(o.msg, function () {
                            RefreshWalletTransfer(wal_from, wal_to);
                        });
                    } else {
                        alertMSG(o.msg);
                    }
                }

            },
            error: function (e) {
            }
        });
    });

    $("#ddlTFrom").change(function () {
        showLoading();
        $('#ddlTTo').empty();
        if (this.value == "1") {
            $("#ddlTTo").append($("<option></option>").val(0).html("— 請選擇 —"));
            $.each(selected_wallet, function (key, item) {
                if (item.ID != "1")
                    $("#ddlTTo").append($("<option></option>").val(item.ID).html(item.WalletDesc_CHT));

                closeLoading();
                //console.log(item.ID);
            });
        }
        else {
            $.each(selected_wallet, function (key, item) {
                if (item.ID == "1")
                    $("#ddlTTo").append($("<option></option>").val(item.ID).html(item.WalletDesc_CHT));

                closeLoading();
                //console.log(item.ID);
            });
        }
        //alert(this.value);
    });
});


RefreshWallet = function (sender) {
    try {
        var siteId = $(sender).data('val');
        if (siteId > 0) {

            var param = {
                siteId: siteId,
            }

            $.ajax({
                url: "/handlers/CheckWalletBalance.ashx",
                type: 'POST',
                data: JSON.stringify(param),
                async: true,
                timeout: 1000 * timeout,
                beforeSend: function () {
                    setTimeout(function() {
                        $(sender).attr("src", "/mobile/assets/img/loading.gif");
                        $(sender).parent().parent().find('p:first').html("-");
                    }, 200);
                },
                success: function (data) {
                    setTimeout(function () {
                        try {
                            if (!isNaN(parseFloat(data))) {
                                var amt = numberWithCommas(parseFloat(data).toFixed(2));
                                $(sender).parent().parent().find('p:first').html(amt);
                                if (siteId == "1")
                                    $('.mywallet').text(amt);
                            }
                            else
                                $(sender).parent().parent().find('p:first').html(data);
                        } catch (err) {
                            $(sender).parent().parent().find('p:first').html(data);
                        }
                    }, 200);
                    
                },
                complete: function (data) {
                    setTimeout(function () {
                        $(sender).attr("src", "/mobile/assets/img/icon_refresh.png");
                    }, 200);
                   
                },
                error: function () {
                    $(sender).parent().parent().find('p:first').html("0.00");
                }
            });
        }
    } catch (err) {
    }

    return false;
}


RefreshWalletTransfer = function (fromSiteId, toSiteId) {
    var refresh_list = [fromSiteId, toSiteId];
    setTimeout(function () {
        jQuery.each(refresh_list, function (idx, val) {
            var sender = $('.walletIcon[data-val=' + val + ']');
            RefreshWallet(sender);
        });
    }, 500);
}

bind_transferFrom = function () {
    $.ajax(
    {
        url: "/handlers/GetSiteWalletList.ashx",
        type: 'POST',
        cache: false,
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
                        selected_wallet = json;
                        $("#ddlTFrom").empty();
                        //$("#ddlTFrom").append($("<option></option>").val(0).html("— 請選擇 —"));
                        $.each(json, function (key, item) {
                            $("#ddlTFrom").append($("<option></option>").val(item.ID).html(item.WalletDesc_CHT));
                        });
                        //$("#ddlTTo").append($("<option></option>").val(0).html("— 請選擇 —"));
                        $('#ddlTFrom').change();
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

transferOutAll = function () {

    showLoading();
    $.ajax(
    {
        url: "/handlers/TransferOutAll.ashx",
        type: 'POST',
        cache: false,
        contentType: false,
        processData: false,
        success: function (e) {
            var o = JSON.parse(e);
            //closeLoading();
            if (o) {
                var code = o.code;
                if (code == 0) {
                    alertMSGCallback(o.msg, function() {
                        $('.walletIcon[data-val=0]').trigger('click');
                    });
                } else {
                    alertMSG(o.msg);
                }
            }
        },
        error: function (xhr, textStatus, error) {
            alertMSG('轉賬失敗!');
        },
        complete: function() {
            closeLoading();
        }
    });
}
