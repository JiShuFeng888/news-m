<template>
    <div class="user-photo-edit">
      <img alt="" :src="image" ref="image" class="image">
      <van-nav-bar
        left-text="取消"
        right-text="确认"
        @click-left="$emit('close')"
        @click-right="onConfirm"
      />
    </div>
</template>

<script>
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
    export default {
        name:'',
        props:{
          img:{
            require:true
          }
        },
        data () {
            return {
              image:window.URL.createObjectURL(this.img),
              cropper:null//裁切器实例
            };
        },
        components: {},
        computed: {},
        created(){

        },
        beforeMount() {},
        mounted() {
          const image = this.$refs.image
          this.cropper = new Cropper(image, {
            // aspectRatio: 16 / 9,
            // crop(event) {
            //   console.log(event.detail.x)
            //   console.log(event.detail.y)
            //   console.log(event.detail.width)
            //   console.log(event.detail.height)
            //   console.log(event.detail.rotate)
            //   console.log(event.detail.scaleX)
            //   console.log(event.detail.scaleY)
            // }
            viewMode: 1,
            dragMode: 'move',
            aspectRatio: 1,
            // autoCropArea: 1,
            cropBoxMovable: false,
            cropBoxResizable: false,
            background: false,
            movable: true
          })
          // console.log(this.cropper)
        },
        methods: {
          getCroppedCanvas(){
            return new Promise(resolve=>{
              this.cropper.getCroppedCanvas().toBlob((file) => {
                    resolve(file)
          }
            )
          })
        },
        async onConfirm(){
            const file=await this.getCroppedCanvas()
            let fd=new FormData()
            fd.append('photo',file)

            // let fd=new FormData()
            // fd.append('photo',this.image)
            this.$emit('finishPhoto',[window.URL.createObjectURL(file),fd])
          }
        },
        watch: {}

    }

</script>

<style lang='less' scoped>
.image{
    display: block;

    /* This rule is very important, please don't ignore this */
    max-width: 100%;
}
/deep/.van-nav-bar{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
}

</style>
