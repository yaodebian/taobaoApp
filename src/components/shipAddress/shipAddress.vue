<template>
  <div id="shipAddress">
    <div
      class="ship-none-address"
      v-if="addressList.length === 0"
    >
      <p class="ship-none-tip">暂无任何收货地址，快去添加一条吧</p>
    </div>
    <ul class="ship-address-list">
      <li
        v-for="(item, index) in addressList"
        :key="index"
        @click="/^\/order\/check\/?$/.test(lastPath) ? selectAddress(item) : ''"
      >
        <div class="ship-address-item">
          <p
            class="ship-address-logo"
            v-text="item.tagVal === '' ? item.receiver : item.tagVal"
            v-if="!/^家|公司|学校$/.test(item.tagVal)"
          ></p>
          <i
            v-if="item.tagVal === '家'"
            class="iconfont icon-fl-jia tagedit-home-icon ship-address-logo ship-address-logo-icon"
          ></i>
          <i
            v-if="item.tagVal === '公司'"
            class="iconfont icon-gongsi tagedit-company-icon ship-address-logo ship-address-logo-icon"
          ></i>
          <i
            v-if="item.tagVal === '学校'"
            class="iconfont icon-xueshimao tagedit-campus-icon ship-address-logo ship-address-logo-icon"
          ></i>
          <div>
            <p><span
                class="ship-address-rev"
                v-text="item.receiver"
              >李棋</span><span
                class="ship-address-phone"
                v-text="item.tel"
              >18879706937</span></p>
            <p class="ship-address-txt"><span
                class="ship-address-tag"
                v-if="item.isDefault"
              >默认</span><span
                class="ship-address-tag ship-address-stantag"
                v-if="!item.isDefault && item.tagVal !== ''"
                v-text="item.tagVal"
              ></span><span v-text="item.area"></span></p>
          </div>
          <p
            class="ship-address-editbtn"
            @click="editAddress(item)"
          >编辑</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {
  Toast
} from 'mint-ui'
import cookie from '../../asset/js/toolJs/cookie'
import loginOp from '../../asset/js/toolJs/loginOp'
import { mapGetters } from "vuex"
export default {
  name: 'shipAddress',
  data() {
    return {
      lastPath: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    function fn(vm) {
      vm.lastPath = from.path
      vm.$parent.lastPath = '/user/setting'
      let userId = vm.userId
      vm.axios.get(`http://localhost:8081/address/getAddressList?userId=${userId}`)
        .then(function (res) {
          vm.$store.dispatch('initAddressList', res.data)
        })
        .catch(function (err) {
          console.log(err)
          Toast({
            message: '获取地址列表失败，请稍后重试',
            position: 'middle',
            duration: 2000
          })
        })
    }
    next(vm => {
      if (!vm.loginSta) {
        if (!cookie.getCookie('connect.sid')) {
          vm.$router.push('/login')
          return
        }
        new Promise((resolve, reject) => {
          loginOp(resolve, reject, vm, '/')
        })
        .then((data) => {
          fn(vm)
        })
        return
      }
      fn(vm)
    })
  },
  computed: {
    ...mapGetters(['addressList', 'userId', 'loginSta'])
  },
  methods: {
    editAddress(item) {
      this.$store.dispatch('initAddress', item)
      this.$router.push('/ship/edit')
    },
    selectAddress(item) {
      this.$store.dispatch('initAddress', item)
      this.$store.dispatch('initIsOrder', true)
      this.$router.push('/order/check')
    }
  }
}
</script>
<style>
#shipAddress {
  width: 100%;
  height: 100%;
  background-color: #efefef;
  position: fixed;
  top: 0;
  left: 0;
}
.ship-none-address {
  width: 100%;
  height: 100%;
  font-size: 0.5rem;
  background-color: #ccc;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ship-none-tip {
  width: 5.8rem;
  height: 5.8rem;
  text-align: center;
  padding: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #ddd;
}
.ship-address-list {
  margin-top: 1.2rem;
}
.ship-address-item {
  font-size: 0.38rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 0.4rem;
  background: #fff;
}
.ship-address-logo {
  width: 1rem;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0.1rem;
  font-size: 0.38rem;
  border-radius: 50%;
  color: #fff;
  background: linear-gradient(to right, #ff9900, #ff2f00);
}
.ship-address-logo-icon {
  font-size: 0.6rem !important;
}
.ship-address-rev {
  font-size: 0.4rem;
}
.ship-address-txt {
  width: 7rem;
  margin-top: 0.1rem;
}
.ship-address-phone {
  color: #666;
  margin-left: 0.2rem;
  font-size: 0.38rem;
}
.ship-address-tag {
  margin-right: 0.1rem;
  padding: 0.05rem 0.2rem;
  color: #ff2f00;
  border-radius: 0.1rem;
  background: #ffd4ca;
}
.ship-address-stantag {
  background-color: #f0f0f0;
  color: #444;
}
.ship-address-editbtn {
  font-size: 0.35rem;
  color: #666;
  border-left: 0.04rem solid #999;
  padding-left: 0.1rem;
}
</style>
