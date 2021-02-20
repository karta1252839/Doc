// deposit records
deposit = function (data) {
    const output = document.querySelector('.depositOutput');
    const paginationOutput = document.querySelector('.bpos');
    const depositLists = {
        postPerPage: 5,
        currentPage: 1,
        optionsLength: null,
        selected: 1,
        result: null
    }

    const init = function () {
        // console.log('ready');
        depositLists.result = data;
        loadPage(1)
        $('#depositRecords').find('.pagination select').remove();

        const pageSelector = document.createElement('select')
        for (let i = 0; i < depositLists.optionsLength; i++) {
            let pageValue = document.createElement('option')
            pageValue.value = (i + 1);
            pageValue.textContent = (i + 1)
            pageSelector.appendChild(pageValue)
            pageSelector.addEventListener('change', e => {
                loadPage(e.target.value)
                depositLists.selected = parseInt(e.target.value)
            });
        }
        paginationOutput.insertAdjacentElement('beforebegin', pageSelector);
        if ($('#depositRecords').hasClass('d-none')) {
            $('#depositRecords').removeClass('d-none');
            $('#depositRecords').addClass('d-flex');
        }
        // $('#depositRecords .pagination .cannotBeRemove:last-child').before(pageSelector)

        // console.log(depositLists.result);

        // console.log(depositLists.optionsLength);

    }

    const loadPage = function (pg) {
        $('.depositOutput').html('');

        // pagination.innerHTML = '';
        depositLists.currentPage = pg;
        let startPost = (depositLists.currentPage - 1) * depositLists.postPerPage;
        let totalPages = Math.ceil(depositLists.result.length / depositLists.postPerPage);
        let endPost = startPost + depositLists.postPerPage > depositLists.result.length ? depositLists.result.length : startPost + depositLists.postPerPage;
        depositLists.optionsLength = totalPages;

        for (let x = 0; x < totalPages; x++) {
            if (totalPages <= 1) {
                $('#depositRecords .pagination').css('display', 'none');
            }
            else
                $('#depositRecords .pagination').css('display', 'flex');
        }


        for (let x = startPost; x < endPost; x++) {
            const main = depositLists.result[x];
            let div = document.createElement('div');
            div.classList.add('itemContainer', 'itemContainer__records');
            div.style.height = 'auto';
            let div_id = document.createElement('div');
            let div_time = document.createElement('div');
            let div_method = document.createElement('div');
            let div_value = document.createElement('div');
            let div_status = document.createElement('div');
            div_id.textContent = `單號：${main.TransactionID}`;
            div_time.textContent = `${main.RequestTimeOffset}`;
            div_method.textContent = `儲值方式：${main.ChannelType}`;
            div_value.textContent = `金額：${main.Amount}`;
            //div_status.innerHTML = `狀態：${main.status ? `<span class="success">成功</span>` : '<span class="failure">申請中</span>'}`;
            let statusClassName = "";
            switch (main.Status) {
                case "成功":
                case "批準":
                    statusClassName = "success";
                    break;
                default:
                    statusClassName = "failure";
                    break;
            }
            div_status.innerHTML = `狀態：<span class="${statusClassName}">${main.Status}</span>`;
            div.appendChild(div_id);
            div.appendChild(div_time);
            div.appendChild(div_method);
            div.appendChild(div_value);
            div.appendChild(div_status);


            output.appendChild(div)

        }


    }

    init();
    //window.addEventListener('load', function () {
    //});
    $('#depositRecords .pagination li:last-child').click(function (e) {
        e.preventDefault();

        if (depositLists.selected === depositLists.optionsLength) {
            return false
        } else {
            depositLists.selected += 1;
            loadPage(depositLists.selected)
            $('#depositRecords .pagination select').val(depositLists.selected);
        }
        // console.log('next clicked!');
        // console.log('current:', depositLists.selected);
    });
    $('#depositRecords .pagination li:first-child').click(function (e) {
        e.preventDefault();

        if (depositLists.selected === 1) {
            return false
        } else {
            depositLists.selected -= 1;
            loadPage(depositLists.selected)
            $('#depositRecords .pagination select').val(depositLists.selected);
        }
        // console.log('prev clicked!');
        // console.log('current:', depositLists.selected);
    });
}
// withdraw records
withdrawal = function (data) {
    const withdrawOutput = document.querySelector('.withdrawOutput');
    const paginationOutput = document.querySelector('.bpos__withdraw');
    const withdrawLists = {
        postPerPage: 5,
        currentPage: 1,
        optionsLength: null,
        selected: 1,
        result: null
    }

    const init = function () {
        // console.log('ready');

        withdrawLists.result = data;
        loadPage(1)
        $('#withdrawRecords').find('.pagination select').remove();

        const pageSelector = document.createElement('select')
        for (let i = 0; i < withdrawLists.optionsLength; i++) {
            let pageValue = document.createElement('option')
            pageValue.value = (i + 1);
            pageValue.textContent = (i + 1)
            pageSelector.appendChild(pageValue)
            pageSelector.addEventListener('change', e => {
                loadPage(e.target.value)
                withdrawLists.selected = parseInt(e.target.value)
            });
        }
        paginationOutput.insertAdjacentElement('beforebegin', pageSelector);
        if ($('#withdrawRecords').hasClass('d-none')) {
            $('#withdrawRecords').removeClass('d-none');
            $('#withdrawRecords').addClass('d-flex');
        }

        // console.log(depositLists.result);

        // console.log(depositLists.optionsLength);

    }

    const loadPage = function (pg) {
        $('.withdrawOutput').html('');

        // pagination.innerHTML = '';
        withdrawLists.currentPage = pg;
        let startPost = (withdrawLists.currentPage - 1) * withdrawLists.postPerPage;
        let totalPages = Math.ceil(withdrawLists.result.length / withdrawLists.postPerPage);
        let endPost = startPost + withdrawLists.postPerPage > withdrawLists.result.length ? withdrawLists.result.length : startPost + withdrawLists.postPerPage;
        withdrawLists.optionsLength = totalPages;

        for (let x = 0; x < totalPages; x++) {
            if (totalPages <= 1) {
                $('#withdrawRecords .pagination').css('display', 'none')
            }
            else
                $('#withdrawRecords .pagination').css('display', 'flex');
        }


        for (let x = startPost; x < endPost; x++) {
            const main = withdrawLists.result[x];
            let div = document.createElement('div');
            div.classList.add('itemContainer', 'itemContainer__records');
            div.style.height = 'auto';
            let div_id = document.createElement('div');
            let div_time = document.createElement('div');
            let div_value = document.createElement('div');
            let div_status = document.createElement('div');
            div_id.textContent = `單號：${main.TransactionID}`;
            div_time.textContent = `${main.RequestTimeOffset}`;
            div_value.textContent = `金額：${main.Amount}`;
            //div_status.innerHTML = `狀態：${main.status ? `<span class="success">成功</span>` : '<span class="failure">申請中</span>'}`;
            let statusClassName = "";
            switch (main.Status) {
                case "成功":
                case "批準":
                    statusClassName = "success";
                    break;
                default:
                    statusClassName = "failure";
                    break;
            }
            div_status.innerHTML = `狀態：<span class="${statusClassName}">${main.Status}</span>`;
            div.appendChild(div_id);
            div.appendChild(div_time);
            div.appendChild(div_value);
            div.appendChild(div_status);


            withdrawOutput.appendChild(div)

        }


    }

    init();
    //window.addEventListener('load', function () {
    //});
    $('#withdrawRecords .pagination li:last-child').click(function (e) {
        e.preventDefault();

        if (withdrawLists.selected === withdrawLists.optionsLength) {
            return false
        } else {
            withdrawLists.selected += 1;
            loadPage(withdrawLists.selected)
            $('#withdrawRecords .pagination select').val(withdrawLists.selected);
        }
        // console.log('next clicked!');
        // console.log('current:', depositLists.selected);
    });
    $('#withdrawRecords .pagination li:first-child').click(function (e) {
        e.preventDefault();

        if (withdrawLists.selected === 1) {
            return false
        } else {
            withdrawLists.selected -= 1;
            loadPage(withdrawLists.selected)
            $('#withdrawRecords .pagination select').val(withdrawLists.selected);
        }
        // console.log('prev clicked!');
        // console.log('current:', depositLists.selected);
    });
}
// transfer records
transfer = function (data) {
    const transferOutput = document.querySelector('.transferOutput');

    const transferLists = {
        postPerPage: 5,
        currentPage: 1,
        optionsLength: 0,
        selected: 1,
        result: null
    }

    const init = function () {
        transferLists.result = data;
        loadPage(1);
        $('#transfer').find('.pagination select').remove();

        const pageSelector = document.createElement('select')
        for (let i = 0; i < transferLists.optionsLength; i++) {
            let pageValue = document.createElement('option')
            pageValue.value = (i + 1);
            pageValue.textContent = (i + 1)
            pageSelector.appendChild(pageValue)
            pageSelector.addEventListener('change', e => {
                // console.log('clicked!!');
                loadPage(e.target.value)
                transferLists.selected = parseInt(e.target.value)
            });
        }
        $('#transfer .pagination .cannotBeRemove:last-child').before(pageSelector);
        if ($('#transfer').hasClass('d-none')) {
            $('#transfer').removeClass('d-none');
            $('#transfer').addClass('d-flex');
        }
        // console.log(betRecordsLists.optionsLength);

    }

    const loadPage = function (pg) {
        $('.transferOutput').html('');

        // pagination.innerHTML = '';
        transferLists.currentPage = pg;
        let startPost = (transferLists.currentPage - 1) * transferLists.postPerPage;
        let totalPages = Math.ceil(transferLists.result.length / transferLists.postPerPage);
        let endPost = startPost + transferLists.postPerPage > transferLists.result.length ? transferLists.result.length : startPost + transferLists.postPerPage;
        transferLists.optionsLength = totalPages;

        for (let x = 0; x < totalPages; x++) {
            if (totalPages <= 1) {
                $('#transfer .pagination').css('display', 'none')
            }
            else
                $('#transfer .pagination').css('display', 'flex')
        }


        for (let x = startPost; x < endPost; x++) {
            const main = transferLists.result[x];
            let div = document.createElement('div');
            div.classList.add('itemContainer');
            let headerDiv = document.createElement('div')
            let footerDiv = document.createElement('div')
            headerDiv.classList.add('info__header')
            footerDiv.classList.add('info__footer')
            let headerContainer = document.createElement('div');
            let footerContainer = document.createElement('div');
            headerContainer.classList.add('info__header__container');
            footerContainer.classList.add('info__footer__container');
            let headerProperty01 = document.createElement('div');
            headerProperty01.classList.add('property');
            headerProperty01.textContent = `${main.FromWallet}轉出`;
            headerContainer.appendChild(headerProperty01);
            let headerProperty02 = document.createElement('div');
            headerProperty02.classList.add('property');
            // headerProperty02.innerHTML = `輸/贏：${parseInt(main.balance.split("$").join('')) > 0 ? `<span class="success">${main.balance}</span>` : `<span class="failure">${main.balance}</span>`}`;
            headerProperty02.textContent = main.RequestTimeOffset;
            headerContainer.appendChild(headerProperty02);
            let footerProperty = document.createElement('div');
            let footerProperty2 = document.createElement('div');
            footerProperty.classList.add('property')
            footerProperty2.classList.add('property')
            //footerProperty.innerHTML = `狀態：${main.Status ? `<span class="success">成功</span>` : `<span class="failure">失敗</span>`}`;
            let statusClassName = "";
            switch (main.Status) {
                case "成功":
                case "批準":
                    statusClassName = "success";
                    break;
                default:
                    statusClassName = "failure";
                    break;
            }
            footerProperty.innerHTML = `狀態：<span class="${statusClassName}">${main.Status}</span>`;
            footerProperty2.innerHTML = `轉帳金額：<span class="${statusClassName}">${statusClassName == "success" ? main.Amount : 0}</span>`;
            //footerProperty2.innerHTML = `轉帳金額：${main.Status ? `<span class="success">${main.Amount}</span>` : `<span class="failure">0</span>`}`;
            footerContainer.appendChild(footerProperty)
            footerContainer.appendChild(footerProperty2)
            footerDiv.appendChild(footerContainer)
            let chevron = document.createElement('span')
            chevron.classList.add('iconfont', 'icon_chevron-down-light')
            chevron.style.color = '#9BA2AA';
            headerDiv.appendChild(headerContainer)
            headerDiv.appendChild(chevron)
            let dropDownBox = document.createElement('div')
            dropDownBox.classList.add('dropDownBox')
            let div_id = document.createElement('div')
            div_id.classList.add('listItem')
            div_id.style.whiteSpace = 'nowrap';
            div_id.innerHTML = `單號：<span>${main.TransactionID}</span>`
            dropDownBox.appendChild(div_id)
            let div_balance = document.createElement('div')
            div_balance.classList.add('listItem')
            div_balance.innerHTML = `剩餘額度：<span>${main.MainWalletBalance}</span>`
            dropDownBox.appendChild(div_balance)
            let div_to = document.createElement('div')
            div_to.classList.add('listItem')
            div_to.innerHTML = `轉入帳戶：<span class="orange">${main.ToWallet}</span>`
            dropDownBox.appendChild(div_to)
            let div_from = document.createElement('div')
            div_from.classList.add('listItem')
            div_from.innerHTML = `轉出帳戶：<span>${main.FromWallet}</span>`
            dropDownBox.appendChild(div_from)


            div.appendChild(headerDiv)
            div.appendChild(dropDownBox)
            div.appendChild(footerDiv)
            transferOutput.appendChild(div)

            const transferState = {
                clicked: false
            }
            $('.itemContainer').on('click', function () {
                transferState.clicked = !transferState.clicked;
                if (transferState.clicked) {
                    $(this).find('.icon_chevron-down-light').addClass('icon_chevron-up-light')
                    $(this).find('.itemContent').css('display', 'flex')
                    $(this).find('.dropDownBox').addClass('active')
                } else {
                    $(this).find('.icon_chevron-down-light').removeClass('icon_chevron-up-light')
                    $(this).find('.itemContent').css('display', 'none')
                    $(this).find('.dropDownBox').removeClass('active')

                }
            })

        }


    }

    init();
    //window.addEventListener('load', function () {
    //});
    $('#transfer .pagination li:last-child').click(function (e) {
        e.preventDefault();

        if (transferLists.selected === transferLists.optionsLength) {
            return false
        } else {
            transferLists.selected += 1;
            loadPage(transferLists.selected)
            $('#transfer .pagination select').val(transferLists.selected);
        }
        // console.log('next clicked!');
        // console.log('current:', betRecordsLists.selected);
    })
    $('#transfer .pagination li:first-child').click(function (e) {
        e.preventDefault();

        if (transferLists.selected === 1) {
            return false
        } else {
            transferLists.selected -= 1;
            loadPage(transferLists.selected)
            $('#transfer .pagination select').val(transferLists.selected);
        }
    })
}
// bet records
bet = function (data) {
    const betRecordsOutput = document.querySelector('.betRecordsOutput');

    const betRecordsLists = {
        postPerPage: 5,
        currentPage: 1,
        optionsLength: 0,
        selected: 1,
        result: null
    }

    var totalWinLose = 0;
    const betRecordsInit = function () {
        betRecordsLists.result = data;
        betRecordsLoadPage(1)
        $('#betRecords').find('.pagination select').remove();

        for (i = 0; i < betRecordsLists.result.length; i++)
            totalWinLose = totalWinLose + parseFloat(betRecordsLists.result[i].WinLoseAmt.replace(',', ''));

        $('.amount_total').empty();
        $('.amount_total').removeClass('success failure');
        if (totalWinLose >= 0)
            $('.amount_total').addClass('success');
        else
            $('.amount_total').addClass('failure');
        $('.amount_total').html('總計： ' + addCommas(totalWinLose.toFixed(2)));
        if ($('.itemContainer__amount_total').hasClass('d-none'))
            $('.itemContainer__amount_total').removeClass('d-none');

        const betRecordsPageSelector = document.createElement('select')
        for (let i = 0; i < betRecordsLists.optionsLength; i++) {
            let betPageValue = document.createElement('option')
            betPageValue.value = (i + 1);
            betPageValue.textContent = (i + 1)
            betRecordsPageSelector.appendChild(betPageValue)
            betRecordsPageSelector.addEventListener('change', e => {
                // console.log('clicked!!');
                betRecordsLoadPage(e.target.value)
                betRecordsLists.selected = parseInt(e.target.value)
            });
        }
        $('#betRecords .pagination .cannotBeRemove:last-child').before(betRecordsPageSelector);
        if ($('#betRecords').hasClass('d-none')) {
            $('#betRecords').removeClass('d-none');
            $('#betRecords').addClass('d-flex');
        }
        // console.log(betRecordsLists.optionsLength);

    }

    const betRecordsLoadPage = function (pg) {
        $('.betRecordsOutput').html('');

        // pagination.innerHTML = '';
        betRecordsLists.currentPage = pg;
        let startPost = (betRecordsLists.currentPage - 1) * betRecordsLists.postPerPage;
        let totalPages = Math.ceil(betRecordsLists.result.length / betRecordsLists.postPerPage);
        let endPost = startPost + betRecordsLists.postPerPage > betRecordsLists.result.length ? betRecordsLists.result.length : startPost + betRecordsLists.postPerPage;
        betRecordsLists.optionsLength = totalPages;

        for (let x = 0; x < totalPages; x++) {
            if (totalPages <= 1) {
                $('#betRecords .pagination').css('display', 'none');
            }
            else
                $('#betRecords .pagination').css('display', 'flex');
        }


        for (let x = startPost; x < endPost; x++) {
            const main = betRecordsLists.result[x];
            let div = document.createElement('div');
            div.classList.add('itemContainer');
            let headerDiv = document.createElement('div')
            let footerDiv = document.createElement('div')
            headerDiv.classList.add('info__header')
            footerDiv.classList.add('info__footer')
            let headerContainer = document.createElement('div');
            let footerContainer = document.createElement('div');
            headerContainer.classList.add('info__header__container');
            footerContainer.classList.add('info__footer__container');
            let headerProperty01 = document.createElement('div');
            headerProperty01.classList.add('property');
            headerProperty01.textContent = main.SiteDesc;
            headerContainer.appendChild(headerProperty01);
            let headerProperty02 = document.createElement('div');
            headerProperty02.classList.add('property');
            headerProperty02.innerHTML = `輸/贏：${parseFloat(main.WinLoseAmt.replace(',', '')) >= 0 ? `<span class="success">${main.WinLoseAmt}</span>` : `<span class="failure">${main.WinLoseAmt}</span>`}`;
            headerContainer.appendChild(headerProperty02);
            let footerProperty = document.createElement('div');
            footerProperty.classList.add('property')
            footerProperty.style.fontSize = '1.2rem';
            footerProperty.textContent = main.BetTimeOffset;
            footerContainer.appendChild(footerProperty)
            footerDiv.appendChild(footerContainer)
            let chevron = document.createElement('span')
            chevron.classList.add('iconfont', 'icon_chevron-down-light')
            chevron.style.color = '#9BA2AA';
            headerDiv.appendChild(headerContainer)
            headerDiv.appendChild(chevron)
            let dropDownBox = document.createElement('div')
            dropDownBox.classList.add('dropDownBox')
            let div_id = document.createElement('div')
            div_id.classList.add('listItem')
            div_id.style.flex = '0 1 100%';
            div_id.innerHTML = `<p style="white-space: nowrap;margin-top:0;margin-bottom:0;">單號：<p style="margin-top:0;margin-bottom:0;"><span style="word-break:break-word">${main.BetID}</span>`
            dropDownBox.appendChild(div_id)
            let div_hidden = document.createElement('div')
            div_hidden.classList.add('listItem')
            div_hidden.classList.add('d-none')
            div_hidden.innerHTML = ``
            dropDownBox.appendChild(div_hidden)
            //div_id.style.whiteSpace = 'nowrap';
            //div_id.innerHTML = `單號：<span>${main.BetID}</span>`
            //dropDownBox.appendChild(div_id)
            let div_platform = document.createElement('div')
            div_platform.classList.add('listItem')
            div_platform.innerHTML = `遊戲平台：<span>${main.SiteDesc}</span>`
            dropDownBox.appendChild(div_platform)
            let div_kind = document.createElement('div')
            div_kind.classList.add('listItem')
            div_kind.innerHTML = `遊戲類型：<span>${main.GameGroupDesc}</span>`
            dropDownBox.appendChild(div_kind)
            let div_betValue = document.createElement('div')
            div_betValue.classList.add('listItem')
            div_betValue.innerHTML = `投注額：<span>${main.BetAmount}</span>`
            dropDownBox.appendChild(div_betValue)
            let div_grandTotal = document.createElement('div')
            div_grandTotal.classList.add('listItem')
            div_grandTotal.innerHTML = `流水：<span>${main.TurnoverAmt}</span>`
            dropDownBox.appendChild(div_grandTotal)
            let div_grade = document.createElement('div')
            div_grade.classList.add('listItem')
            div_grade.innerHTML = `星級：<span>${main.RatingDesc}</span>`
            dropDownBox.appendChild(div_grade)
            div.appendChild(headerDiv)
            div.appendChild(dropDownBox)
            div.appendChild(footerDiv)
            betRecordsOutput.appendChild(div)

            const betRecordsState = {
                clicked: false
            }
            $('.itemContainer').on('click', function () {
                betRecordsState.clicked = !betRecordsState.clicked;
                if (betRecordsState.clicked) {
                    $(this).find('.icon_chevron-down-light').addClass('icon_chevron-up-light')
                    $(this).find('.itemContent').css('display', 'flex')
                    $(this).find('.dropDownBox').addClass('active')
                } else {
                    $(this).find('.icon_chevron-down-light').removeClass('icon_chevron-up-light')
                    $(this).find('.itemContent').css('display', 'none')
                    $(this).find('.dropDownBox').removeClass('active')

                }
            })

        }


    }

    betRecordsInit();
    //window.addEventListener('load', function () {
    //});
    $('#betRecords .pagination li:last-child').click(function (e) {
        e.preventDefault();

        if (betRecordsLists.selected === betRecordsLists.optionsLength) {
            return false
        } else {
            betRecordsLists.selected += 1;
            betRecordsLoadPage(betRecordsLists.selected)
            $('#betRecords .pagination select').val(betRecordsLists.selected);
        }
        // console.log('next clicked!');
        // console.log('current:', betRecordsLists.selected);
    })
    $('#betRecords .pagination li:first-child').click(function (e) {
        e.preventDefault();

        if (betRecordsLists.selected === 1) {
            return false
        } else {
            betRecordsLists.selected -= 1;
            betRecordsLoadPage(betRecordsLists.selected)
            $('#betRecords .pagination select').val(betRecordsLists.selected);
        }
        // console.log('prev clicked!');
        // console.log('current:', betRecordsLists.selected);
    })
}

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '.00';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}