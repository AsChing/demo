import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import router from './routers.js'
import httpMethods from './common/http.js'

Vue.use(VueRouter)
Vue.use(ElementUI)
// Vue.use(axios)
Vue.use(router)
Vue.use(httpMethods)
Vue.config.productionTip = false

// to 将要去的
router.beforeEach((to, from, next) => {
	// if (to.matched.some(record => record.meta.requiresAuth)) {
	    // this route requires auth, check if logged in
	    // if not, redirect to login page.
	    console.log("--登录拦截--");
	    if (to.path == '/init') {
	        localStorage.removeItem('coffeeSession');
	    }
	    let user = localStorage.getItem('coffeeSession');
	    console.log("-----coffeeSession------"+user);
	    if (!user && to.path != '/init') {
	        next({
	            path: '/init'
	        });
	    } else {
	        next();
	    }
	// } else {
 //        next();
 //    }
});

new Vue({
  el: '#app',
  //添加router可以将其中的组件全部进行挂载，如果没有浏览器会找不到页面
  router,
  //render函数是渲染一个视图，然后提供给el挂载，如果没有render那页面什么都不会出来
  render: h => h(App) //vue2.0的写法76
  //components:{APP} //vue1.0的写法
})
