//md5.js
const md5Obj = require('md5.js');

/**
 * token 处理对象
 * 时间：2019年1月8日
 */
function token1_request(arr) {
  delete arr["token"];
  let array1 = [];
  for (let i in arr) {
    if (!arr[i] && arr[i] !== 0) continue;
    array1.push(i)
  }
  array1.sort();
  
  let tmpArr = [];
  for (let v of array1){
    tmpArr.push(v + "=" + arr[v]);
  }
  let str = tmpArr.join('&');
  var date = new Date();
  str += "ZhaoGeZhiLian" + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
  str = md5Obj.md5(md5Obj.md5(str));
  arr["token"] = str;
  return arr
};

module.exports = {
  token1_request: token1_request
}