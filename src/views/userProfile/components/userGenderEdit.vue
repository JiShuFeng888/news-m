<template>
    <div class="user-gender-edit">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="$emit('close')"
        :default-index="userGender"
      />
    </div>
</template>

<script>

    export default {
        name:'',
        props:{
          userGender:{
              type:Number,
              require:true
            }
        },
        data () {
            return {
              columns: ['男', '女'],

            };
        },
        components: {},
        computed: {},
        created(){},
        beforeMount() {},
        mounted() {},
        methods: {
          onConfirm(value, index) {
            this.$emit('finishGender',index)
          },
        },
        watch: {}

    }

</script>

<style lang='less' scoped>

</style>
