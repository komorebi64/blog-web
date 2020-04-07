<template>
  <el-header>
    <el-menu class="el-menu-demo" mode="horizontal" router default-active="/">
      <el-menu-item>
                    <span style="font-size: 20px; ">
                    <el-avatar :size="35" src="/image/avatar.jpg"></el-avatar>
                        Komorebi
                    </span>
      </el-menu-item>
      <el-menu-item index="/">首页</el-menu-item>
      <!--<el-submenu index="2">
          <template slot="title">文章标签</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
      </el-submenu>-->
      <el-menu-item index="/me">关于我</el-menu-item>

      <el-menu-item index="/login" style="float: right" v-if="userName === '游客'">
        去登录
      </el-menu-item>
      <el-menu-item @click="logout" style="float: right" v-if="userName !== '游客'">
        登出
      </el-menu-item>
      <el-menu-item @click="goAdmin" style="float: right" v-if="userName !== '游客'">
        后台管理
      </el-menu-item>

      <el-menu-item style="float: right">您好，{{userName}}</el-menu-item>

    </el-menu>
  </el-header>
</template>
<script>
  import axios from "axios";

  export default {
    data: function () {
      return {
        userName: '游客'
      }
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
            location.reload()
          }).catch(() => {
            this.$message.error({
              message: '登出失败，怎么回事!'
            });
          })
        }).catch(() => {
          this.$message({
            message: '已取消'
          });
        });
      },
      getUserStatus() {
        axios.get("/auth/userStatus")
          .then((resp) => {
            if (resp.data.flag) {
              this.userName = resp.data.data.userName;
            }
          })
      },
      goAdmin() {
        location.href = '/admin/home'
      }
    },
    mounted() {
      this.getUserStatus();
    }
  }
</script>
<style scoped>
  .el-header {
    padding: 0;
  }
</style>
