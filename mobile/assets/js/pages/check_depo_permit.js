CheckPlayerAllowPG = function () {
    var jqXHR = $.ajax({
        url: "/handlers/CheckPlayerAllowPG.ashx",
        type: 'POST',
        async: false,
        contentType: "application/json",
        dataType: 'JSON',
        success: function (result) {
        },
        error: function (xhr) {
        }
    });

    return jqXHR.responseText;
};

CheckPlayerAllowMart = function () {
    var jqXHR = $.ajax({
        url: "/handlers/CheckPlayerAllowMart.ashx",
        type: 'POST',
        async: false,
        contentType: "application/json",
        dataType: 'JSON',
        success: function (result) {
        },
        error: function (xhr) {
        }
    });

    return jqXHR.responseText;
};