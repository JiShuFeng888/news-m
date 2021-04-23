<template>
    <div class="article-container">
      <van-nav-bar
        title="文章详情"
        left-text="返回"
        left-arrow
        class="nav-bar"
        @click-left="$router.back()"
      />



      <!--  主体    -->
      <div class="main">
        <h1 class="title">{{articleDetail.title}}</h1>
        <van-cell center>
          <div class="name" slot="title">{{articleDetail.user.nickname}}</div>
          <van-image
            class="photo"
            slot="icon"
            round
            width="40"
            height="40"
            :src="articleDetail.user.head_img"
          />
          <van-button :type="articleDetail.has_follow?'default':'danger'" size="small" :icon="articleDetail.has_follow?'':'plus'" round class="follow-btn" @click="onFollow" :loading="isFollowLoading">{{articleDetail.has_follow?'已关注':'关注'}}</van-button>
        </van-cell>
        <!--  正文    -->
        <div class="markdown-body" v-html="articleDetail.content" ref="article-content">
        </div>
        <!-- 评论列表     -->
        <commendList :articleId="articleId" @replyCommend="onReplyCommend"></commendList>
        <!-- 评论列表     -->
        <!--  正文    -->

      </div>


      <!--  底部    -->
      <div class="article-bottom">
        <van-button type="default" class="button" @click="showPopup">评论</van-button>
        <van-icon  :name="articleDetail.has_star?'star':'star-o'" @click="onstar"/>
        <van-icon  :name="articleDetail.has_like?'good-job':'good-job-o'"  @click="onLike"/>
        <van-icon  name="share-o" />
      </div>
      <!--  底部    -->

      <!--  评论    -->
      <van-popup class="popup" v-model="commendShow" position="bottom">
        <postCommend :articleId="articleId" @onPostSuccess="onPostSuccess"></postCommend>
      </van-popup>
      <!--  评论    -->

      <!--  回复评论    -->
      <van-popup class="popup" v-model="replyShow" position="bottom">
        <commendReply :replayCommend="replayCommend" @closeReply="replyShow=false" v-if="replyShow"></commendReply>
      </van-popup>
      <!--  回复评论    -->

    </div>
</template>

<script>
import './github.css'
import  {getArticleDetail} from '@/api/article'
import { ImagePreview } from 'vant';
import {followUser,deleteFollowUser,starArticle,likeArticle} from '@/api/article'
import commendList from './components/commend-list'
import postCommend from './components/post-commend'
import commendReply from './components/commend-reply'


    export default {
        name:'ArticleDetail',
        props:{
          articleId:{
            type:String,
            require:true
          }
        },
        data () {
            return {
                  articleDetail:{},
                  isFollowLoading:false,
                  commendShow: false,
                  commendNumber:0,
                  replyShow:false,
                  replayCommend:{}
            };
        },
        components: {
          [ImagePreview.Component.name]: ImagePreview.Component,
          commendList,
          postCommend,
          commendReply
        },
        computed: {},
        created(){
          this.getArticle()
        },
        beforeMount() {},
        mounted() {},
        methods: {
          onReplyCommend(commend){
            // console.log(commend)
            this.replayCommend=commend
            this.replyShow=true
          },
          onPostSuccess(){

            this.commendShow=false
          },
          showPopup() {
            this.commendShow = true;
          },
          async onLike(){
            if(this.articleDetail.has_like){
              this.$toast({
                message:'取消点赞',
                forbidClick:true
              });
            }else{
              await likeArticle(this.articleDetail.id)
              this.$toast({
                message:'点赞成功',
                forbidClick:true
              });
            }
            this.articleDetail.has_like=!this.articleDetail.has_like
          },
          async onstar(){
            if(this.articleDetail.has_star){
              this.$toast({
                message:'取消收藏',
                forbidClick:true
              });
            }else{
              await starArticle(this.articleDetail.id)
              this.$toast({
                message:'收藏成功',
                forbidClick:true
              });
            }
            this.articleDetail.has_star=!this.articleDetail.has_star
          },
          async onFollow(){
              this.isFollowLoading=true

              if(this.articleDetail.has_follow){
                await followUser(this.articleDetail.user.id)
              }else {
                await deleteFollowUser(this.articleDetail.user.id)
              }
              this.articleDetail.has_follow=!this.articleDetail.has_follow

              this.isFollowLoading=false

            // console.log(this.articleDetail)
          },
          async getArticle(){
              let {data} =await getArticleDetail(this.articleId)
              this.articleDetail=data.data
              console.log(data.data)
              this.commendNumber=data.data.comment_length

            this.$nextTick(()=>{
              this.handlePerviewImage()
            })
          },
          handlePerviewImage(){
            //获取文章内容的DOM容器
            let articleContent=this.$refs["article-content"]
            //得到所有的img标签
            //DOM数据更新不是立即的
            let imgs=articleContent.querySelectorAll('img')
            //循环img,给img注册点击事件
            let imgPaths=[]
            imgs.forEach( (img,index)=>{
              imgPaths.push(img.src)
              img.onclick=function (){
                //在事件处理函数中调用函数预览
                ImagePreview({
                  images: imgPaths,
                  startPosition: index,
                });
              }
            })
          }
        },
        watch: {}

    }

</script>

<style lang='less' scoped>
/deep/.nav-bar{
  background-color: #d43c33;
  .van-nav-bar__text,.van-icon-arrow-left,.van-nav-bar__title{
    color: #ffffff;
  }
}
.main{
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 30px;
  overflow-y: auto;
}
.title{
  font-size: 20px;
  color: #3a3a3a;
  padding: 14px;
  background-color: #fff;
  margin: 0;
}
.name{
  font-size: 12px;
  margin-left: 8px;
}
.follow-btn{
  width: 75px;
  height: 29px;
}
.markdown-body{
  padding: 14px;
  background-color: #fff;
  ul{
    list-style: none;
  }
  /deep/ .van-popup{
    height:180px;
  }
}
.article-bottom{
  border-top: 1px solid #f5f7f9;
  background-color: #fff;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  justify-content: space-around;
  align-items: center;
  /deep/ .button{
    width: 200px;
    height: 30px;
    border: none;
  }
  /deep/ .van-icon{
    width: 18px;
    height: 18px;
    line-height: 18px;
  }
}
</style>`
