/**
 * 获取数据类型
 * @param {any} value 
 * getType(); // "Undefined"
 *getType(''); // "String"
 *getType(1); // "Number"
 *getType(1n); // "BigInt"
 *getType(Symbol('uid')); // "Symbol"
 *getType(true); //"Boolean"
 *getType([]); //"Array"
 *getType({}); //"Object"
 *getType(null); //"Null"
 *getType(function(){}); //"Function"
 */

const getType = (value:any) => {
    let _toString = Object.prototype.toString;
    return _toString.call(value).slice(8, -1)
}

export { getType }