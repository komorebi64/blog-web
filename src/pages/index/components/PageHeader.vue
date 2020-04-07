<template>
  <el-page-header @back="goBack" :content="title"></el-page-header>
</template>

<script>

  export default {
    props: {
      title: String
    },
    methods: {
      goBack() {
        window.history.back();
      }
    }
  }
</script>
