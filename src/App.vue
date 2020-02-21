<template>
  <div id="app">
    <Header/>
    <!--路由容器-->
    <router-view :style="{minHeight:minHeight + 'px'}" />

    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data(){
    return{
      minHeight: 0
    }
  },
  mounted(){
    // 动态设置内容高度 让footer始终居底   header+footer的高度是100
    this.minHeight = document.documentElement.clientHeight - 180;
    // 监听浏览器窗口变化
    window.onresize = ()=> {this.minHeight = document.documentElement.clientHeight - 180}
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
