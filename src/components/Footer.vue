<template>
    <el-footer height="120px">
        ©️2019 Komorebi
        <el-link href="https://github.com/mantoumc" type="info" :underline="false" target="_blank">by Minghao.Zhang</el-link>
        <br />
        <el-link href="http://www.beian.miit.gov.cn/" type="info" :underline="false" target="_blank">蜀ICP备19014487号</el-link>
        <br />
    </el-footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
    .el-footer{
        padding: 35px 0;
        line-height: 1.5;
        width: 100%;
        background-color: #f5f6f5;
        text-align: center;
    }
</style>
