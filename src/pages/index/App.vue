<template>
  <div id="app">
    <Header :style="menuStyle"/>
    <!--路由容器-->
    <router-view :style="{minHeight:minHeight + 'px'}"/>

    <Footer/>
  </div>
</template>

<script>
  import Header from './components/Header'
  import Footer from '../../components/Footer'

  export default {
    name: 'App',
    components: {
      Header,
      Footer
    },
    data() {
      return {
        minHeight: 0,

        menuStyle: {
          height: '60px'
        }
      }
    },
    mounted() {
      // 动态设置内容高度 让footer始终居底   header+footer的高度是100
      this.minHeight = document.documentElement.clientHeight - 180;
      // 监听浏览器窗口变化
      window.onresize = () => {
        this.minHeight = document.documentElement.clientHeight - 180
      }

      // 获取标签集合
      this.$store.dispatch('getTagsList');
      // 获取用户信息
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
