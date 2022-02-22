/*
 * 格式化时间
 */
export function formatDate(t, str) {
  const obj = {
    yyyy: t.getFullYear(),
    yy: ("" + t.getFullYear()).slice(-2),
    M: t.getMonth() + 1,
    MM: ("0" + (t.getMonth() + 1)).slice(-2),
    d: t.getDate(),
    dd: ("0" + t.getDate()).slice(-2),
    H: t.getHours(),
    HH: ("0" + t.getHours()).slice(-2),
    h: t.getHours() % 12,
    hh: ("0" + (t.getHours() % 12)).slice(-2),
    m: t.getMinutes(),
    mm: ("0" + t.getMinutes()).slice(-2),
    s: t.getSeconds(),
    ss: ("0" + t.getSeconds()).slice(-2),
    w: ["日", "一", "二", "三", "四", "五", "六"][t.getDay()],
  };
  return str.replace(/([a-z]+)/gi, function ($1) {
    return obj[$1];
  });
}
/*
 * 验证邮箱
 */
export function isAvailableEmail(sEmail) {
  var reg = /^([\w+.])+@\w+([.]\w+)+$/;
  return reg.test(sEmail);
}
/*
 * 获取url参
 */
export function getUrlParam(name) {
  let reg = new RegExp("(^|&?)" + name + "=([^&]*)(&|$)", "i");
  let r = window.location.href.substr(1).match(reg);
  if (r != null) {
    return decodeURI(r[2]);
  }
  return undefined;
}
/*
 * 去除连续的字符串
 */
export function uniqString(str) {
  return str.replace(/(\w)\1+/g, "$1");
}
/*
 * 滚动条的滚动距离
 */
export function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset,
    };
  } else {
    return {
      x: document.body.scrollLeft + document.documentElement.scrollLeft,
      y: document.body.scrollTop + document.documentElement.scrollTop,
    };
  }
}
/*
 * 冒泡
 */
export function bubbleSort(arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}
/*
 * 防抖
 */
export function debounce(handle, delay) {
  var timer = null;
  return function () {
    var _self = this;
    clearTimeout(timer);
    timer = setTimeout(function () {
      handle.apply(_self, arguments);
    }, delay);
  };
}
/*
 * 节流
 */
export function throttle(handler, wait) {
  var lastTime = 0;
  return function (e) {
    var nowTime = new Date().getTime();
    if (nowTime - lastTime > wait) {
      handler.apply(this, arguments);
      lastTime = nowTime;
    }
  };
}
/*
 * 常用正则验证
 */
export function checkStr(str, type) {
  // 常用正则验证，注意type大小写
  switch (type) {
    case "phone": // 手机号码
      return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
    case "tel": // 座机
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
    case "card": // 身份证
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
    case "pwd": // 密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
      return /^[a-zA-Z]\w{5,17}$/.test(str);
    case "postal": // 邮政编码
      return /[1-9]\d{5}(?!\d)/.test(str);
    case "QQ": // QQ号
      return /^[1-9][0-9]{4,9}$/.test(str);
    case "email": // 邮箱
      return /^[\w-]+(.[\w-]+)*@[\w-]+(.[\w-]+)+$/.test(str);
    case "money": // 金额(小数点2位)
      return /^\d*(?:.\d{0,2})?$/.test(str);
    case "URL": // 网址
      return /(http|ftp|https):\/\/[\w-_]+(.[\w-_]+)+([\w-.,@?^=%&:/~+#]*[\w-@?^=%&/~+#])?/.test(
        str
      );
    case "IP": // IP
      return /((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))/.test(
        str
      );
    case "date": // 日期时间
      return (
        /^(\d{4})-(\d{2})-(\d{2}) (\d{2})(?::\d{2}|:(\d{2}):(\d{2}))$/.test(
          str
        ) || /^(\d{4})-(\d{2})-(\d{2})$/.test(str)
      );
    case "number": // 数字
      return /^[0-9]$/.test(str);
    case "english": // 英文
      return /^[a-zA-Z]+$/.test(str);
    case "chinese": // 中文
      return /^[\u4E00-\u9FA5]+$/.test(str);
    case "lower": // 小写
      return /^[a-z]+$/.test(str);
    case "upper": // 大写
      return /^[A-Z]+$/.test(str);
    case "HTML": // HTML标记
      return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
    default:
      return true;
  }
}
/*
 * 是否为PC端
 */
export function isPC() {
  let userAgentInfo = navigator.userAgent;
  let Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod",
  ];
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}
/*
 * 去除字符串空格， type:  1-所有空格  2-前后空格  3-前空格 4-后空格
 */
export function trim(str, type) {
  type = type || 1;
  switch (type) {
    case 1:
      return str.replace(/\s+/g, "");
    case 2:
      return str.replace(/(^\s*)|(\s*$)/g, "");
    case 3:
      return str.replace(/(^\s*)/g, "");
    case 4:
      return str.replace(/(\s*$)/g, "");
    default:
      return str;
  }
}
/*
 * base64图片下载功能
 */
export function downloadBase64File(base64, fileName) {
  let base64ToBlob = function (code) {
    let parts = code.split(";base64,");
    let contentType = parts[0].split(":")[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;
    let uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], {
      type: contentType,
    });
  };
  let aLink = document.createElement("a");
  let blob = base64ToBlob(base64); //new Blob([content]);
  let evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", true, true); //initEvent不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.click();
}
