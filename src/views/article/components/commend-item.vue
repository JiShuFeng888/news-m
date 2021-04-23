<template>
    <van-cell class="commend-item">
      <van-image
        class="photo"
        round
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
        slot="icon"
      />
      <div slot="title">
        <div class="name">{{commend.user.nickname}}</div>
        <div class="content">{{commend.content}}</div>
      </div>
      <div><van-button type="default" round size="mini" @click="$emit('replyCommend',commend)">回复</van-button></div>

    </van-cell>
</template>

<script>
    export default {
        name:'',
        props:{
          commend:{
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
        created(){
          // console.log(this.commend)
        },
        beforeMount() {},
        mounted() {},
        methods: {},
        watch: {}

    }

</script>

<style lang='less' scoped>
.commend-item{
  .photo{
    margin-top: 5px;
    width: 36px;
    height: 36px;
    margin-right: 13px;
  }
  .name{
    font-size: 14px;
    color: #406599;
  }
  .content{
    margin-top: 5px;
    font-size: 16px;
    color: #222;
  }
}
</style>
