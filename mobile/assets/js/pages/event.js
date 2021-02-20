

GetEvent = function () {
    var heightW = window.innerHeight;
    //var html_roulette = '<a href="/event/roulette" target="_blank" class="event-roulette">'
    //                + '<img src="/event/images/floating-roulette.png" alt="">'
    //                + '<div class="gotoRoulette"> 輪盤</div></a>';

    //$(".gameBackground").append(html_roulette);

    //var html_slot = '<a href="/event/slot" target="_blank" class="event-slot">'
    //                + '<img src="/event/images/floating-slot.png" alt="">'
    //                + '<div class="gotoSlot"> 拉霸</div></a>';
    //$(".gameBackground").append(html_slot);
    

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
                                    //alert('asd');

                                    var html_roulette = '<div class="event-roulette">'
                                                        + '<img src="/mobile/assets/img/floating-roulette.png" alt="任你博娛樂城輪盤">'
                                                        + '<div class="gotoRoulette">輪盤</div></div>';

                                    $(".eventdiv").append(html_roulette);
                                    $('.event-roulette').css('bottom', (heightW * 40 / 100));
                                    

                                   // $("#hidEventID").val(item.EventID);

                                }
                                else if (item.EventTypeId == "2") {
                                    //alert('asdslot');
                                    var html_slot = '<div class="event-slot">'
                                                 + '<img src="/mobile/assets/img/floating-slot.png" alt="任你博娛樂城電子拉霸">'
                                                 + '<div class="gotoSlot">拉霸</div></div>';
                                    $(".eventdiv").append(html_slot);
                                    $('.event-slot').css('bottom', (heightW * 27 / 100));

                                    //$("#hidEventID").val(item.EventID);
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
