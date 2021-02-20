var layerOpen;

showlayer = function (color, message, layerId, layerWrapId, path) {
    var url = location.href;
    layerOpen = layer.open({
        title: [message.title, 'background: ' + color.header],
        shade: 0.8,
        shadeClose: true,
        className: 'layerModal',
        btn: '關閉',
        content: message.content,
        style: 'background: ' + color.background,
        success: function () {
            $('body').css('overflow', 'hidden');
            var height = window.innerHeight;
            height = height - 133;
            $('.layui-m-layercont').css('max-height', height + 'px');
            if (message.content == "") {
                $('.layui-m-layercont').empty();
                $(layerId).prependTo('.layui-m-layercont');
                if (path && url.indexOf(path) > -1)
                    $(layerId).show();
            }
        },
        yes: function () {
            layer.close(layerOpen);
        },
        end: function () {
            $('body').css('overflow', 'auto');
            if (message.content == "") {
                if (path && url.indexOf(path) > -1) {
                    $(layerId).hide();
                    $(layerId).insertAfter(layerWrapId);
                }
                else
                    $(layerId).prependTo(layerWrapId);
            }
        }
    });
}

closelayer = function () {
    layer.close(layerOpen);
}