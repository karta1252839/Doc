$(function () {
    $('.btnLogin').click(function () {
        //var form = $('form[name=form_login')[0];
        var form = document.getElementById('form_login');
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
                    var path = getUrlVars()["path"];
                    //alert(path);
                    if(path == null)
                        window.location.href = "/";
                    else if (path == "roulette")
                        window.location.href = "/event/roulette";
                    else
                        window.location.href = "/event/slot";

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
                            window.location.href = "/";
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

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
