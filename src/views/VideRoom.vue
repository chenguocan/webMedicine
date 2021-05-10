<template>
  <div class="center-page" >
    <el-card >
      <div class="options">
        <div>通话时长{{time}}</div>
        <div>
          <i class="iconfont icon-tuichu2" style="font-size: 32px;color: red;" @click="exit"></i>
        </div>
        <div>
          <el-button type="warning">病历卡</el-button>
        </div>
      </div>
    </el-card>
    <el-card>
      <div class="liveroom">
        <div>
          <el-card>
            <div class="name" style="text-align: center">
              <i class="iconfont icon-shipin" @click="muteVideo"></i>
              <i class="iconfont icon-yuyin" @click="muteAudio"></i>
              我
            </div>
            <div id='local_stream'
                 class="local-stream" :style="{height:mainHeight,width:mainWidth}" @click="xxx">
            </div>
          </el-card>
        </div>
        <div class="box">
            <div  id="remoteStream"
                  class="distant-stream">
            </div>
        </div>
      </div>
    </el-card>

  </div>
</template>

<script>
//前端测试要导入demo里lib-generate-test-usersig.min.js，不然签名无法成功，后面要从后端签名后返回值。
import LibGenerateTestUserSig from '@/assets/js/lib/lib-generate-test-usersig.min.js'

//导入sdk
import TRTC from "trtc-js-sdk";
import $ from 'jquery';
export default {
  data () {
    return {
      userId: 'user_' + parseInt(Math.random() * 100000000),//用户id --可更改
      roomId: '',//房间号--加入相同房间才能聊
      client: '',//客户端服务
      remoteStream: '',//远方播放流
      localStream: '',//本地流
      userList:[],
      mainWidth:'448px',
      mainHeight:'448px',
      isToggle:false,
      isMuteAudio:false,
      isMuteVideo:false,
      time:0,
      timeId:'',
      id:'',
      login:'123123123'
    }
  },
  created() {
    console.log(this.$route.query);
    this.id=this.$route.query.id;
    this.roomId=parseInt(this.$route.query.room);
    this.checked();
    this.createClient(this.userId);
    this.startVideoServer();
  },
  mounted () {
  },
  destroyed() {
    this.client.unpublish(this.localStream).then(() => {
      // 取消发布本地流成功
    });
    this.leaveRoom(this.client);
  },
  methods: {
    checked(){
      TRTC.checkSystemRequirements().then((result) => {
        if(!result) {
          return this.$message.error('当前浏览器不支持TRTC服务');
        }
      });
    },
    muteAudio(){
      if(this.isMuteAudio===true){
        this.localStream.unmuteAudio();
        this.isMuteAudio=false;
      }else{
        this.localStream.muteAudio();
        this.isMuteAudio=true;
      }
    },
    muteVideo() {
      if(this.isMuteVideo===true){
        this.localStream.unmuteVideo();
        this.isMuteVideo=false;
      }else{
        this.localStream.muteVideo();
        this.isMuteVideo=true;
      }
    },
    xxx(){
      if(!this.isToggle){
        this.mainHeight='200px';
        this.mainWidth='200px';
        this.isToggle=true;
      }else{
        this.mainHeight='448px';
        this.mainWidth='448px';
        this.isToggle=false;
      }
    },
    async exit(){
      await this.stopVideoServer();
      setTimeout(()=>{
        this.$router.push('/diagnosis')
      },0)
    },
    //创建链接
    createClient (userId) {
      //获取签名
      const config = this.genTestUserSig(userId)
      const sdkAppId = config.sdkAppId
      const userSig = config.userSig
      this.client = TRTC.createClient({
        mode: 'videoCall',
        sdkAppId,
        userId,
        userSig
      });
      //注册远程监听，要放在加入房间前--这里用了发布订阅模式
      this.subscribeStream(this.client)
      //初始化后才能加入房间
      this.joinRoom(this.client, this.roomId);
    },
    //加入房间
    joinRoom (client, roomId) {
      client.join({ roomId })
          .catch(error => {
            console.error('进房失败 ' + error);
          })
          .then(() => {
            console.log('进房成功');
            //创建本地流
            this.createStream(this.userId);
            //播放远端流
            this.playStream(this.client)
          });
    },

    //创建本地音视频流
    createStream (userId) {
      const localStream = TRTC.createStream({ userId, audio: true, video: true });
      this.localStream =localStream
      //创建好后才能发布
      localStream
          .initialize()
          .catch(error => {
            console.error('初始化本地流失败 ' + error);
          })
          .then(() => {
            console.log('初始化本地流成功');
            // 创建好后才能播放 本地流播放 local_stream 是div的id
            localStream.play('local_stream');
            this.publishStream(localStream, this.client)

          });
    },
    async startVideoServer(){
        let res=await this.$request.post('/doctor/startVideoServer',{
          id:this.id,
          login:this.login
        })
        console.log(res)
    },
    async stopVideoServer(){
      let res=await this.$request.post('/doctor/stopVideoServer',{
        id:this.id,
        login:this.login
      })
      console.log(res)
    },
    //发布本地音视频流
    publishStream (localStream, client) {
      client
          .publish(localStream)
          .catch(error => {
            console.error('本地流发布失败 ' + error);
          })
          .then(() => {
            console.log('本地流发布成功');
          });
    },

    //订阅远端流--加入房间之前
    subscribeStream (client) {
      client.on('stream-added', event => {
        const remoteStream = event.stream;
        console.log('远端流增加: ' + remoteStream.getId());
        //订阅远端流
        client.subscribe(remoteStream);
        if(this.time===0){
          this.timeId=setInterval(()=>{
            this.time++;
          },1000);
        }
      });
    },

    //播放远端流
    playStream (client) {
      client.on('peer-join',event=>{
        const userId=event.userId;
        console.log('加入了');
        this.userList.push(userId);
      })
      client.on('stream-removed',event=>{
        console.log('远端移除',event.stream);
        const remoteStream = event.stream;
        remoteStream.stop();
        let name=`${'remote_stream-' + remoteStream.getId()}`;
        let dom=document.querySelector(`#${name}`);
        if(dom){
          dom.parentNode.removeChild(dom);
        }

      })
      client.on('stream-subscribed', event => {
        const remoteStream = event.stream;
        remoteStream.isAudioMute=false;
        remoteStream.isVideoMute=false;
        console.log('远端流订阅成功：' + remoteStream.getId());
        console.log(remoteStream);
        let userId=remoteStream.userId_;
        // 创建远端流标签，因为id是动态的，所以动态创建，用了v-html
        if(this.userList.length!==0){
          let dom=document.createElement('div');
          dom.setAttribute('id',`${'remote_stream-' + remoteStream.getId()}`);
          dom.style.width='200px';
          dom.style.height='200px';
          dom.style.marginLeft='20px';
          dom.style.marginBottom='20px';
          dom.onclick= (e)=>{
            e.stopPropagation();
            if(dom.style.width==='200px'){
              dom.style.width='336px';
              dom.style.height='448px';
              this.$forceUpdate();
            }else{
              dom.style.width='200px';
              dom.style.height='200px';
            }
          }
          let div=$('<div></div>');
          let video=$('<i></i>');
          let audio=$('<i></i>');
          let p=$('<p></p>');
          video.attr('class','iconfont icon-shipin');
          audio.attr('class','iconfont icon-yuyin');
          p.html(userId);
          video.appendTo(div);
          audio.appendTo(div);
          p.appendTo(div);
          div.css({'display': 'flex','justifyContent':'center'});
          div.appendTo(dom);
          div.click(function (e){
            e.stopPropagation();
          })
          video.click(function (e){
            e.stopPropagation();
            if(remoteStream.isVideoMute===true){
              remoteStream.unmuteVideo();
              remoteStream.isVideoMute=false;
            }else{
              remoteStream.muteVideo();
              remoteStream.isVideoMute=true;
            }
          })
          audio.click(function (e){
            e.stopPropagation();
            if(remoteStream.isAudioMute===true){
              remoteStream.unmuteAudio();
              remoteStream.isAudioMute=false;
            }else{
              remoteStream.muteAudio();
              remoteStream.isAudioMute=true;
            }
          })
          let remoteDiv=document.querySelector('#remoteStream');
          remoteDiv.appendChild(dom);
          //做了dom操作 需要使用$nextTick(),否则找不到创建的标签无法进行播放
          this.$nextTick(() => {
            //播放
            remoteStream.play('remote_stream-' + remoteStream.getId());
          })
        }
      });
      client.on('mute-audio', event => {
        const userId = event.userId;
        console.log(userId);
      });
    },

    removeStream(client){
      client.on('stream-removed',event=>{
        const remoteStream=event.stream;
        console.log('移动',remoteStream);
      })
    },
    //退出音视频
    leaveRoom (client) {
      let that=this;
      client
          .leave()
          .then(() => {
            console.log('退房成功')
            // 停止本地流，关闭本地流内部的音视频播放器
            that.localStream.stop();
            // 关闭本地流，释放摄像头和麦克风访问权限
            that.localStream.close();
            that.localStream = null;
            that.userList=[];
            that.remoteStream=null;
            that.client = null
            // 退房成功，可再次调用client.join重新进房开启新的通话。
          })
          .catch(error => {
            console.error('退房失败 ' + error);
            // 错误不可恢复，需要刷新页面。
          });
    },


    //获取用户签名--前端测试用
    genTestUserSig (userID) {
      /**
       * 腾讯云 SDKAppId，需要替换为您自己账号下的 SDKAppId。
       *
       * 进入腾讯云实时音视频[控制台](https://console.cloud.tencent.com/rav ) 创建应用，即可看到 SDKAppId，
       * 它是腾讯云用于区分客户的唯一标识。
       */
      const SDKAPPID = 1400476021;
      /**
       * 签名过期时间，建议不要设置的过短
       * <p>
       * 时间单位：秒
       * 默认时间：7 x 24 x 60 x 60 = 604800 = 7 天
       */
      const EXPIRETIME = 604800;
      /**
       * 计算签名用的加密密钥，获取步骤如下：
       *
       * step1. 进入腾讯云实时音视频[控制台](https://console.cloud.tencent.com/rav )，如果还没有应用就创建一个，
       * step2. 单击“应用配置”进入基础配置页面，并进一步找到“帐号体系集成”部分。
       * step3. 点击“查看密钥”按钮，就可以看到计算 UserSig 使用的加密的密钥了，请将其拷贝并复制到如下的变量中
       *
       * 注意：该方案仅适用于调试Demo，正式上线前请将 UserSig 计算代码和密钥迁移到您的后台服务器上，以避免加密密钥泄露导致的流量盗用。
       * 文档：https://cloud.tencent.com/document/product/647/17275#Server
       */
      const SECRETKEY =
          "c188a146da5116bd07882e99a5891e874db39af7695f9e69a46c5fc0876baf67";

      // a soft reminder to guide developer to configure sdkAppId/secretKey
      if (SDKAPPID === "" || SECRETKEY === "") {
        alert(
            "请先配置好您的账号信息： SDKAPPID 及 SECRETKEY " +
            "\r\n\r\nPlease configure your SDKAPPID/SECRETKEY in js/debug/GenerateTestUserSig.js"
        );
      }
      const generator = new LibGenerateTestUserSig(SDKAPPID, SECRETKEY, EXPIRETIME);
      const userSig = generator.genTestUserSig(userID);
      return {
        sdkAppId: SDKAPPID,
        userSig: userSig
      };
    }
  }
}
</script>

<style lang="scss" scoped>
.options{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.center-page{
  height: 100%;
  width: 100%;
}
.liveroom{
  display: flex;
}
//远端流
.box{
  display: flex;
}
.distant-stream {
  display: flex;
  margin-left: 20px;
}
</style>
