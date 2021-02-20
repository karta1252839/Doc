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
                                $("#depo_vip_main").show();
                            }
                            //alert(cnt);
                        }
                        break;
                }
            },
            error: function (e) {
            }
        });
}