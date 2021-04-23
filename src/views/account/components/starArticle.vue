<template>
    <div class="starArticle">
      <van-nav-bar
        title="收藏文章"
        left-arrow
        @click-left="$router.back()"
      />
    <ArticleItem v-for="value in starArticles" :key="value.id" :article="value"></ArticleItem>
    </div>

</template>

<script>
import {getStarArticle} from '@/api/user'
import ArticleItem from '@/components/article-item'
    export default {
        name:'',
        props:[''],
        data () {
            return {
                  starArticles:[]
            };
        },
        components: {
          ArticleItem
        },
        computed: {},
        created(){
            this.getStarArticles()
        },
        beforeMount() {},
        mounted() {},
        methods: {
          async getStarArticles(){
            let data=await getStarArticle()
            this.starArticles=data.data.data
          }
        },
        watch: {}

    }

</script>

<style lang='' scoped>

</style>
