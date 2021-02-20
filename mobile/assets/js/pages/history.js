var turnoverFromTrigger = false;
var turnoverToTrigger = false;

$(function () {
    var isLogedin = $('#isLogedin').val();
    var isMobileView = $('#isMobileView').val();
    if (isLogedin == "true") {
        toggleDatePicker();
        if (isMobileView == "true") {
            var url = window.location.href;

            if (url.indexOf('tradehistory') > -1) {
                GetHistory('betbind', 0, 0);
            }
        }
        else {
            GetHistory('betbind', 0, 0);
        }
    }

    $('.btnSearch').click(function () {
        var type = $(this).parents('.panel').data('type');
        var fromDate = $(this).parents('.panel').find('.datepickerFromDate').val();
        var toDate = $(this).parents('.panel').find('.datepickerToDate').val();
        GetHistory(type, fromDate, toDate);
    });
});

function GetHistory(type, fromDate, toDate) {
    var param = "";

    if (type == "bet") {
        var sid = $('#historyBetSid').val();
        param = {
            type: type,
            sid: sid,
            fromDate: fromDate,
            toDate: toDate
        }
    }
    else {
        param = {
            type: type,
            fromDate: fromDate,
            toDate: toDate
        }
    }

    $.ajax({
        url: "/handlers/History.ashx",
        type: 'POST',
        data: JSON.stringify(param),
        contentType: "application/json",
        dataType: 'JSON',
        beforeSend: function () {
            if (type != 'betbind')
                showLoading();
        },
        success: function (result) {
            var o = result;
            var msg = o.msg;
            var appendContent = "";
            if (o.code == "0" || o.code == 0) {
                var r = JSON.parse(o.result);
                if (type == "deposit") {
                    deposit(r);
                }
                else if (type == "withdrawal") {
                    withdrawal(r);
                }
                else if (type == "transfer") {
                    transfer(r);
                }
                else if (type == "promotion") {
                    //promotion(r);
                    CreateTable("promotion", r)
                }
                else if (type == "bet") {
                    bet(r);
                }
                else if (type == "betbind") {
                    for (var i = 0; i < r.length; i++) {
                        if (i == 0) {
                            appendContent = appendContent +
                                '<option value="' + r[i].ID + '" selected>' + r[i].WalletDesc_CHT + '</option>';
                        } else {
                            appendContent = appendContent +
                                '<option value="' + r[i].ID + '">' + r[i].WalletDesc_CHT + '</option>';
                        }
                    }
                    appendContent = '<div class="form-group">' +
                        '<label class="mb-3" style="display: block; color: white;">遊戲</label>' +
                        '<select id="historyBetSid" class="form-control">' +
                        appendContent +
                        '</select>' +
                        '</div>';

                    $(appendContent).insertBefore($('.panel[data-type="bet"]').find('.datepickerFromDate').parent());
                }
                else if (type == "turnover") {
                    CreateTable("turnover", r);
                }
            }
            else {
                if (type == "turnover" || type == "promotion") {
                    $('.panel[data-type="' + type + '"]').find('.itemContainer').addClass('itemContainer__norecords').empty();
                    appendContent = appendContent +
                        '<div class="p-5">' +
                        '尚無任何記錄' +
                        '</div>';
                    $('.panel[data-type="' + type + '"]').find('.itemContainer').append(appendContent);
                }
                else if (type != "betbind") {
                    if (type == "bet" && (!$('.itemContainer__amount_total').hasClass('d-none')))
                        $('.itemContainer__amount_total').addClass('d-none');

                    if ($('.panel[data-type="' + type + '"]').find('.paginationContainer').hasClass('d-flex')) {
                        $('.panel[data-type="' + type + '"]').find('.paginationContainer').removeClass('d-flex');
                        $('.panel[data-type="' + type + '"]').find('.paginationContainer').addClass('d-none');
                    }
                    if (type == "promotion")
                        $('.panel[data-type="' + type + '"]').find('.responseResult .itemContainer').empty();
                    else
                        $('.panel[data-type="' + type + '"]').find('.responseResult').empty();
                    appendContent = appendContent +
                        '<div class="itemContainer itemContainer__norecords p-5" style="height: 48px">' +
                        '尚無任何記錄' +
                        '</div>';
                    $('.panel[data-type="' + type + '"]').find('.responseResult').append(appendContent);
                }
            }
        },
        error: function (xhr) {
            //alertMSG(msg);
        }
    }).done(function () {
        if (type != 'betbind')
            closeLoading();
    });
}

function CreateTable(type, r) {
    var isMobileView = $('#isMobileView').val();
    var appendContent = "";
    var totalTurnover = 0;
    var totalWinLose = 0;
    var fullTable = "";

    $('.panel[data-type="' + type + '"]').find('.itemContainer').removeClass('itemContainer__norecords').empty();
    for (var i = 0; i < r.length; i++) {
        if (type == "turnover") {
            appendContent = appendContent +
                '<tr>' +
                '<td class="text-center">' + r[i].WalletDesc + '</td>' +
                '<td class="text-center">' + GetTwoDecimal(r[i].Turnover) + '</td>' +
                //'<td class="text-center ' + (parseFloat(result[i].WinLose) < 0 ? "text-danger" : "text-primary") + '">' + GetTwoDecimal(result[i].WinLose) + '</td>' +
                '</tr>';

            totalTurnover = totalTurnover + parseFloat(r[i].Turnover);
            totalWinLose = totalWinLose + parseFloat(r[i].WinLose);
        }
        else if (type == "promotion") {
            appendContent = appendContent +
                '<tr>' +
                '<td class="text-center">' + r[i].PromoDesc_CHT + '</td>' +
                '<td class="text-center">' + GetTranslate(r[i].Status) + '</td>' +
                '<td class="text-center">' + GetTwoDecimal(r[i].AmtEntitled) + '</td>' +
                '<td class="text-center">' + (r[i].EntitleDate != "" || r[i].EntitleDate != null ? DateFormat(r[i].EntitleDate) : "") + '</td>' +
                '<td class="text-center">' + (r[i].EntitleEndDate != "" || r[i].EntitleEndDate != null ? DateFormat(r[i].EntitleEndDate) : "") + '</td>' +
                '<td class="text-center">' + GetTwoDecimal(r[i].RolloverAmtReq) + '</td>' +
                '<td class="text-center">' + GetTwoDecimal(r[i].RolloverAmtTotal) + '</td>' +
                '</tr>';
        }
    }

    fullTable = '<div class="table-responsive">' +
        '<table id="' + (type.toLowerCase() == "turnover" ? "historyTurnoverTable" : "historyTradeTable") + '" class="table table-striped table-bordered responsive ' + (isMobileView == "false" ? "nowrap" : "") + '">';

    if (type == "turnover") {
        fullTable = fullTable +
            '<thead>' +
            '<tr>' +
            '<th class="text-center">游戲廳</th>' +
            '<th class="text-center">有效投注</th>' +
            //'<th class="text-center">輸贏</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            appendContent +
            '</tbody>' +
            '<tfoot>' +
            '<tr>' +
            '<th class="text-center">合計</th>' +
            '<th class="text-center">' + GetTwoDecimal(totalTurnover) + '</th>' +
            //'<th class="text-center ' + (parseFloat(totalWinLose) < 0 ? "text-danger" : "text-primary") + '">' + GetTwoDecimal(totalWinLose) + '</th>' +
            '</tr>' +
            '</tfoot>' +
            '</table>';


    }
    else if (type == "promotion") {
        fullTable = fullTable +
            '<thead>' +
            '<tr>' +
            '<th class="text-center ' + (isMobileView == "true" ? "all" : "") + '">優惠</th>' +
            '<th class="text-center ' + (isMobileView == "true" ? "none" : "") + '">狀態</th>' +
            '<th class="text-center ' + (isMobileView == "true" ? "none" : "") + '">獲批金額</th>' +
            '<th class="text-center ' + (isMobileView == "true" ? "none" : "") + '">享有日期</th>' +
            '<th class="text-center ' + (isMobileView == "true" ? "none" : "") + '">享有結束日期</th>' +
            '<th class="text-center ' + (isMobileView == "true" ? "none" : "") + '">所需投注总额</th>' +
            '<th class="text-center ' + (isMobileView == "true" ? "none" : "") + '">目前投注总额</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            appendContent +
            '</tbody>' +
            '</table>';
    }
    fullTable = fullTable + '</div>';

    if (type == "turnover") {
        $('.panel[data-type="' + type + '"]').find('.itemContainer').append(fullTable);
        $('#historyTurnoverTable').DataTable({
            responsive: true,
            language: {
                "processing": "處理中...",
                "loadingRecords": "載入中...",
                "lengthMenu": "顯示 _MENU_ 項結果",
                "zeroRecords": "沒有符合的結果",
                "info": "顯示第 _START_ 至 _END_ 項結果，共 _TOTAL_ 項",
                "infoEmpty": "顯示第 0 至 0 項結果，共 0 項",
                "infoFiltered": "(從 _MAX_ 項結果中過濾)",
                "infoPostFix": "",
                "search": "搜尋:",
                "paginate": {
                    "first": "««",
                    "previous": "«",
                    "next": "»",
                    "last": "»»"
                },
                "aria": {
                    "sortAscending": ": 升冪排列",
                    "sortDescending": ": 降冪排列"
                }
            }
        });
        //$('.dataTables_length').addClass('bs-select');
        $('#historyTurnoverTable_wrapper').addClass('mt-2 mb-3');
        //$('#historyTurnoverTable_wrapper .row:eq(2) div').removeClass('col-md-5 col-md-7');
        //$('#historyTurnoverTable_wrapper .row:eq(2) div').addClass('col-md-12');
        //$('#historyTurnoverTable_wrapper .row:eq(2) div:eq(0)').addClass('text-center mb-1');
        document.getElementById('historyTurnoverTable_wrapper').scrollIntoView(true);
    }
    else if (type == "promotion") {
        $('.panel[data-type="' + type + '"]').find('.itemContainer').append(fullTable);
        $('#historyTradeTable').DataTable({
            responsive: true,
            language: {
                "processing": "處理中...",
                "loadingRecords": "載入中...",
                "lengthMenu": "顯示 _MENU_ 項結果",
                "zeroRecords": "沒有符合的結果",
                "info": "顯示第 _START_ 至 _END_ 項結果，共 _TOTAL_ 項",
                "infoEmpty": "顯示第 0 至 0 項結果，共 0 項",
                "infoFiltered": "(從 _MAX_ 項結果中過濾)",
                "infoPostFix": "",
                "search": "搜尋:",
                "paginate": {
                    "first": "««",
                    "previous": "«",
                    "next": "»",
                    "last": "»»"
                },
                "aria": {
                    "sortAscending": ": 升冪排列",
                    "sortDescending": ": 降冪排列"
                }
            }
        });
        //$('.dataTables_length').addClass('bs-select');
        $('#historyTradeTable_wrapper').addClass('mt-2 mb-3');
        //$('#historyTradeTable_wrapper .row:eq(2) div').removeClass('col-md-5 col-md-7');
        //$('#historyTradeTable_wrapper .row:eq(2) div').addClass('col-md-12');
        //$('#historyTradeTable_wrapper .row:eq(2) div:eq(0)').addClass('text-center mb-1');
        document.getElementById('historyTradeTable_wrapper').scrollIntoView(true);
    }
}

function DateFormat(date) {
    var fullDate = "";
    if (date) {
        var dateTimeSplit = date.split('T');
        var dateSplit = dateTimeSplit[0].split('-');
        var year = dateSplit[0];
        var month = dateSplit[1];
        var day = dateSplit[2];
        var timeSplit = dateTimeSplit[1].split(':');
        var hour = timeSplit[0];
        var min = timeSplit[1];
        fullDate = month + '/' + day + '/' + year + ' ' + hour + ':' + min;
    }
    return fullDate;
}

function toggleDatePicker() {
    var date = new Date();
    var currentMonth = date.getMonth();
    var currentDate = date.getDate();
    var currentYear = date.getFullYear();

    var startDate = new Date(currentYear, currentMonth, currentDate);
    var startMonth = startDate.getMonth() + 1;
    var startDay = startDate.getDate();
    var startYear = startDate.getFullYear();

    var startDateFormat = (startMonth < 10 ? '0' : '') + startMonth + '/' +
        (startDay < 10 ? '0' : '') + startDay + '/' +
        startYear;
    var endDateFormat = ((currentMonth + 1) < 10 ? '0' : '') + (currentMonth + 1) + '/' +
        (currentDate < 10 ? '0' : '') + currentDate + '/' +
        currentYear;

    $('.historyContainer .panel').each(function () {
        var type = $(this).data('type');

        if (type == "promotion") {
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var firstDateFormat = ((firstDay.getMonth() + 1) < 10 ? '0' : '') + (firstDay.getMonth() + 1) + '/' +
                (firstDay.getDate() < 10 ? '0' : '') + firstDay.getDate() + '/' +
                firstDay.getFullYear();

            $(this).find('.datepickerFromDate').val(firstDateFormat);
            $(this).find('.datepickerToDate').val(endDateFormat);
        }
        else if (type == "turnover") {
            var turnoverdate = new Date();
            var turnovercurrentMonth = turnoverdate.getMonth();
            var turnovercurrentDate = turnoverdate.getDate() + 1;
            var turnovercurrentYear = turnoverdate.getFullYear();

            var turnoverstartDate = new Date(turnovercurrentYear, turnovercurrentMonth, turnovercurrentDate - 1);
            var turnoverstartMonth = turnoverstartDate.getMonth() + 1;
            var turnoverstartDay = turnoverstartDate.getDate();
            var turnoverstartYear = turnoverstartDate.getFullYear();

            var turnoverstartDateFormat = (turnoverstartMonth < 10 ? '0' : '') + turnoverstartMonth + '/' +
                (turnoverstartDay < 10 ? '0' : '') + startDay + '/' +
                turnoverstartYear;
            var turnoverendDateFormat = ((turnovercurrentMonth + 1) < 10 ? '0' : '') + (turnovercurrentMonth + 1) + '/' +
                (currentDate < 10 ? '0' : '') + turnovercurrentDate + '/' +
                currentYear;

            $(this).find('.datepickerFromDate').val(turnoverstartDateFormat + " 00:00");
            $(this).find('.datepickerToDate').val(turnoverendDateFormat + " 00:00");
        }
        else {
            $(this).find('.datepickerFromDate').val(startDateFormat);
            $(this).find('.datepickerToDate').val(endDateFormat);
        }

        if (type == 'bet') {
            $(this).find('.datepickerFromDate').datepicker({
                dateFormat: 'mm/dd/yy',
                minDate: new Date(currentYear, currentMonth, currentDate - 14),
                maxDate: new Date(currentYear, currentMonth, currentDate)
            });
        }
        if (type == 'turnover') {
            $(this).find('.datepickerFromDate').datetimepicker({
                dateFormat: 'mm/dd/yy',
                minDate: new Date(currentYear, currentMonth, currentDate - 14, 00, 00),
                maxDate: new Date(currentYear, currentMonth, currentDate, 23, 00),
                controlType: 'select',
                timeOnlyTitle: '選擇時分秒',
                timeText: '時間',
                hourText: '時',
                minuteText: '分',
                secondText: '秒',
                millisecText: '毫秒',
                microsecText: '微秒',
                timezoneText: '時區',
                currentText: '現在時間',
                closeText: '確定',
                timeFormat: 'HH:mm',
                timeSuffix: '',
                amNames: ['上午', 'AM', 'A'],
                pmNames: ['下午', 'PM', 'P'],
                isRTL: false
            });
        }
        else if (type == 'transfer') {
            $(this).find('.datepickerFromDate').datepicker({
                dateFormat: 'mm/dd/yy',
                minDate: new Date(currentYear, currentMonth, currentDate - 30),
                maxDate: new Date(currentYear, currentMonth, currentDate)
            });
        }
        else {
            $(this).find('.datepickerFromDate').datepicker({
                dateFormat: 'mm/dd/yy',
                minDate: new Date(currentYear, currentMonth, currentDate - 15),
                maxDate: new Date(currentYear, currentMonth, currentDate)
            });
        }

        if (type == "turnover") {
            $(this).find('.datepickerFromDate').change(function () {
                if (!turnoverToTrigger) {
                    var fromDate = $(this).datetimepicker('getDate');
                    var toDate = $(this).parents('.panel').find('.datepickerToDate').datetimepicker('getDate');
                    var setStartDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate(), fromDate.getHours() == toDate.getHours() && toDate.getHours() == 23 ? fromDate.getHours() - 1 : fromDate.getHours() + 1, fromDate.getMinutes());
                    if (fromDate > toDate) {
                        turnoverFromTrigger = true;
                        $(this).parents('.panel').find('.datepickerToDate').datetimepicker("setDate", setStartDate);
                        turnoverFromTrigger = false;
                    }
                    else if (fromDate.getTime() == toDate.getTime()) {
                        if (toDate.getHours() == 23) {
                            turnoverToTrigger = true;
                            $(this).parents('.panel').find('.datepickerFromDate').datetimepicker("setDate", setStartDate);
                            turnoverToTrigger = false;
                        }
                        else {
                            turnoverFromTrigger = true;
                            $(this).parents('.panel').find('.datepickerToDate').datetimepicker("setDate", setStartDate);
                            turnoverFromTrigger = false;
                        }
                    }
                }
            });
        }
        else {
            $(this).find('.datepickerFromDate').change(function () {
                var fromDate = $(this).datepicker('getDate');
                var toDate = $(this).parents('.panel').find('.datepickerToDate').datepicker('getDate');
                var setStartDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
                if (fromDate > toDate - 1) {
                    $(this).parents('.panel').find('.datepickerToDate').datepicker("setDate", setStartDate);
                }
            });
        }

        if (type == 'bet') {
            $(this).find('.datepickerToDate').datepicker({
                dateFormat: 'mm/dd/yy',
                minDate: new Date(currentYear, currentMonth, currentDate - 14),
                maxDate: new Date(currentYear, currentMonth, currentDate)
            });
        }
        if (type == 'turnover') {
            $(this).find('.datepickerToDate').datetimepicker({
                dateFormat: 'mm/dd/yy',
                minDate: new Date(currentYear, currentMonth, currentDate - 14, 00, 00),
                maxDate: new Date(currentYear, currentMonth, currentDate + 1, 00, 00),
                controlType: 'select',
                timeOnlyTitle: '選擇時分秒',
                timeText: '時間',
                hourText: '時',
                minuteText: '分',
                secondText: '秒',
                millisecText: '毫秒',
                microsecText: '微秒',
                timezoneText: '時區',
                currentText: '現在時間',
                closeText: '確定',
                timeFormat: 'HH:mm',
                timeSuffix: '',
                amNames: ['上午', 'AM', 'A'],
                pmNames: ['下午', 'PM', 'P'],
                isRTL: false
            });
        }
        else if (type == 'transfer') {
            $(this).find('.datepickerToDate').datepicker({
                dateFormat: 'mm/dd/yy',
                minDate: new Date(currentYear, currentMonth, currentDate - 30),
                maxDate: new Date(currentYear, currentMonth, currentDate)
            });
        }
        else {
            $(this).find('.datepickerToDate').datepicker({
                dateFormat: 'mm/dd/yy',
                minDate: new Date(currentYear, currentMonth, currentDate - 60),
                maxDate: new Date(currentYear, currentMonth, currentDate)
            });
        }

        if (type == "turnover") {
            $(this).find('.datepickerToDate').change(function () {
                if (!turnoverFromTrigger) {
                    var fromDate = $(this).parents('.panel').find('.datepickerFromDate').datetimepicker('getDate');
                    var toDate = $(this).datetimepicker('getDate');
                    var setStartDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), toDate.getHours() == fromDate.getHours() && fromDate.getHours() == 0 ? toDate.getHours() + 1 : toDate.getHours() - 1, toDate.getMinutes());
                    if (toDate < fromDate) {
                        turnoverToTrigger = true;
                        $(this).parents('.panel').find('.datepickerFromDate').datetimepicker("setDate", setStartDate);
                        turnoverToTrigger = false;
                    }
                    else if (toDate.getTime() == fromDate.getTime()) {
                        if (fromDate.getHours() == 0) {
                            turnoverFromTrigger = true;
                            $(this).parents('.panel').find('.datepickerToDate').datetimepicker("setDate", setStartDate);
                            turnoverFromTrigger = false;
                        }
                        else {
                            turnoverToTrigger = true;
                            $(this).parents('.panel').find('.datepickerFromDate').datetimepicker("setDate", setStartDate);
                            turnoverToTrigger = false;
                        }
                    }
                }
            });
        }
        else {
            $(this).find('.datepickerToDate').change(function () {
                var fromDate = $(this).parents('.panel').find('.datepickerFromDate').datepicker('getDate');
                var toDate = $(this).datepicker('getDate');
                var setStartDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
                if (toDate < fromDate - 1) {
                    $(this).parents('.panel').find('.datepickerFromDate').datepicker("setDate", setStartDate);
                }
            });
        }
    });
}

function GetTwoDecimal(amount) {
    var result = "";
    if (amount) {
        if (amount != "" || amount != null)
            result = parseFloat(amount).toFixed(2);
    }
    else
        result = 0;
    return result;
}

function GetTranslate(word) {
    var result = "";
    if (word) {
        if (word != "" || world != null) {
            if (word.toString().toLowerCase() == "success") {
                result = "成功";
            }
            else if (word.toString().toLowerCase() == "failed") {
                result = "失敗";
            }
            else if (word.toString().toLowerCase() == "failed") {
                result = "待定";
            }
            else if (word.toString().toLowerCase() == "transfer in") {
                result = "轉進";
            }
            else if (word.toString().toLowerCase() == "transfer out") {
                result = "轉出";
            }
            else if (word.toString().toLowerCase() == "withdraw") {
                result = "提款";
            }
            else if (word.toString().toLowerCase() == "refund") {
                result = "償還";
            }
            else if (word.toString().toLowerCase() == "deposit") {
                result = "存款";
            }
            else if (word.toString().toLowerCase() == "bonus") {
                result = "紅利";
            }
            else if (word.toString().toLowerCase() == "approved") {
                result = "批準";
            }
            else if (word.toString().toLowerCase() == "new") {
                result = "申請";
            }
            else if (word.toString().toLowerCase() == "rejected") {
                result = "拒絕";
            }
            else if (word.toString().toLowerCase() == "settle" || word.toString().toLowerCase() == "settled") {
                result = "可提款";
            }
            else if (word.toString().toLowerCase() == "pending") {
                result = "申請中";
            }
            else if (word == "1" || word == 1) {
                result = "申請中";
            }
            else if (word == "2" || word == 2) {
                result = "享有";
            }
            else if (word == "3" || word == 3) {
                result = "可提款";
            }
            else if (word == "88" || word == 88) {
                result = "拒絕";
            }
        }
    }
    else {
        result = "系統錯誤！";
    }

    return result;
}