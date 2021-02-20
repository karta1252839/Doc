$(document).ready(function () {
    $('#btn_game').hide();
    $('.btnModalOpenGame').hide();
    //$('.arcadebtn[data-apisiteid=67]').trigger('click');
});

$(".arcadebtn").click(function (e) {
    var isLogedin = $('#isLogedin').val();
    var isMobile = $('#isMobileView').val();
    var lastId = $('#curID').val();
    var selectedId = $(this).data('apisiteid');
    if (selectedId != lastId) {
        var apiSiteId = $(this).data('apisiteid');

        $('.arcadebtn.whiteback').removeClass('whiteback');
        $(this).addClass('whiteback');
        var curID = $('#curID');
        curID.val(apiSiteId);
        GetArcadeGame(apiSiteId, isMobile == 'true' ? 1 : 0);
    }
    else {
        if (isLogedin == "true") {
            TransferConfirmation('0', lastId);
        }
    }
});

function GetArcadeGame(Sid, Platform) {
    var isLogedin = $('#isLogedin').val();
    var isMobile = $('#isMobileView').val();
    var param = {
        Sid: Sid,
        Platform: Platform
    }

    $.ajax({
        url: "/handlers/Arcade.ashx",
        type: 'POST',
        data: JSON.stringify(param),
        contentType: "application/json",
        dataType: 'JSON',
        //async: false,
        cache: false,
        beforeSend: function () {
            showLoading();
        },
        success: function (result) {
            if (result) {
                var o = result;
                var msg = o.msg;
                var appendContent = "";
                if (o.code == "0" || o.code == 0) {
                    $('#gameAppend').empty();
                    var result = JSON.parse(o.result);
                    if (result.length > 0) {
                        var className = "";
                        if (Sid == "67" || Sid == 67 || Sid == "44" || Sid == 44 || Sid == "59" || Sid == 59) {
                            if (isMobile == 'true')
                                $('#gameAppend').addClass('justify-content-center');
                            className = "col-lg-5 col-md-5 col-sm-8 col-xs-8";
                        }
                        else if (Sid == "65" || Sid == 65) {
                            className = "col-lg-2 col-md-4 col-sm-6 col-xs-6 newsizeicg";
                        }
                        else {
                            if (isMobile == 'true')
                                $('#gameAppend').removeClass('justify-content-center');
                            className = "col-lg-2 col-md-2 col-sm-6 col-xs-6";
                        }
                        for (var i = 0; i < result.length; i++) {
                            appendContent = appendContent +
                                '<div class="arcadebox ' + className + ' mb-3" data-search="' + result[i].SearchText + '">' +
                                '<a onclick="' + result[i].ClickPlayText + '">' +
                                '<img class="image lazy mb-3" data-src="' + result[i].LogoPath + '"/>' +
                                '<div class="text-white">' +
                                result[i].GameDesc +
                                '</div>' +
                                '</a>' +
                                '</div>';
                        }

                        $('#gameAppend').append(appendContent);

                        if (!$('.arcadecontent').is(':visible'))
                            $('.arcadecontent').show();

                        closeLoading();
                        $('.arcadebox').show();
                        if (isMobile == 'true') {
                            $('.collapseClose').removeClass('d-none');
                        }
                        if (isLogedin == "true") {
                            TransferConfirmation('0', Sid);
                        }
                    }
                }
                else {
                    closeLoading();
                    alertMSG(msg);
                }
            }
        },
        error: function (xhr) {
            //alertMSG(msg);
        }
    }).done(function () {
        loadLazy();
    });
}

function loadSearch() {
    $('.txtSlotSearch').val("");
    $('.txtSlotSearch')
        .focus(function () {
            $(this).select();
        })
        .keyup(function () {
            var search_value = $(this).val();

            $('.slotsite').each(function () {
                if ($(this).is(':visible')) {
                    $(this).find('.lazy').each(function () {
                        var data = $(this).parents('.slotbox').data('search');
                        var hidetarget = $(this).closest('.slotbox');
                        if (data.toString().toLowerCase().indexOf(search_value.toLowerCase()) > -1) {
                            $(hidetarget).show();
                        } else {
                            $(hidetarget).hide();
                        }
                    });
                }
            });
            $(function () {
                loadLazy();
            });
        })
        .keydown(function (event) {
            if (event.keyCode == 13) {
                event.preventDefault();
                return false;
            }
        });
}

function loadLazy() {
    $('.lazy').Lazy({
        scrollDirection: 'vertical',
        effect: 'fadeIn',
        effectTime: 1000,
        threshold: 0,
        visibleOnly: true
    });
}