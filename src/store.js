import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token:''
  },
  mutations: {
    CHANGE_TOKEN(token){
      if (token instanceof String) {
        console.log('字符串');
        this.state.token=localStorage.token=token;
      }else{
        this.state.token=localStorage.token='';
      }
    }
  },
  actions: {

  }
})
