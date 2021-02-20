$(function () {

    $('#form_login .input').onEnterKey(function () {
        $(':focus').blur();
        $('#form_login .btnLogin').trigger('click');
    });

    $('.btnLogin').click(function () {
        var form = $('form[name=form_login')[0];
        var formData = new FormData(form);

        showLoading();
        $.ajax(
        {
            url: "/handlers/Login.ashx",
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            dataType: "JSON",
            success: function (result) {
                closeLoading();
                if (result.Data == "success") {
                    window.location.href = "/";
                } else {
                    alertMSGCallback(result.Data, function () {
                        $('#form_login .username').select().focus();
                    });
                }
            },
            error: function (xhr, textStatus, error) {
            }
        });
    });

    $('.btnLogout').click(function () {
        $.ajax(
        {
            url: "/handlers/Logout.ashx",
            type: 'POST',
            cache: false,
            contentType: false,
            processData: false,
            dataType: "JSON",
            success: function (result) {
                if (result) {
                    if (result.code == 0) {
                        try {
                            window.location.href = result.url;
                        } catch (err) {
                            window.location.href = '/';
                        }
                    }
                } else {
                    alertMSG(result.msg);
                }
            },
            error: function (xhr, textStatus, error) {
            }
        });
    });

});

$.fn.onEnterKey = function (callback) {
    $(this).keypress(
        function (event) {
            var code = event.keyCode ? event.keyCode : event.which;

            if (code == 13) {
                callback();
                return false;
            }
        });
};
