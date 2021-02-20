
$(function () {

    $('.btnTac').click(function () {

        alertConfirmMSG('請確保您的手機號碼正確，我們將會發送驗證碼到您的手機.', function () {
            //var form = $('form[name=form_register')[0];
            var form = document.getElementById('form_register');
            var formData = new FormData(form);
            var error_msg = "";

            showLoading();
            $.ajax(
            {
                url: "/handlers/RequestTac.ashx",
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function (e) {
                    var o = JSON.parse(e);
                    closeLoading();
                    if (o) {
                        alertMSG(o.msg);
                        var code = o.code;
                        if (code == 0) {
                            $('#hidden_preReqID').val(o.hiddenID);
                            var preReqID = $('#hidden_preReqID').val();
                            //alert(preReqID);
                            $('.r_form_input').prop('readonly', true);

                        } else {

                        }
                    }
                },
                error: function (e) {
                }
            });
        });
    });

    $('.btnRegister').click(function () {

        //var form = $('form[name=form_register')[0];
        var form = document.getElementById('form_register');
        var formData = new FormData(form);
        var error_msg = "";
        showLoading();
        $.ajax(
        {
            url: "/handlers/Register.ashx",
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (e) {
                var o = JSON.parse(e);
                closeLoading();
                if (o) {
                    var code = o.code;
                    if (code == 0) {
                        alertMSG(o.msg);
                        window.location.href = "/";
                    } else {
                        alertMSG(o.msg);
                    }
                }
            },
            error: function (e) {
            }
        });
    });

});