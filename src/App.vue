<template>
  <div id="app">
    <Header/>
    <!--路由容器-->
    <router-view/>

    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
//import axios from 'axios'

export default {
  name: 'App',
  data(){
    return{

    }
  },
  components: {
    Header,
    Footer
  },
  mounted(){
    /*axios.get("/article?currentPage=1&pageSize=3&queryString=").then((resp)=>{
      console.log(resp.data)
    })*/
  }
}
</script>

<style>

</style>
