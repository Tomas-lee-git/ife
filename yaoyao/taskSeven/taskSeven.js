//z
var data = [
    {
        '代号': '金刚',
        '攻击': 60,
        '防御': 90,
        '智力': 70,
        '综合': 220
    },
    {
        '代号': '银魂',
        '攻击': 70,
        '防御': 60,
        '智力': 10,
        '综合': 140
    },
    {
        '代号': '铜人',
        '攻击': 80,
        '防御': 120,
        '智力': 90,
        '综合': 290
    },
     {
        '代号': '铁柱',
        '攻击': 50,
        '防御': 40,
        '智力': 60,
        '综合': 150
    }
];

/**
 * 查找数组中是否存在某项
 * @param content 要查找的项
 * @returns {*} 返回找到的项，未找到为undifined
 */
Array.prototype.find = function (content) {
    for (var i = 0, item; item = this[i++];) {
        if (item === content) {
            return item;
        }
    }
};

/**
 * 复制 NodeList 为数组
 * @param nodeList {NodeList} 要复制的 NodeList
 * @returns {Array} 该 NodeList 的副本数组
 */
var cloneNodeList = function (nodeList) {
    var result = [];
    for (var i = 0, item; item = nodeList[i++];) {
        result.push(item.cloneNode(true));
    }
    return result;
};

/**
 * 排序表格构造函数
 * @param data {Array} 表格内容数据
 * @param sortableRank {Array} 可排序的列
 * @returns {{display: display}} 外部接口
 * @constructor
 */
var Table = function (data, sortableRank) {
    var table;       //存放表格的 dom 对象
    var sortInfo = {
        sequence: 1,       //排序方向，正数为从大到小排序，负数为从小到大排序，0为不排序
        index: NaN      //记录点击的排序按钮编号
    };
    //默认排序规则
    var ruleOfSort = function (a, b) {
        return b - a;
    };

    /**
     * 对表格某列进行排序并重新渲染
     * @param index {Number} 要排序的列数索引（从0开始）
     */
    var sort = function (index) {
        var rows = cloneNodeList(table.getElementsByTagName('tr'));
        rows.shift();       //移除表头到另一个变量保存

        rows.sort(function (rowA, rowB) {
            var tdA = rowA.getElementsByTagName('td')[index].innerHTML;
            var tdB = rowB.getElementsByTagName('td')[index].innerHTML;
            return sortInfo.sequence * (tdB - tdA);
        });

        table.innerHTML = '';       //重新渲染表格
        table.appendChild(createHeader());
        for (var i = 0, item; item = rows[i++];) {
            table.appendChild(item);
        }
    };

    /**
     * 给某个表头添加排序交互
     * @param th {Element} 要排序的表头
     * @param index {Number} 该表头的序号索引（从0开始）
     */
    var setSort = function (th, index) {
        //排序的图标
        var divIconSort = document.createElement('div');
        divIconSort.className = 'icon-sort';
        //上部三角形
        var divTriangleUp = document.createElement('div');
        divTriangleUp.className = 'triangle-up';
        //下部三角形
        var divTriangleDown = document.createElement('div');
        divTriangleDown.className = 'triangle-down';

        divIconSort.appendChild(divTriangleUp);
        divIconSort.appendChild(divTriangleDown);
        th.appendChild(divIconSort);
        th.className = 'sort';
        //给要排序的表头添加点击排序功能
        th.onclick = function () {
            if (index === sortInfo.index) {     //如果重复点击某项，调转排序顺序
                sortInfo.sequence *= -1;
            }
            else {
                sortInfo.index = index;     //记录点击的列索引
                sortInfo.sequence = 1;      //重置排序顺序
            }
            sort(index);
        };
    };

    /**
     * 创建表头
     * @returns {Element} 一行表头
     */
    var createHeader = function () {
        var tr = document.createElement('tr');
        var thData = Object.keys(data[0]);
        // Object.keys(),以数组形式返回,传入对象,返回属性值,出入数组和字符串,返回索引值

        for (var i = 0, item; item = thData[i++];) {
            var th = document.createElement('th');
            th.innerHTML = item;

            if (sortableRank.find(item)) {      //如果该列要添加排序功能则添加
                setSort(th, i - 1);
            }

            tr.appendChild(th);
        }
        return tr;
    };

    /**
     * 创建一行表格
     * @param currentData {Object} 该行表格的数据
     * @returns {Element} 一行表格内容
     */
    var createRow = function (currentData) {
        var tr = document.createElement('tr');
        var tdData = Object.keys(currentData);      //获取该行数据所有属性为数组

        for (var i = 0, item; item = tdData[i++];) {
            var td = document.createElement('td');
            td.innerHTML = currentData[item];
            tr.appendChild(td);
        }
        return tr;
    };

    return {
        //显示表格
        display: function () {
            table = document.createElement('table');
            table.appendChild(createHeader(data));
            for (var i = 0, item; item = data[i++];) {
                table.appendChild(createRow(item));
            }
            document.body.appendChild(table);
        },
        //排序规则函数
        ruleOfSort: ruleOfSort
    }
};

var table = new Table(data, ['攻击', '防御', '智力', '综合']);
table.display();