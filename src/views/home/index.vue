<template>
  <div>
  <!--导航栏-->
    <div class="search">
      <van-button  block color="#f5f7f9" class="input" icon="search" to="/search">搜索</van-button>
    </div>
  <!--导航栏-->

  <!--文章频道列表-->
<!--    标签组件有个功能，只有你第一次查看标签页的时候才会渲染里面的内容-->
  <van-tabs v-model="active" class="channels-tab">
    <van-tab v-for="value in channels" :title="value.name" :key="value.id">
      <!--文章列表-->
      <ArticleList :channel="value"></ArticleList>
    </van-tab>

    <div slot="nav-right" class="nav-wrap-placeholder">

    </div>
    <div slot="nav-right" class="nav-wrap">
      <van-icon name="wap-nav" @click="isChannelsEditShow=!isChannelsEditShow"></van-icon>
    </div>
  </van-tabs>
  <!--文章频道列表-->

<!--    频道编辑-->
    <van-popup get-container="body" closeable  close-icon-position="top-left"  v-model="isChannelsEditShow" position="bottom" :style="{ height: '100%' }">
        <ChannelEdit :user-channels="channels" @close="isChannelsEditShow=false" @switch="active=$event" :active="active"></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import {getUserChannels} from './../../api/user'
import ChannelEdit from './components/channel-edit'
import ArticleList from './components/article-list'
import {mapState} from 'vuex'
import {getLocalStorage} from '@/utils/tools'
export default {
  name: '',
  props: [''],
  data() {
    return {
      active: 0,//控制激活的标签
      channels:[],
      isChannelsEditShow:false
    };
  },
  created() {
    this.loadChannels()
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  computed: {
    ...mapState(['user'])
  },
  beforeMount() {
  },
  mounted() {
  },
  methods: {
    async loadChannels(){


      let channels=[]
      if(this.user){
        //登录状态下
        let data=await getUserChannels()
        channels=data.data.data
      }else{
        //注销状态下
        let localChannels=getLocalStorage('user-channels')

          if (localChannels){
            //有本地存储
              channels=localChannels
          }else{
            //没本地存储
            let data=await getUserChannels()
            channels=data.data.data
          }
      }
      channels=channels.filter((value)=>{
        if(value.name!=='关注'){
          return true
        }
      })
      this.channels=channels
    }
  },
  watch: {}

}

</script>

<style lang='less' scoped>
.search{
  background-color: #d43c33;
  box-sizing: border-box;
  padding-left: 50px;
  padding-right: 50px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  /deep/ .input{
    border: none;
    height: 30px;
    width: 227px;
    background-color: #fff !important;
    .van-icon-search{
      font-size: 16px;
      color: #ccc;
    }
    .van-button__text{
      font-size: 14px;
      color: #ccc;
    }
  }
}
.channels-tab{
  /deep/.van-tab{
    border-right: 1px solid #edeff3;
    border-bottom:1px solid #edeff3 ;
    box-sizing: border-box;
}
  /deep/ .van-tabs__line{
    width: 35px;
    height: 2px;
  }
  .nav-wrap{
    position: fixed;
    right: 0;
    width: 33px;
    height: 43px;
    display: flex;
    opacity: 0.9;
    align-items: center;
    background-color: #fff;
    color: #ccc;
    font-size: 23px;
  }
  .nav-wrap-placeholder{
    flex-shrink: 0;
    width: 53px;
  }
}
</style>
