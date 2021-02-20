var lockMobile = false;//手机版彩票进游戏加锁


function loginFormSubmit() {
    var txtLoginUsername = $("#txtLoginUsername");
    var txtLoginPassword = $("#txtLoginPassword");
    var txtLoginCaptcha = $("#txtLoginCode");
    var txtLoginSite = $("#txtLoginSite").val();
    var txtRememberUser = "";

    if ($("#txtRememberUser").length > 0) {
        if ($("#txtRememberUser").prop("checked")) {
            txtRememberUser = "on";
        }
    }
    if ("klcp" == txtLoginSite || "99kap" == txtLoginSite) {
        if (txtLoginUsername.val().length < 1 || txtLoginUsername.val() == l_basic["username"]) {
            JqueryShowMessage(l_login['msg1']);
            return false;
        } else if (txtLoginPassword.val().length < 1) {
            JqueryShowMessage(l_login['msg2']);
        } else if (txtLoginUsername.val().length < 3 || !patrnName.exec(txtLoginUsername.val())) {
            JqueryShowMessage(l_login['msg3']);
            return false;
        } else if (txtLoginPassword.val().length < 6) {
            JqueryShowMessage(l_login['msg3']);
            return false;
        }
    } else {
        if (txtLoginUsername.val().length < 1 || txtLoginUsername.val() == l_basic["username"]) {
            JqueryShowMessage(l_login['msg1']);
            return false;
        } else if (txtLoginPassword.val().length < 1) {
            JqueryShowMessage(l_login['msg2']);
            return false;
        } else if (txtLoginCaptcha.val().length != 4) {
            JqueryShowMessage(l_login['msg4']);
            return false;
        } else if (txtLoginUsername.val().length < 3 || !patrnName.exec(txtLoginUsername.val())) {
            JqueryShowMessage(l_login['msg3']);
            return false;
        } else if (txtLoginPassword.val().length < 6) {
            JqueryShowMessage(l_login['msg3']);
            return false;
        } else if (!patrnZhengInt.exec(txtLoginCaptcha.val())) {
            JqueryShowMessage(l_login['msg4']);
            return false;
        }
    }


    var o = {
        txtLoginCaptcha: txtLoginCaptcha.val(),
        txtLoginUsername: txtLoginUsername.val(),
        txtLoginPassword: txtLoginPassword.val(),
        txtRememberUser: txtRememberUser
    };

    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/loginVerification?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: false,
        timeout: 50000,
        beforeSend: function (xmlhttprequest) {
            $("#btn_login").html("登录中..");
        },
        success: function (data) {
            if (data) {
                if (data.success == true) {
                    if (data.needModifyPW === "yes") {
                        location.href = "modifyPW";
                    } else {
                        if (data.site == "zongCaiYLDLB") {
                            alert("紧急通知：总裁娱乐的客官们，由于最近微信风控比较严，如若没有及时回复您的信息，" +
                                    "请及时联系我们游戏主页面的在线客服或者直接添加财务备用QQ1：915903333 财务备用微信：zckefu02 或者zckefu03" +
                                    " 也可以添加客服专员微信NCEO1212 : ZCYL3338,客服专员QQ1:976027777 QQ2: 932705555 或者直接拨打紧急咨询电话联系：0085256667777 ，" +
                                    "0085256669999 进行业务办理  ，总裁用心为您服务，请不要把我弄丢了!");
                        } else {
                            for (var i = 0; i < data.annLoginList.length; i++) {
                                alert(data.annLoginList[i]);
                            }
                        }

                        var page = $("#page").val();
                        var joinPage = "";
                        if (null != $("#joinPage").val()) {
                            joinPage = $("#joinPage").val();
                        }

                        if ((page == "home" || page == "registration") && joinPage == "") {
                            location.href = "home?l=0";
                        } else if (joinPage) {
                            location.href = joinPage;
                        } else {
                            location.reload();
                        }
                    }
                } else {
                    $("#btn_login").html("登录");
                    if (data.message == 'CHECK_CODE') {
                        JqueryShowMessage(l_login['msg4']);
                    } else if (data.message == 'USERNAME_OR_PASSWORD') {
                        JqueryShowMessage(l_login['msg3']);
                    } else if (data.message == 'IP_ERROR') {
                        JqueryShowMessage(l_login['msg8']);
                    } else if (data.message == 'LOGIN_IP_BLOCK') {
                        JqueryShowMessage(l_login['msg5']);
                    } else if (data.message == 'USER_CLOSE') {
                        JqueryShowMessage(l_login['msg6']);
                    } else if (data.message == 'PASSWORD_LOCK') {
                        JqueryShowMessage(l_login['msg7']);
                    } else if (data.message == 'TRY_AGAIN') {
                        JqueryShowMessage(l_basic['tryAgain']);
                    } else if (data.message == 'LOGIN_ERROR_COUNT') {
                        JqueryShowMessage(l_basic['countError']);
                    } else if (data.message == 'LOGIN_ERROR_COUNT_SIX') {
                        JqueryShowMessage(l_basic['countErrorSix']);
                    } else if (data.message == 'NO_MEMBER_LOGIN') {
                        JqueryShowMessage(l_basic['noMemberLogin']);
                    }
                    changeLoginCode();
                }
            }
        },
        error: function (xmlhttprequest, error) {

            JqueryShowMessage(l_basic['tryAgain']);
            $("#btn_login").html("登录");
        },
        complete: function () {
        }
    });

}

/*弹出框登陆验证*/
function loginFormSubmit_openDiv() {
    var txtLoginUsername = $("#txtLoginUsername1");
    var txtLoginPassword = $("#txtLoginPassword1");
    var txtLoginCaptcha = $("#txtLoginCode1");
    if (txtLoginUsername.val().length < 1 || txtLoginUsername.val() == l_basic["username"]) {
        JqueryShowMessage(l_login['msg1']);
        return false;
    } else if (txtLoginPassword.val().length < 1) {
        JqueryShowMessage(l_login['msg2']);
        return false;
    } else if (txtLoginCaptcha.val().length != 4) {
        JqueryShowMessage(l_login['msg4']);
        return false;
    } else if (txtLoginUsername.val().length < 3 || !patrnName.exec(txtLoginUsername.val())) {
        JqueryShowMessage(l_login['msg3']);
        return false;
    } else if (txtLoginPassword.val().length < 6) {
        JqueryShowMessage(l_login['msg3']);
        return false;
    } else if (!patrnZhengInt.exec(txtLoginCaptcha.val())) {
        JqueryShowMessage(l_login['msg4']);
        return false;
    }

    var o = {
        txtLoginCaptcha: txtLoginCaptcha.val(),
        txtLoginUsername: txtLoginUsername.val(),
        txtLoginPassword: txtLoginPassword.val()
    };

    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/loginVerification?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: false,
        timeout: 50000,
        beforeSend: function (xmlhttprequest) {
            $("#btn_login").html("登录中..");
        },
        success: function (data) {
            if (data) {
                if (data.success == true) {
                    if (data.site == "zongCaiYLDLB") {
                        alert("紧急通知：总裁娱乐的客官们，由于最近微信风控比较严，如若没有及时回复您的信息，" +
                                "请及时联系我们游戏主页面的在线客服或者直接添加财务备用QQ1：915903333 财务备用微信：zckefu02 或者zckefu03" +
                                " 也可以添加客服专员微信NCEO1212 : ZCYL3338,客服专员QQ1:976027777 QQ2: 932705555 或者直接拨打紧急咨询电话联系：0085256667777 ，" +
                                "0085256669999 进行业务办理  ，总裁用心为您服务，请不要把我弄丢了!");
                    } else {
                        for (var i = 0; i < data.annLoginList.length; i++) {
                            alert(data.annLoginList[i]);
                        }
                    }
                    var page = $("#page").val();
                    var joinPage = "";
                    if (null != $("#joinPage").val()) {
                        joinPage = $("#joinPage").val();
                    }

                    if ((page == "home" || page == "registration") && joinPage == "") {
                        location.href = "home?l=0";
                    } else if (joinPage) {
                        location.href = joinPage;
                    } else {
                        location.reload();
                    }
                } else {
                    $("#btn_login").html("登录");
                    if (data.message == 'CHECK_CODE') {
                        JqueryShowMessage(l_login['msg4']);
                    } else if (data.message == 'USERNAME_OR_PASSWORD') {
                        JqueryShowMessage(l_login['msg3']);
                    } else if (data.message == 'IP_ERROR') {
                        JqueryShowMessage(l_login['msg8']);
                    } else if (data.message == 'LOGIN_IP_BLOCK') {
                        JqueryShowMessage(l_login['msg5']);
                    } else if (data.message == 'USER_CLOSE') {
                        JqueryShowMessage(l_login['msg6']);
                    } else if (data.message == 'PASSWORD_LOCK') {
                        JqueryShowMessage(l_login['msg7']);
                    } else if (data.message == 'TRY_AGAIN') {
                        JqueryShowMessage(l_basic['tryAgain']);
                    } else if (data.message == 'LOGIN_ERROR_COUNT') {
                        JqueryShowMessage(l_basic['countError']);
                    } else if (data.message == 'LOGIN_ERROR_COUNT_SIX') {
                        JqueryShowMessage(l_basic['countErrorSix']);
                    }
                    changeLoginCode();
                }
            }
        },
        error: function (xmlhttprequest, error) {
            JqueryShowMessage(l_basic['tryAgain']);
            $("#btn_login").html("登录");
        },
        complete: function () {
        }
    });

}

function loginDemoFormSubmit() {
    var o = {
    };
    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/loginDemoVerification?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: false,
        timeout: 50000,
        beforeSend: function (xmlhttprequest) {
            /*$("#btn_loginDemo").html("登录中..");*/
        },
        success: function (data) {
            if (data) {
                if (data.success == true) {
                    if (data.site == "zongCaiYLDLB") {
                        alert("紧急通知：总裁娱乐的客官们，由于最近微信风控比较严，如若没有及时回复您的信息，" +
                                "请及时联系我们游戏主页面的在线客服或者直接添加财务备用QQ1：915903333 财务备用微信：zckefu02 或者zckefu03" +
                                " 也可以添加客服专员微信NCEO1212 : ZCYL3338,客服专员QQ1:976027777 QQ2: 932705555 或者直接拨打紧急咨询电话联系：0085256667777 ，" +
                                "0085256669999 进行业务办理  ，总裁用心为您服务，请不要把我弄丢了!");
                    } else {
                        for (var i = 0; i < data.annLoginList.length; i++) {
                            alert(data.annLoginList[i]);
                        }
                    }
                    var page = $("#page").val();
                    var joinPage = "";
                    if (null != $("#joinPage").val()) {
                        joinPage = $("#joinPage").val();
                    }
                    if (joinPage == "") {
                        location.href = "home?l=0";
                    } else if (joinPage) {
                        location.href = joinPage;
                    }
                } else {
                    $("#btn_login").html("登录");
                    if (data.message == 'IP_ERROR') {
                        JqueryShowMessage(l_login['msg8']);
                    } else if (data.message == 'LOGIN_IP_BLOCK') {
                        JqueryShowMessage(l_login['msg5']);
                    } else if (data.message == 'TRY_AGAIN') {
                        JqueryShowMessage(l_basic['tryAgain']);
                    } else if (data.message == 'LOGIN_ERROR_COUNT') {
                        JqueryShowMessage(l_basic['countError']);
                    } else if (data.message == 'DEMO_MAX_MEMBER') {
                        JqueryShowMessage(l_loginDemo['msg1']);
                    } else if (data.message == 'DEMO_IP_LIMIT') {
                        JqueryShowMessage(l_loginDemo['msg2']);
                    }
                    changeLoginCode();
                }
            }
        },
        error: function (xmlhttprequest, error) {
            JqueryShowMessage(l_basic['tryAgain']);
            /*$("#btn_login").html("登录");*/
        },
        complete: function () {
        }
    });

}

//试玩登录跳转PT页面 martin
function loginDemoPTFormSubmit() {

    var o = {
    };
    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/loginDemoVerification?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: false,
        timeout: 50000,
        beforeSend: function (xmlhttprequest) {
            /*$("#btn_loginDemo").html("登录中..");*/
        },
        success: function (data) {
            if (data) {
                if (data.success == true) {
                    if (data.site == "zongCaiYLDLB") {
                        alert("紧急通知：总裁娱乐的客官们，由于最近微信风控比较严，如若没有及时回复您的信息，" +
                                "请及时联系我们游戏主页面的在线客服或者直接添加财务备用QQ1：915903333 财务备用微信：zckefu02 或者zckefu03" +
                                " 也可以添加客服专员微信NCEO1212 : ZCYL3338,客服专员QQ1:976027777 QQ2: 932705555 或者直接拨打紧急咨询电话联系：0085256667777 ，" +
                                "0085256669999 进行业务办理  ，总裁用心为您服务，请不要把我弄丢了!");
                    } else {
                        for (var i = 0; i < data.annLoginList.length; i++) {
                            alert(data.annLoginList[i]);
                        }
                    }
                    var page = $("#page").val();
                    if (page == "home" || page == "registration") {
                        /*location.href="home?l=0"; */
                        location.href = "electronicGamePT";
                    } else {
                        location.reload();
                    }
                } else {
                    $("#btn_login").html("登录");
                    if (data.message == 'IP_ERROR') {
                        JqueryShowMessage(l_login['msg8']);
                    } else if (data.message == 'LOGIN_IP_BLOCK') {
                        JqueryShowMessage(l_login['msg5']);
                    } else if (data.message == 'TRY_AGAIN') {
                        JqueryShowMessage(l_basic['tryAgain']);
                    } else if (data.message == 'LOGIN_ERROR_COUNT') {
                        JqueryShowMessage(l_basic['countError']);
                    } else if (data.message == 'DEMO_MAX_MEMBER') {
                        JqueryShowMessage(l_loginDemo['msg1']);
                    } else if (data.message == 'DEMO_IP_LIMIT') {
                        JqueryShowMessage(l_loginDemo['msg2']);
                    }
                    changeLoginCode();
                }
            }
        },
        error: function (xmlhttprequest, error) {
            JqueryShowMessage(l_basic['tryAgain']);
            /*$("#btn_login").html("登录");*/
        },
        complete: function () {
        }
    });

}

function loginFormSubmitToXieyi() {
    var txtLoginUsername = $("#txtLoginUsername");
    var txtLoginPassword = $("#txtLoginPassword");
    var txtLoginCaptcha = $("#txtLoginCode");
    if (txtLoginUsername.val().length < 1) {
        JqueryShowMessage(l_login['msg1']);
        return false;
    } else if (txtLoginPassword.val().length < 1) {
        JqueryShowMessage(l_login['msg2']);
        return false;
    } else if (txtLoginCaptcha.val().length != 4) {
        JqueryShowMessage(l_login['msg4']);
        return false;
    } else if (txtLoginUsername.val().length < 3 || !patrnName.exec(txtLoginUsername.val())) {
        JqueryShowMessage(l_login['msg3']);
        return false;
    } else if (txtLoginPassword.val().length < 6) {
        JqueryShowMessage(l_login['msg3']);
        return false;
    } else if (!patrnZhengInt.exec(txtLoginCaptcha.val())) {
        JqueryShowMessage(l_login['msg4']);
        return false;
    }

    var o = {
        txtLoginCaptcha: txtLoginCaptcha.val(),
        txtLoginUsername: txtLoginUsername.val(),
        txtLoginPassword: txtLoginPassword.val()
    };

    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/loginVerification?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: false,
        timeout: 50000,
        beforeSend: function (xmlhttprequest) {
            $("#btn_login").html("登录中..");
        },
        success: function (data) {
            if (data) {
                if (data.success == true) {
                    //							var page = $("#page").val();
                    //							if(page == "home" || page == "registration"){
                    location.href = "platform";
                    //							} else {
                    //								location.reload();
                    //							}
                } else {
                    $("#btn_login").html("登录");
                    if (data.message == 'CHECK_CODE') {
                        JqueryShowMessage(l_login['msg4']);
                    } else if (data.message == 'USERNAME_OR_PASSWORD') {
                        JqueryShowMessage(l_login['msg3']);
                    } else if (data.message == 'IP_ERROR') {
                        JqueryShowMessage(l_login['msg8']);
                    } else if (data.message == 'LOGIN_IP_BLOCK') {
                        JqueryShowMessage(l_login['msg5']);
                    } else if (data.message == 'USER_CLOSE') {
                        JqueryShowMessage(l_login['msg6']);
                    } else if (data.message == 'PASSWORD_LOCK') {
                        JqueryShowMessage(l_login['msg7']);
                    } else if (data.message == 'TRY_AGAIN') {
                        JqueryShowMessage(l_basic['tryAgain']);
                    } else if (data.message == 'LOGIN_ERROR_COUNT') {
                        JqueryShowMessage(l_basic['countError']);
                    } else if (data.message == 'LOGIN_ERROR_COUNT_SIX') {
                        JqueryShowMessage(l_basic['countErrorSix']);
                    }
                    changeLoginCode();
                }
            }
        },
        error: function (xmlhttprequest, error) {
            JqueryShowMessage(l_basic['tryAgain']);
            $("#btn_login").html("登录");
        },
        complete: function () {
        }
    });

}

function loginFormSubmitToXieyi2() {
    var txtLoginUsername = $("#txtLoginUsername2");
    var txtLoginPassword = $("#txtLoginPassword2");
    var txtLoginCaptcha = $("#txtLoginCode2");
    if (txtLoginUsername.val().length < 1) {
        JqueryShowMessage(l_login['msg1']);
        return false;
    } else if (txtLoginPassword.val().length < 1) {
        JqueryShowMessage(l_login['msg2']);
        return false;
    } else if (txtLoginCaptcha.val().length != 4) {
        JqueryShowMessage(l_login['msg4']);
        return false;
    } else if (txtLoginUsername.val().length < 3 || !patrnName.exec(txtLoginUsername.val())) {
        JqueryShowMessage(l_login['msg3']);
        return false;
    } else if (txtLoginPassword.val().length < 6) {
        JqueryShowMessage(l_login['msg3']);
        return false;
    } else if (!patrnZhengInt.exec(txtLoginCaptcha.val())) {
        JqueryShowMessage(l_login['msg4']);
        return false;
    }

    var o = {
        txtLoginCaptcha: txtLoginCaptcha.val(),
        txtLoginUsername: txtLoginUsername.val(),
        txtLoginPassword: txtLoginPassword.val()
    };

    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/loginVerification?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: false,
        timeout: 50000,
        beforeSend: function (xmlhttprequest) {
            $("#btn_login").html("登录中..");
        },
        success: function (data) {
            if (data) {
                if (data.success == true) {
                    //							var page = $("#page").val();
                    //							if(page == "home" || page == "registration"){
                    location.href = "platform";
                    //							} else {
                    //								location.reload();
                    //							}
                } else {
                    $("#btn_login").html("登录");
                    if (data.message == 'CHECK_CODE') {
                        JqueryShowMessage(l_login['msg4']);
                    } else if (data.message == 'USERNAME_OR_PASSWORD') {
                        JqueryShowMessage(l_login['msg3']);
                    } else if (data.message == 'IP_ERROR') {
                        JqueryShowMessage(l_login['msg8']);
                    } else if (data.message == 'LOGIN_IP_BLOCK') {
                        JqueryShowMessage(l_login['msg5']);
                    } else if (data.message == 'USER_CLOSE') {
                        JqueryShowMessage(l_login['msg6']);
                    } else if (data.message == 'PASSWORD_LOCK') {
                        JqueryShowMessage(l_login['msg7']);
                    } else if (data.message == 'TRY_AGAIN') {
                        JqueryShowMessage(l_basic['tryAgain']);
                    } else if (data.message == 'LOGIN_ERROR_COUNT') {
                        JqueryShowMessage(l_basic['countError']);
                    } else if (data.message == 'LOGIN_ERROR_COUNT_SIX') {
                        JqueryShowMessage(l_basic['countErrorSix']);
                    }
                    changeLoginCode();
                }
            }
        },
        error: function (xmlhttprequest, error) {
            JqueryShowMessage(l_basic['tryAgain']);
            $("#btn_login").html("登录");
        },
        complete: function () {
        }
    });

}

function loginEnterToXieYi(keyNumber) {
    if (keyNumber == 13) {
        loginFormSubmitToXieyi();
    }
}
function loginEnterToXieYi2(keyNumber) {
    if (keyNumber == 13) {
        loginFormSubmitToXieyi2();
    }
}


function loginEnter(keyNumber) {
    if (keyNumber == 13) {
        loginFormSubmit();
    }
}
function loginEnter2(keyNumber) {
    if (keyNumber == 13) {
        loginFormSubmit2();
    }
}

function loginEnter3(keyNumber) {
    if (keyNumber == 13) {
        loginFormSubmit_openDiv();
    }
}


function changeNull(thisObj, msg) {
    if (msg == 'username') {
        if (thisObj.value == l_basic['username']) {
            thisObj.value = '';
        }
    } else if (msg == 'password') {
        //		 if (thisObj.value==l_login['msg9']){
        //			 $("#txtLoginPasswordText").hide();
        //			 $("#txtLoginPassword").show();
        //			}else if(thisObj.value==''){
        //				$("#txtLoginPasswordText").show();
        //				 $("#txtLoginPassword").hide();
        //			}
    } else if (msg == 'code') {
        if (thisObj.value == l_basic['code']) {
            thisObj.value = '';
        }
    }
}


function changePasswordText() {
    $("#txtLoginPasswordText").hide();
    $("#txtLoginPassword").show();
    $('#txtLoginPassword').focus();
}


function changePassword() {
    if ($('#txtLoginPassword').val() == '') {
        $("#txtLoginPasswordText").show();
        $("#txtLoginPassword").hide();
        $("#txtLoginPasswordText").val(l_basic['password']);
    }

}


function changeMessage(thisObj, msg) {
    if (msg == 'username') {
        if (thisObj.value == '') {
            thisObj.value = l_basic['username'];
        }
    } else if (msg == 'password') {
        //		 if (thisObj.value==''){
        //			 thisObj.value=l_login['msg9'];
        //			}
    } else if (msg == 'code') {
        if (thisObj.value == '') {
            thisObj.value = l_basic['code'];
        }
    }

}

function changeMessage1(thisObj, msg) {
    if (msg == 'username1') {
        if (thisObj.value == '') {
            thisObj.value = l_basic['username1'];
        }
    } else if (msg == 'password') {
        //		 if (thisObj.value==''){
        //			 thisObj.value=l_login['msg9'];
        //			}
    } else if (msg == 'code') {
        if (thisObj.value == '') {
            thisObj.value = l_basic['code'];
        }
    }
}

function changeNull1(thisObj, msg) {
    if (msg == 'username1') {
        if (thisObj.value == l_basic['username1']) {
            thisObj.value = '';
        }
    } else if (msg == 'code') {
        if (thisObj.value == l_basic['code']) {
            thisObj.value = '';
        }
    }
}

function changeNull2(thisObj, msg) {
    if (msg == 'username') {
        if (thisObj.value == l_basic['username']) {
            thisObj.value = '';
        }
    } else if (msg == 'code') {
        if (thisObj.value == l_basic['code']) {
            thisObj.value = '';
        }
    }
}


function changePasswordText2() {
    $("#txtLoginPasswordText2").hide();
    $("#txtLoginPassword2").show();
    $('#txtLoginPassword2').focus();
}


function changePassword2() {
    if ($('#txtLoginPassword2').val() == '') {
        $("#txtLoginPasswordText2").show();
        $("#txtLoginPassword2").hide();
        $("#txtLoginPasswordText2").val(l_basic['password']);
    }

}


function changeMessage2(thisObj, msg) {
    if (msg == 'username') {
        if (thisObj.value == '') {
            thisObj.value = l_basic['username'];
        }
    } else if (msg == 'code') {
        if (thisObj.value == '') {
            thisObj.value = l_basic['code'];
        }
    }

}

function playGameYzc(product) {

    var iHeight = screen.height - 70;
    var iWidth = screen.width - 10;

    var o = {
        product: product
    };
    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/playHoldem?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: false,
        timeout: 50000,
        beforeSend: function (xmlhttprequest) {
            if (product == 'LOTTO_IG') {
                $("#maskDiv").show();
                $("#lottoiframe").hide();
            } else if (product == 'LOTTERY_IG') {
                $("#maskDiv").show();
                $("#lotteryiframe").hide();
            } else if (product == 'LOTTERY_DS') {
                $("#maskDiv").show();
                $("#ffciframe").hide();
            }
        },
        success: function (data) {
            if (data) {
                if (data.success == true) {
                    if (product == 'LIVE_IG') {
                        window.open(data.link, 'livecashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
                    } else if (product == 'LIVE_LMG') {
                        window.open(data.link, 'livecashLMGWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
                    } else if (product == 'LIVE_DS') {
                        window.open(data.link, 'livecashDSWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
                    } else if (product == 'LIVE_AG') {
                        window.open(data.link, 'livecashAGWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
                    } else if (product == "LOTTERY_IG") {
                        $("#maskDiv").show();
                        $("#lotteryiframe").attr("src", data.link);
                    } else if (product == "LOTTO_IG") {
                        $("#maskDiv").show();
                        $("#lottoiframe").attr("src", data.link);
                    } else if (product == "LOTTERY_DS") {
                        $("#maskDiv").show();
                        $("#ffciframe").attr("src", data.link);
                    }
                } else {
                    if (data.message == 'SESSION_EXPIRED') {
                        JqueryShowMessageHome(l_playGame['msg4']);
                    } else if (data.message == 'STATUS_NO_OPEN') {
                        JqueryShowMessage(l_playGame['msg3']);
                    } else if (data.message == 'USER_CLOSE') {
                        JqueryShowMessage(l_playGame['msg2']);
                    } else if (data.message == 'TRY_AGAIN') {
                        JqueryShowMessage(l_basic['tryAgain']);
                    } else if (data.message == 'PRODUCT_NO_EXISTS') {
                        JqueryShowMessageHome(l_playGame['msg6']);
                    } else if (data.message == 'PRODUCT_MAINTENACE') {
                        if (data.msg === "") {
                            JqueryShowMessageJustClose(l_playGame['msg7']);
                        } else {
                            JqueryShowMessageJustClose(data.msg);
                        }
                    }
                    $("#maskDiv").hide();
                }
            }
        },
        error: function (xmlhttprequest, error) {
            JqueryShowMessage(l_basic['tryAgain']);
        },
        complete: function () {
        }
    });
}

function playGame(product, type) {
    var openSelf = false;
    var webUrl = window.location.href;
    if (webUrl.indexOf("xinPuJingXSYLBLoginWeb") != -1) {
        $.ajax({
            type: "post",
            url: $("#path").val() + "/app/pcOrMp?" + Math.random() * 10000,
            data: $.toJSON({ "pcOrMp": "pcOrMp" }),
            contentType: 'application/json',
            dataType: "json",
            async: false,
            timeout: 50000,
            beforeSend: function (xmlhttprequest) { },
            success: function (data) {
                if (data) {
                    if (data.success == true) {
                        if (data.pcOrMp == 'MP') {
                            openSelf = true;
                        }
                    } else {
                    }
                }
            },
            error: function (xmlhttprequest, error) {
            },
            complete: function () {
            }
        });

    }

    var ishttps = 'https:' == document.location.protocol ? true : false;
    var iHeight = screen.height - 70;
    var iWidth = screen.width - 10;

    var liveIG = null;
    var liveLMG = null;
    var liveDS = null;
    var liveAG = null;
    var liveBBIN = null;
    var liveOPUS = null;
    var liveOG = null;
    var liveCG88 = null;
    var liveSUNBET = null;
    var electroicAG = null;
    var electroicBBIN = null;
    var electroicAGByw = null;
    var electroicOPUS = null;
    var electroicHB = null;
    var electroicALLBET = null;
    var electroicPP = null;
    var seven = null;
    var fishGG = null;
    var IGHall = null;
    var spoptOPUS = null;
    var spoptiwc = null;
    var liveAllBet = null;
    var lotteryDS = null;
    var lottoFfcIG = null;   //IG官方彩
    var lottoffcPJ = null;   //IG（新）官方彩
    var lotteryIGVR = null;  //IG（视讯）传统彩	
    var electroicKY = null;   //开元棋牌 
    var electroicIGChess = null;   //IG棋牌 
    if (product == "LIVE_IG") {
        liveIG = window.open("", 'liveIGcashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
    } else if (product == "LIVE_LMG") {
        liveLMG = window.open("", 'liveLMGcashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
        //		$("body").append("<a id='live_lmg_a' href='' target='_blank'>");
    } else if (product == "LIVE_DS") {
        liveDS = window.open("", 'liveDScashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
    } else if (product == "LIVE_CG88") {
        liveCG88 = window.open("", 'liveCG88cashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
    } else if (product == "LIVE_AG") {
        liveAG = window.open("", 'liveAGcashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
    } else if (product == "SLOTS_AG") {
        electroicAG = window.open("", 'electroicAGcashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
    } else if (product == "FISH_AG") {
        electroicAGByw = window.open("", 'electroicBywAGcashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
    } else if (product == "LIVE_OG") {
        liveOG = window.open("", 'liveOGcashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
    } else if (product == "LIVE_BBIN") {
        liveBBIN = window.open("", 'liveBBINcashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
    } else if (product == "SLOTS_BBIN") {
        electroicBBIN = window.open("", 'liveBBINcashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
    } else if (product == "SLOTS_ALLBET") {
        electroicALLBET = window.open("", 'electroicALLBETcashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
    } else if (product == "SLOTS_YY") {
        if (!openSelf) {
            electroicYY = window.open("", 'electroicyycashWindow' + Math.random(), "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
        }
    } else if (product == "FISH_GG") {
        fishGG = window.open("", 'fishGgcashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
    } else if (product == "IG_HALL") {
        IGHall = window.open("", 'hallIgcashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
    } else if (product == "LIVE_OPUS") {
        liveOPUS = window.open("", 'liveopuscashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
    } else if (product == "SPORT_OPUS") {
        spoptOPUS = window.open("", 'sportopuscashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
    }/* else if(product == "SEVEN_IG"){
		seven = window.open("",'sevenLotterycashWindow',"height="+iHeight+",width="+iWidth+",toolbar=no,resizable=yes,menubar=no,scrollbars=yes,location=no, status=no"); 
	}*/else if (product == "LIVE_ALLBET") {
	    liveAllBet = window.open("", 'liveAllBetcashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
	} else if (product == "LOTTERY_DS") {
	    if (ishttps) {
	        lotteryDS = window.open("", 'lotteryDScashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
	    }

	    /*}else if(product == "GFC_IG"){
            if(ishttps){
                lottoFfcIG = window.open("",'lottoFfcIGcashWindow',"height="+iHeight+",width="+iWidth+",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no"); 
            }
        }else if(product == "GFC_PJ"){
            if(ishttps){
                lottoFfcPJ = window.open("",'lottoFfcPJcashWindow',"height="+iHeight+",width="+iWidth+",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no"); 
            }
        }else if(product == "LOTTERY_IG_VR"){
            if(ishttps){
                lotteryIGVR = window.open("",'lotteryIGVRcashWindow',"height="+iHeight+",width="+iWidth+",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no"); 
            }	*/
	} else if (product == "SPORT_IWC") {
	    if (ishttps) {
	        spoptiwc = window.open("", "_blank");
	    }
	} else if (product == "SLOTS_MG") {
	    if (!openSelf) {
	        electroicMG = window.open("", 'electroicmgcashWindow' + Math.random(), "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
	    }
	} else if (product == "LIVE_SUNBET") {
	    liveSUNBET = window.open("", 'liveSUNBETcashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
	} else if (product == "SLOTS_HB") {
	    electroicHB = window.open("", 'electroichbcashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
	} else if (product == "SLOTS_OPUS") {
	    electroicOPUS = window.open("", 'electroicopuscashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
	} else if (product == "KY_CHESS_GAME") {
	    console.log("KY_CHESS_GAME");
	    electroicKY = window.open("", 'kycashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes");
	} else if (product == "IG_CHESS_GAME") {
	    electroicIGChess = window.open("", 'igChesscashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes");
	} else if (product == "SLOTS_ALLBET") {
	    $("body").append("<a id='slots_allbet_a' href='' target='_blank'>");
	} else if (product == "SLOTS_PP") {
	    electroicPP = window.open("", 'electroicppcashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
	}

    if ((product == "SLOTS_MG") || (product == "SLOTS_ALLBET")) {
        var o = {
            product: product,
            slotsGameId: type,
            type: type + ""
        };
    } else {
        var o = {
            product: product,
            type: type + ""
        };
    }


    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/playHoldem?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: true,
        timeout: 50000,
        beforeSend: function (xmlhttprequest) {
            if (product == 'LOTTO_IG') {
                $("#maskDiv").show();
                $("#lottoiframe").hide();
            } else if (product == 'LOTTERY_IG') {
                $("#maskDiv").show();
                $("#lotteryiframe").hide();
                $("#lotteryiframe").css("height", "1470px");
            } else if (product == 'LOTTERY_DS') {
                if (!ishttps) {
                    $("#maskDiv").show();
                    $("#ffciframe").hide();
                }
            } else if (product == 'GFC_IG') {
                $("#maskDiv").show();
                $("#gf_IG_iframe").hide();
            } else if (product == 'GFC_PJ') {
                $("#maskDiv").show();
                $("#gf_PJ_iframe").hide();
            } else if (product == 'LOTTERY_IG_VR') {
                $("#maskDiv").show();
                $("#lotteryIGVRiframe").hide();
            } else if (product == 'SPORT') {
                $("#maskDiv").show();
                $("#sportiframe").hide();
            } else if (product == 'SEVEN_IG') {
                $("#maskDiv").show();
                $("#seveniframe").hide();
            } else if (product == 'SPORT_IWC') {
                if (!ishttps) {
                    $("#maskDiv").show();
                    $("#sportimwiframe").hide();
                }
            } else if (product == 'SPORT_CMD') {
                $("#maskDiv").show();
                $("#sportcmdiframe").hide();
            }
        },
        success: function (data) {
            if (data) {
                if (data.success == true) {
                    var dataLink = data.link;
                    if (product == 'LIVE_IG') {
                        liveIG.location = data.link;
                    } else if (product == 'LIVE_LMG') {
                        liveLMG.location = data.link;
                        //						$("#live_lmg_a").attr("href",data.link);
                        //						document.getElementById("live_lmg_a").click();  
                        //						$("#live_lmg_a").remove();
                    } else if (product == 'LIVE_DS') {
                        liveDS.location = data.link;
                    } else if (product == 'LIVE_CG88') {
                        liveCG88.location = data.link;
                    } else if (product == 'LIVE_AG') {
                        liveAG.location = data.link;
                    } else if (product == 'LIVE_SUNBET') {
                        liveSUNBET.location = data.link;
                    } else if (product == "LOTTERY_IG") {
                        $("#maskDiv").show();
                        $("#lotteryiframe").attr("src", data.link);
                    } else if (product == "LOTTO_IG") {
                        $("#maskDiv").show();
                        $("#lottoiframe").attr("src", data.link);
                    } else if (product == "SEVEN_IG") {
                        $("#maskDiv").show();
                        $("#seveniframe").attr("src", data.link);
                    } else if (product == "LOTTERY_DS") {
                        if (!ishttps) {
                            $("#maskDiv").show();
                            $("#ffciframe").attr("src", data.link);
                        } else {
                            //							if(data.link.indexOf("https:")!=-1){ //包含 
                            //								lotteryDS.location=data.link;
                            //								window.open(data.link,"_blank");
                            //						    }else{  
                            //						    	$("#maskDiv").show();
                            //								$("#ffciframe").attr("src",data.link);
                            //						    } 
                            lotteryDS.location = data.link;
                        }


                    } else if (product == "GFC_IG") {
                        $("#maskDiv").show();
                        $("#gf_IG_iframe").attr("src", data.link);
                    } else if (product == "GFC_PJ") {
                        $("#maskDiv").show();
                        $("#gf_PJ_iframe").attr("src", data.link);
                    } else if (product == "LOTTERY_IG_VR") {
                        $("#maskDiv").show();
                        $("#lotteryIGVRiframe").attr("src", data.link);

                    } else if (product == "KY_CHESS_GAME") {
                        electroicKY.location = data.link;
                    } else if (product == "IG_CHESS_GAME") {
                        console.log("dataLink = " + data.link);
                        electroicIGChess.location = data.link;
                    }
                    else if (product == "SPORT") {
                        $("#maskDiv").show();
                        $("#sportiframe").attr("src", data.link);
                    } else if (product == "SPORT_IWC") {
                        if (!ishttps) {
                            $("#maskDiv").show();
                            $("#sportimwiframe").attr("src", data.link);
                        } else {
                            spoptiwc.location = data.link;
                            $("#maskDiv").hide();
                        }
                    } else if (product == "SPORT_CMD") {
                        $("#maskDiv").show();
                        $("#sportcmdiframe").attr("src", data.link);
                    } else if (product == "FISH_AG") {
                        electroicAGByw.location = data.link;
                    } else if (product == "SLOTS_AG") {
                        electroicAG.location = data.link;
                    } else if (product == "LIVE_OG") {
                        liveOG.location = data.link;
                    } else if (product == 'LIVE_BBIN') {
                        liveBBIN.location = data.link;
                    } else if (product == 'LIVE_SUNBET') {
                        liveSUNBET.location = data.link;
                    } else if (product == "SLOTS_BBIN") {
                        electroicBBIN.location = data.link;
                    } else if (product == "SLOTS_ALLBET") {
                        electroicALLBET.location = data.link;
                    } else if (product == "SLOTS_YY") {
                        if (openSelf) {
                            window.open(dataLink, "_self");
                        } else {
                            electroicYY.location = data.link;
                        }
                    } else if (product == "SLOTS_HB") {
                        electroicHB.location = data.link;
                    } else if (product == "FISH_GG") {
                        fishGG.location = data.link;
                    } else if (product == "IG_HALL") {
                        IGHall.location = data.link;
                    } else if (product == "LIVE_OPUS") {
                        liveOPUS.location = data.link;
                    } else if (product == "SPORT_OPUS") {
                        spoptOPUS.location = data.link;
                    } else if (product == "LIVE_ALLBET") {
                        liveAllBet.location = data.link;
                    } else if (product == "SLOTS_MG") {
                        //						$("#mgSlotsiframe").attr("src",data.link);
                        //						$("#mgSlotsiframe").show();
                        if (openSelf) {
                            window.open(dataLink, "_self");
                        } else {
                            electroicMG.location = data.link;
                        }
                    } else if (product == "SLOTS_OPUS") {
                        electroicOPUS.location = data.link;
                    } else if (product == "SLOTS_ALLBET") {
                        $("#slots_allbet_a").attr("href", data.link);
                        document.getElementById("slots_allbet_a").click();
                    } else if (product == "SLOTS_PP") {
                        electroicPP.location = data.link;
                    }
                } else {
                    if (product == 'LIVE_IG') {
                        liveIG.close();
                    } else if (product == 'LIVE_LMG') {
                        liveLMG.close();
                        //						$("#live_lmg_a").remove();
                    } else if (product == 'LIVE_DS') {
                        liveDS.close();
                    } else if (product == 'LIVE_CG88') {
                        liveCG88.close();
                    } else if (product == 'LIVE_AG') {
                        liveAG.close();
                    } else if (product == 'FISH_AG') {
                        electroicAGByw.close();
                    } else if (product == 'SLOTS_AG') {
                        electroicAG.close();
                    } else if (product == 'LIVE_OG') {
                        liveOG.close();
                    } else if (product == 'LIVE_BBIN') {
                        liveBBIN.close();
                    } else if (product == 'LIVE_SUNBET') {
                        liveSUNBET.close();
                    } else if (product == "SLOTS_BBIN") {
                        electroicBBIN.close();
                    } else if (product == "SLOTS_ALLBET") {
                        electroicALLBET.close();
                    } else if (product == "SLOTS_OPUS") {
                        electroicOPUS.close();
                    } else if (product == "SLOTS_YY") {
                        electroicYY.close();
                    } else if (product == "SLOTS_HB") {
                        electroicHB.close();
                    } else if (product == "FISH_GG") {
                        fishGG.close();
                    } else if (product == "IG_HALL") {
                        IGHall.close();
                    } else if (product == "LIVE_OPUS") {
                        liveOPUS.close();
                    } else if (product == "SPORT_OPUS") {
                        spoptOPUS.close();
                    } else if (product == "LIVE_ALLBET") {
                        liveAllBet.close();
                    } else if (product == "LOTTERY_DS") {
                        if (ishttps) {
                            lotteryDS.close();
                        }
                    } else if (product == "GFC_IG") {
                        if (ishttps) {
                            lottoFfcIG.close();
                        }
                    } else if (product == "GFC_PJ") {
                        if (ishttps) {
                            lottoFfcPJ.close();
                        }
                    } else if (product == "LOTTERY_IG_VR") {
                        if (ishttps) {
                            lotteryIGVR.close();
                        }
                    } else if (product == "KY_CHESS_GAME") {
                        electroicKY.close();
                    } else if (product == "IG_CHESS_GAME") {
                        electroicIGChess.close();
                    } else if (product == "SLOTS_MG") {
                        electroicMG.close();
                    } else if (product == "SPORT_IWC") {
                        if (ishttps) {
                            spoptiwc.close();
                        }
                    } else if (product == "SLOTS_PP") {
                        electroicPP.close();
                    }
                    if (data.message == 'SESSION_EXPIRED') {
                        JqueryShowMessageJustClose(l_playGame['msg4']);
                    } else if (data.message == 'STATUS_NO_OPEN') {
                        JqueryShowMessage(l_playGame['msg3']);
                    } else if (data.message == 'USER_CLOSE') {
                        JqueryShowMessage(l_playGame['msg2']);
                    } else if (data.message == 'TRY_AGAIN') {
                        JqueryShowMessage(l_basic['tryAgain']);
                    } else if (data.message == 'PRODUCT_NO_EXISTS') {
                        JqueryShowMessageHome(l_playGame['msg6']);
                    } else if (data.message == 'PRODUCT_MAINTENACE') {
                        if (data.msg === "") {
                            JqueryShowMessageJustClose(l_playGame['msg7']);
                        } else {
                            JqueryShowMessageJustClose(data.msg);
                        }
                    } else if (data.message == 'GAME_MAINTENANCE') {
                        JqueryShowMessageHome(l_playGame['msg8']);
                    } else if (data.message == 'M8_WEI_HUI') {
                        JqueryShowMessageHome(l_playGame['msg7']);
                    } else if (data.message == 'M8_INVALID_USERNAME') {
                        JqueryShowMessageHome(l_basic['tryAgain']);
                    } else if (data.message == 'GAME_DOES_NOT_SUPPORT_DEMO') {
                        JqueryShowMessageHome(l_basic['gameDoesNotSupportDemo']);
                    } else if (data.message == 'FREQUENT_REQUESTS') {
                        /*JqueryShowMessageHome(l_playGame['msg9']);*/
                    } else {
                        JqueryShowMessageReload(data.message);
                    }
                    $("#maskDiv").hide();
                }
            }
        },
        error: function (xmlhttprequest, error) {
            if (product == 'LIVE_IG') {
                liveIG.close();
            } else if (product == 'LIVE_LMG') {
                liveLMG.close();
                //				$("#live_lmg_a").remove();
            } else if (product == 'LIVE_DS') {
                liveDS.close();
            } else if (product == 'LIVE_CG88') {
                liveCG88.close();
            } else if (product == 'LIVE_AG') {
                liveAG.close();
            } else if (product == 'FISH_AG') {
                electroicAGByw.close();
            } else if (product == 'SLOTS_AG') {
                electroicAG.close();
            } else if (product == 'LIVE_OG') {
                liveOG.close();
            } else if (product == 'LIVE_BBIN') {
                liveBBIN.close();
            } else if (product == "SLOTS_BBIN") {
                electroicBBIN.close();
            } else if (product == "SLOTS_ALLBET") {
                electroicALLBET.close();
            } else if (product == "SLOTS_OPUS") {
                electroicOPUS.close();
            } else if (product == "SLOTS_YY") {
                electroicYY.close();
            } else if (product == "SLOTS_HB") {
                electroicHB.close();
            } else if (product == "FISH_GG") {
                fishGG.close();
            } else if (product == "IG_HALL") {
                IGHall.close();
            } else if (product == "LIVE_OPUS") {
                liveOPUS.close();
            } else if (product == "SPORT_OPUS") {
                spoptOPUS.close();
            } else if (product == "LIVE_ALLBET") {
                liveAllBet.close();
            } else if (product == "LOTTERY_DS") {
                if (ishttps) {
                    lotteryDS.close();
                }
            } else if (product == "GFC_IG") {
                if (ishttps) {
                    lottoFfcIG.close();
                }
            } else if (product == "GFC_PJ") {
                if (ishttps) {
                    lottoFfcPJ.close();
                }
            } else if (product == "LOTTERY_IG_VR") {
                if (ishttps) {
                    lotteryIGVR.close();
                }
            } else if (product == "SPORT_IWC") {
                if (ishttps) {
                    spoptiwc.close();
                }
            } else if (product == "SLOTS_MG") {
            } else if (product == "KY_CHESS_GAME") {
                //				electroicKY.close();
            } else if (product == "IG_CHESS_GAME") {
            } else if (product == "SLOTS_MG") {
                electroicMG.close();
            } else if (product == "SLOTS_PP") {
                electroicPP.close();
            }
            JqueryShowMessage(l_basic['tryAgain']);
        },
        complete: function () {
        }
    });
}
function playGameSlots(product, slotsGameId) {

    var iHeight = screen.height - 70;
    var iWidth = screen.width - 10;
    var newWindow = slotsGameId;

    var o = {
        product: product,
        slotsGameId: slotsGameId
    };
    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/playHoldem?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: false,
        timeout: 50000,
        beforeSend: function (xmlhttprequest) {
            /*if(product == 'SLOTS'){
				$("#maskDiv").show();
			}*/
        },
        success: function (data) {
            if (data) {
                if (data.success == true) {
                    var dataLink = data.link;
                    var webUrl = window.location.href;
                    if (webUrl.indexOf("xinPuJingXSYLBLoginWeb") != -1) {
                        $.ajax({
                            type: "post",
                            url: $("#path").val() + "/app/pcOrMp?" + Math.random() * 10000,
                            data: $.toJSON({ "pcOrMp": "pcOrMp" }),
                            contentType: 'application/json',
                            dataType: "json",
                            async: false,
                            timeout: 50000,
                            beforeSend: function (xmlhttprequest) { },
                            success: function (data) {
                                if (data) {
                                    if (data.success == true) {
                                        if (data.pcOrMp == 'MP') {
                                            window.open(dataLink, "_self");
                                        } else {
                                            //											if(product == 'SLOTS' || product == 'SLOTS_PT' || product == 'SLOTS_SPADE' || product == 'SLOTS_MG' || product == 'SLOTS_HB'){
                                            window.open(dataLink, newWindow, "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
                                            //											}
                                        }
                                    } else {
                                    }
                                }
                            },
                            error: function (xmlhttprequest, error) {
                            },
                            complete: function () {
                            }
                        });

                    } else {
                        //						if(product == 'SLOTS' || product == 'SLOTS_PT' || product == 'SLOTS_SPADE' || product == 'SLOTS_MG' || product == 'SLOTS_HB'){
                        window.open(data.link, newWindow, "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
                        //						}
                    }
                } else {
                    if (data.message == 'SESSION_EXPIRED') {
                        JqueryShowMessageHome(l_playGame['msg4']);
                    } else if (data.message == 'STATUS_NO_OPEN') {
                        JqueryShowMessageJustClose(l_playGame['msg3']);
                    } else if (data.message == 'USER_CLOSE') {
                        JqueryShowMessageJustClose(l_playGame['msg2']);
                    } else if (data.message == 'TRY_AGAIN') {
                        JqueryShowMessageJustClose(l_basic['tryAgain']);
                    } else if (data.message == 'PRODUCT_NO_EXISTS') {
                        JqueryShowMessageJustClose(l_playGame['msg6']);
                    } else if (data.message == 'PRODUCT_MAINTENACE') {
                        if (data.msg === "") {
                            JqueryShowMessageJustClose(l_playGame['msg7']);
                        } else {
                            JqueryShowMessageJustClose(data.msg);
                        }
                    } else if (data.message == 'GAME_MAINTENANCE') {
                        JqueryShowMessageJustClose(l_playGame['msg8']);
                    } else if (data.message == 'FREQUENT_REQUESTS') {
                        /*JqueryShowMessageHome(l_playGame['msg9']);*/
                    } else {
                        JqueryShowMessageReload(data.message);
                    }
                    $("#maskDiv").hide();
                }
            }
        },
        error: function (xmlhttprequest, error) {
            JqueryShowMessage(l_basic['tryAgain']);
        },
        complete: function () {
        }
    });
}

function playGameMobile(product, type, line) {
    //	var iHeight = screen.height-70;
    //	var iWidth = screen.width-10;
    var iHeight = screen.height - 70;
    var iWidth = screen.width - 10;
    //	var LOTTERY_DS = null;
    //	if(product == "LOTTERY_DS"){
    //		LOTTERY_DS = window.open("",'LotteryDScashWindow',"height="+iHeight+",width="+iWidth+",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no"); 
    //	}
    var o = {
        product: product,
        type: type + "",
        line: line + ""
    };
    var jsonuserinfo = $.toJSON(o);
    console.log("1");
    console.log(lockMobile);
    if (lockMobile === false) {
        lockMobile = true;
        console.log("2");
        $.ajax({
            async: false,
            type: "post",
            url: $("#path").val() + "/app/playHoldem?" + Math.random() * 10000,
            data: jsonuserinfo,
            contentType: 'application/json',
            dataType: "json",
            timeout: 50000,
            beforeSend: function (xmlhttprequest) {
                //				$("#maskDiv").show();
            },
            success: function (data) {
                if (data) {
                    if (data.success == true) {
                        var webUrl = window.location.href;
                        if (webUrl.indexOf("xinPuJingXSYLBLoginWeb") != -1) {
                            window.open(data.link, "_self");
                        } else {
                            if (product == 'LIVE_IG') {
                                window.open(data.link, "_blank");
                            } else if (product == 'LIVE_LMG') {
                                window.open(data.link, "_self");
                            } else if (product == 'LIVE_AG') {
                                window.open(data.link, "_self");
                            } else if (product == 'LOTTO_IG') {
                                window.open(data.link, "_self");
                            } else if (product == 'LOTTERY_IG') {
                                window.open(data.link, "_self");
                            } else if (product == 'SPORT') {
                                window.open(data.link, "_blank");
                            } else if (product == 'SPORT_IWC') {
                                window.open(data.link, "_blank");
                            } else if (product == 'SPORT_CMD') {
                                window.open(data.link, "_blank");
                            } else if (product == 'LOTTERY_DS') {
                                window.open(data.link, "_blank");
                            } else if (product == 'GFC_IG') {
                                window.open(data.link, "_blank");
                            } else if (product == 'GFC_PJ') {
                                window.open(data.link, "_blank");
                            } else if (product == 'LOTTERY_IG_VR') {
                                window.open(data.link, "_self");
                            } else if (product == 'GFC_IG_VR') {
                                window.open(data.link, "_blank");
                            } else if (product == 'KY_CHESS_GAME') {
                                window.open(data.link, "_blank");
                            } else if (product == 'IG_CHESS_GAME') {
                                window.open(data.link, "_blank");
                            } else if (product == "FISH_GG") {
                                $("#maskDiv").show();
                                $("#fishGgiframe").attr("src", data.link);
                            } else if (product == "SLOTS_YY") {
                                $("#maskDiv").show();
                                $("#fishYyiframe").attr("src", data.link);
                            } else {
                                window.open(data.link, "_self");
                            }
                        }
                    } else {
                        if (data.message == 'SESSION_EXPIRED') {
                            JqueryShowMessageHome(l_playGame['msg4']);
                        } else if (data.message == 'PRODUCT_MAINTENACE') {
                            if (data.msg === "") {
                                JqueryShowMessageJustClose(l_playGame['msg7']);
                            } else {
                                JqueryShowMessageJustClose(data.msg);
                            }
                        } else if (data.message == 'STATUS_NO_OPEN') {
                            JqueryShowMessageReloadandOK(l_playGame['msg3']);
                        } else if (data.message == 'USER_CLOSE') {
                            JqueryShowMessageReloadandOK(l_playGame['msg2']);
                        } else if (data.message == 'TRY_AGAIN') {
                            JqueryShowMessageReloadandOK(l_basic['tryAgain']);
                        } else if (data.message == 'NO_CNY') {
                            JqueryShowMessageReloadandOK(l_login['msg11']);
                        } else if (data.message == 'PRODUCT_NO_EXISTS') {
                            JqueryShowMessageHome(l_playGame['msg6']);
                        } else if (data.message == 'FREQUENT_REQUESTS') {
                            /*JqueryShowMessageHome(l_playGame['msg9']);*/
                        } else {
                            JqueryShowMessageReload(data.message);
                        }
                    }
                    $("#maskDiv").hide();
                }
            },
            error: function (xmlhttprequest, error) {
                JqueryShowMessageReloadandOK(l_basic['tryAgain']);
                $("#maskDiv").hide();
            },
            complete: function () {
                setTimeout(function () {
                    lockMobile = false;
                }, 2000);
            }
        });
    }
}


function changeLoginCode() {
    $('#checkLoginCodeImage').hide().attr('src', $("#path").val() + '/app/checkCode/image?' + Math.floor(Math.random() * 100)).fadeIn();
    event.cancelBubble = true;
}

function changeLoginCode2() {
    $('#checkLoginCodeImage2').hide().attr('src', $("#path").val() + '/app/checkCode/image?' + Math.floor(Math.random() * 100)).fadeIn();
    event.cancelBubble = true;
}
function changeLoginCode3() {
    $('#checkLoginCodeImage3').hide().attr('src', $("#path").val() + '/app/checkCode/image?' + Math.floor(Math.random() * 100)).fadeIn();
    event.cancelBubble = true;
}

function logoutSubmit() {
    var o = {
    };
    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/logout",
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: false,
        timeout: 50000,
        beforeSend: function (xmlhttprequest) {
        },
        success: function (data) {
            if (data) {
                if (data.success == true) {
                    //					 location.reload();
                    location.href = "home";
                } else {
                    if (data.message == 'SESSION_EXPIRED') {
                        //						JqueryShowMessageHome(l_basic['sessionExpired']);
                        //						location.reload();
                        location.href = "home";
                    } else if (data.message == 'TRY_AGAIN') {
                        JqueryShowMessage(l_basic['tryAgain']);
                    }
                }
            }
        },
        error: function (xmlhttprequest, error) {
        },
        complete: function () {
        }
    });
}

/*function changeLanguage(language) {
	var o = {
			language:languageType
	};
	var jsonuserinfo = $.toJSON(o);
	var url = $("#path").val() + "/app/changeLanguage";
	$.ajax({
		type : "post",
		url : url,
		data : jsonuserinfo,
		contentType : 'application/json',
		dataType : "json",
		async:true, 
		timeout : 50000,
		beforeSend : function(xmlhttprequest) {
		},
		success : function(data) {
		},
		error : function(xmlhttprequest, error) {
		},
		complete : function() {
			location.reload();
		}
	});
}*/
function changeLanguage(languageType) {
    var o = {
        language: languageType
    };
    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/changeLanguage?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: false,
        timeout: 50000,
        beforeSend: function (xmlhttprequest) {

        },
        success: function (data) {
            if (data) {
                if (data.success == true) {
                    if (data.isLogin) {
                        location.href = "home?l=0";
                    } else {
                        location.href = "home";
                    }
                } else {
                    JqueryShowMessage(l_language['msg1']);
                    changeLoginCode();
                }
            }
        },
        error: function (xmlhttprequest, error) {
            JqueryShowMessage(l_basic['tryAgain']);
        },
        complete: function () {
        }
    });
}
function loginFormSubmit2() {
    var txtLoginUsername = $("#txtLoginUsername2");
    var txtLoginPassword = $("#txtLoginPassword2");
    var txtLoginCaptcha = $("#txtLoginCode2");
    if (txtLoginUsername.val().length < 1 || txtLoginUsername.val() == l_basic["username"]) {
        JqueryShowMessage(l_login['msg1']);
        return false;
    } else if (txtLoginPassword.val().length < 1) {
        JqueryShowMessage(l_login['msg2']);
        return false;
    } else if (txtLoginCaptcha.val().length != 4) {
        JqueryShowMessage(l_login['msg4']);
        return false;
    } else if (txtLoginUsername.val().length < 3 || !patrnName.exec(txtLoginUsername.val())) {
        JqueryShowMessage(l_login['msg3']);
        return false;
    } else if (txtLoginPassword.val().length < 6) {
        JqueryShowMessage(l_login['msg3']);
        return false;
    } else if (!patrnZhengInt.exec(txtLoginCaptcha.val())) {
        JqueryShowMessage(l_login['msg4']);
        return false;
    }

    var o = {
        txtLoginCaptcha: txtLoginCaptcha.val(),
        txtLoginUsername: txtLoginUsername.val(),
        txtLoginPassword: txtLoginPassword.val()
    };

    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/loginVerification?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: false,
        timeout: 50000,
        beforeSend: function (xmlhttprequest) {
            $("#loginBtn2").val("登录中..");
        },
        success: function (data) {
            if (data) {
                if (data.success == true) {
                    if (data.needModifyPW === "yes") {
                        location.href = "modifyPW";
                    } else {
                        for (var i = 0; i < data.annLoginList.length; i++) {
                            alert(data.annLoginList[i]);
                        }
                        var page = $("#page").val();
                        var joinPage = "";
                        if (null != $("#joinPage").val()) {
                            joinPage = $("#joinPage").val();
                        }

                        if ((page == "home" || page == "registration") && joinPage == "") {
                            location.href = "home?l=0";
                        } else if (joinPage) {
                            location.href = joinPage;
                        } else {
                            location.reload();
                        }
                    }
                } else {
                    $("#loginBtn2").val("登录");
                    if (data.message == 'CHECK_CODE') {
                        JqueryShowMessage(l_login['msg4']);
                    } else if (data.message == 'USERNAME_OR_PASSWORD') {
                        JqueryShowMessage(l_login['msg3']);
                    } else if (data.message == 'IP_ERROR') {
                        JqueryShowMessage(l_login['msg8']);
                    } else if (data.message == 'LOGIN_IP_BLOCK') {
                        JqueryShowMessage(l_login['msg5']);
                    } else if (data.message == 'USER_CLOSE') {
                        JqueryShowMessage(l_login['msg6']);
                    } else if (data.message == 'PASSWORD_LOCK') {
                        JqueryShowMessage(l_login['msg7']);
                    } else if (data.message == 'TRY_AGAIN') {
                        JqueryShowMessage(l_basic['tryAgain']);
                    } else if (data.message == 'LOGIN_ERROR_COUNT') {
                        JqueryShowMessage(l_basic['countError']);
                    } else if (data.message == 'LOGIN_ERROR_COUNT_SIX') {
                        JqueryShowMessage(l_basic['countErrorSix']);
                    }
                    //							changeLoginCode();
                }
            }
        },
        error: function (xmlhttprequest, error) {
            JqueryShowMessage(l_basic['tryAgain']);
            $("#loginBtn2").val("登录");
        },
        complete: function () {
        }
    });

}

function ShowMessage() {
    JqueryShowMessage(l_playGame['msg5']);

}

function c_loadingMak(pram) {
    if (pram == 'lotto') {
        $("#lottoiframe").show();
        $("#maskDiv").hide();
    } else if (pram == 'lottery') {
        $("#lotteryiframe").show();
        $("#maskDiv").hide();
    } else if (pram == 'ffc') {
        $("#ffciframe").show();
        $("#maskDiv").hide();
    } else if (pram == 'ffc') {
        $("#ffciframe").show();
        $("#maskDiv").hide();
    } else if (pram == 'IG_ffc') {
        $("#gf_IG_iframe").show();
        $("#maskDiv").hide();
    } else if (pram == 'PJ_ffc') {
        $("#gf_PJ_iframe").show();
        $("#maskDiv").hide();
    } else if (pram == 'lottery_igvr') {
        $("#lotteryIGVRiframe").show();
        $("#maskDiv").hide();
    } else if (pram == 'Ig_ffc') {
        $("#Ig_ffciframe").show();
        $("#maskDiv").hide();
    } else if (pram == 'sport') {
        $("#sportiframe").show();
        $("#maskDiv").hide();
    } else if (pram == 'sportcmd') {
        $("#sportcmdiframe").show();
        $("#maskDiv").hide();
    } else if (pram == 'seven') {
        $("#seveniframe").show();
        $("#maskDiv").hide();
    } else if (pram == 'livelmg') {
        $("#livelmgiframe").show();
        $("#maskDiv").hide();
    } else if (pram == 'liveds') {
        $("#livedsiframe").show();
        $("#maskDiv").hide();
    } else if (pram == 'livecg') {
        $("#livecgiframe").show();
        $("#maskDiv").hide();
    } else if (pram == 'liveag') {
        $("#liveagiframe").show();
        $("#maskDiv").hide();
    } else if (pram == 'livebbin') {
        $("#liveagiframe").show();
        $("#maskDiv").hide();
    } else if (pram == 'gameyy') {
        $("#gameyyiframe").show();
        $("#maskDiv").hide();
    } else if (pram == 'gamesg') {
        $("#gamesgiframe").show();
        $("#maskDiv").hide();
    } else if (pram == 'fishinggg') {
        $("#fishingggiframe").show();
        $("#maskDiv").hide();
    } else if (pram == 'fishinggg') {
        $("#fishingyyiframe").show();
        $("#maskDiv").hide();
    } else if (pram == 'ighall') {
        $("#ighalliframe").show();
        $("#maskDiv").hide();
    } else {
        $("iframe").show();
        $("#maskDiv").hide();
    }
}


//function closeSession(){
//	var o = {
//	};
//	var jsonuserinfo = $.toJSON(o);
//	$.ajax({
//		type : "post",
//		url : $("#path").val() + "/app/closeSession",
//		data : jsonuserinfo,
//		contentType : 'application/json',
//		dataType : "json",
//		async:false, 
//		timeout : 50000,
//		beforeSend : function(xmlhttprequest) {
//		},
//		success : function(data) {
//			
//		},
//		error : function(xmlhttprequest, error) {
//		},
//		complete : function() {
//		}
//	});
//
//}

//
//var chioces = false;
//window.onbeforeunload = function() {
//
//	    if(event.clientX<=0 && event.clientY<0) {  
//	        alert("关闭");  
//	    }  
//	    else
//	    {  
//	        alert("刷新或离开");  
//	    }  
//
//}
//
//	window.onunloadok = function() {
//		//logoutSubmit();
//	//clearTimeout(_t);
//	//alert("取消了离开，就对页面做刷新");
//	};

//var coordinatesX,coordinatesY;
//function xy(e) {
//	var e = e || window.event ;
//	coordinatesX = e.screenX;
//	coordinatesY = e.screenY;
//	$("#ys").val(coordinatesY);
//	//alert(coordinatesY);
//	}

function changePasswordTextYd() {
    $("#txtLoginPasswordText").hide();
    $("#txtLoginPassword").show();
    $('#txtLoginPassword').focus();
    $("#txtLoginPassword").addClass("txtLoginPasswordhover");
}

function changePasswordYd() {
    if ($('#txtLoginPassword').val() == '') {
        $("#txtLoginPasswordText").show();
        $("#txtLoginPassword").hide();
        $("#txtLoginPasswordText").val(l_basic['password']);
        $("#txtLoginPassword").removeClass("txtLoginPasswordhover");
    }
}

function changeCodeNullYd(value) {
    if (value == "Captcha") {
        $("#txtLoginCode").val("");
    }
    $("#txtLoginCode").addClass("txtLoginCodehover");
}

function changeCodeYd(value) {
    if (value == "") {
        $("#txtLoginCode").val("Captcha");
        $("#txtLoginCode").removeClass("txtLoginCodehover");
    }
}
function changeNullYd(thisObj, msg) {
    if (msg == 'username') {
        if (thisObj.value == l_basic['username']) {
            thisObj.value = '';
        }
    } else if (msg == 'password') {
        //		 if (thisObj.value==l_login['msg9']){
        //			 $("#txtLoginPasswordText").hide();
        //			 $("#txtLoginPassword").show();
        //			}else if(thisObj.value==''){
        //				$("#txtLoginPasswordText").show();
        //				 $("#txtLoginPassword").hide();
        //			}
    } else if (msg == 'code') {
        if (thisObj.value == l_basic['code']) {
            thisObj.value = '';
        }
    }
    $("#txtLoginUsername").addClass("txtLoginUsernamehover");
    $("#txtLoginUsername").removeClass("txtLoginUsername");
}

function changeMessageYd(thisObj, msg) {
    if (msg == 'username') {
        if (thisObj.value == '') {
            thisObj.value = l_basic['username'];
            $("#txtLoginUsername").removeClass("txtLoginUsernamehover");
            $("#txtLoginUsername").addClass("txtLoginUsername");
        }
    } else if (msg == 'password') {
        //		 if (thisObj.value==''){
        //			 thisObj.value=l_login['msg9'];
        //			}
    } else if (msg == 'code') {
        if (thisObj.value == '') {
            thisObj.value = l_basic['code'];
        }
    }

}

function playGameLott(product, type, line) {

    var iHeight = screen.height - 70;
    var iWidth = screen.width - 10;
    var webSite;

    webSite = $("#webSite").val();//目前只有三千万彩票用到此功能

    var gfcIg = null;
    var gfcPj = null;
    var lotterypj = null;
    var lottery = null;
    var vrLottery = null; //IG(视频)传统彩
    var vrGFC = null; //IG(视频)官方彩
    if (product == "GFC_IG") {
        if ($("#gf_IG_iframe").length == 0) {
            gfcIg = window.open("", 'gfcIgcashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes");
        }
    } else if (product == "LOTTERY_PJ") {
        if ($("#lottery_pj_iframe").length == 0 && $("#lotteryPJiframe").length == 0) {
            lotterypj = window.open("", 'lotterypjcashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes");
        }
    } else if (product == "GFC_PJ") {
        if ($("#gf_PJ_iframe").length == 0) {
            gfcPj = window.open("", 'gfcPjcashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes");
        }
    } else if (product == "LOTTERY_IG") {
        if ($("#lotteryiframe").length == 0) {
            lottery = window.open("", 'lotterycashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes");
        }
    } else if (product == "LOTTERY_IG_VR") {
        if ($("#lotteryIGVRiframe").length == 0) {
            vrLottery = window.open("", 'vrLotterycashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes");
        }
    } else if (product == "GFC_IG_VR") {
        vrGFC = window.open("", 'vrGFCcashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes");
    }

    var o = {
        product: product,
        type: type + "",
        line: line + ""
    };
    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/playHoldem?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: true,
        timeout: 50000,
        beforeSend: function (xmlhttprequest) {
            if (product == 'LOTTO_IG') {
                $("#maskDiv").show();
                $("#lottoiframe").hide();
            } else if (product == 'LOTTO_PJ') {
                $("#maskDiv").show();
                $("#lotto_pj_iframe").hide();
            } else if (product == 'LOTTERY_IG') {
                if ($("#lotteryiframe").length > 0) {
                    $("#maskDiv").show();
                    $("#lotteryiframe").hide();
                }
            } else if (product == 'GFC_IG') {
                if ($("#gf_IG_iframe").length > 0) {
                    $("#maskDiv").show();
                    $("#gf_IG_iframe").hide();
                }
            } else if (product == 'GFC_PJ') {
                if ($("#gf_PJ_iframe").length > 0) {
                    $("#maskDiv").show();
                    $("#gf_PJ_iframe").hide();
                }
            } else if (product == 'LOTTERY_PJ') {
                /*$("#maskDiv").show();
				$("#ffciframe").hide();*/
            } else if (product == 'LOTTERY_IG_VR') {
                if ($("#lotteryIGVRiframe").length > 0) {
                    $("#maskDiv").show();
                    $("#lotteryIGVRiframe").hide();
                }
            } else if (product == 'GFC_IG_VR') {
                /*$("#maskDiv").show();
				$("#ffciframe").hide();*/
            } else {
                $("#maskDiv").show();
                $("iframe").hide();
            }
        },
        success: function (data) {
            if (data) {
                if (data.success == true) {
                    if (product == "LOTTERY_IG") {
                        //						if(webSite == "sanQianWanCP" && webSite != "" ){
                        //							if($("#lottery_login_yet").length > 0){
                        //								$("#maskDiv").show();
                        //								$("#lotteryiframe").attr("src",data.link);
                        //								$("#lottery_login_yet").hide();
                        //								$("#banner_lottery_yet").hide();
                        //								$("#lotter_header_yet").show();
                        //							}
                        //						}else{
                        if ($("#lotteryiframe").length > 0) {
                            $("#maskDiv").show();
                            $("#lotteryiframe").attr("src", data.link);
                            $("#lotteryiframe").css("height", "1470px");
                        } else {
                            lottery.location = data.link;
                        }
                        //						}
                    } else if (product == "LOTTERY_PJ") {
                        if ($("#lottery_pj_iframe").length > 0) {
                            $("#maskDiv").show();
                            $("#lottery_pj_iframe").attr("src", data.link);
                            $("#lottery_pj_iframe").css("height", "1470px");
                        } else if ($("#lotteryPJiframe").length > 0) {
                            $("#maskDiv").show();
                            $("#lotteryPJiframe").attr("src", data.link);
                            $("#lottery_pj_iframe").css("height", "1470px");
                        } else {
                            lotterypj.location = data.link;
                        }
                    } else if (product == "LOTTO_IG") {
                        $("#maskDiv").show();
                        $("#lottoiframe").attr("src", data.link);
                    } else if (product == "LOTTO_PJ") {
                        $("#maskDiv").show();
                        $("#lotto_pj_iframe").attr("src", data.link);
                    } else if (product == "GFC_IG") {
                        if ($("#gf_IG_iframe").length > 0) {
                            $("#maskDiv").show();
                            $("#gf_IG_iframe").attr("src", data.link);
                            $("#gf_IG_iframe").css("height", "1470px");
                        } else {
                            gfcIg.location = data.link;
                        }
                    } else if (product == "GFC_PJ") {
                        if ($("#gf_PJ_iframe").length > 0) {
                            $("#maskDiv").show();
                            $("#gf_PJ_iframe").attr("src", data.link);
                            $("#gf_PJ_iframe").css("height", "1470px");
                        } else {
                            gfcPj.location = data.link;
                        }
                    } else if (product == "LOTTERY_IG_VR") {
                        if ($("#lotteryIGVRiframe").length > 0) {
                            $("#maskDiv").show();
                            $("#lotteryIGVRiframe").attr("src", data.link);
                            $("#lotteryIGVRiframe").css("height", "1470px");
                        } else {
                            vrLottery.location = data.link;
                        }
                    } else if (product == "GFC_IG_VR") {
                        vrGFC.location = data.link;
                    } else {
                        $("#maskDiv").show();
                        $("iframe").attr("src", data.link);
                    }
                } else {
                    if (product == 'GFC_IG') {
                        if ($("#gf_IG_iframe").length == 0) {
                            gfcIg.close();
                        }
                    } else if (product == 'LOTTERY_PJ') {
                        if ($("#lottery_pj_iframe").length == 0 && $("#lotteryPJiframe").length == 0) {
                            lotterypj.close();
                        }
                    } else if (product == 'GFC_PJ') {
                        if ($("#gf_PJ_iframe").length == 0) {
                            gfcPj.close();
                        }
                    } else if (product == 'LOTTERY_IG') {
                        if ($("#lotteryiframe").length == 0 && $("#lotteryPJiframe").length == 0) {
                            lottery.close();
                        }
                    } else if (product == 'LOTTERY_IG_VR') {
                        if ($("#lotteryIGVRiframe").length == 0) {
                            vrLottery.close();
                        }
                    } else if (product == 'GFC_IG_VR') {
                        vrGFC.close();
                    }

                    if (data.message == 'SESSION_EXPIRED') {
                        JqueryShowMessageJustClose(l_playGame['msg4']);
                    } else if (data.message == 'STATUS_NO_OPEN') {
                        JqueryShowMessage(l_playGame['msg3']);
                    } else if (data.message == 'USER_CLOSE') {
                        JqueryShowMessage(l_playGame['msg2']);
                    } else if (data.message == 'TRY_AGAIN') {
                        JqueryShowMessage(l_basic['tryAgain']);
                    } else if (data.message == 'PRODUCT_NO_EXISTS') {
                        JqueryShowMessageHome(l_playGame['msg6']);
                    } else if (data.message == 'PRODUCT_MAINTENACE') {
                        if (data.msg === "") {
                            JqueryShowMessageJustClose(l_playGame['msg7']);
                        } else {
                            JqueryShowMessageJustClose(data.msg);
                        }
                    } else if (data.message == 'M8_WEI_HUI') {
                        JqueryShowMessageHome(l_playGame['msg7']);
                    } else if (data.message == 'M8_INVALID_USERNAME') {
                        JqueryShowMessageHome(l_basic['tryAgain']);
                    } else if (data.message == 'FREQUENT_REQUESTS') {
                        /*JqueryShowMessageHome(l_playGame['msg9']);*/
                    } else {
                        JqueryShowMessageReload(data.message);
                    }
                    $("#maskDiv").hide();
                }
            }
        },
        error: function (xmlhttprequest, error) {
            JqueryShowMessage(l_basic['tryAgain']);
            if (product == 'GFC_IG') {
                if ($("#gf_IG_iframe").length == 0) {
                    gfcIg.close();
                }
            }
            if (product == 'LOTTERY_PJ') {
                if ($("#lottery_pj_iframe").length == 0 && $("#lotteryPJiframe").length == 0) {
                    lotterypj.close();
                }
            }
            if (product == 'LOTTERY_IG') {
                if ($("#lotteryiframe").length == 0 && $("#lotteryPJiframe").length == 0) {
                    lottery.close();
                }
            }
            if (product == 'GFC_PJ') {
                if ($("#gf_PJ_iframe").length == 0) {
                    gfcPj.close();
                }
            }
            if (product == 'LOTTERY_IG_VR') {
                if ($("#lotteryIGVRiframe").length == 0) {
                    vrLottery.close();
                }
            }
            if (product == 'GFC_IG_VR') {
                vrGFC.close();
            }
        },
        complete: function () {
        }
    });
}
function playGameLottoFfc(product, line) {

    var iHeight = screen.height - 70;
    var iWidth = screen.width - 10;

    var o = {
        product: product,
        line: line + ""
    };
    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/playHoldem?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: true,
        timeout: 50000,
        beforeSend: function (xmlhttprequest) {
            if (product == 'LOTTERY_DS') {
                $("#maskDiv").show();
                $("#ffciframe").hide();
            }/*if (product == 'GFC_IG') {
				$("#maskDiv").show();
				$("#Ig_ffciframe").hide();
			}*/ else {
                $("#maskDiv").show();
                $("iframe").hide();
            }
        },
        success: function (data) {
            if (data) {
                if (data.success == true) {
                    if (product == "LOTTERY_DS") {
                        $("#maskDiv").show();
                        $("#ffciframe").attr("src", data.link);
                    }/*if(product == "GFC_IG"){
						$("#maskDiv").show();
						$("#Ig_ffciframe").attr("src",data.link);
					}*/else {
                        $("#maskDiv").show();
                        $("iframe").attr("src", data.link);
                    }
                } else {
                    if (data.message == 'SESSION_EXPIRED') {
                        JqueryShowMessageJustClose(l_playGame['msg4']);
                    } else if (data.message == 'STATUS_NO_OPEN') {
                        JqueryShowMessage(l_playGame['msg3']);
                    } else if (data.message == 'USER_CLOSE') {
                        JqueryShowMessage(l_playGame['msg2']);
                    } else if (data.message == 'TRY_AGAIN') {
                        JqueryShowMessage(l_basic['tryAgain']);
                    } else if (data.message == 'PRODUCT_NO_EXISTS') {
                        JqueryShowMessageHome(l_playGame['msg6']);
                    } else if (data.message == 'PRODUCT_MAINTENACE') {
                        if (data.msg === "") {
                            JqueryShowMessageJustClose(l_playGame['msg7']);
                        } else {
                            JqueryShowMessageJustClose(data.msg);
                        }
                    } else if (data.message == 'M8_WEI_HUI') {
                        JqueryShowMessageHome(l_playGame['msg7']);
                    } else if (data.message == 'M8_INVALID_USERNAME') {
                        JqueryShowMessageHome(l_basic['tryAgain']);
                    } else if (data.message == 'FREQUENT_REQUESTS') {
                        /*JqueryShowMessageHome(l_playGame['msg9']);*/
                    } else {
                        JqueryShowMessageReload(data.message);
                    }
                    $("#maskDiv").hide();
                }
            }
        },
        error: function (xmlhttprequest, error) {
            JqueryShowMessage(l_basic['tryAgain']);
        },
        complete: function () {
        }
    });
}



function bindOnclickNew(isLogin) {
    if (isLogin) {
        $('.bind-loginGame').bind("click", function () {
            //			var gameType = $(this).attr("id");
            //			var gameWallet = $(this).attr("dataWallet");
            var gameType = $(this).attr("data-GameType");
            var gameWallet = $(this).attr("data-Wallet");
            var gameName = $(this).children("div").html();
            $(".poppublicbox h2 #gameName").html(gameName + "--");

            //			$('#credit_progress_bar #recoverBalance_success').hide();
            //			$("#creditBtn").unbind();
            if (gameType != null) {
                if (gameType == "LOTTERY_IG" || gameType == "LOTTO_IG" || gameType == "LOTTERY_PJ" || gameType == "LOTTO_PJ" || gameType == "GFC_IG" || gameType == "LOTTERY_IG_VR") {
                    return;
                } else if (gameType == "LIVE_IG" || gameType == "LIVE_DS" || gameType == "LIVE_LMG" || gameType == "LIVE_CG88") {
                    playGame(gameType);
                    return;
                } else if (gameType == "SLOTS") {
                        javascript: window.location.href = '../app/electronicGameIG';
                    return;
                } else if (gameType == "jsBindNo") {
                    return;
                }
                $('#close_poppublic').bind("click", function () {
                    $("#creditIn option[value='maintain']").remove();
                    $("#creditOut option[value='maintain']").remove();
                    $("#poppublic").hide();
                    $("#credit_progress_bar").hide();
                    $("#recoverBalance_success").hide();
                    $("#text_prompts").html("");
                })
                $('#poppublic').show();
                playGameBefor(gameType, gameWallet);
            }
        });
    } else {
        $('.list-item').bind("click", function () { javascript: window.location.href = '../app/loginPage' });
    }
}

function playGameBefor(gameType, gameWallet) {
    $("#gamebtn").unbind();
    $("#creditBtn").unbind();
    var obj = new Object();
    var objMain = new Object();
    obj.walletId = "";
    objMain.walletId = "";
    getWalletIdOrName(gameWallet, obj);
    getWalletIdOrName("MAIN_WALLET", objMain);

    $("#wallet_checked_out").attr("class", "MAIN_WALLET");
    $("#creditIn option").prop('selected', false);
    $("#creditIn option[value = " + obj.walletId + "]").prop("selected", true);
    if (obj.walletId == "close") {
        $("<option value='maintain' selected='selected'>钱包维护中...</option>").appendTo("#creditIn");
        $("#wallet_checked_in").html("无法获取...");
    } else {
        $("#wallet_checked_in").attr("class", gameWallet);
        getBalanceByClass(gameWallet);
    }

    if (objMain.walletId == "close") {
        $("<option value='maintain' selected='selected'>钱包维护中...</option>").appendTo("#creditOut");
        $("#wallet_checked_out").html("无法获取...");
    }

    $("#creditOut").change(function () {
        $("input[name=creditOut]").val($("#creditOut option:selected").val());
        getWalletIdOrName($("#creditOut option:selected").val(), obj);
        $("#wallet_checked_out").attr("class", obj.walletId);
        getBalanceByClass(obj.walletId);

    });

    $("#creditIn").change(function () {
        $("input[name=creditIn]").val($("#creditIn option:selected").val());
        getWalletIdOrName($("#creditIn option:selected").val(), obj);
        $("#wallet_checked_in").attr("class", obj.walletId);
        getBalanceByClass(obj.walletId);
    });

    $("input[name=creditOut]").val($("#creditOut option:selected").val());
    $("input[name=creditIn]").val($("#creditIn option:selected").val());

    $("#close_poppublic_out").bind("click", function () {
        getWalletIdOrName($("#creditOut option:selected").val(), obj);
        if (obj.walletId == "close") {
            $("#credit_progress_bar").show();
            $("#credit_progress_bar #walletOut_maintain").show();
        }
        getBalanceByClass(obj.walletId);
    })

    $("#close_poppublic_in").bind("click", function () {
        getWalletIdOrName($("#creditIn option:selected").val(), obj);
        if (obj.walletId == "close") {
            $("#credit_progress_bar").show();
            $("#credit_progress_bar #walletIn_maintain").show();
        }
        getBalanceByClass(obj.walletId);
    })

    $("#creditBtn").bind("click", function () {
        //		$("#credit_progress_bar").show();
        //		$("#credit_progress_bar #casePourpre").show();
        $("#text_prompts").html();
        $('#creditForm').submit();
        $('#txtAmount').val("");
    })

    $("#recoverBalance").bind("click", function () {
        //		$("#credit_progress_bar").show();
        //		$("#credit_progress_bar #casePourpre").show();
        $("#text_prompts").html();
        recoverBalance();
        $('#txtAmount').val("");
    })

    $("#gamebtn").bind("click", function () { //进入游戏
        if (gameType != null) {
            if (gameType == 'FISH_GG') {
                playGame('FISH_GG', '101');
            } else if (gameType == 'SLOTS_YY_FISH') {
                playGame('SLOTS_YY', 'FishingRoyal');
            } else if (gameType == 'SLOTS_BBIN') {
                playGame('SLOTS_BBIN', '');
            } else if (gameType == 'SLOTS_ALLBET') {
                    javascript: window.location.href = '../app/electronicGameALLBET';
            } else if (gameType == 'SLOTS_YY') {
                    javascript: window.location.href = '../app/electronicGameYY';
            } else if (gameType == 'SLOTS_SPADE') {
                    javascript: window.location.href = '../app/electronicGameXB';
            } else if (gameType == 'SLOTS_PT') {
                    javascript: window.location.href = '../app/electronicGamePT';
            } else if (gameType == 'SLOTS_MG') {
                    javascript: window.location.href = '../app/electronicGameMG';
            } else if (gameType == 'SLOTS_HB') {
                    javascript: window.location.href = '../app/electronicGameHB';
            } else if (gameType == 'SLOTS_ALLBET') {
                playGameWait('SLOTS_ALLBET', 'af');
            } else if (gameType == 'SLOTS_AG') {
                playGameWait('SLOTS_AG', '');
            } else if (gameType == 'SLOTS_BBIN') {
                playGameWait('SLOTS_BBIN', '');
            } else if (gameType == 'SPORT') {
                playGameMobile('SPORT');
            } else if (gameType == 'LOTTERY_DS') {
                playGameMobile('LOTTERY_DS');
            } else if (gameType == "LOTTERY_PJ") {
                cacheImg('lotteryPJ');
            } else if (gameType == "LOTTO_PJ") {
                cacheImg('lottoPJ');
            } else {
                playGame(gameType);
            }
            $('#poppublic').hide();
        }
    })
}

function getWalletIdOrName(params, ob) {
    var o = {
        params: params
    };
    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/getWalletIdOrNameUtil?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: false,
        timeout: 20000,
        beforeSend: function (xmlhttprequest) {
        },
        success: function (data) {
            if (data) {
                if (data.success == true) {
                    if (data.wStatus == "close") {
                        ob.walletId = "close";
                        return "close";
                    } else {
                        ob.walletId = data.walletIdOrName;
                        return data.walletIdOrName;
                    }
                }
            }
        },
        error: function (xmlhttprequest, error) {
        },
        complete: function () {
        }
    });
}

function playGameLottoFfcHttps(product, line) {
    var ishttps = 'https:' == document.location.protocol ? true : false;
    var iHeight = screen.height - 70;
    var iWidth = screen.width - 10;
    var lotteryDS = null;
    if (product == "LOTTERY_DS") {
        if (ishttps) {
            lotteryDS = window.open("", 'lotteryDScashWindow', "height=" + iHeight + ",width=" + iWidth + ",toolbar=no,resizable=yes,menubar=no,scrollbars=no,location=no, status=no");
        }
    }
    var o = {
        product: product,
        line: line + ""
    };




    var jsonuserinfo = $.toJSON(o);
    $.ajax({
        type: "post",
        url: $("#path").val() + "/app/playHoldem?" + Math.random() * 10000,
        data: jsonuserinfo,
        contentType: 'application/json',
        dataType: "json",
        async: true,
        timeout: 50000,
        beforeSend: function (xmlhttprequest) {
            if (product == 'LOTTERY_DS') {
                $("#maskDiv").show();
                $("#ffciframe").hide();
            } else {
                $("#maskDiv").show();
                $("iframe").hide();
            }
        },
        success: function (data) {
            if (data) {
                if (data.success == true) {
                    if (product == "LOTTERY_DS") {
                        if (!ishttps) {
                            $("#maskDiv").show();
                            $("#ffciframe").attr("src", data.link);
                        } else {
                            //							if(data.link.indexOf("https:")!=-1){ //包含 
                            //								lotteryDS.location=data.link;
                            //								window.open(data.link,"_blank");
                            //						    }else{  
                            //						    	$("#maskDiv").show();
                            //								$("#ffciframe").attr("src",data.link);
                            //						    } 
                            lotteryDS.location = data.link;
                        }
                    } else {
                        if (ishttps) {
                            lotteryDS.close();
                        }
                    }
                } else {
                    if (data.message == 'SESSION_EXPIRED') {
                        JqueryShowMessageJustClose(l_playGame['msg4']);
                    } else if (data.message == 'STATUS_NO_OPEN') {
                        JqueryShowMessage(l_playGame['msg3']);
                    } else if (data.message == 'USER_CLOSE') {
                        JqueryShowMessage(l_playGame['msg2']);
                    } else if (data.message == 'TRY_AGAIN') {
                        JqueryShowMessage(l_basic['tryAgain']);
                    } else if (data.message == 'PRODUCT_NO_EXISTS') {
                        JqueryShowMessageHome(l_playGame['msg6']);
                    } else if (data.message == 'PRODUCT_MAINTENACE') {
                        if (data.msg === "") {
                            JqueryShowMessageJustClose(l_playGame['msg7']);
                        } else {
                            JqueryShowMessageJustClose(data.msg);
                        }
                    } else if (data.message == 'M8_WEI_HUI') {
                        JqueryShowMessageHome(l_playGame['msg7']);
                    } else if (data.message == 'M8_INVALID_USERNAME') {
                        JqueryShowMessageHome(l_basic['tryAgain']);
                    } else if (data.message == 'FREQUENT_REQUESTS') {
                        /*JqueryShowMessageHome(l_playGame['msg9']);*/
                    } else {
                        JqueryShowMessageReload(data.message);
                    }
                    $("#maskDiv").hide();
                }
            }
        },
        error: function (xmlhttprequest, error) {
            JqueryShowMessage(l_basic['tryAgain']);
        },
        complete: function () {
        }
    });
}
