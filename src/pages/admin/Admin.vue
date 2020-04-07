<template>
  <div id="app">
    <el-container>
      <Aside :style="menuStyle"/>
      <!--路由容器-->
      <router-view/>
    </el-container>
    <Footer/>
  </div>
</template>

<script>
  import Aside from './components/Aside'
  import Footer from './components/Footer'

  export default {
    name: 'App',
    components: {
      Aside,
      Footer
    },
    data() {
      return {
        menuStyle: {
          height: '60px',
          width: "200px"
        }
      }
    },
    mounted() {
      // 动态设置内容高度 让footer始终居底
      this.menuStyle.height = document.documentElement.clientHeight - 130 + 'px';
      // 监听浏览器窗口变化
      window.onresize = () => {
        this.menuStyle.height = document.documentElement.clientHeight - 130 + 'px'
      }

      window.screenWidth = document.body.clientWidth;

      let screenWidth = window.screenWidth;
      if (screenWidth < 700) {
        this.menuStyle.height = 120 + 'px';
      }
    },
    beforeCreate() {
      // 获取用户状态信息
      this.$store.dispatch('getUserStatus');
    }
  }
</script>

<style>
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #eee;
    border-radius: 3px;
  }
</style>
