<template>
  <div id="app">
    <el-container>
      <el-header :height="'100px'">
        <el-row :gutter="10" align="middle">
          <el-col :xl="5">
            <div class="grid-content bg-purple">DOBI AutoRobot</div>
          </el-col>
          <el-col :xl="10">
            <div class="grid-content bg-purple-light header-midd-menu">
              <div class="menu-item">
                <router-link to="/">机器人列表</router-link>
              </div>
              <div class="menu-item">
                <router-link to="/log">刷单日志</router-link>
              </div>
              <div class="menu-item">
                <router-link to="/config">刷单配置</router-link>
              </div>
            </div>
          </el-col>
          <el-col :xl="9">
            <div class="grid-content bg-purple-light">
              <el-button v-if="!isLoggedin" @click="loginFormVisible = true" type="info" plain>登录</el-button>
              <el-button v-else type="info" plain>{{ adminName }}</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-dialog
        :width="loginFormWidth"
        title="请登录" 
        :visible.sync="loginFormVisible"
        center>
        <el-form :model="loginFormData" label-position="left">
          <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="loginFormData.name" name="name" auto-complete="off" clearable ></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="loginFormData.password" name="password" auto-complete="off" clearable></el-input>
          </el-form-item>
        </el-form>
        <el-alert
          v-show="loginErrTxt"
          :title="loginErrTxt"
          type="error">
        </el-alert>
        <div slot="footer" class="dialog-footer">
          <el-button @click="loginFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="login" :loading="loginBtnisDisable">确 定</el-button>
        </div>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import loginData from './mock';
import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'App',
    components: {

    },
    data() {
      return {
        loginFormVisible: false,
        loginFormData: {
          name: '',
          password: ''
        },
        formLabelWidth: '40px',
        loginFormWidth: '550px',
        VALIDATOR: {
          name: {
            minLen: 0,
            error: {
              empty: "请输入账号"
            }
          },
          password: {
            minLen: 0,
            error: {
              empty: "请输入密码"
            }
          },
        },
        loginError: [],
        loginErrTxt: "",
        loginBtnisDisable: false
      }
    },
    computed: {
      ...mapActions([
        'loginAction',
        'logoutAction',
      ]),
      ...mapGetters([
        'isLoggedin',
        'adminName',
        'UUID'
      ])
    },
    methods: {
      
      checkLoginForm() {
        this.loginErrTxt = '';
        this.loginError = [];
        Object.keys(this.loginFormData).forEach((key) => {
          let strLen = this.loginFormData[key].length;
          if (strLen <= this.VALIDATOR[key].minLen) {
            this.loginError.push(key);
            let firstErrKey = [...this.loginError].shift();
            this.loginErrTxt = this.VALIDATOR[firstErrKey].error.empty;
          }
        })
      },
      login() {
        this.checkLoginForm();
        if (this.loginError.length <=0) {
          this.loginBtnisDisable = true;
          this.requestLogin();
        }
      },
      requestLogin() {
        this.$http.postJson('/login', this.loginFormData).then((res) => {
          setTimeout(() => {
            this.loginBtnisDisable = false;
          }, 300);
          let { code, UUID } = res.data;
          if (code == '0') {
            this.loginFormVisible = false;
            // 保存UUID
            console.log(res);
            this.loginAction(res.data);
          }
        }).catch(() => {
          this.loginBtnisDisable = false;
        })
      }
    }
  }

</script>

<style lang="scss">
  html,
  body {
    height: 100%;
    overflow: hidden;
  }

  #app {
    height: 100%;
  }

  .el-container {
    position: relative;
    height: 100%;
  }

  .el-main {
    position: absolute;
    top: 100px;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 20px;
    background-color: #E9EEF3;
    color: #333;
  }

  .el-row {
    // margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .el-header {
    // background-color: #B3C0D1;
    color: #333;
    text-align: center; // line-height: 60px;
  }
  .input-error {
    outline: #F56C6C auto 5px;
  }
</style>
