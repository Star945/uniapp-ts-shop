<script lang="ts">
    import Vue from 'vue';
    export default Vue.extend({
        mpType: 'app',
        globalData:{
            imgBase:'http://192.168.0.209:8088/images'
        },
        onLaunch() {
            console.log('App Launch')
        },
        onShow() {
            console.log('App Show')
        },
        onHide() {
            console.log('App Hide')
        }
    });
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
