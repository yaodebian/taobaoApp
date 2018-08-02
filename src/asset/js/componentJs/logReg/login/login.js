function logMethodToggle() {
  this.loginMethod = !this.loginMethod;
  this.$store.dispatch('initLogReg');
}

function goReg() {
  this.$router.push("/reg");
}

export default {
  logMethodToggle,
  goReg
}