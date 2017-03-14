//简写 querySelector 函数
var $ = function (selector) {
    return document.querySelector(selector);
};

//渲染棋盘
var renderChessBoard = function () {
    var chessboard = $('#chessboard');

    if (chessboard.getContext) {
        var context = chessboard.getContext('2d');
        context.strokeStyle = 'teal';
        //画棋盘区域
        context.strokeRect(30, 30, 500, 500);

        //设置文字属性
        context.font = '20px Arial';// 字体
        context.textAlign = 'center';// 水平对齐方式
        context.textBaseline = 'middle';//垂直对齐方式
        //移动中心点至棋盘左上角
        context.translate(30, 30);
        for (var i = 1; i <= 10; i++) {
            //画横线
            context.moveTo(0, 50 * i);
            context.lineTo(500, 50 * i);
            //画竖线
            context.moveTo(50 * i, 0);
            context.lineTo(50 * i, 500);
            //显示横纵坐标
            context.fillText(i, -20, 25 + (i - 1) * 50);
            context.fillText(i, 25 + (i - 1) * 50, -20);
        }
        //描边
        context.stroke();
    }
};

//方块对象
var block = function () {
    var domObject = $('#block'); //保存方块对象
    var posX =  1;      //方块的 X 坐标
    var posY =  1;      //方块的 Y 坐标
    var direction =  0;    //面朝方向，0~3 分别代表上下左右

    //移动方块的位置，X、Y 为要移动的距离（坐标增量）
    var move = function (X, Y) {
        var newPosX = posX + X;
        var newPosY = posY + Y;
        if (newPosX >= 1 && newPosX <= 10 && newPosY >= 1 && newPosY <= 10) {
            posX = newPosX;
            posY = newPosY;
            domObject.style.left = (newPosX * 50 - 10) + 'px';
            domObject.style.top = (newPosY * 50 - 10) + 'px';
        }
        else {
            alert('已撞南墙请回头,浪子回头金不换!');
        }
    };
    
    var changeDirection = function (newDirection) {
        //修复旋转方向
        var fix = function () {
            domObject.style.transition = 'left 1s, top 1s';     //去除旋转过渡动画
            domObject.style.transform = 'rotate(' + direction * 90 + 'deg)';        //修复旋转角度
            setTimeout(function () {
                domObject.style.transition = 'left 1s, top 1s, transform 1s';       //重新添加旋转过渡动画
            }, 100);
        };

        domObject.style.transform = 'rotate(' + newDirection * 90 + 'deg)';

        //修复旋转角度
        setTimeout(function () {
            if (newDirection < 0) {
                direction = newDirection + 4;
                fix();
            }
            else if (newDirection > 3) {
                direction = newDirection - 4;
                fix();
            }
            else {
                direction = newDirection;
            }
        }, 1000);

    };

    //给方块添加过渡动画
    domObject.style.transition = 'left 1s, top 1s, transform 1s';

    //返回命令对象集合，包含内部属性和方法
    return {
        'GO': function () {
            switch (direction) {
                case 0: move(0, -1); break;
                case 1: move(1, 0); break;
                case 2: move(0, 1); break;
                case 3: move(-1, 0); break;
            }
        },
        'TUN LEF': function () {
            changeDirection(direction - 1);
        },
        'TUN RIG': function () {
            changeDirection(direction + 1);
        },
        'TUN BAC': function () {
            changeDirection(direction + 2);
        },
        'TRA LEF': function () {
            move(-1, 0);
        },
        'TRA TOP': function () {
            move(0, -1);
        },
        'TRA RIG': function () {
            move(1, 0);
        },
        'TRA BOT': function () {
            move(0, 1);
        },
        'MOV LEF': function () {
            changeDirection(3);
            move(-1, 0);
        },
        'MOV TOP': function () {
            changeDirection(0);
            move(0, -1);
        },
        'MOV RIG': function () {
            changeDirection(1);
            move(1, 0);
        },
        'MOV BOT': function () {
            changeDirection(2);
            move(0, 1);
        }
    };
}();

//“执行”命令
var execute = function (command) {
    if (block[command]) {//如果命令存在,执行相应命令
        setTimeout(function () {
            block[command]();
        }, 300);
    }
    else {
        alert('将在外君命有所不受');
    }
};

//初始化
var init = function () {
    //渲染棋盘
    renderChessBoard();

    //给“执行”按钮绑定事件
    $('#execute').onclick = function () {
        execute($('#command').value);
    };

    //给输入框绑定按键事件，按下回车键和小键盘上的回车键时执行
    $('#command').onkeydown = function (event) {
        if (event.keyCode == 13 || event.keyCode == 108) {
             //大键盘和数字键盘的Enter键
            execute(this.value);
        }
    };
};

init();