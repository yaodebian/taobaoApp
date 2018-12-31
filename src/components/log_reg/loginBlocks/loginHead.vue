<template>
  <div class="header">
    <mt-header
      title=""
      class="headBar"
      fixed
    >
      <router-link
        to="/"
        slot="left"
      >
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
  </div>
</template>
<script>
export default {
  name: 'loginHead',
  data() {
    return {}
  }
}
</script>