function getGoods(searchVal, el) {
  let that = this
  if (el !== undefined) that = el
    that.axios.post("http://localhost:8081/goods/getGoods",{
      searchVal
    },{
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      }
    })
      .then(function (res) {
        that.$store.dispatch('initGoods', res.data)
        that.$router.push("/goods")
        sessionStorage.setItem('searchValue', searchVal)
      })
      .catch(function (err) {
        console.log(err)
      })
}

export default {
  getGoods
}