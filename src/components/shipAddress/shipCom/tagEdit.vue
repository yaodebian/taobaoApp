<template>
  <div id="tagEdit">
    <header class="tagedit-head">
      <span class="tagedit-head-txt">选择地址标签</span>
      <i class="iconfont icon-guanbi tagedit-head-icon" @click="hide"></i>
    </header>
    <section>
      <ul>
        <li @click="selectIndex = 0; tagVal = name" class="tagedit-customer-set"><i class="iconfont icon-geren tagedit-customer-icon"></i>
          <mt-field placeholder="默认显示姓名，可输入自定义标签" v-model="name"><i v-if="selectIndex === 0" class="iconfont icon-dui"></i></mt-field>
        </li>
        <li @click="name !== '' && (name = ''); selectIndex = 1; tagVal = '家'" class="tagedit-stan-item"><span><i class="iconfont icon-fl-jia tagedit-stan-icon tagedit-home-icon"></i>家</span><i v-if="selectIndex === 1" class="iconfont icon-dui"></i></li>
        <li @click="name !== '' && (name = ''); selectIndex = 2; tagVal = '公司'" class="tagedit-stan-item"><span><i class="iconfont icon-gongsi tagedit-stan-icon tagedit-company-icon"></i>公司</span><i v-if="selectIndex === 2" class="iconfont icon-dui"></i></li>
        <li @click="name !== '' && (name = ''); selectIndex = 3; tagVal = '学校'" class="tagedit-stan-item"><span><i class="iconfont icon-xueshimao tagedit-stan-icon tagedit-campus-icon"></i>学校</span><i v-if="selectIndex === 3" class="iconfont icon-dui"></i></li>
      </ul>
    </section>
    <footer class="tagedit-footer">
      <mt-button class="tagedit-footer-btn" size="normal" @click="getVal">完成</mt-button>
    </footer>
    <div class="layer"></div>
  </div>
</template>
<script>
import {
  Toast
} from 'mint-ui'
export default {
  name: 'tagEdit',
  data () {
    return {
      name: '',
      selectIndex: 0,
      tagVal: ''
    }
  },
  methods: {
    hide () {
      this.$parent.closeModal()
    },
    getVal () {
      if (this.selectIndex === 0 && /^家|公司|学校$/.test(this.name)) {
        Toast({
          message: '自定义的标签不能为"家"、"公司"、"学校"',
          position: 'middle',
          duration: 2000
        })
        return
      }
      this.$store.dispatch('editTagVal', this.tagVal)
      this.$parent.closeModal()
    }
  }
}
</script>
<style>
#tagEdit {
  width: 100%;
  height: 9rem;
  border-radius: 0.2rem 0.2rem 0 0;
  background-color: #fff;
  position: relative;
}
.tagedit-head {
  padding: 0.2rem;
  margin-bottom: 0.2rem;
  display: flex;
  align-items: center;
}
.tagedit-head-txt {
  flex-grow: 1;
  text-align: center;
}
.tagedit-head-icon {
  font-size: 0.3rem !important;
}
.tagedit-customer-set {
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
}
.tagedit-customer-set .mint-cell-wrapper {
  padding: 0 !important;
}
.tagedit-customer-set .mint-cell {
  flex-grow: 1;
}
.tagedit-customer-icon {
  font-size: 0.5rem !important;
  color: #666;
  padding: 0.1rem;
  margin-right: 0.1rem;
  margin-bottom: 0.32rem;
}
.tagedit-stan-item {
  font-size: 0.4rem !important;
  padding: 0.3rem 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tagedit-home-icon {
  background: linear-gradient(to right, #ff9900, #ff2f00);
}
.tagedit-company-icon {
  background: linear-gradient(to right, yellow, #ff9900);
}
.tagedit-campus-icon {
  background: linear-gradient(to right, #00ffff, #00bbbb);
}
.tagedit-stan-icon {
  font-size: 0.5rem !important;
  color: #fff;
  padding: 0.1rem;
  margin-right: 0.1rem;
  border-radius: 50%;
}
.tagedit-footer {
  width: 100%;
  box-sizing: border-box;
  padding: 0.2rem;
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
}
.tagedit-footer .mint-button {
  font-size: 0.4rem;
  padding: 0.2rem 0;
  height: auto;
  color: #fff;
  flex-grow: 1;
  background: linear-gradient(to right, #ff9900, #ff2f00);
  border-radius: 0.6rem/50%;
}
</style>
