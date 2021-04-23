 <template>
  <div class="layout-container">
    <!--  子路由出口  -->
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
    <!--  子路由出口  -->

    <!--  底部导航栏  -->
    <!--  开启路由模式-->
    <van-tabbar active-color="#d43c33" v-model="active"  @change="onChange">
      <van-tabbar-item icon="home-o" to="/">资讯</van-tabbar-item>
      <van-tabbar-item icon="music-o" url="http://39.108.185.160/recommend">音乐</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="account">我的</van-tabbar-item>
    </van-tabbar>
    <!--  底部导航栏  -->

  </div>
</template>

<script>
export default {
  name: 'layoutIndex',
  props: [''],
  data() {
    return {
      active: 0,
    };
  },
  components: {},
  computed: {},
  beforeMount() {
  },
  mounted() {
    this.$store.commit('addCachePage','layoutIndex')
  },
  methods: {
    onChange(index) {
      this.active=index
      console.log(this.active)
    },
  },
  watch: {

  }

}

</script>

<style lang='' scoped>

</style>
