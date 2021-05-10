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


    <el-dialog
        title="消息通知"
        :visible.sync="noticeVisible"
        width="50%"
        >
      <el-table
          :data="tableData"
          style="width: 100%"
          border>
        <el-table-column
            prop="id"
            label="id"
            >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="toVideo(scope.row.id,scope.row.room)" type="primary">通话</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--<span slot="footer" class="dialog-footer">
          <el-button @click="noticeVisible = false">取 消</el-button>
          <el-button type="primary" @click="toVideo">接听</el-button>
      </span>-->
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {
      path:'ws://www.hotelcard.cn:1225',
      ws:{},
      navBar: '',
      breadList:[],
      noticeVisible:false,
      menuList:[{
        title:'首页',
        icon:'el-icon-menu'
      },{
        title:'视频诊疗',
        icon:'el-icon-video-camera'
      }],
      room:'',
      tableData:[],
      intervalId:'',
    }
  },
  created() {
    this.init()
  },
  destroyed() {
    clearInterval(this.intervalId);
  },
  methods: {
    toVideo(id,room){
      console.log(id);
      console.log(room);
      this.noticeVisible=false;
      this.$router.push({path:'/liveroom',query:{id:id,room:room}});
      /*this.$router.push('/liveroom');*/
    },
    init(){
      this.intervalId=setInterval(()=>{
        this.GetVideoServerRequest();
      },5000)
      /*this.ws=new WebSocket(this.path);
      this.ws.onopen=()=>{
          console.log('连接成功')
      };
      this.ws.onmessage=(data)=>{
        console.log(data.data);
        let res=JSON.parse(data.data);
        console.log(res);
        if(res.errCode===0){
            this.noticeVisible=true;
            this.tableData=res.data;
        }
      }
      this.ws.onclose=()=>{

      }
      this.ws.onerror=(error)=>{
        console.log(error)
      }*/
    },
    async GetVideoServerRequest(){
      let res=await this.$request.post('/doctor/GetVideoServerRequest',{
        id:'123',
        login:'12312412'
      })
      if(res.data.errCode===0){
        if(res.data.data.length!==0){
          this.tableData=res.data.data;
          this.noticeVisible=true;
        }
      }
    },
    toPage(index){
      if(index===0){
          this.$router.push('/index')
      }else if(index===1){
          this.$router.push('/diagnosis')
      }
    },
    logout(){
      clearInterval(this.intervalId);
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
