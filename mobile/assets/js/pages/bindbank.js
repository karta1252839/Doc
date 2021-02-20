var PLAYER_DEPOSIT_BANK_LIST;

$(function () {
    $('.btnSaveBank').click(function () {

        //if (!Confirm()) return false;

        //var form = $('form[name=form_savebank')[0];
        //var formData = new FormData(form);
        var param = {
            ddl_bank: $('.container_bindbank .ddl_bank').val(),
            ply_bankname: $('.container_bindbank .ply_bankname').val(),
            ply_bankacc: $('.container_bindbank .ply_bankacc').val(),
        };
        var error_msg = "";

        showLoading();
        $.ajax(
            {
                url: "/handlers/SaveBank.ashx",
                type: 'POST',
                data: JSON.stringify(param),
                cache: false,
                contentType: false,
                processData: false,
                success: function (e) {
                    var o = JSON.parse(e);
                    closeLoading();
                    if (o) {
                        var code = o.code;
                        if (code == 0) {
                            alertMSGCallback(o.msg, GetPlayerBankInfo);
                        } else {
                            alertMSG(o.msg);
                        }
                    }
                },
                error: function (xhr, status, error) {
                    //var err = eval("(" + xhr.responseText + ")");
                    //alert(err.Message);
                },
                complete: function () {
                    closeLoading();
                }
            });
    });
});

GetBindBankList = function () {
    $.ajax(
        {
            url: "/handlers/GetBindBankList.ashx",
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
                            //clear dropdown
                            $(".container_bindbank .ddl_bank").find('option').not(':first').remove();
                            $.each(json, function (key, item) {
                                $(".container_bindbank .ddl_bank").append($("<option></option>").val(item.ID).html(item.BankName));
                            });
                            $(".container_bindbank .ply_bankname, .container_bindbank .ply_bankacc").val(null);
                        }
                        break;
                    case 592:
                        location.href = '/';
                        break;
                }
            },
            error: function (e) {
            },
            complete: function () {
                closeLoading();
            }
        });
}

BindDepositBank = function () {
    showLoading();
    $.ajax(
        {
            url: "/handlers/BindDepositBank.ashx",
            type: 'POST',
            cache: false,
            async: true,
            contentType: false,
            processData: false,
            dataType: "JSON",
            success: function (result) {
                var o = result;
                var code = o.code;
                var bankaccount;
                switch (code) {
                    case 0:
                        if (o.data) {
                            var json = JSON.parse(o.data);
                            PLAYER_DEPOSIT_BANK_LIST = json;

                            var ddl = $(".container_depocash .depo_manual_bank");
                            $(ddl).find('option[value!="0"]').remove();

                            $.each(json, function (key, item) {
                                //var bankaccount = item.BankName + " [ " + item.AccountNumber + " - " + item.AccountName + " ] ";
                                bankaccount = item.BankName;
                                $(ddl).append($("<option></option>").val(item.ID).html(bankaccount));
                            });

                            var cnt = json.length;
                            if (cnt <= 1) {
                                $(ddl).val($(ddl).find("option:eq(1)").val()).trigger('change');
                                $(ddl).addClass('readonly').css("pointer-events", "none");

                                $('.div_bank').eq(1).show();
                                $(ddl).eq(1).text(bankaccount);

                            } else {
                                $('.div_bank').eq(0).show();
                                $(ddl).eq(0).removeClass('readonly').css("pointer-events", "");
                            }
                        }
                        break;
                    case 592:
                        location.href = '/';
                        break;
                    default:
                        $('.div_bank').eq(0).show();
                        $(ddl).eq(0).removeClass('readonly').css("pointer-events", "");
                        break;
                }
                closeLoading();
            },
            error: function (e) {
            }
        });
}

BindDepositBankInfo = function () {
    var data = PLAYER_DEPOSIT_BANK_LIST;

    var bankNo = $('.container_depocash .depo_manual_bank').val();

    if (bankNo > 0) {
        var bankObj = data.filter(
            function (data) { return data.ID == bankNo }
        );
        if (bankObj) {
            var accountName = bankObj[0].AccountName;
            var accountNumber = bankObj[0].AccountNumber;
            $('.container_depocash .depo_manual_bankaccname').eq(0).val(accountName);
            $('.container_depocash .depo_manual_bankaccnum').eq(0).val(accountNumber);

            $('.container_depocash .depo_manual_bankaccname').eq(1).html(accountName);
            $('.container_depocash .depo_manual_bankaccnum').eq(1).html(accountNumber);

            $('.div_depo_manual_bankaccname').show();
            $('.div_depo_manual_bankaccnum').show();

        }
    } else {
        $('.container_depocash .depo_manual_bankaccname').eq(0).val(null);
        $('.container_depocash .depo_manual_bankaccnum').eq(0).val(null);
        $('.div_depo_manual_bankaccname').hide();
        $('.div_depo_manual_bankaccnum').hide();

    }
}