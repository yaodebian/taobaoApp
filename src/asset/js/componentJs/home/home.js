function getGoods() {
  let that = this;
  if (this.searchVal == '海贼王') {
    this.axios.get("/getGoods")
      .then(function (res) {
        let goodIndex = [];
        let itemArr = [];
        for (let item of res.data.goodsIndex) {
          itemArr.push(item.index);
        }
        let arr = itemArr.sort(function (a, b) {
          return a - b;
        })
        for (let i = 0; i < arr.length; i++) {
          if (goodIndex.length == 0 || goodIndex[goodIndex.length - 1] != arr[i]) {
            goodIndex.push(arr[i]);
          }
        }
        console.log(goodIndex);
        that.$store.dispatch('initGoods', goodIndex);
        that.$router.push("/goods");
      })
      .catch(function (err) {
        console.log(err);
      })
  }
}

export default {
  getGoods
}