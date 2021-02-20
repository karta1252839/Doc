GetBindPromotion = function () {
    $(".ddl_promotion").empty();
    //$("#ddl_pg_promotion").empty();
    //$("#ddl_manual_promotion").empty();
    //$("#ddl_mart_promotion").empty();
    $.ajax(
    {
        url: "/handlers/BindPromotion_dropdown.ashx",
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
                        $(".ddl_promotion").append($("<option></option>").val(0).html('— 請選擇 —'));
                        //$("#ddl_pg_promotion").append($("<option></option>").val(0).html('— 請選擇 —'));
                        //$("#ddl_manual_promotion").append($("<option></option>").val(0).html('— 請選擇 —'));
                        //$("#ddl_mart_promotion").append($("<option></option>").val(0).html('— 請選擇 —'));
                        //console.log("promotion" + json);
                        $.each(json, function (key, item) {
                            $(".ddl_promotion").append($("<option></option>").val(item.PromoId).html(item.PromoDesc));
                            //$("#ddl_pg_promotion").append($("<option></option>").val(item.PromoId).html(item.PromoDesc));
                            //$("#ddl_manual_promotion").append($("<option></option>").val(item.PromoId).html(item.PromoDesc));
                            //$("#ddl_mart_promotion").append($("<option></option>").val(item.PromoId).html(item.PromoDesc));
                        });

                        if(window.location.pathname == "/promotion")
                        {
                            //alert(hid_promotion);
                            var IsExists = false;
                            $('.ddl_promotion option').each(function () {
                                if (this.value == hid_promotion) {
                                    $('.ddl_promotion').val(hid_promotion);
                                } 
                            });
                        }

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