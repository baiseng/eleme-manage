<template>
  <el-container>
    <el-header>
      <el-row>
        <!--                  isCollapse为true或false宽度-->
        <!--                  span栅格占据的列数,默认是24-->
        <el-col class="logo" :span="8" :style="{width:isCollapse?'70px':'250px'}">
          <strong>{{isCollapse?'饿':'饿了么后台管理系统'}}</strong>
        </el-col>
        <el-col class="info" :span="8">
          <i :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"
             @click="isCollapse=!isCollapse"></i>
        </el-col>
        <el-col class="adminInfo" :span="6">
          <el-dropdown>
                        <span class="el-dropdown-link">
                            <!--用户名-->
                            <span>{{alias}}</span>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="$store.commit('CHANGE_TOKEN')">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside :style="{width:isCollapse?'auto':'220px'}">
        <el-menu default-active="1-1" class="el-menu-vertical-demo" :collapse="isCollapse">
          <!--                     指定展开的项default-active="1-1"-->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">店铺管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="$router.push('/storeInfo')">店铺信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="$router.push('/goodsFind')">查看商品</el-menu-item>
              <el-menu-item index="2-2" @click="$router.push('/goodsFind')">添加商品</el-menu-item>
              <el-menu-item index="2-3" @click="$router.push('/goodsFind')">修改商品</el-menu-item>
              <el-menu-item index="2-4" @click="$router.push('/goodsFind')">管理分类</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">数据分析</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" @click="$router.push('/dataSale')">销量</el-menu-item>
              <el-menu-item index="3-2" @click="$router.push('/dataSale')">评价</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">个人中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1" @click="$router.push('/personInfo')">我的信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!--根路由的占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  export default {
    data() {
      return {
        isCollapse: false, //是否折叠，false不折叠
        alias:'无'
      }
    },
    mounted(){
        this.$axios.get('/user/my').then(data=>{
            if (data.ok > 0) {
                this.alias=data.user.alias;
            }
      })
    }
  }
</script>
<style lang="less">
  * {
    padding: 0;
    margin: 0;
  }

  .el-header {
    padding: 0 !important;
    background: #409EFF;
    color: #ffffff;

    .logo {
      text-align: center;
      width: 240px;
      font-size: 25px;
      line-height: 60px;
      border-right: 1px solid rgba(238, 241, 146, 0.3);
      height: 60px;
    }

    .info {
      font-size: 30px;
      line-height: 60px;
      color: #000;
    }

    .adminInfo {
      float: right;
      text-align: right;
      padding-right: 20px;
      line-height: 60px;

      .el-dropdown-link {
        span {
          color: #000;
        }
      }
    }
  }

  /*aside*/
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .toolbar {
    background:#f4f4f4;
    padding:10px;
    margin:20px 0!important;
  }
</style>
