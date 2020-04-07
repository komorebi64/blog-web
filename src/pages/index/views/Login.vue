<template>
  <el-container style="height: 100%; width: 100%;">
    <div style="text-align: center; margin: 100px auto; width: 500px;">
      <el-card :body-style="{ padding: '0px'}">
        <h1>登录</h1>

        <div style="margin: 0 100px; line-height: 3;">
          <table>
            <tr>
              <td>用户名：</td>
              <td><el-input v-model="from.username" :disabled="loading" placeholder="用户名"></el-input></td>
            </tr>
            <tr>
              <td>密码：</td>
              <td><el-input v-model="from.password" :disabled="loading" placeholder="请输入密码" @keyup.enter.native="login()" show-password></el-input></td>
            </tr>
            <tr>
              <td><el-button :loading="loading" @click="login()">提交</el-button></td>
            </tr>
          </table>
        </div>
        <el-divider><i class="el-icon-mobile-phone"></i> 第三方登录</el-divider>
        <div style="padding: 10px;">
          <span style="padding: 0 10px;">
              <img width="32" src="image/qq-logo.png" @click="goAuthPage('/toQQLogin')" class="image" alt="QQ Authorize">
          </span>
          <span style="padding: 0 10px;">
              <img width="32" src="image/github-logo.png" @click="goAuthPage('/oauth2/authorization/github')" class="image" alt="Github Authorize">
          </span>
          <span style="padding: 0 10px;">
              <img width="32" src="image/google-logo.png" @click="goAuthPage('/oauth2/authorization/google')" class="image" alt="Google Authorize">
          </span>
          <br /><br />
          <span style="font-size: 8px; color: #6a737d">我尽力让这个登录变得好看些了。。<br />Google登录因为服务器的原因无法连接到Google服务器</span>
        </div>
      </el-card>
    </div>
  </el-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data(){
    return{
      loading : false,
      status: '',
      from:{
        username:'',
        password:'',
        rememberMe:false
      }
    }
  },
  methods:{
    goAuthPage(pageName) {
      //this.$router.push(pageName)
      location.href = this.common.API_URL + pageName;
    },
    login(){
      if (this.from.username === '' || this.from.password === ''){
        this.$message.warning({
          message: '请勿留空提交'
        });
        return false;
      }
      this.loading = true;
      axios.post("/auth/login",this.from)
              .then((resp)=>{
                if (resp.data.flag){
                  this.$notify.success('登录成功');
                  this.$router.push("/")
                }else {
                  this.$notify.error({
                    title: '出错啦 😥',
                    message: resp.data.message
                  });
                }
              })
              .finally(()=>{
                this.loading = false;
              })
    }
  }
}
</script>

<style>

</style>
