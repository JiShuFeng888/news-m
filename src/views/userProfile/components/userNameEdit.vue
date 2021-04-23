<template>
    <div class="user-name-edit">
      <van-nav-bar
        left-text="取消"
        right-text="确认"
        left-arrow
        @click-left="$emit('editNameBack')"
        @click-right="$emit('FinishName',localName)"
      />

      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="10"
        show-word-limit
      />
    </div>
</template>

<script>
    export default {
        name:'',
        props:{
          userName:{
            type:String,
            require:true
          }
        },
        data () {
            return {
              localName:this.userName
            };
        },
        components: {},
        computed: {},
        created(){},
        beforeMount() {},
        mounted() {},
        methods: {
          onClickLeft(){

          },
          onClickRight(){

          }
        },
        watch: {}

    }

</script>

<style lang='' scoped>

</style>
