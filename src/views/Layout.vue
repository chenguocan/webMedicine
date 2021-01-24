<template>
  <div class="layout">
    <el-container>
      <!--头部-->
      <el-header>
        <h1>西太云医</h1>
        <div @click="xxx">退出</div>
      </el-header>
      <el-container>
        <!--侧边栏-->
        <el-aside style="width: 200px">

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
    }
  },
  created() {
  },

  methods: {
    xxx(){
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
