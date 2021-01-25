<template>
  <div class="layout">
    <el-container>
      <!--头部-->
      <el-header>
        <h1>西太云医</h1>
        <div @click="logout">退出</div>
      </el-header>
      <el-container>
        <!--侧边栏-->
        <el-aside style="width: 200px">
          <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              >
            <el-menu-item v-for="(item,index) in menuList" :index="(index+1).toString()" :key="index" @click="toPage(index)">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 主内容-->
        <el-main>
          <div class="nav-breadcrumb">

          </div>

          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-backtop target=".el-main">👆</el-backtop>
  </div>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {
      navBar: '',
      breadList:[],
      menuList:[{
        title:'首页',
        icon:'el-icon-menu'
      },{
        title:'视频诊疗',
        icon:'el-icon-video-camera'
      }]
    }
  },
  created() {
  },

  methods: {
    toPage(index){
      if(index===0){
          this.$router.push('/index')
      }else if(index===1){
          this.$router.push('/diagnosis')
      }
    },
    logout(){
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>
.layout {
  height: 100%;
  width: 100%;
}

.el-container {
  width: 100%;
  height: 100%;
}

.el-header {
  background-color: #545c64;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  width: 100%;
  position: fixed;
  z-index: 2;
}

.el-aside {
  color: #333;
  border-right:1px solid #e0e2e5;
  padding-top: 60px;
}
.el-menu{
  margin: 0;
  border: none;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  padding-top: 60px;
  position: relative;
}
.nav-breadcrumb{
  background: white;
  padding: 20px;
  margin: 0 -20px;
}
</style>
