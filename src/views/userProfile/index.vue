<template>
    <div class="userProfile">
      <van-nav-bar
        title="个人中心"
        left-arrow
        @click-left="$router.back()"
        class="nav-bar"
        right-text="完成"
        @click-right="onEditFinish"
      />

      <input type="file" hidden ref="file" accept="image/*" @change="onFileChange">
      <van-cell is-link title="头像" center @click="$refs.file.click()">
        <van-image
          width="30"
          round
          height="30"
          :src="userProfile.head_img"
        />
      </van-cell>
      <van-cell is-link title="昵称" :value="userProfile.nickname" @click="isNameEditShow=true">
      </van-cell>
      <van-cell title="性别" is-link :value="userProfile.gender===0?'男':'女'" @click="isGenderEditShow=true"></van-cell>

      <!--   编辑用户昵称   -->
      <van-popup  position="bottom" :style="{ height: '50%' }"  v-model="isNameEditShow">
        <userNameEdit v-if="isNameEditShow" @editNameBack="isNameEditShow=false" :userName="userName" @FinishName="finishName"></userNameEdit>
      </van-popup>
      <!--   编辑用户昵称   -->

      <!--   编辑用户性别   -->
      <van-popup  position="bottom" :style="{ height: '50%' }"  v-model="isGenderEditShow">
        <userGenderEdit v-if="isGenderEditShow" :userGender="userGender" @close="isGenderEditShow=false" @finishGender="finishGender"></userGenderEdit>
      </van-popup>
      <!--   编辑用户性别   -->

      <!--   编辑用户头像   -->
      <van-popup  position="bottom" :style="{ height: '100%' }"  v-model="isPhotoEditShow" class="update-photo-popup">
          <userPhotoEdit v-if="isPhotoEditShow"  :img="img" @close="isPhotoEditShow=false" @finishPhoto="finishPhoto"></userPhotoEdit>
      </van-popup>
      <!--   编辑用户头像   -->

    </div>
</template>

<script>
    import {mapState} from "vuex";
    import {getUserProfile} from '@/api/user'
    import userNameEdit from './components/userNameEdit'
    import userGenderEdit from './components/userGenderEdit'
    import userPhotoEdit from './components/userPhotoEdit'
    import {updateUserProfile} from '@/api/article'

    export default {
        name:'',
        props:[''],
        data () {
            return {
                userProfile:{},
                isNameEditShow: false,//编辑昵称的显示状态
                isGenderEditShow:false,//编辑性别的显示状态
                isPhotoEditShow:false,//编辑头像的显示状态
                img: null,
                userName:'',
                userGender:0,
                userImage:null,


            };
        },
        components: {
          userNameEdit,
          userGenderEdit,
          userPhotoEdit
        },
        computed: {
          ...mapState(['user'])
        },
        created(){
          this.loadingUserProfile()
        },
        beforeMount() {},
        mounted() {},
        methods: {
          onFileChange(){
            //解决相同文件不触发change事件
            const oImg=this.$refs.file.files[0]
            this.img=oImg

            this.isPhotoEditShow=true
            this.$refs.file.value=""
          },
          finishName($event){
            this.userName=$event
            this.userProfile.nickname=$event
            this.isNameEditShow=false
            console.log(this.userName)
          },
          finishGender($event){
            this.userGender=$event
            this.userProfile.gender=$event
            this.isGenderEditShow=false
          },
          finishPhoto($event){
            this.userImage=$event[1]
            this.userProfile.head_img=$event[0]
            this.isPhotoEditShow=false
          },
          async onEditFinish(){
            try {
              this.$toast.loading("修改中...")
              console.log(this.userProfile.id)
              await updateUserProfile(this.userProfile.id,{
                nickname:this.userName,
                // head_img:this.userImage,
                gender:this.userGender
              })
              this.$toast.success("修改成功")
              this.$router.push('/account')
              window.location.reload()
            }catch (err){
              this.$toast.fail("修改失败")
              console.log(err)
            }
          },
          //加载用户信息
          async loadingUserProfile(){
           let data= await getUserProfile(this.user.user.id)
            this.userProfile=data.data.data
            this.userName=data.data.data.nickname
            this.userGender=data.data.data.gender
            console.log(data.data.data)
          }
        },
        watch: {}

    }

</script>

<style lang='less' scoped>
.update-photo-popup{
  background-color: #000;
}
</style>
