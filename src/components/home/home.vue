<template>
  <div>
    <homeHead></homeHead>
    <homeSwipe></homeSwipe>
    <hotItems></hotItems>
    <topline></topline>
  </div>
</template>
<script>
import homeHead from './homeBlocks/homeHead'
import homeSwipe from './homeBlocks/homeSwipe'
import hotItems from './homeBlocks/hotItems'
import topline from './homeBlocks/topline'
export default {
  name: 'index',
  data() {
    return {}
  },
  components: {
    homeHead,
    homeSwipe,
    hotItems,
    topline
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch('initSelectedNav', 'index')
    })
  }
}
</script>
<style>
.home-head {
  display: flex;
  justify-content: space-around;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 1.2rem;
  line-height: 1.2rem;
  background: linear-gradient(to right, #ff9900, #ff2f00);
}

.home-head-item {
  height: 1.2rem;
}

.home-head-icon {
  font-size: 0.8rem !important;
  color: #fff;
}

.search {
  height: 0.8rem;
  width: 6rem;
  display: flex;
  line-height: 0.8rem;
  background-color: #fff;
  margin: 0.2rem 0;
  border-radius: 8%/50%;
}

.search-icon {
  font-size: 0.5rem !important;
  margin-left: 0.1rem;
  color: #ccc;
  flex-shrink: 0;
  display: block;
}

.search-input {
  font-size: 0.4rem;
  border: none;
  width: 100%;
  height: 0.8rem;
  flex-shrink: 1;
  outline: none;
  border-radius: 0 10% 10% 0/0 50% 50% 0;
  display: block;
}

.home-swipe {
  margin-top: 1.2rem;
}

.swipe-body {
  width: 100%;
  height: 3.125rem !important;
}

.swipe-img {
  width: 100%;
  display: block;
}

.hot-items {
  display: flex;
  text-align: center;
  justify-content: space-around;
  flex-wrap: wrap;
}

.hot-column {
  width: 2rem;
  height: 2.2rem;
}

.hot-img {
  width: 1.5rem;
  height: 1.3rem;
  display: block;
  margin: 0 auto;
}

.hot-text {
  font-size: 0.4rem;
}

.top-line {
  display: flex;
  justify-content: space-around;
  height: 1.5rem;
}

.top-line-logo {
  width: 1.2rem;
  height: 1.2rem;
}

.top-line-text {
  font-size: 0.4rem;
  height: 0.6rem;
  line-height: 0.6rem;
  width: 5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.top-line-pic-lay {
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0) 80%
  );
  width: 2.2rem;
  height: 1.2rem;
  position: relative;
}

.top-line-pic {
  height: 1.2rem;
  position: absolute;
  z-index: -1;
}
</style>
