openLiveMatch = function () {
    var launch = false;
    showLoading();
    $.ajax(
    {
        url: "/handlers/LaunchLiveMatch.ashx",
        type: 'POST',
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
                    var url = o.url;
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

