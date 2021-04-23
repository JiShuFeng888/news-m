<template>
    <div class="article-list" ref="scrollView">
      <van-pull-refresh v-model="isRefresh" @refresh="onPullDownRefresh"  :success-text="refreshSuccessText" success-duration="1000">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem v-for="(article,index) in list" :key="index" :article="article"></ArticleItem>
      </van-list>
      </van-pull-refresh>
    </div>
</template>

<script>
import {getArticle} from "@/api/article";
import ArticleItem from "@/components/article-item";
import {debounce} from 'lodash'

export default {
        name:'ArticleList',
        props:{
          channel:{
            type:Object,
            require:true
          }
        },
        data () {
            return {
              list: [],
              loading: false,
              finished: false,
              isRefresh:false,
              refreshSuccessText:'',
              scrollTop:0,

            };
        },
        components: {
          ArticleItem
        },
    activated(){
      this.$refs.scrollView.scrollTop=this.scrollTop
    },
    computed: {},
        beforeMount() {},
        mounted() {
            this.$refs.scrollView.onscroll=debounce(()=>{
                  this.scrollTop=this.$refs.scrollView.scrollTop
            },50)
        },
        methods: {
          async onPullDownRefresh(){
            let data=await getArticle(
              {category:this.channel.id}
            )
            this.list.unshift(...data.data.data)
            this.isRefresh = false;
            console.log(this.list)
            this.refreshSuccessText=`更新了${data.data.data.length}条数据`
          },

          async onLoad() {
            // 异步更新数据
            let data=await getArticle(
              {category:this.channel.id}
            )
            //把数据放到数组里面
            this.list.push(...data.data.data)
            // console.log(this.list)
            // 判断加载状态是否结束，如果不是false则永远停在这
            this.loading = false;

              // 数据全部加载完成，不再加载
              if (this.list.length >= 30) {
                this.finished = true;
              }

          },

        },
        watch: {}

    }

</script>

<style lang='less' scoped>
.article-list{
  position: fixed;
  top: 85px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y:auto;
}
</style>
