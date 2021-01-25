<template>
  <div>
    <div class="image-container">
      <el-container>
        <el-header>
        </el-header>
        <el-container>
          <el-aside width="225px">
            <ul>
              <li style="background: white;text-align: center">今日预约</li>
              <li class="img-item" @click="currentAlbum(index)" :class="{active:albumIndex===index}"  v-for="(item,index) in imageList" :key="index">
                <span>{{item.name}}</span>
              </li>
            </ul>
          </el-aside>
          <el-main>
            <el-button @click="toVideo" type="primary">开始视频</el-button>
          </el-main>
        </el-container>
        <el-footer></el-footer>
      </el-container>
    </div>


  </div>
</template>

<script>
export default {
  name: "ImgList",
  data() {
    return {
      imageList: [],
      albumIndex:0,
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
    toVideo(){
      this.$router.push('/liveroom');
    },
    currentAlbum(index){
      this.albumIndex=index;
    },

  }
}
</script>

<style scoped lang="scss">
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
