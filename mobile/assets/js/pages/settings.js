var is_accessBlog = 1;

CheckDepositBank = function () {
    $.ajax(
        {
            url: "/handlers/BindDepositBank.ashx",
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
                            var cnt = json.length;
                            if (cnt > 0) {
                                //alert(cnt);
                                $("#depo_vip_main").show();
                            }
                            //alert(cnt);
                        }
                        break;
                    case 999: {
                        //alert($(location).attr('pathname'));
                        if ($(location).attr('pathname') == "/deposit/cash") {
                            alertMSGCallback("請洽客服開通", function () {
                                location.href = "/deposit";
                            });
                        }
                    }
                        break;
                }
            },
            error: function (e) {
            }
        });
}