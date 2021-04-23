<template>
    <div class="commend-list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <commendItem v-for="(item,index) in commendList" :key="index" :commend="item" @replyCommend="$emit('replyCommend',$event)"></commendItem>
      </van-list>
    </div>
</template>

<script>
import {getCommend} from '@/api/article'
import commendItem from './commend-item'
    export default {
        name:'',
        props:{
          articleId:{
            type:[Number,String],
            require:true
          }
        },
        data () {
            return {
              commendList: [],
              loading: false,
              finished: false,
            };
        },
        components: {
          commendItem
        },
        computed: {},
        created(){},
        beforeMount() {},
        mounted() {},
        methods: {
        async onLoad() {
              let list=await getCommend(this.articleId)
              this.commendList.push(...list.data.data)
              console.log(list.data.data)
              // console.log(list)

              // 加载状态结束
              this.loading = false;

              // 数据全部加载完成
              this.finished = true;

          },
        },
        watch: {}

    }

</script>

<style lang='less' scoped>

</style>
