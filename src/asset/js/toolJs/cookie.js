function getCookie(attr) {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(attr + "=")
    if (start !== -1) {
      start = start + attr.length + 1
      let end = document.cookie.indexOf(";", start)
      if (end === -1) {
        end = document.cookie.length
      }
      return unescape(document.cookie.substring(start, end))
    }
  }
  return false
}

function delCookie(name) {
  console.log(document.cookie)
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = this.getCookie(name)
  console.log(cval)
  if (cval != null) {
    document.cookie = name + "=" + cval + ";path=/;expires=" + exp.toGMTString()
  }
  console.log(document.cookie)  
}

export default {
  getCookie,
  delCookie
}