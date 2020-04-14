<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="mobile">
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code">
        <!-- http://182.92.128.115: 由代理服务器转发过去 -->
        <img ref="code" src="/api/user/passport/code" alt="code"
          @click="updateCode">
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="请输入你的登录密码" v-model="password">
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请输入确认密码" v-model="password2">
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="isAgree">
        <span>同意协议并注册《尚品汇用户协议》</span>
      </div>
      <div class="btn">
        <a href="javascript:" @click="submit">完成注册</a>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data () {
      return {
        mobile: '13611111111', // 手机号
        password: '111111', // 密码
        password2: '123', // 确认密码
        code: '1234', // 一次性图形验证
        isAgree: true, // 是否同意
      }
    },

    methods: {
      async submit () {
        const {mobile, password, password2, code, isAgree} = this
        // 1. 做前台表单验证, 如果不通过, 直接提示
        if (!isAgree) {
          alert('必须同意')
          return
        }
        if (password!==password2) {
          alert('密码与确认密码要一致')
          return
        }

        // 2. 发送注册的请求
        try {
          await this.$store.dispatch('register', {mobile, password, code})
          // 3.1. 如果成功了, 跳转到登陆的界面
          this.$router.replace('/login')
        } catch (error) {
          // 3.2. 如果失败了, 提示文本
          alert(error.message)
        }
        
        // console.log(mobile, password, password2, code, isAgree)
      },

      /* 
      更新验证码显示: 告诉浏览器重新发请求获取验证码图片
      */
      updateCode () {
        // 给img重新指定src
        // 如果src新的值与原本的值相同, 浏览器不会自动请求获取图片显示
        // 解决: 携带时间(当前时间值)戳的参数  ==> 每次指定的src值都不一样==> 浏览器就会自动请求
        // this.$refs.code.src = `http://182.92.128.115/api/user/passport/code`  // 是一个http请求
        this.$refs.code.src = `/api/user/passport/code?time=${Date.now()}`  // 是一个http请求
      }
    }
  }
</script>

<style lang="less" scoped>
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;
      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }

      div:nth-of-type(1) {
        margin-top: 40px;
      }

      .content {
        // text-align: center;
        padding-left: 390;
        margin-bottom: 18px;

        label {
          font-size: 14px;
          width: 96px;
          text-align: right;
          display: inline-block;
        }

        input {
          width: 270px;
          height: 38px;
          padding-left: 8px;
          box-sizing: border-box;
          margin-left: 5px;
          outline: none;
          border: 1px solid #999;
        }

        img {
          vertical-align: sub;
        }
      }

      .controls {
        text-align: center;

        input {
          vertical-align: middle;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        a {
          text-decoration: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }
  }
</style>