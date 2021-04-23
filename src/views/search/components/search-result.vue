<template>
    <div class="search-result">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item.id" :title="item.title" :to="{
          name:'article',
          params:{
              articleId:item.id+''
          }}"/>
      </van-list>
    </div>
</template>

<script>
import {searchResult} from '@/api/article'
    export default {
        name:'searchResult',
      props:{
        searchText:{
          type:String,
          require:true,
        }

      },
        data () {
            return {
              list: [],
              loading: false,
              finished: false,
            };
        },
        components: {},
        computed: {},
        created(){},
        beforeMount() {},
        mounted() {},
        methods: {

          async onLoad() {
            // 异步更新数据
            let data=await searchResult(this.searchText)
            this.list=data.data.data

              // 加载状态结束
              this.loading = false;

              // 数据全部加载完成
              if (data.data.data) {
                this.finished = true;
              }

          },
        },
        watch: {}

    }

</script>

<style lang='less' scoped>

</style>
