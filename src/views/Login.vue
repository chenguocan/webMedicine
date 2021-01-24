<template>
  <div class="loginPage">
    <div class="login">
      <h1> 登录系统</h1>
      <div class="login-form">
        <el-form  ref="loginForm" :rules="loginRules" :model="loginForm">
          <el-form-item prop="username" >
            <el-input  v-model="loginForm.username" placeholder="请输入用户"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" class="login-btn" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      loginForm:{
        username:'1001',
        password:'1234',
      },
      loginRules:{
        username:[
          {required:true,message:'请输入用户名',trigger:'blur'},
        ],
        password:[
          {required:true,message:'请输入密码',trigger:'blur'}
        ]
      }
    }
  },
  created() {

  },
  methods:{
    login(){

      this.$refs.loginForm.validate((valid)=>{
        if(valid){
          let username=this.loginForm.username;
          let password=this.loginForm.password
          if(username==='1001' && password==='1234'){
            this.$router.push({path:'/i'});
          }else{
            this.$message({
              type:'error',
              message:'账号或密码错误'
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.loginPage{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eaeaea;
  .login{
    width: 500px;
    height: 300px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    .login-form{
      width: 300px;
      margin: 20px 40px;
      .login-btn{
        width: 100%;
      }
    }
  }
}
</style>
