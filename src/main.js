import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Login from './Login'
import axios from 'axios'
import filter from './filter'


//饿了么ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.use(filter);

axios.interceptors.request.use(config=>{
  config.baseURL='http://127.0.0.1:3000';
  config.headers.Authorization=vue.$store.state.token;
  return config;
});

axios.interceptors.response.use(({data})=>{
  if (data.ok === -1) {
    // console.log(data.data.msg);
    vue.$message.error(data.msg)
  }
  return data ;
});


Vue.prototype.$axios=axios;


Vue.config.productionTip = false;

//首先把本地token加载到localstorage中
store.state.token=localStorage.token;

let vue=new Vue({
  router,
  store,
  render: h => h(store.state.token?App:Login)
}).$mount('#app');
