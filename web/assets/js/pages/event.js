

GetEvent = function () {

    //var html_roulette = '<a href="/event/roulette" target="_blank" class="event-roulette">'
    //                + '<img src="/event/images/floating-roulette-desktop.png" alt="">'
    //                + '<div class="gotoRoulette"> 旋轉輪盤<div class="decoTip">立即前往</div></div></a>';

    //$(".page-wrap").append(html_roulette);

    //var html_slot = '<a href="/event/slot" target="_blank" class="event-slot">'
    //                                                       + '<img src="/event/images/floating-slot-desktop.png" alt="">'
    //                                                       + '<div class="gotoSlot"> 拉霸遊戲<div class="decoTip">立即前往</div></div></a>';
    //$(".page-wrap").append(html_slot);
    

    $.ajax(
        {
            url: "/handlers/GetEvent.ashx",
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
                        if (o.url) {
                            var json = JSON.parse(o.url);

                            $.each(json, function (key, item) {

                                if (item.EventTypeId == "1") {

                                    var html_roulette = '<div class="event-roulette">'
                                                           + '<img src="/web/Assets/img/floating-roulette-desktop.png" alt="任你博娛樂城-輪盤">'
                                                           + '<div class="gotoRoulette">旋轉輪盤<div class="decoTip">立即前往</div></div></div>';

                                    $(".page-wrap").append(html_roulette);

                                    $("#hidEventID").val(item.EventID);

                                }
                                else if (item.EventTypeId == "2") {
                                    var html_slot = '<div class="event-slot">'
                                                           + '<img src="/web/assets/img/floating-slot-desktop.png" alt="任你博娛樂城-電子拉霸">'
                                                           + '<div class="gotoSlot">拉霸遊戲<div class="decoTip">立即前往</div></div></div>';
                                    $(".page-wrap").append(html_slot);

                                    $("#hidEventID").val(item.EventID);
                                }
                                
                            });
                        }
                        break;
                }
            },
            error: function (e) {
            }
        });
}

GetEvent();