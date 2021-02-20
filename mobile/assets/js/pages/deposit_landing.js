$(function () {

    CheckDepositBank();

    $('.depositRedirectBtn').click(function () {
        var depoType = $(this).data('depotype');

        if (depoType != "manual") {
            if (depoType == 'cc' || depoType == 'atm') {
                var depoPGCheck = JSON.parse(CheckPlayerAllowPG());
                if (depoPGCheck.code == 0 || depoPGCheck.code == "0") {
                    var cc_allow = depoPGCheck.data[0].allow;
                    var atm_allow = depoPGCheck.data[1].allow;
                    if (depoType == 'cc') {
                        if (!cc_allow)
                            alertMSG("請洽客服開通");
                        else
                            location.href = "/deposit/cc";
                    }
                    else {
                        if (!atm_allow)
                            alertMSG("請洽客服開通");
                        else
                            location.href = "/deposit/atm";
                    }
                }
                else
                    alertMSG(depoPGCheck.msg);
            }
            else {
                var depoMarketCheck = JSON.parse(CheckPlayerAllowMart());
                if (depoMarketCheck.code == 0 || depoMarketCheck.code == "0") {
                    var allow = depoMarketCheck.data;
                    if (!allow)
                        alertMSG("請洽客服開通");
                    else
                        location.href = "/deposit/mart";
                }
                else
                    alertMSG(depoMarketCheck.msg);
            }
        }
        else
            location.href = "/deposit/cash";
    });
});