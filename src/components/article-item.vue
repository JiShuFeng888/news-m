<template>
          <van-cell class="article-item" :label="article.user.nickname" :to="{
          name:'article',
          params:{
              articleId:article.id+''
          }}">
            <div slot="title" class="title van-multi-ellipsis--l3">{{article.title}}</div>
            <div slot="label">
              <div class="cover-wrap"   v-if="article.cover.length===3">
                <div class="cover-wrap-item">
                  <div class="cover-item"  v-for="(img,index) in article.cover.url"
                       :key="index">
                    <van-image
                      fit="cover"
                      :src="img"
                    />
                  </div>
                </div>
              </div>
              <span>
              {{article.user.nickname}}
              </span>
              <span>
                {{article.comment_length}}评论
              </span>
            </div>
<!--            默认插槽-->
<!--            <div slot="default"></div>-->

            <van-image
              v-if="article.cover.length===1"
              fit="cover"
              :src="article.cover[0].url"
            />
          </van-cell>
</template>

<script>
    export default {
        name:'ArticleItem',
        props:{
          article:{
            type:Object,
            require:true
          }
        },
        data () {
            return {

            };
        },
        components: {},
        computed: {},
        beforeMount() {},
        mounted() {
          // console.log(this.article)
        },
        methods: {},
        watch: {}

    }

</script>

<style lang='less' scoped>
.article-item{
  .title{
    font-size: 16px;
    color: #3a3a3a;
  }
  /deep/ .van-cell__value{
    flex: unset;
    width: 116px;
    height: 73px;
  }
  /deep/ .van-image{
    width: 116px;
    height: 73px;
  }
  /deep/ .van-cell__label{
    font-size: 11px;
    color: #b4b4b4;
    span{
      margin-right: 12px;
    }
  }
  //.cover-wrap{
  //  display: flex;
  //  .cover-wrap-item{
  //    flex: 1;
  //    height: 73px;
  //    &:not(:last-child){
  //      padding-right: 4px;
  //  }
  //    .cover-item{
  //      width: 100%;
  //      height: 73px;
  //    }
  //  }
  //}
}

</style>
