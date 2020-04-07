<template>
  <el-menu
    :default-active="this.$route.path"
    class="el-menu-vertical-demo"
    router>
    <el-menu-item index="/admin/">
      <i class="el-icon-user"></i>
      <span slot="title">我的主页</span>
    </el-menu-item>
    <el-menu-item index="/admin/editmd">
      <i class="el-icon-edit"></i>
      <span slot="title">Markdown编辑器</span>
    </el-menu-item>
    <el-menu-item index="/admin/article">
      <i class="el-icon-notebook-1"></i>
      <span slot="title">文章管理</span>
    </el-menu-item>
    <el-menu-item index="/admin/setting">
      <i class="el-icon-setting"></i>
      <span slot="title">博客管理</span>
    </el-menu-item>
    <el-menu-item @click="logout">
      <i class="el-icon-switch-button"></i>
      <span slot="title">登出</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  import axios from "axios";

  export default {
    mounted(){
      document.title = "后台管理_Komorebi个人小站";
    },
    methods: {
      logout() {
        this.$confirm('此操作将退出您的登录状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          axios.get("/logout").then(() => {
            this.$message.success({
              message: '登出成功!'
            });
            location.href = "/"
          }).catch(() => {
            this.$message.error({
              message: '登出失败，怎么回事!'
            });
          })
        })
      }
    }
  }
</script>
