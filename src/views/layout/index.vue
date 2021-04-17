 <template>
  <div class="layout-container">
    <!--  子路由出口  -->
    <router-view></router-view>
    <!--  子路由出口  -->

    <!--  底部导航栏  -->
    <!--  开启路由模式-->
    <van-tabbar active-color="#d43c33" v-model="active"  @change="onChange">
      <van-tabbar-item icon="home-o" to="/">资讯</van-tabbar-item>
      <van-tabbar-item icon="search" to="music">音乐</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="search">搜索</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="account">我的</van-tabbar-item>
    </van-tabbar>
    <!--  底部导航栏  -->

  </div>
</template>

<script>
export default {
  name: '',
  props: [''],
  data() {
    return {
      active: 0,
      // icon: {
      //   active: 'https://img01.yzcdn.cn/vant/user-active.png',
      //   inactive: 'https://img01.yzcdn.cn/vant/user-inactive.png',
      // },
    };
  },
  components: {},
  computed: {},
  beforeMount() {
  },
  mounted() {
  },
  methods: {
    onChange(index) {
      this.active=index
      console.log(this.active)
    },
  },
  watch: {}

}

</script>

<style lang='' scoped>

</style>
