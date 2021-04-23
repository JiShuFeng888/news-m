<template>
    <div class="search-suggest">
      <van-cell icon="search"  v-for="value in searchList" :key="value.id" @click="$emit('search',value.title)">
          <div slot="title" v-html="highlight(value.title)"></div>
      </van-cell>
    </div>
</template>

<script>
import {searchSuggest} from '@/api/article'
import {debounce} from 'lodash'
    export default {
        name:'searchSuggest',
        props:{
          searchText:{
              type:String,
              require:true,
          }

        },
        data () {
            return {
                searchList:[]
            };
        },
        components: {},
        computed: {},
        created(){},
        beforeMount() {},
        mounted() {},
        methods: {
          highlight(title){
              return title.replace(
                new RegExp(this.searchText,'ig'),
                `<span style="color: #d43c33">${this.searchText}</span>`
              )
          }
        },
        watch: {
          searchText:{
             handler:debounce(async function (){
              let data=await searchSuggest(this.searchText)
              this.searchList=data.data.data
            },200),
            immediate:true
            //该回调会在监听开始后立即调用
          }
        }

    }

</script>

<style lang='' scoped>

</style>
