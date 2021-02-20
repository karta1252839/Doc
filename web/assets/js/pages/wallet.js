var wallet_list = [1, 10, 12, 21, 24, 25, 32, 44, 46, 51, 53, 55, 62, 65, 67, 69, 70, 71];
var timeout = 20; //max wallet get balance seconds

$(function () {
    $('.walletIcon').click(function () {
        var siteId = $(this).data('val');

        if (siteId == 0) {
            $(this).attr("src", "/web/assets/img/loading.gif");

            setTimeout(function () {
                $('.walletIcon[data-val=0]').attr("src", "/web/assets/img/icon_refresh.png");
            }, 1000 * 5);

            setTimeout(function () {
                jQuery.each(wallet_list, function (idx, val) {
                    var sender = $('.walletIcon[data-val=' + val + ']');
                    RefreshWallet(sender);
                });
            }, 500);

        } else {
            RefreshWallet($(this));
        }

        return false;
    });
});

RefreshWalletTransfer = function (fromSiteId, toSiteId) {
    var refresh_list = [fromSiteId, toSiteId];
    setTimeout(function () {
        jQuery.each(refresh_list, function (idx, val) {
            var sender = $('.walletIcon[data-val=' + val + ']');
            if (val == 1) {
                RefreshWallet(sender);
            }
            else
                RefreshWallet(sender);
        });
    }, 500);
}

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
                    setTimeout(function () {
                        $(sender).attr("src", "/web/assets/img/loading.gif");
                        $(sender).prev().html("-");
                    }, 200);
                },
                success: function (data) {
                    setTimeout(function () {
                        try {
                            if (!isNaN(parseFloat(data))) {
                                var amt = numberWithCommas(parseFloat(data).toFixed(2));
                                $(sender).prev().html(amt);
                            }
                            else
                                $(sender).prev().html(data);
                        } catch (err) {
                            $(sender).prev().html(data);
                        }
                    }, 200);

                },
                complete: function (data) {
                    setTimeout(function () {
                        $(sender).attr("src", "/web/assets/img/icon_refresh.png");
                    }, 200);
                },
                error: function () {
                    $(sender).prev().html("0.00");
                }
            });
        }
    } catch (err) {
    }

    return false;
}