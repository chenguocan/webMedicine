<template>
  <div>
    <div class="image-container">
      <el-container>
        <el-header>
        </el-header>
        <el-container>
          <el-aside width="225px">
            <ul>
              <li class="img-item" @click="currentAlbum(index)" :class="{active:albumIndex===index}"  v-for="(item,index) in imageList" :key="index">
                <span>{{item.name}}</span>
              </li>
            </ul>
          </el-aside>
          <el-main style="display: flex;flex-direction: column;">
            <el-card>
              <div style="display: flex;justify-content: space-between">
                患者信息
                <el-button type="warning" @click="MedicineCard">病历卡</el-button>
              </div>
              <el-divider></el-divider>
              <div class="patient">
                <img class="picture" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2563834603,2407137807&fm=26&gp=0.jpg" />
                <div class="detail">
                  <div class="name">姓名:陈国灿</div>
                  <div class="name">年龄:60</div>
                  <div class="name">性别:男</div>
                  <div class="name">症状描述:</div>
                </div>
              </div>
            </el-card>
            <el-button @click="toVideo" style="align-self: center;margin-top: 20px" type="primary">开始视频</el-button>
          </el-main>
        </el-container>
        <el-footer></el-footer>
      </el-container>
    </div>

    <el-dialog title="提示" :visible.sync="messageDialog">
      <div v-html="message"></div>
    </el-dialog>
  </div>
</template>

<script>
import TRTC from "trtc-js-sdk";
export default {
  name: "ImgList",
  data() {
    return {
      imageList: [],
      albumIndex:0,
      messageDialog:false,
      message:'',
    }
  },
  created() {
    for(let i=1;i<20;i++){
      let xxx={
        name:'患者_'+i,
        num:Math.floor(Math.random()*100),
        order:0,
      }
      this.imageList.push(xxx);
    }
  },
  methods: {
    MedicineCard(){
      const loading=this.$loading({
        lock: true,
        text: '数据加载...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close();
        this.$message({
          message:'数据库连接失败,请检查网络是否通畅',
          type:'error'
        })
      }, 2000);
    },
    async check(){
      let checkResult = await TRTC.checkSystemRequirements();
      let deviceDetectionRemindInfo = '';
      let checkDetail = checkResult.detail;
      console.log('checkResult', checkResult.result, 'checkDetail', checkDetail);
      if (!checkResult.result) {
        // 通过TRTC获取详细不支持的信息
        // 查看链接是否符合webRtc限制
        if (
            location.protocol !== 'https:' &&
            location.hostname !== 'localhost' &&
            location.origin !== 'file://'
        ) {
          const loading=this.$loading({
            lock: true,
            text: '视频连接中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          setTimeout(()=>{
            deviceDetectionRemindInfo =
                '请检查链接, webRTC 支持以下三种环境:<br>' +
                '1) localhost 域<br>' +
                '2) 开启了 HTTPS 的域<br>' +
                '3) 使用 file:/// 协议打开的本地文件';
            loading.close();
            this.messageDialog=true;
            this.message=deviceDetectionRemindInfo;
          },5000);
          return false;
        }
      }
      return true;
    },
    async toVideo(){
      let check=await this.check();
      if(check===false){
          return;
      }else{
        /*this.$router.push('/liveroom');*/
      }
    },
    currentAlbum(index){
      this.albumIndex=index;
    },

  }
}
</script>

<style scoped lang="scss">
.patient{
  display: flex;

  .detail{
    margin-left: 10px;
    .name{

    }
  }
}
.picture{
  margin: 10px;
  height: 140px;
  width: 120px;
}
.image-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 114px;
  bottom: 0;
}

.el-header, .el-footer {
  background-color: #fcfcfc;
  color: #333;
}

.options {

}

.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-footer {
  bottom: 0;
  position: absolute;
  left: 0;
  right: 0;
}

.search {
  margin-left: 10px;
}

.el-aside {
  background-color: #e6e9ea;
  color: #333;
  bottom: 60px;
  position: absolute;
  left: 0;
  top: 60px;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  bottom: 60px;
  position: absolute;
  left: 225px;
  right: 0;
  top: 60px;
}
.img-item{
  background: #ffffff;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom:1px solid #e4e9ee;
  cursor: pointer;
  .edit{
    background: #b7d6f8;
    padding: 2px;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
  }
  span{
    margin: 0 15px;
  }
}
.img-item:hover{
  background: #f1f4fa;
}
.active{
  background: #E9EEF3;
}
.picture-list{
  display: flex;
  flex-wrap: wrap;
}
.picture-item{
  margin:0 20px 20px 0;
  box-shadow: 1px 1px 10px #dcdcde;
  height: 150px;
  width: 160px;
  border-radius: 3px;
  img{
    border-radius: 3px;
    width: 160px;
    height: 120px;
  }
}
.preview-image{
  width: 100%;
}
.el-button-group{
  margin: 0 auto;
}
</style>
