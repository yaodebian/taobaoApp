function scrollHeadToggle() {
  let that = this;
  let scrollLen = $(window).scrollTop();

  let remVal = parseInt($("html").css("font-Size")) * 0.4;
  if (scrollLen < remVal) {
    $(".space-headBar").css("opacity", scrollLen / remVal);
    $(".person-box").css("opacity", 1 - scrollLen / remVal);
  } else {
    $(".space-headBar").css("opacity", 1);
    $(".person-box").css("opacity", 0);
  }
}

function easySetSkin() {
  let that = this;
  let skinSta = this.skinSta;
  if (skinSta) {
    that.$store.dispatch('recover');
    return;
  }
  let skinCode = this.skinCode;
  let randomCode = (++skinCode) % 3;

  this.$store.dispatch("setSkin", randomCode);
}

export default {
  scrollHeadToggle,
  easySetSkin
}