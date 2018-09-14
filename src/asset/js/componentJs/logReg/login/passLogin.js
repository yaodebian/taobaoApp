function passShowToggle() {
  this.showPsw = !this.showPsw;
  if (this.showPsw) {
    this.passIcon = "icon-mimachakan";
    return;
  }
  this.passIcon = "icon-mimayincang";
}

export default {
  passShowToggle
}