//定义路由器
import Router from 'vue-router'
// import Home from './view/Home.vue'
// import menuList from './view/Hello.vue'

const router = new Router({
  routes: [
    {path: '/', redirect: '/init'},
    {path: '/init', component: resolve => require(['./view/Login.vue'], resolve)},
    // {path: '/home', //meta: {requiresAuth: true}，
    //  component: resolve => require(['./view/Home.vue'], resolve)},
    // {path: '/hello', component: resolve => require(['./view/Hello.vue'], resolve)},

    // {path: '/users', component: resolve => require(['./view/system/users.vue'], resolve)},
    {path: '/roles', component: resolve => require(['./view/system/leftMenu.vue'], resolve)},

    {
        path: '/home',
        component: resolve => require(['./view/Home.vue'], resolve),
        children: [
            {path: '/home/menu/list', component: resolve => require(['./view/Hello.vue'], resolve)},
            {path: '/home/config/add', component: resolve => require(['./view/system/info.vue'], resolve)},
            {path: '/home/rule/list', component: resolve => require(['./view/system/users.vue'], resolve)}
        ]
    },
  ]
});

export default router;
