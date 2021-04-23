<template>
    <div class="search-history">
      <van-cell title="搜索历史">
        <div v-if="isDeleteShow">
          <span @click="$emit('deleteAllHistory',[])">全部删除</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span @click="isDeleteShow=false">完成</span>
        </div>
        <van-icon v-else name="delete-o" @click="isDeleteShow=true" />
      </van-cell>
      <van-cell v-for="(value,index) in historyList" :key="value" :title="value" @click="onDelete(value,index)">
        <van-icon name="close" v-show="isDeleteShow" />
      </van-cell>
    </div>
</template>

<script>
import {setLocalStorage} from "@/utils/tools";
    export default {
        name:'searchHistory',
        props:{
          historyList:{
            type:Array,
            require:true
          }
        },
        data () {
            return {
                isDeleteShow:false
            };
        },
        components: {},
        computed: {},
        created(){},
        beforeMount() {},
        mounted() {},
        methods: {
          onDelete(value,index){
            if(this.isDeleteShow){
              this.historyList.splice(index,1)
              // setLocalStorage('HistoryList',this.historyList)
              return
            }

            this.$emit('search',value)
          }
        },
        watch: {}

    }

</script>

<style lang='' scoped>

</style>
