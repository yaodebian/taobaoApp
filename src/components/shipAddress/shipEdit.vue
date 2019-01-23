<template>
  <div id="shipEdit">
    <section>
      <ul class="ship-edit-addinfo">
        <li>
          <mt-field
            placeholder="收货人"
            v-model="address.receiver"
          ><i class="iconfont icon-tongxunlu ship-edit-rev-icon"></i></mt-field>
        </li>
        <li>
          <mt-field
            placeholder="手机号码"
            type="tel"
            v-model="address.tel"
          >+86<i class="iconfont icon-icon_on_the_right ship-edit-tag-icon"></i></mt-field>
        </li>
        <li>
          <mt-field
            placeholder="所在地区"
            v-model="address.area"
          ><i
              class="iconfont icon-icon_on_the_right ship-edit-tag-icon"
              @click="showAreaSelect"
            ></i></mt-field>
        </li>
        <li><textarea
            class="ship-edit-detailAdd"
            placeholder="详细地址:如道路、门牌号、小区、楼栋号、单元室等"
            id=""
            cols="30"
            rows="4"
            v-model="address.detailAdd"
          ></textarea></li>
      </ul>
      <ul class="ship-edit-setting">
        <li>
          <mt-cell title="地址标签"><span v-if="address.tagVal.name === ''">请选择</span>
            <p
              class="ship-address-logo"
              v-if="address.tagVal.name !== '' && address.tagVal.index === 0"
              v-text="address.tagVal.name"
            ></p>
            <i
              v-if="address.tagVal === '家'"
              class="iconfont icon-fl-jia tagedit-stan-icon tagedit-home-icon"
            ></i>
            <i
              v-if="address.tagVal === '公司'"
              class="iconfont icon-gongsi tagedit-stan-icon tagedit-company-icon"
            ></i>
            <i
              v-if="address.tagVal === '学校'"
              class="iconfont icon-xueshimao tagedit-stan-icon tagedit-campus-icon"
            ></i>
            <i
              @click="popupTagMenu"
              class="iconfont icon-icon_on_the_right ship-edit-addtag-icon"
            ></i>
          </mt-cell>
        </li>
        <li class="ship-edit-default-btn">设为默认地址<mt-switch v-model="address.isDefault"></mt-switch>
        </li>
      </ul>
      <p
        class="ship-edit-del"
        v-if="address.address !== ''"
        @click="delAddress"
      >删除收货地址</p>
    </section>
    <footer class="ship-edit-footer">
      <popup
        v-model="popupVisible"
        position="bottom"
        :modal="true"
        @popupVisbleChange="popupVisbleChange"
      >
        <tagEdit></tagEdit>
      </popup>
      <areaSelect
        :showChose="areaBox"
        ref="areaSelect"
      ></areaSelect>
    </footer>
  </div>
</template>
<script>
import {
  Toast
} from 'mint-ui'
import popup from '../commonCom/popup'
import cookie from '../../asset/js/toolJs/cookie'
import loginOp from '../../asset/js/toolJs/loginOp'
import tagEdit from './shipCom/tagEdit'
import areaSelect from '../commonCom/areaSelect'
import { mapGetters } from "vuex"
export default {
  name: 'shipEdit',
  data() {
    return {
      status: false,
      popupVisible: false,
      areaBox: false
    }
  },
  beforeRouteEnter(to, from, next) {
    function fn(vm) {
      vm.$parent.lastPath = '/ship'
      vm.$parent.status = vm.status
    }
    next(vm => {
      if (!vm.loginSta) {
        if (!cookie.getCookie('connect.sid')) {
          vm.$router.push('/login')
          return
        }
        new Promise((resolve, reject) => {
          loginOp(vm, '/')
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
    ...mapGetters(['address', 'loginSta'])
  },
  methods: {
    popupTagMenu() {
      this.popupVisible = true
    },
    popupVisbleChange(newVal) {
      this.popupVisible = newVal
    },
    showAreaSelect() {
      this.areaBox = true
    },
    delAddress() {
      let that = this
      this.axios.post('http://localhost:8081/address/delAddress', {
        addressId: that.address.addressId,
        userId: that.address.userId
      }, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        })
        .then(function (res) {
          Toast({
            message: '地址删除成功',
            position: 'middle',
            duration: 2000
          })
          that.$router.push('/ship')
        })
        .catch(function (err) {
          console.log(err)
          Toast({
            message: '地址删除失败，请稍后重试',
            position: 'middle',
            duration: 2000
          })
        })
    }
  },
  components: {
    popup,
    tagEdit,
    areaSelect
  }
}
</script>
<style>
#shipEdit {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: #efefef;
}
.ship-edit-addinfo {
  margin-top: 1.2rem;
  background-color: #fff;
}
.ship-edit-addinfo .mint-field-core {
  background-color: #fff;
}
.ship-edit-detailAdd {
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.4rem;
  color: #666;
  padding: 0 0.25rem;
  border: 0;
  outline: 0;
}
.ship-edit-rev-icon {
  font-size: 0.5rem !important;
}
.ship-edit-setting {
  margin: 0.4rem 0;
  background-color: #fff;
}
.ship-edit-tag-icon {
  font-size: 0.4rem !important;
  color: #888;
}
.ship-edit-addtag-icon {
  font-size: 0.4rem !important;
  display: block;
  padding-top: 0.05rem;
}
.ship-edit-default-btn {
  padding: 0 0.2rem;
  padding-bottom: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ship-edit-del {
  padding: 0.2rem;
  color: #ff2f00;
  background-color: #fff;
}
.ship-edit-footer .mint-popup {
  width: 100%;
  left: 0;
  bottom: 0;
  transform: none;
}
.shipedit-tag-home {
  background: linear-gradient(to right, #ff9900, #ff2f00);
}
.shipedit-tag-company {
  background: linear-gradient(to right, yellow, #ff9900);
}
.shipedit-tag-campus {
  background: linear-gradient(to right, #00ffff, #00bbbb);
}
</style>
