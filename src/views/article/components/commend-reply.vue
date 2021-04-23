<template>
    <div class="commend-reply">
      <van-nav-bar title="评论回复">
        <van-icon name="cross" slot="left" @click="$emit('closeReply')"></van-icon>
      </van-nav-bar>

      <commendItem :commend="replayCommend"></commendItem>
      <van-cell title="所有回复"></van-cell>

      <commendList :articleId="replayCommend.id"></commendList>
    </div>
</template>

<script>
import commendList from './commend-list'
import commendItem from './commend-item'
    export default {
        name:'',
        props:{
          replayCommend:{
            type:Object,
            require:true
          }
        },
        data () {
            return {

            };
        },
        components: {
          commendList,
          commendItem

        },
        computed: {},
        created(){},
        beforeMount() {},
        mounted() {},
        methods: {},
        watch: {}

    }

</script>

<style lang='' scoped>

</style>
