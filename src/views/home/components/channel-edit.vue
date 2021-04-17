<template>
    <div class="channel-edit">
      <van-cell center :border="false">
        <div slot="title" class="channel-title">
          我的频道
        </div>
        <van-button type="danger" plain round size="mini" @click="isEdit=!isEdit">{{isEdit?'完成':'编辑'}}</van-button>
      </van-cell>

      <van-grid :gutter="10">
        <van-grid-item @click="onUserChannelClick(index)" :icon="isEdit&&index!==0?'close':''" v-for="(value,index) in userChannels" :key="index"  :text="value.name" class="gird-item" :class="{'active':active===index}" />
      </van-grid>



      <van-cell center :border="false">
        <div slot="title" class="channel-title">
          频道推荐
        </div>
        <van-button type="danger" plain round size="mini">编辑</van-button>
      </van-cell>

      <van-grid :gutter="10">
        <van-grid-item class="gird-item" @click="addChannel(value)"  :key="value" v-for="value in recommendChannels">
          {{value}}
        </van-grid-item>

      </van-grid>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {setLocalStorage} from '@/utils/tools'
import {addUserChannels} from '@/api/article'
export default {
        name:'',
        props:{
          userChannels:{
            type:Array,
            require:true
          },
          active:{
            type:Number,
            require:true
          }
        },
        data () {
            return {
              recommendChannels:['html','css','javascript','ajax','小程序','vue','node.js','mysql','typescript'],
              isEdit:false
            };
        },
        components: {},
        computed: {
          ...mapState(['user'])
        },
        created(){
          console.log(this.userChannels)
        },
        beforeMount() {},
        mounted() {},
        methods: {
          delChannel(index){
            if(index<=this.active){
              this.$emit('switch',this.active-1)
            }
            this.userChannels.splice(index,1)
            //数据持久化
            if(this.user){
            }else{
              //没登录存到本地
              setLocalStorage('user-channels',this.userChannels)
            }
          },
          switchChannel(index){
              this.$emit('close')
              this.$emit('switch',index)
          },
          onUserChannelClick(index){
            //编辑状态，删除
            if(this.isEdit){
              this.delChannel(index)
            }else {
            //非编辑状态，切换频道
              this.switchChannel(index)

            }
          },
          addChannel(value){
            let flag=false
              this.userChannels.forEach((userValue)=>{
                    if (userValue.name===value){
                      flag=true
                    }
              })
            if (!flag){
              this.userChannels.push({
                name:value
              })
              this.recommendChannels=this.recommendChannels.filter((item)=>{
                return item!==value
              })
              //添加频道数据持久化

              if(this.user){
                addUserChannels({name:value})
              }else{
                //没登录存到本地
                setLocalStorage('user-channels',this.userChannels)
              }


            }


          }
        },
        watch: {}

    }

</script>

<style lang='less' scoped>
.channel-edit{
  padding-top: 54px;
  .channel-title{
    font-size: 16px;
    color: #333333;
  }
  .gird-item{
    width: 80px;
    height: 43px;
    font-size: 14px;
    /deep/.van-grid-item__content{
      background-color: #f4f5f6;
      .van-grid-item__text{
        font-size: 14px;
        color: #222;
        margin-top:unset;
      }
      .van-grid-item__icon{
        position: absolute;
        right: -5px;
        top: -5px;
        font-size: 20px;
        color: #cccccc;

      }
    }
  }
  .active{
    /deep/.van-grid-item__content{
      .van-grid-item__text{
        color:red !important;
      }
    }
  }
}
</style>
