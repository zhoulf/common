/* Scrollbar */        
const THUMB_MIN_SIZE = 30;
const BAR_WIDTH = 14;
const ScrollBar = function() {};

ScrollBar.createYBar = function(domEl) {
    var $rel = createLayer({ axis: 'y'});
    domEl.append($rel.$scrollbar);

    var viewpointHeight = domEl.height();
    var contentHeight = domEl[0].scrollHeight;
    var thumbHeight = calcThumbSize(viewpointHeight, contentHeight);
    
    $rel.$scrollbarThumb.height(thumbHeight);
    initYAxisEvent($rel, domEl, viewpointHeight, contentHeight, thumbHeight);

    return {
        update: function() {
            var thumbHeight = calcThumbSize(viewpointHeight, contentHeight);
            $rel.$scrollbarThumb.height(thumbHeight);
        },
        destory: destory($rel)
    };
}


function createLayer({ axis }) {
    let type = axis ? axis : 'y';
    let $scrollbar = $('<div/>').addClass(`${type}-scrollbar scrollbar`);
    let $scrollbarTrack = $('<div/>').addClass(`scrollbar-track`);
    let $scrollbarThumb = $('<div/>').addClass(`scrollbar-thumb`);

    $scrollbar.append($scrollbarTrack).append($scrollbarThumb);

    return { $scrollbar, $scrollbarThumb, $scrollbarTrack };
}

function calcThumbSize(viewpointSize, contentSize) {
    return viewpointSize <= contentSize 
        ? Math.max(viewpointSize * viewpointSize / contentSize, THUMB_MIN_SIZE)
        : viewpointSize;
}


function initYAxisEvent($rel, domEl, viewpointHeight, contentHeight, thumbHeight) {
    domEl.on('scroll.ybar', function(evt) {
        // 滑块相对顶部距离/ (一屏高度 - 滑块高度) = 顶部距离/ (实际内容高度 - 一屏高度)
        var thumbOffsetTop = this.scrollTop/ (contentHeight - viewpointHeight) * (viewpointHeight - thumbHeight);
        $rel.$scrollbar.css({
            'top': this.scrollTop,
            'left': this.scrollLeft + domEl.width() - BAR_WIDTH
        });
        $rel.$scrollbarThumb.css('top', thumbOffsetTop);
    });
    
    $rel.$scrollbarThumb
        .on('mousedown', function(evt) {
            var DOCScrollTop = document.body.scrollTop || document.documentElement.scrollTop;

            $(document).on('mousemove.scrollbar', function(evt) {
                var scrollBarOffsetTop = (evt.clientY + DOCScrollTop - thumbHeight)/ viewpointHeight * contentHeight;
                domEl.scrollTop(scrollBarOffsetTop);
    
            }).on('mouseup.scrollbar', function(evt) {
                $(document).off('mousemove.scrollbar mouseup.scrollbar');
            });
    
            evt.stopPropagation();
            evt.preventDefault();
            return false;
        });
    
        $rel.$scrollbarTrack.on('mousedown', function(evt) {
        var top = (evt.clientY - thumbHeight)/ viewpointHeight * contentHeight;
        domEl.scrollTop(top);
    });
}


ScrollBar.createXBar = function(domEl) {
    var $rel = createLayer({ axis: 'x'});
    domEl.append($rel.$scrollbar);

    var viewpointWidth = domEl.width();
    var viewpointHeight = domEl.height();

    var contentWidth = domEl[0].scrollWidth;
    var thumbWidth = calcThumbSize(viewpointWidth, contentWidth);
    
    $rel.$scrollbarThumb.width(thumbWidth);

    initXAxisEvent($rel, domEl, viewpointWidth, viewpointHeight);

    return {
        update: function() {
            var thumbWidth = calcThumbSize(viewpointWidth, domEl[0].scrollWidth);
            $rel.$scrollbarThumb.width(thumbWidth);
        },
        destory: destory($rel)
    };
}

function initXAxisEvent($rel, domEl, viewpointWidth, viewpointHeight) {

    domEl.on('scroll.xbar', function(evt) {
        var scrollLeft = this.scrollLeft;
        var thumbWidth = calcThumbSize(viewpointWidth, domEl[0].scrollWidth); // TODO
        // 滑块相对顶部距离/ (一屏宽度 - 滑块宽度) = 距离左边值/ (实际内容宽度 - 一屏宽度)
        var thumbOffsetLeft = scrollLeft/ (domEl[0].scrollWidth - viewpointWidth) * (viewpointWidth - thumbWidth);
        $rel.$scrollbar.css({
            'top': this.scrollTop + viewpointHeight - BAR_WIDTH,
            'left': scrollLeft
        });
        console.log('-----------', scrollLeft, thumbOffsetLeft);
        $rel.$scrollbarThumb.css('left', thumbOffsetLeft);
    });

    $rel.$scrollbarThumb
        .on('mousedown', function(evt) {
            let contentWidth = domEl[0].scrollWidth;
            var thumbWidth = calcThumbSize(viewpointWidth, domEl[0].scrollWidth);
            var DOCScrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
    
            $(document).on('mousemove.scrollbar', function(evt) {
                var scrollBarOffsetLeft = (evt.clientX + DOCScrollLeft - thumbWidth)/ viewpointWidth * contentWidth;
                domEl.scrollLeft(scrollBarOffsetLeft);
    
            }).on('mouseup.scrollbar', function(evt) {
                $(document).off('mousemove.scrollbar mouseup.scrollbar');
            });
    
            evt.stopPropagation();
            evt.preventDefault();
            return false;
        });
    
    $rel.$scrollbarTrack.on('mousedown', function(evt) {
        var thumbWidth = calcThumbSize(viewpointWidth, domEl[0].scrollWidth);
        var left = (evt.clientX - thumbWidth)/ viewpointWidth * domEl[0].scrollWidth;
        domEl.scrollLeft(left);
    });
}

function destory($rel) {
    return function() {
        $rel.$scrollbarThumb.remove();
        $rel.$scrollbarTrack.remove();
        $rel.$scrollbar.remove();
        $rel = null;
    };
};