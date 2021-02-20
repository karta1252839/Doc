var layerOpen;

showlayer = function (size, color, message) {
    layerOpen = layer.open({
        id: 'ModalLayer',
        type: 1,
        title: [message.title, 'background: ' + color.header],
        skin: 'layui-layer-molv',
        closeBtn: 1,
        shade: 0.8,
        shadeClose: true,
        area: [size.width, size.height],
        content: message.content,
        move: false,
        scrollbar: true,
        success: function () {
            $('body').css('overflow', 'hidden');
        },
        end: function () {
            $('body').css('overflow', 'auto');
            message.content.hide();
        }
    });
    layer.style(layerOpen, {
        background: color.background
    });
}

closelayer = function () {
    layer.close(layerOpen);
}