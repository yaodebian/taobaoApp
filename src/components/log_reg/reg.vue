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
        name: "reg",
        data() {
            return {
            };
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$store.dispatch('initLogReg');
            })
        },
        components: {
          regHead,
          regBox  
        }
    };
</script>
<style>
</style>