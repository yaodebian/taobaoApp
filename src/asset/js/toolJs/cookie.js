function getCookie(attr) {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(attr + "=");
    if (start != -1) {
      start = start + attr.length + 1;
      let end = document.cookie.indexOf(";", start);
      if (end == -1) {
        end = document.cookie.length;
      }
      return unescape(document.cookie.substring(start, end));
    }
  }
  return false;
}

function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = this.getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

export default {
  getCookie,
  delCookie
}