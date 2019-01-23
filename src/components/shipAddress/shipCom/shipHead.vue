<template>
  <div id="shipHead">
    <mt-header
      fixed
      :title="title"
    >
      <router-link
        :to="path"
        slot="left"
      >
        <mt-button icon="back"></mt-button>
      </router-link>
      <p
        slot="right"
        :class="{'ship-head-save': title !== '我的收货地址'}"
        @click="title === '我的收货地址' ? gotoEditPage() : saveAddress()"
        v-text="title === '我的收货地址' ? '添加新地址' : '保存'"
      ></p>
    </mt-header>
  </div>
</template>
<script>
import {
  Toast
} from 'mint-ui'
import { mapGetters } from "vuex"
export default {
  name: 'shipHead',
  props: ['path', 'title'],
  computed: {
    ...mapGetters(['userId', 'address'])
  },
  methods: {
    gotoEditPage() {
      this.$store.dispatch('initAddress', {
        addressId: '',
        uuserId: '',
        receiver: '',
        tel: '',
        area: '',
        detailAdd: '',
        tagVal: '',
        isDefault: false
      })
      this.$router.push('/ship/edit')
    },
    saveAddress() {
      let that = this
      let flag = true
      let data = this.address
      if (data.receiver === '') {
        Toast({
          message: '请填写收货人',
          position: 'middle',
          duration: 2000
        })
        return
      }
      if (!/^[1-9][0-9]{10}$/.test(data.tel)) {
        Toast({
          message: '亲，手机号填写有误哦',
          position: 'middle',
          duration: 2000
        })
        return
      }
      if (data.area === '') {
        Toast({
          message: '亲，请填写所在地区',
          position: 'middle',
          duration: 2000
        })
        return
      }
      if (data.detailAdd === '') {
        Toast({
          message: '亲，请填写您的详细地址',
          position: 'middle',
          duration: 2000
        })
        return
      }
      data.addressId !== '' ? flag = false : data.userId = this.userId
      this.axios.post('http://localhost:8081/address/saveAddress', {
        flag,
        data
      }, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        })
        .then(function (res) {
          Toast({
            message: '地址保存成功',
            position: 'middle',
            duration: 2000
          })
          that.$router.push('/ship')
        })
        .catch(function (err) {
          Toast({
            message: '地址保存失败',
            position: 'middle',
            duration: 2000
          })
          console.log(err)
        })
    }
  }
}
</script>
<style>
#shipHead .mint-header {
  color: #000;
  background-color: #efefef;
}
#shipHead .mint-header-button {
  font-size: 0.4rem;
}
#shipHead .mint-header-button .ship-head-save {
  color: #ff2f00 !important;
}
</style>
