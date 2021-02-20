$(function () {
    BindDepositBank();
    GetBindPromotion();
    GetDepoWithSetting();

    var clipboard = new ClipboardJS('#btn_copy', {
        text: function () {
            return $('.depo_manual_bankaccnum:eq(1)').html();
        }
    });

    clipboard.on('success', function (e) {
        alertMSG("複製成功");
    });

    clipboard.on('error', function (e) {
        alertMSG("複製失敗");
    });

    $('.container_depocash .depo_manual_bank').change(function () {
        BindDepositBankInfo();
    });

    $('.btnDepo_manual').click(function () {

        //alert($('#hid_min_deposit').val());
        //return;

        var param = {
            depo_manual_bank: $('.container_depocash .depo_manual_bank option:selected').val(),
            depo_manual_amt: $('.container_depocash .depo_manual_amt').val(),
            depo_manual_remark: $('.container_depocash .depo_manual_remark').val(),
            depo_manual_promotion: $('.container_depocash .ddl_manual_promotion option:selected').val(),
            min_depo_amt: $('#hid_min_deposit').val(),
        };

        var error_msg = "";

        showLoading();
        $.ajax(
            {
                url: "/handlers/DepositManual.ashx",
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
                            alertMSG(o.msg);
                        }
                        else {
                            alertMSG(o.msg);
                        }
                    }
                },
                error: function (e) {
                }
            });
    });
});


GetDepoWithSetting = function () {
    $.ajax(
        {
            url: "/handlers/GetDepoWithSetting.ashx",
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
                            //alert(json.Withdraw);
                            //$("#min_withdraw").html(json.Withdraw);
                            $.each(json, function (key, item) {
                                $("#min_deposit").html(item.Deposit);
                                $("#hid_min_deposit").val(item.Deposit);

                                $("#min_withdraw").html(item.Withdraw);
                                $("#hid_min_withdraw").val(item.Withdraw);
                            });


                        }
                        break;
                    case 592:
                        location.href = '/';
                        break;
                }
            },
            error: function (e) {
            }
        });
}