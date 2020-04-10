<template>
  <el-header>
    <el-menu  class="menu hidden-sm-and-down" mode="horizontal" router :default-active="$route.path">
      <el-menu-item index="ignore">
                    <span style="font-size: 20px; ">
                    <el-avatar :size="35" src="/image/avatar.jpg"></el-avatar>
                        Komorebi
                    </span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-house"></i>首页
      </el-menu-item>
      <el-menu-item index="/types">
        <i class="el-icon-folder"></i>分类
      </el-menu-item>
      <el-menu-item index="/tags">
        <i class="el-icon-collection-tag"></i>标签
      </el-menu-item>
      <el-menu-item index="/me">
        <i class="el-icon-user"></i>关于我
      </el-menu-item>

      <el-menu-item index="/login" style="float: right" v-if="$store.state.userName === ''">
        去登录
      </el-menu-item>
      <el-menu-item index="ignore" @click="logout" style="float: right" v-if="$store.state.userName !== ''">
        登出
      </el-menu-item>
      <el-menu-item index="ignore" @click="goAdmin" style="float: right" v-if="$store.state.userName !== ''">
        后台管理
      </el-menu-item>
      <el-menu-item index="ignore" style="float: right">您好，{{$store.state.userName === '' ? '游客' : $store.state.userName}}
      </el-menu-item>
    </el-menu>
    <el-row class="mobile-menu hidden-md-and-up">
      <el-col :xs="22" :sm="22" class="title-logo">
        <span @click="handleCommand('/')" style="font-size: 20px;">
            Komorebi
        </span>
        <el-dropdown trigger="click"  @command="handleCommand">
        <span class="el-dropdown-link">
          更多<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/" icon="el-icon-house">首页</el-dropdown-item>
            <el-dropdown-item command="/types" icon="el-icon-folder">分类</el-dropdown-item>
            <el-dropdown-item command="/tags" icon="el-icon-collection-tag">标签</el-dropdown-item>
            <el-dropdown-item command="/me" icon="el-icon-user">关于我</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <div class="stackable-menu">

    </div>
  </el-header>
</template>
<script>
  import axios from "axios";
  import 'element-ui/lib/theme-chalk/display.css';

  export default {
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
      goAdmin() {
        location.href = '/admin'
      },
      handleCommand(command){
        this.$router.push(command);
      }
    },
    mounted() {
      this.$store.dispatch('getUserStatus');
    }
  }
</script>
<style scoped>
  .el-header {
    padding: 0;
  }
  .menu{
    padding: 0 110px;
  }
  .mobile-menu{
    height: 60px;
    width: 100%;
    border-bottom: 1px solid #dcdfe6;
  }
  .title-logo{
    line-height: 60px;
    margin: auto 20px;
    color: #909399;
  }
  .more-button{
    color: #909399;
  }
  .el-dropdown{
    float: right;
  }
</style>
