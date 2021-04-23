<template>
    <div class="login-container">
      <!--头部-->
      <van-nav-bar
        title="注册/登录"
        left-arrow
        @click-left="$router.back()"
        class="app-nav-bar"
      />
      <!--头部-->

      <!--登录表单-->
      <van-form @submit="onLogin" ref="login-form">

        <van-cell-group>
          <van-field
            v-model="user.username"
            icon-prefix="new"
            left-icon="shouji"
            placeholder="请输入手机号"
            :rules="formRules.mobile"
            name="mobile"
            center
          />
          <van-field
            v-model="user.password"
            clearable
            icon-prefix="new"
            left-icon="yanzhengma"
            placeholder="请输入密码"
            center
            :rules="formRules.code"
            name="code"
          >

          </van-field>
        </van-cell-group>

        <div class="login-btn-wrap">
          <van-button type="info" block color="#d43c33">登录</van-button>
        </div>

      </van-form>
    </div>
</template>

<script>
import {login,register} from "@/api/user";
import { Toast } from 'vant';
import {mapActions} from 'vuex'

export default {
        name:'LoginIndex',
        props:[''],
        data () {
            return {
                user:{
                  username:'',//手机号
                  password:'',//验证码
                },
              formRules:{
                mobile:[
                  { required: true, message: '请输入手机号'},
                  {pattern:/^1{3|5|7|8|9}\d{9}$/,message:"手机号格式错误"}
                ],
                code:[
                  { required: true, message: '请输入密码'},
                  {pattern:/^\d{6}$/,message:"密码格式错误"}
                ]
              }

            };
        },
        components: {},
        computed: {},
        beforeMount() {},
        mounted() {},
        methods: {
          ...mapActions([
              'setUser'
          ]),
         async onSend(){
            //校验手机号
           try{
             //验证手机号
              await this.$refs["login-form"].validate('mobile')
             //发送验证码

           }catch (err){
             Toast.fail(err.message);
           }

          },
         async onLogin(){
           Toast.loading({
             message: '加载中...',
             forbidClick: true,
             duration:0
           });
           try{
           const result=await login(this.user)
             if(result.data.statusCode===401){
               Toast.fail('登录失败,请检查账号或密码');
               return
             }
           Toast.success('登录成功');
             this.setUser(result.data.data)
             //清楚登录界面缓存
             this.$store.commit('removeCachePage','layoutIndex')

             //跳转登录页面
             // this.$router.back()
             this.$router.push(this.$route.query.redirect|| '/')
           }catch (err){
             Toast.fail('登录失败');

             console.log("登录失败,请检查账号或密码",err)
           }
         },
          async onRegister(){
            try{
              const result=await register({
                username:this.user.username,
                password:this.user.password,
                nickname:Math.random()+""
              })
              console.log(result);
            }catch (err){
              console.log("注册失败",err)
            }

          }
        },
        watch: {}

    }

</script>

<style lang='less' scoped>
.login-container{
  .send-btn{
    width: 76px;
    height: 23px;
    background-color: #ededed;
    font-size: 11px;

  }
  .login-btn-wrap{
    padding: 26px 16px;
    border: none;
    font-size: 15px;
    *{
      border-radius: 5px;
    }
  }
}

</style>
