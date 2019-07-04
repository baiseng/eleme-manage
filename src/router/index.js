import Vue from 'vue'
import Router from 'vue-router'
//引入子路由
import store from './store'
import goods from './goods'
import data from './data';
import person from './person';

Vue.use(Router);
//分类路由汇总
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...store,
    ...goods,
    ...data,
    ...person
  ]
})
