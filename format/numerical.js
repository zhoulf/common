/**
 *
 * [格式化金额数字]
 * moneyNum:格式化前的金额数字或金额数字字符串
 * ruturn:格式化后的金额数字
 *
 * 规则：
 * 1.金额数字小数后小于两位，补零到小数位两位
 * 2.金额数字小数后两位，不处理
 * 3.金额数字小数大于两位，四舍五入至小数位两位
 *
 * 注意：
 * 1.这里利用了JS的类型转换特性，永远不会报错
 * 2.isNaN==true默认给值0.00
 */
formatMoneyNumber : function(moneyNum) {
    var result = isNaN((1 * moneyNum).toFixed(2)) ? (new Number(0).toFixed(2)) : (1 * moneyNum).toFixed(2);
    return /\./.test(result) ? result.replace(/(\d{1,3})(?=(\d{3})+\.)/g, "$1,") : result.replace(/(\d{1,3})(?=(\d{3})+\b)/g, "$1,");
}

/**
 *
 * [格式化利率数字]
 * interestRate:格式化前的利率数字或利率数字字符串
 * ruturn:格式化后的利率数字
 *
 * 规则：
 * 1.去除利率数字小数后的无用零
 * 2.小数后位数小于等于4位，不处理
 * 3.小数后位数大于4位，四舍五入至小数位4位
 *
 * 注意：
 * 1.这里利用了JS的类型转换特性，永远不会报错
 * 2.isNaN==true默认给值1
 */
formatInterestRate : function(interestRate) {
    interestRate = isNaN((1 * interestRate).toFixed(4)) ? (new Number(1).toFixed(4)) : (1 * interestRate).toFixed(4);
    return 1 * (('' + interestRate).replace(/0+$/, ""));
}