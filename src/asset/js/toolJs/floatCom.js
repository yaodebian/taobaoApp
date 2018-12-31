// 浮点加法
function op (arg1, arg2, flag) {
  if (typeof arg1 !== 'number' || typeof arg2 !== 'number') throw TypeError('the type of arg1 or arg2 is error')
  let l1, l2, m
  // 以下之所以通过try...catch进行相应的捕获为的是防止arg为整型的情况
  try {
    l1 = arg1.toString().split('.')[1].length
  } catch (e) {
    l1 = 0
  }
  try {
    l2 = arg1.toString().split('.')[1].length
  } catch (e) {
    l2 = 0
  }
  m = Math.pow(10, Math.max(l1, l2))
  // 浮点加法
  if (flag) return (arg1 * m + arg2 * m)/m
  // 浮点减法
  return (arg1 * m - arg2 * m)/m
}

export default op