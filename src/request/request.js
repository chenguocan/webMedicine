import axios from 'axios';
// 创建axios实例
// 创建请求时可以用的配置选项
// axios的全局配置
axios.defaults.baseURL = 'https://www.hotelcard.cn/TheHeavens/Doctor/';   /*  http://59.60.7.188:49168  http://2j7293900n.zicp.vip:38090 http://172.16.2.12:49168*/
//https://www.hotelcard.cn/TheHeavens/Wysx
//https://www.hotelcard.cn/TheHeavens/JunTai
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/*axios.interceptors.request.use(config=>{
    let uid=sessionStorage.getItem('uid');
    let sign=sessionStorage.getItem('sign');
    if(uid && sign) {
        config.headers.common.uid = uid;
        config.headers.common.sign = sign;
    }
    return config
},error => {
    return Promise.error(error);
})*/
export  default axios;

