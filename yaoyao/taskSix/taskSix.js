var $ = function (selector) {
    return document.querySelector(selector);
};

/**
 * 使元素相对于页面水平垂直居中,
 * innerWidth,innerHeight,返回窗口的文档显示区的高度和宽度
 * outerWidth,outerHeight,在inner的基础上加上工具条和滚动窗口的宽,高
 */
var setCenter = function (obj) {
    obj.style.left = (window.innerWidth - obj.offsetWidth) / 2 + 'px';
    obj.style.top = (window.innerHeight - obj.offsetHeight) / 2 + 'px';
}

/**
 * 使某个元素可以被鼠标拖动来改变位置
 * @param objectEnable 能发生拖动的元素
 * @param objectMove 被拖动的元素
 */
var setDragMoving = function (objectEnable, objectMove) {
    var isDraging = false;
    var oldPosX, oldPosY, startPosX, startPosY;

    /**
     * 使浮出层保持在屏幕内
     * @param pos {Number} 浮出层的坐标
     * @param maxPos {Number} 浮出层的最大坐标
     * @returns {Number} 修正后的坐标
     */
    var getPosInScreen = function (pos, maxPos) {
        if (pos < 0) {
            return 0;
        }
        else if (pos > maxPos) {
            return maxPos;
        }
        else {
            return pos;
        }
    };

    objectEnable.addEventListener('mousedown', function (event) {
        isDraging = true;
        //保存要移动的对象的当前位置
        oldPosX = parseInt(objectMove.style.left.split('px')[0]);
        oldPosY = parseInt(objectMove.style.top.split('px')[0]);
        //保存鼠标当前的位置
        startPosX = event.clientX;
        startPosY = event.clientY;
        return false;       //防止浏览器选中内容
    });

    window.addEventListener('mouseup', function () {
        isDraging = false;
    });

    window.addEventListener('mousemove', function (event) {
        if (isDraging) {
            //当前坐标 = 开始拖动时浮出层的坐标 + 鼠标移动的距离
            var currentPosX = oldPosX + event.clientX - startPosX;
            var currentPosY = oldPosY + event.clientY - startPosY;

            //最大拖动距离
            var maxPosX = window.innerWidth - objectMove.offsetWidth;
            var maxPosY = window.innerHeight - objectMove.offsetHeight;

            //修正当前坐标，使浮出层保持在屏幕内
            currentPosX = getPosInScreen(currentPosX, maxPosX);
            currentPosY = getPosInScreen(currentPosY, maxPosY);

            objectMove.style.left = currentPosX + 'px';
            objectMove.style.top = currentPosY + 'px';
        }
    });
};

//浮出层对象
var floatUI = function () {
    var divMain = null;
    var divMask = null;
    var divTitle = null;

    var createFloatUI = function (title, message) {
        divMain = document.createElement('div');
        divMain.innerText = message;
        // background, color, borderColor
        setMainStyle('yellowgreen', 'teal', 'greenyellow');
        window.onresize = function () {
            setCenter(divMain);
        };

        divTitle = document.createElement('div');
        divTitle.innerHTML = title;
        setTitleStyle('#3B3B00', '#FFF');
        divMain.appendChild(divTitle);
    };

    var createMask = function () {
        divMask = document.createElement('div');
        setMaskStyle('rgba(0, 0, 0, 0.3)');
    }

    var setStyle = function (obj, style) {
        for (var i = 0, item; item = Object.keys(style)[i++];) {
            obj.style[item] = style[item];
        }
    };

    setMaskStyle = function (background) {
        var style = {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: background
        };
        setStyle(divMask, style);
    };

    setMainStyle = function (background, color, borderColor) {
        var style = {
            position: 'fixed',
            width: '500px',
            height: '300px',
            paddingTop: '50px',
            border: '3px solid ' + borderColor,
            background: background,
            color: color,
            textIndent: '10px',
            overflow: 'hidden',
            zIndex: 1
        };
        setStyle(divMain, style);
    };

    setTitleStyle = function (background, color) {
        var style = {
            position: 'absolute',
            width: '100%',
            top: 0,
            padding: '10px 0',
            background: background,
            color: color,
            textIndent: '10px',
            cursor: 'move'
        };
        setStyle(divTitle, style);
    };

    //返回 display 和 close 方法
    return {
        display: function (title, message) {
            if (divMain) {
                return;
            }
            createMask();
            createFloatUI(title, message);

            var _this = this;
            divMask.onclick = function () {
                _this.close();
            };

            var body = $('body');
            body.appendChild(divMask);
            body.appendChild(divMain);

            setCenter(divMain);
            setDragMoving(divTitle, divMain);
        },
        close: function () {
            divMask.parentNode.removeChild(divMask);
            divMain.parentNode.removeChild(divMain);
            divMask = null;
            divMain = null;
            divTitle = null;
        }
    };
}();

$('#display').onclick = function () {
    floatUI.display('一片浮云遮望眼', '你当我瞎看不见?');
};