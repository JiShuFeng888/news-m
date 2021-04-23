<template>
  <div id="app">
    <keep-alive :include="cachePages">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name:'',
  props:[''],
  data () {
    return {

    };
  },
  components: {},
  computed: {
    ...mapState(['cachePages'])
  },
  created(){},
        beforeMount() {},
        mounted() {},
        methods: {},
        watch: {}

    }

</script>

<style lang='' scoped>

</style>
