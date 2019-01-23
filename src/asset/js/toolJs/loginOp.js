import Vue from 'vue'

// login公用方法
function loginOp(resolve, reject, vm, path, index) {
  vm.axios
    .post(
      'http://localhost:8081/user/login', {}, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }
    )
    .then(function (res) {
      vm.$store.dispatch('initUser', res.data)
      vm.$store.dispatch('login')
      // 排除个人空间的页面
      if (path !== undefined) {
        // 订单模块的页面
        if (index !== undefined) {
          Vue.set(vm.$parent.paths, index, path)
          // 订单模块时的resolve
          resolve()
          return
        }
        vm.$parent.lastPath = path
        // 收货地址页面的resolve
        resolve()
      }
      // 个人空间页面时的resolve
      resolve()
    })
    .catch(function (err) {
      reject(err)
      console.log(err)
    })
}

export default loginOp