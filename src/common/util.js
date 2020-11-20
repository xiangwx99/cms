let obj = {};

/**
 * putLocalStorage 把数据放到本地存储
 * @param {*} key
 * @param {*} value
 */
obj.putLocalStorage = function (key, value) {
    let a = typeof value === "string" ? value :  JSON.stringify(value)
    window.localStorage.setItem(key, a);
};

/**
 * getLocalStorage 获取本地存储数据
 * @param {*} key
 */
obj.getLocalStorage = function (key) {
    var obj = window.localStorage.getItem(key);
    return obj;
};

/**
 * removeLocalStorage 清除本地数据
 * @param {*} key
 */

obj.removeLocalStorage = function (key) {
    if (key) {
        window.localStorage.removeItem(key);
    } else {
        console.log(arguments)
        for (var i in arguments) {
            window.localStorage.removeItem(arguments[i]);
        }
    }
};


export default obj;

export function timestampToTime(timestamp) {
    var date = new Date(timestamp);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + '';
    var s = date.getSeconds();
    return Y + M + D + h + m;
}