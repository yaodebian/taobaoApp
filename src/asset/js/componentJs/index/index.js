function pageToggle() {
  if (this.selectedNav === 'index') {
    this.$router.push('./')
    return
  }
  if (this.selectedNav === 'message') {
    this.$router.push('./message')
    return
  }
  if (this.selectedNav === 'twitter') {
    this.$router.push('./twitter')
    return
  }
  if (this.selectedNav === 'cart') {
    this.$router.push('./cart')
    return
  }
  if (this.selectedNav === 'personal') {
    this.$router.push('./personal')
    return
  }
}

export default {
  pageToggle
}