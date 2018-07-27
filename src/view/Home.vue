<template>
  <el-row class="panel m-w-1280">

    <el-col :span="24" class="panel-top">

      <el-col :span="4">
        <template>
          <span class="p-l-20">后台管理</span>
        </template>
      </el-col>

      <el-col :span="4" class="pos-rel">
        <el-dropdown @command="handleMenu" class="user-menu">
          <span class="el-dropdown-link c-gra" style="cursor: default">
            {{username}}&nbsp;&nbsp;<i class="fa fa-user" aria-hidden="true"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>

    </el-col>

    <el-col :span="3" class="panel-center">
      <aside class="w-180 ovf-hd">
        <!-- <leftMenu :menuData="menuData" :menu="menu" ref="leftMenu"></leftMenu> -->
        <template>
          <div>  
            <!-- <h2 style="color:red">权限</h2> -->
            <div v-for="secMenu in menuData">
              <div class="c-light-gray p-l-10 m-t-15" style="color:#00CCFF">{{secMenu.title}}</div>
              <div class="h-50" v-for="item in secMenu.child">
                  <div class="w-100p h-50 p-l-40 left-menu pointer c-blue" style="color:#FFCCFF">{{item.title}}</div>
                <div class="h-50" v-for="val in item.child">
                  <template>
                    <div class="w-100p h-50 p-l-40 left-menu pointer c-gra" @click="routerChange(val)" style="color:white">{{val.title}}</div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </template>

      </aside>
    </el-col>
    <el-col :span="24" class="panel-center-right">
      <section class="panel-c-c">
        <div class="grid-content">
          <el-col :span="16">
            <transition>
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>

  </el-row>
</template>

<script>
  // import leftMenu from './system/leftMenu.vue'
  import http from '../common/http.js'

  export default {
    data() {
      return {
        username: '',
        topMenu: [],
        childMenu: [],
        menuData: [],
        hasChildMenu: false,
        menu: null,
        module: null,
        img: '',
        title: '',
        logo_type: null
      }
    },
    methods: {
      routerChange(item)  {
        // 与当前页面路由相等则刷新页面
        if (item.url != this.$route.path) {
          this.$router.push(item.url)
        } else {
          // _g.shallowRefresh(this.$route.name)
        }
        // this.$router.push('/home/config')
      },
      logout() {
        this.$router.push('/init')
      },
      switchTopMenu(item) {
        // if (!item.child) {
        //   router.push(item.url)
        // } else {
        //   router.push(item.child[0].child[0].url)
        // }
      },
      handleMenu(val) {
        switch (val) {
          case 'logout':
            this.logout()
            break
        }
      },
      getTitleAndLogo() {
        this.apiPost('http://localhost:8090/admin/configs').then((res) => {
          this.handelResponse(res, (data) => {
            document.title = data.SYSTEM_NAME
            this.logo_type = data.LOGO_TYPE
            this.title = data.SYSTEM_NAME
            // this.img = window.HOST + data.SYSTEM_LOGO
          })
        })
      },
      getUsername() {
        this.username = JSON.parse(window.localStorage.getItem('userInfo')).username
      }
    },
    created() {
      this.getTitleAndLogo()
      let authKey = window.localStorage.getItem('authKey')
      let sessionId = window.localStorage.getItem('coffeeSession')
      if (!authKey || !sessionId) {
        _g.toastMsg('warning', '您尚未登录')
        setTimeout(() => {
          router.replace('/')
        }, 1500)
        return
      }
      this.getUsername()

      let data = JSON.parse(window.localStorage.getItem('menus'))
      this.menuData = data

      // let menus = JSON.parse(window.localStorage.getItem('menus'))
      // this.menu = this.$route.meta.menu
      // this.module = this.$route.meta.module
      // this.topMenu = menus
      // _(menus).forEach((res) => {
      //   if (res.module == this.module) {
      //     this.menuData = res.child
      //     res.selected = true
      //   } else {
      //     res.selected = false
      //   }
      // })
    },
    computed: {
      // routerShow() {
      //   return store.state.routerShow
      // },
      showLeftMenu() {
        // this.hasChildMenu = store.state.showLeftMenu
        // return store.state.showLeftMenu
        return true;
      }
    },
    // components: {
    //   leftMenu,
    // },

    // watch: {
    //   '$route' (to, from) {
    //     _(this.topMenu).forEach((res) => {
    //       if (res.module == to.meta.module) {
    //         res.selected = true
    //         if (!to.meta.hideLeft) {
    //           this.menu = to.meta.menu
    //           this.menuData = res.child
    //         }
    //       } else {
    //         res.selected = false
    //       }
    //     })
    //   }
    // },
    // mixins: [http]
  }
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s
  }
  
  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
  
  .panel {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }
  
  .panel-top {
    height: 60px;
    line-height: 60px;
    background: #1F2D3D;
    color: #c0ccda;
  }
  
  .panel-center {
    background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
  }

  .panel-center-right {
    background: #f1f2f7;
    position: absolute;
    top: 60px;
    left: 230px;
    bottom: 0px;
    overflow: hidden;
  }
  
  .panel-c-c {
    background: #f1f2f7;
    position: absolute;
    right: 0px;
    top: 0px;
    bottom: 0px;
    left: 180px;
    overflow-y: scroll;
    padding: 20px;
  }
  
  .logout {
    /*background: url(../assets/images/logout_36.png);*/
    background-size: contain;
    width: 20px;
    height: 20px;
    float: left;
  }
  
  .logo {
    width: 150px;
    float: left;
    margin: 10px 10px 10px 18px;
  }
  
  .tip-logout {
    float: right;
    margin-right: 20px;
    padding-top: 5px;
    cursor: pointer;
  }
  
  .admin {
    color: #c0ccda;
    text-align: center;
  }
  .hide-leftMenu {
    left: 0px;
  }
  .leftColor{
    background: #FFCCFF;
  }
</style>
