<template>
  <div>
    <!-- Vue粒子特效配置 -->
    <vue-particles
        color="#fff"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="5"
        linesColor="#fff"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.5"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="lizi"
    />

    <!-- 注册表单 -->
    <div class="register-container">
      <h4 style="margin: 5px 10px 0">账号注册</h4>
      <el-form :model="registerForm" label-width="70px" status-icon :rules="rules" ref="ruleForm" class="ruleForm" style="width:87%">
        <el-form-item prop="name" label="姓名" >
          <el-input type="text" v-model="registerForm.name" prefix-icon="el-icon-user" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" >
          <el-input type="password" v-model="registerForm.password" prefix-icon="el-icon-lock" autocomplete="off" clearable show-password></el-input>
        </el-form-item>
        <el-form-item prop="checkpass" label="确认密码" >
          <el-input type="password" v-model="registerForm.checkpass" prefix-icon="el-icon-lock" autocomplete="off" clearable show-password></el-input>
        </el-form-item>
        <el-form-item prop="avatar" label="头像" >
          <el-upload
              class="avatar-uploader"
              action="http://localhost:4000/user"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
            <img v-if="registerForm.imageUrl" :src="registerForm.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item prop="identity" label="身份" >
          <el-select placeholder="请选择您的身份" v-model="registerForm.identity" style="width: 100%">
            <el-option label="用户" value="customer"></el-option>
            <el-option label="管理员" value="admin"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-top: 30px">
          <el-button type="white" @click="sendForm" round style="width: 100%" plain :loading="loading">提交</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import nprogress from 'nprogress'
export default {
  name: "Register",
  data(){
    let validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账户'));
      } else {
        if (this.registerForm.password !== '') {
          this.$refs.ruleForm.validateField('password');
        }
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else callback();
    };
    let validateCheckPass = (rule, value, callback) => {
      if (value !== this.registerForm.password ){
        callback(new Error('两次密码不相同，请重新检测!'));
      }else callback();
    };
    return{
      registerForm:{
        name: '',   //用户名
        password: '',   //密码
        checkpass: '',  //确认密码
        identity: '',   //身份
        imageUrl: null    //头像
      },
      rules: {
        name: [{validator: validateName, trigger: 'blur'}],
        password: [{validator: validatePass, trigger: 'blur'}],
        checkpass: [{validator: validateCheckPass, trigger: 'blur'}]
      },
      loading: false
    }
  },
  methods: {
    async sendForm(){
      const {name, password, checkpass, identity, imageUrl} = this.registerForm
      if (password === checkpass){
        this.loading = true
        await this.$store.dispatch('Register', {name, password, identity, imageUrl}).then(res => {
          if (res == 'register success'){
            this.$message.success('注册成功!')
            this.loading = false
            this.$router.push('/')
            this.$store.dispatch('getInfo')
          }else {
            this.$message.error('用户已存在，请重新注册')
            this.loading = false
          }
        }).catch(err => {
          console.log(err)
          this.loading = false
          nprogress.done()
        })
      }
    },
    handleAvatarSuccess(res) {
      this.registerForm.imageUrl = res.url;
    }
  }
}
</script>

<style lang="scss">
$width: 84px;
$height: 84px;

@import "../Admin/styles";

.lizi{
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("./image/register.jpg");
}

.register-container{
  width: 400px;
  height: 470px;
  background: rgba(255, 255, 255, 0.9);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 10px 30px;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: $width;
  line-height: $height;
  text-align: center;
}

.el-form-item{
  margin-top: 23px;
  margin-bottom: 0;
}
</style>