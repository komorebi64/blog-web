<template>
  <div style="padding:25px; margin-top: 25px;" class="write markdown-body" v-html="content"></div>
</template>

<script>
  export default {
    props: {
      content: String
    }
  }
</script>
