<template>
  <!-- 弹框组件 -->
  <div
    :popupVisible="popupVisible"
    @popupVisible="popupVisbleChange"
    v-if="popupVisible"
  >
    <div
      class="modal"
      v-if="showModal"
      @click="closeModal"
    ></div>
    <div
      id="popup"
      :class="{
        'top': position === 'top',
        'middle': position === 'middle',
        'right': position === 'right',
        'bottom': position === 'bottom',
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'popup',
  model: {
    prop: 'popupVisible',
    event: 'popupVisible'
  },
  props: {
    position: {
      type: String,
      default() {
        return 'middle'
      },
      validator(value) {
        return ['top', 'middle', 'right', 'bottom'].indexOf(value) !== -1
      }
    },
    popupVisible: Boolean,
    modal: Boolean
  },
  computed: {
    showModal() {
      return this.modal
    }
  },
  methods: {
    popupVisbleChange() {
      this.$emit('popupVisbleChange', this.popupVisible)
    },
    closeModal() {
      this.$emit('popupVisible')
    }
  }
}
</script>
<style>
.modal {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
}
#popup {
  position: fixed;
  width: 100%;
}
.top {
  left: 0;
  top: 0;
}
.middle {
  height: 100%;
  background: transparent;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.right {
  height: 100%;
  background: #fff;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom {
  left: 0;
  bottom: 0;
}
</style>
