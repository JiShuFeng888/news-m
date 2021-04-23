<template>
  <div class="account-container">
      <van-cell-group v-if="user" class="my-info">
      <van-cell  center class="base-info">
        <van-image
          width="50"
          height="50"
          round
          :src="currentUser.head_img"
          slot="icon"
          class="photo"
        />
        <div slot="title" class="name">{{currentUser.nickname}}</div>
        <van-button round class="update-btn" to="/user/profile">编辑资料</van-button>
      </van-cell>


      <van-grid class="data-info">
        <van-grid-item  text="文字" class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">1</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item  text="文字" class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">2</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item  text="文字" class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">13</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item  text="文字" class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">193</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>



      <van-grid :column-num="2" class="nav-gird">
        <van-grid-item  icon-prefix="new"
                        icon="shoucang"
                        text="收藏"
                        class="nav-gird-item"
                        to="/starArticle"
        />
        <van-grid-item  icon-prefix="new"
                        icon="lishi" text="历史"
                        class="nav-gird-item"
        />
      </van-grid>
      </van-cell-group>
      <div class="not-login" v-else>
        <van-icon size="60px" name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
        <p @click="$router.push({
          name:'login',
          query:{
            redirect:'/'
          }
        })">登录/注册</p>
      </div>
      <van-cell v-if="user" title="退出登录" class="logout-ceil" @click="onLogout"/>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {getCurrentUser} from "@/api/user";
import {setLocalStorage} from "@/utils/tools";

export default {
  name: '',
  props: [''],
  data() {
    return {
      currentUser:{},
    };
  },
  components: {},
  computed: {
    ...mapState(['user'])
  },
  beforeMount() {
  },
  mounted() {
    this.$store.commit('addCachePage','layoutIndex')
  },
  created() {
    this.getUser()
  },
  methods: {
    ...mapActions(['setUser']),
    onLogout(){
      this.$dialog.confirm({
        title: '标题',
        message: '确认退出吗？',
      })
        .then(() => {
          this.setUser(null)
        })
        .catch(() => {
          // on cancel
        });
    },
    async getUser(){
      let id=this.user.user.id
      let currentUser=await getCurrentUser(id)
      this.currentUser=currentUser.data.data
      console.log(currentUser)
    }
  },
  watch: {}

}

</script>

<style lang='less' scoped>
.account-container{
  /deep/ .my-info{
    background-color: #d43c33;
    .base-info{
      height: 115px;
      padding-top: 38px;
      padding-bottom: 11px;
      .photo{
        width: 66px;
        height: 66px;
        box-sizing: border-box;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name{
        font-size: 15px;
      }
      .update-btn{
        //width: 58px;
        height: 30px;
        font-size: 13px;
      }
    }
    .data-info{
      .data-info-item{
        height: 65px;
        .text-wrap{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        .count{
          font-size: 18px;
        }
        .text{
          font-size: 11px;
          text-align: center;
        }
        }
      }
    }
  }
  .not-login{
      display: flex;
      flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding-top: 50px;
    p{
      font-size:15px;
    }
  }
  /deep/ .nav-gird{
    .nav-gird-item{
      height: 70px;
      //图标
      .new{
        font-size: 22px;
      }
     .new-shoucang{
        color: #eb5253;
      }
     .new-lishi{
        color: #eb5253;
      }
      .van-grid-item__text{
        font-size: 14px;
        color: #333;
      }
    }
  }
  .logout-ceil{
    text-align: center;
    color: #d86262;
  }
  .mb-4{
    margin-bottom: 4px;
  }
}

</style>
