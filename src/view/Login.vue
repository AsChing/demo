<template>
  <div class="login-page-container">
    <el-form v-bind:model="loginForm" ref="loginForm" label-position="left" label-width="0px"
             class="demo-loginForm login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" auto-complete="off" v-model="loginForm.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" auto-complete="off" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button style="width:100%;" type="primary" v-on:click="handleSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  export default {
    //ECMAScript中(response)=>{...}相当于function(response){...}

    //在data()中声明变量、函数等
    data() {
      return {
        loginForm: {
          username: "",
          password: ""
        }
      }
    },

    //在methods()中添加方法，处理业务
    methods: {

      /* 提交表单 */
      handleSubmit() {
        //判断浏览器支持
        if (!window.sessionStorage ) {
          alert("浏览器不支持sessionStorage ，请使用搜狗，谷歌浏览器")
          return false;
        }
        //组装参数
        let params = {};
        params.username = this.loginForm.username;
        params.password = this.loginForm.password;
        console.log("组装参数成功" + params)

        //HTTP提交请求
        console.log("提交请求")

        this.apiPost('http://localhost:8090/admin/login', params).then(
          (response) => {
            console.log(response);
            var res = response.data;
            if (res.code == 200) {
              //将Session存入到localStorage中
              // window.sessionStorage.setItem("coffeeSession", res.data["sessionId"]);
              this.resetCommonData(res.data);
              //登录成功转跳首页
              // this.$router.push('/users');
              this.$router.push('/home');

              var menus = res.data.menusList;
              // 使用路由给跳转的页面传参
              // this.$router.push({
              //           path: '/roles',
              //           // query: {
              //           //     menusList: menus
              //           // }
              //       })
            } else {
              this.$message({
                showClose: true,
                message: res.error,
                type: 'error'
              });
            }
          },
          (error) => {
            console.log(error);
          }
        );
      },

      /* 重置表单 */
      handleReset() {
        this.$refs.loginForm.resetFields()
      }

    },

  }
</script>

<style scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  label.el-checkbox.remember {
    margin: 0px 0px 35px 0px;
  }
</style>
