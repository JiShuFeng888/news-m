<template>
  <div class="search-container">
    <!--    搜索框-->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isResultShow=false"
      />
      <!--  搜索框-->

      <!--  搜索结果-->
      <searchResult v-if="isResultShow" :search-text="searchText"></searchResult>
      <!--  搜索结果-->

      <!--  联想建议-->
      <searchSuggest v-else-if="searchText" :search-text="searchText" @search="onSearch"></searchSuggest>
      <!--  联想建议-->

      <!--  历史记录-->
      <searchHistory v-else :history-list="historyList" @search="onSearch" @deleteAllHistory="historyList=$event"></searchHistory>
      <!--  历史记录-->



    </form>
  </div>
</template>

<script>
import searchSuggest from './components/search-suggest'
import searchHistory from './components/search-history'
import searchResult from './components/search-result'
import {getLocalStorage,setLocalStorage} from "@/utils/tools";

export default {
  name: 'searchIndex',
  props: [''],
  data() {
    return {
      searchText:'',
      isResultShow:false,
      historyList:getLocalStorage('HistoryList')||[]
    };
  },
  components: {
    searchSuggest,
    searchHistory,
    searchResult
  },
  computed: {},
  beforeMount() {
  },
  mounted() {
  },
  methods: {
    onSearch(searchText){
      this.searchText=searchText
      this.isResultShow=true

      let index=this.historyList.indexOf(searchText)
      if(index!==-1){
          this.historyList.splice(index,1)
      }
      this.historyList.unshift(searchText)
      console.log(this.historyList)
      //数据持久化（本地）
      // setLocalStorage('HistoryList',this.historyList)

    }
  },
  watch: {
    historyList(){
      setLocalStorage('HistoryList',this.historyList)
    }
  }

}

</script>

<style lang='less' scoped>

</style>
