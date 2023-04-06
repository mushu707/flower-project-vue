<template>
  <div>
    <!-- Vue粒子特效配置 -->
    <vue-particles
          color="#fff"
          :particleOpacity="0.7"
          :particlesNumber="150"
          shapeType="circle"
          :particleSize="7"
          linesColor="#8d8c8c"
          :linesWidth="1"
          :lineLinked="false"
          :lineOpacity="0.4"
          :lineDistance="150"
          :moveSpeed="2"
          :hoverEffect="false"
          hoverMode="grab"
          :clickEffect="false"
          clickMode="push"
          class="lizi"
      />

    <!-- 登录表单 -->
    <div id="login-container">
      <h4 style="margin: 20px 10px 0 10px">账号登录</h4>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="ruleForm">
        <el-form-item prop="user">
          <el-input type="text" v-model="ruleForm.user" prefix-icon="el-icon-user" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" v-model="ruleForm.pass" prefix-icon="el-icon-unlock" autocomplete="off" clearable show-password></el-input>
        </el-form-item>
        <el-form-item prop="identify">
          <el-select placeholder="请选择您的身份" v-model="ruleForm.identity" style="width: 100%">
            <el-option label="用户" value="customer"></el-option>
            <el-option label="管理员" value="admin"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="white" @click="submitForm('ruleForm')" round style="width: 100%" plain :loading="loading">登录</el-button>
          <el-link type="danger" icon="el-icon-mobile-phone" style="font-size: 11px">忘记密码?</el-link>
          &nbsp;
          &nbsp;
          &nbsp;
          <el-link type="danger" icon="el-icon-bank-card" style="font-size: 11px" href="/register">没有账户?</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import nprogress from 'nprogress'
export default {
  name: 'Login',
  data() {
    let validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账户'));
      } else {
        if (this.ruleForm.pass !== '') {
          this.$refs.ruleForm.validateField('pass');
        }
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        user: '',
        pass: '',
        identity: '',
      },
      rules: {
        user: [
          {validator: validateName, trigger: 'blur'}
        ],
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
      },
      loading: false,
    };
  },
  methods: {
    async submitForm() {
      const {user, pass, identity} = this.ruleForm
      this.loading = true
      await this.$store.dispatch('Login',{name: user, password: pass, identity}).then(_ => {
        this.$message.success("登录成功!")
        this.loading = false
        this.$store.dispatch('getInfo')
        if (identity === 'admin')
          this.$router.push('/admin')
        else this.$router.push('/')
      }).catch(() => {
        this.loading = false
        this.$message.error('该用户不存在!')
        nprogress.done()
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.lizi{
  position: fixed;
  width: 100%;
  background-image: url('./image/login.jpg');
}
#login-container {
  width: 400px;

  background: rgba(255, 255, 255, 0.9);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;

  .ruleForm{
    margin: 10px 5px 0;
    padding: 0 20px;
  }
}

</style>
