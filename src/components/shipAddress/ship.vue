<template>
  <div>
    <header>
      <shipHead
        :path="lastPath"
        :title="shipTitle"
      ></shipHead>
    </header>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>
<script>
import shipHead from './shipCom/shipHead'
export default {
  name: 'ship',
  data() {
    return {
      lastPath: '',
    }
  },
  computed: {
    shipTitle() {
      let path = this.$route.path
      let title = ''
      !!~path.search(/^\/ship\/?$/) ? title = '我的收货地址' : this.editStatus ?  title = '编辑收货地址' : title = '添加收货地址'
      return title
    }
  },
  components: {
    shipHead
  }
}
</script>
<style>
</style>
