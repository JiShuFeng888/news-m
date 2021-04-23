<template>
    <div class="post-comment">
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入评论"
        show-word-limit
      />
      <van-button @click="add" :disabled="!message">发布</van-button>
    </div>
</template>

<script>
import {addCommend} from  '@/api/article'
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
              message:''
            };
        },
        components: {},
        computed: {},
        created(){},
        beforeMount() {},
        mounted() {},
        methods: {
          async add(){
            this.$toast.loading({
              message: '发布中',
              forbidClick: true,
            });
            let data=await addCommend(this.articleId,{
              content:this.message,
            })
            console.log(data)
            this.$emit('onPostSuccess')
            this.message=''
            this.$toast.success('发布成功');
            window.location.reload()
          }
        },
        watch: {}

    }

</script>

<style lang='less' scoped>
.post-comment{
  display: flex;
  align-items: center;
  padding-right: 14px;
  /deep/.van-button{
    width: 80px;
    height: 30px;
  }
}
</style>
