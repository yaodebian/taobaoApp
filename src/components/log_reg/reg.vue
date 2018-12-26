<template>
    <div>
        <regHead></regHead>
        <regBox></regBox>
    </div>
</template>
<script>
import regHead from './regBlocks/regHead'
import regBox from './regBlocks/regBox'
export default {
  name: 'reg',
  data() {
    return {}
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch('initLogReg')
    })
  },
  components: {
    regHead,
    regBox
  }
}
</script>
<style>
#regBox {
  margin: 2rem 0.4rem 0.8rem 0.4rem;
  text-align: center;
}

.regTip {
  display: flex;
  justify-content: space-between;
  font-size: 0.4rem;
  color: #000;
}

.clause {
  font-size: 0.32rem;
  text-align: left;
}

.clause-pre {
  font-size: 0.4rem;
  color: #aaa;
}
</style>
