/* Scrollbar */        
const THUMB_MIN_SIZE = 30;
const BAR_WIDTH = 14;
const ScrollBar = function() {};

ScrollBar.createYBar = function(domEl, container) {
    var _bar = {};
    _bar.$rel = createLayer({ axis: 'y'});
    container.append(_bar.$rel.$scrollbar);

    _bar.viewpointHeight = domEl.height();
    _bar.contentHeight = domEl[0].scrollHeight;
    _bar.thumbHeight = calcThumbSize(_bar.viewpointHeight, _bar.contentHeight);
    
    _bar.$rel.$scrollbarThumb.height(_bar.thumbHeight);
    initYAxisEvent(_bar.$rel, domEl, _bar);

    return {
        update: function() {
            _bar.viewpointHeight = domEl.height();
            _bar.thumbHeight = calcThumbSize(_bar.viewpointHeight, _bar.contentHeight);
            _bar.$rel.$scrollbarThumb.height(_bar.thumbHeight);
        },
        destory: destory(_bar)
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


function initYAxisEvent($rel, domEl, _bar) {
    var isDragging = false;
    domEl.on('scroll.ybar', function(evt) {
        if (!isDragging) {
            // 滑块相对顶部距离/ (一屏高度 - 滑块高度) = 顶部距离/ (实际内容高度 - 一屏高度)
            var thumbOffsetTop = this.scrollTop/ (_bar.contentHeight - _bar.viewpointHeight) * (_bar.viewpointHeight - _bar.thumbHeight);
            $rel.$scrollbarThumb.css('top', thumbOffsetTop);
        }
    });
    
    $rel.$scrollbarThumb
        .on('mousedown', function(evt) {
            var DOCScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            var offset = $rel.$scrollbarTrack.offset();
            var _y = evt.offsetY;

            var done = _.debounce((t) => domEl.scrollTop(t), 50);

            $(document).on('mousemove.scrollbar', function(evt) {
                isDragging = true;

                var y = evt.pageY - offset.top;

                console.log(evt.pageY, evt.pageY - offset.top);
                
                // var scrollBarOffsetTop = (evt.pageY + DOCScrollTop - _bar.thumbHeight)/ _bar.viewpointHeight * _bar.contentHeight;
                var scrollBarOffsetTop = (evt.pageY - offset.top)/ _bar.viewpointHeight * _bar.contentHeight;
                // var scrollBarOffsetTop = evt.pageY - offset.top;
                done(scrollBarOffsetTop);
                
                var thumbOffsetTop = (domEl[0].scrollTop)/ (_bar.contentHeight - _bar.viewpointHeight) * (_bar.viewpointHeight - _bar.thumbHeight);
                // $rel.$scrollbarThumb.css('top', thumbOffsetTop);
                y = y < 0 ? 0 : y;
                y = y > _bar.viewpointHeight - _bar.thumbHeight ? _bar.viewpointHeight - _bar.thumbHeight : y;
                $rel.$scrollbarThumb.css('top', y);

            }).on('mouseup.scrollbar', function(evt) {
                isDragging = false;
                $(document).off('mousemove.scrollbar mouseup.scrollbar');
            });
    
            evt.stopPropagation();
            evt.preventDefault();
            return false;
        });
    
    $rel.$scrollbarTrack.on('mousedown', function(evt) {
        var top = (evt.pageY - $(this).offset().top)/ _bar.viewpointHeight * _bar.contentHeight;
        domEl.scrollTop(top);
    });
}


ScrollBar.createXBar = function(domEl, container) {
    var _bar = {};
    
    _bar.$rel = createLayer({ axis: 'x'});
    container.append(_bar.$rel.$scrollbar);

    _bar.viewpointWidth = domEl.width();
    _bar.viewpointHeight = domEl.height();
    _bar.contentWidth = domEl[0].scrollWidth;
    _bar.thumbWidth = calcThumbSize(_bar.viewpointWidth, domEl[0].scrollWidth);
    
    _bar.$rel.$scrollbarThumb.width(_bar.thumbWidth);

    initXAxisEvent(_bar.$rel, domEl, _bar);

    return {
        update: function() {
            _bar.viewpointWidth = domEl.width();
            _bar.thumbWidth = calcThumbSize(_bar.viewpointWidth, domEl[0].scrollWidth);
            _bar.$rel.$scrollbarThumb.width(_bar.thumbWidth);
        },
        destory: destory(_bar)
    };
}

function initXAxisEvent($rel, domEl, _bar) {
    var isDragging = false;
    domEl.on('scroll.xbar', function(evt) {
        var scrollLeft = this.scrollLeft;
        var thumbWidth = calcThumbSize(_bar.viewpointWidth, domEl[0].scrollWidth); // TODO
        
        if (!isDragging) {
            // 滑块相对顶部距离/ (一屏宽度 - 滑块宽度) = 距离左边值/ (实际内容宽度 - 一屏宽度)
            var thumbOffsetLeft = scrollLeft/ (domEl[0].scrollWidth - _bar.viewpointWidth) * (_bar.viewpointWidth - thumbWidth);
            $rel.$scrollbarThumb.css('left', thumbOffsetLeft);
        }
    });

    $rel.$scrollbarThumb
        .on('mousedown', function(evt) {
            let contentWidth = domEl[0].scrollWidth;
            var thumbWidth = calcThumbSize(_bar.viewpointWidth, domEl[0].scrollWidth);
            var DOCScrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
            var offsetX = evt.offsetX;
            var start = evt.clientX, end;
    
            $(document).on('mousemove.scrollbar', function(evt) {
                isDragging = true;
                end = evt.clientX - start;

                console.log(start, end);
                var scrollBarOffsetLeft = (domEl[0].scrollLeft + end)/ _bar.viewpointWidth * contentWidth;
                domEl.scrollLeft(scrollBarOffsetLeft);

                var thumbOffsetLeft = domEl[0].scrollLeft/ (domEl[0].scrollWidth - _bar.viewpointWidth) * (_bar.viewpointWidth - thumbWidth);
                $rel.$scrollbarThumb.css('left', thumbOffsetLeft);
    
            }).on('mouseup.scrollbar', function(evt) {
                isDragging = false;
                $(document).off('mousemove.scrollbar mouseup.scrollbar');
            });
    
            evt.stopPropagation();
            evt.preventDefault();
            return false;
        });
    
    $rel.$scrollbarTrack.on('mousedown', function(evt) {
        var thumbWidth = calcThumbSize(_bar.viewpointWidth, domEl[0].scrollWidth);
        var left = (evt.clientX - thumbWidth)/ _bar.viewpointWidth * domEl[0].scrollWidth;
        domEl.scrollLeft(left);
    });
}

function destory(_bar) {
    return function() {
        _bar.$rel.$scrollbarThumb.remove();
        _bar.$rel.$scrollbarTrack.remove();
        _bar.$rel.$scrollbar.remove();
        _bar.$rel = null;
        _bar = {};
    };
};