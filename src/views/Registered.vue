<template>
  <el-container style="height: 100%; width: 100%;">
    <div style="text-align: center; margin: 100px auto; width: 500px;">
      <el-card :body-style="{ padding: '10px'}">
        <h1>完善用户信息</h1>

        <div style="margin: 0 100px; line-height: 3;">
          <table>
            <tr>
              <td>密码：</td>
              <td><el-input v-model="from.password" :disabled="loading" placeholder="请输入密码" @keyup.enter.native="registered()" show-password></el-input></td>
            </tr>
            <tr>
              <td><el-button :loading="loading" @click="registered()">提交</el-button></td>
            </tr>
          </table>
        </div>
        <span style="font-size: 14px; color: #6a737d;">看来您是第一次登录呢，在上面设置您的密码就阔以了</span><br />
        <span style="font-size: 8px; color: #6a737d; ">我尽力让这个界面变得好看些了。。</span>
      </el-card>
    </div>
  </el-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Registered',
  props:{
    csrf:String
  },
  data(){
    return{
      loading : false,
      from:{
        password:''
      }
    }
  },
  methods:{
    registered(){
      if (this.from.password === ''){
        this.$message.warning({
          message: '请勿留空提交'
        });
        return false;
      }
      this.loading = true;
      axios.post("/auth/registered",{password:this.from.password,csrf:this.csrf})
              .then((resp)=>{
                if (resp.data.flag){
                  this.$notify.success({
                    message: '完善用户信息成功'
                  });
                  location.href =  "/login";
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
  },
  mounted(){
    if (this.csrf === ''){
      this.$router.push({
        // 参数（查询信息）
        name: "error",
        params: {
          msg: '？'
        }
      });
    }
  }
}
</script>

<style>

</style>
