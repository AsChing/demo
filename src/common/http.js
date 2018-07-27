//HTTP请求公用方法，使用时直接通过:this.apiGet(url,params)方式调用方法
import axios from 'axios'
import router from '../routers.js'

const httpMethods = function (Vue, options) {

  Vue.prototype.apiGet = function (url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, params).then(
        response => {
          resolve(response);
        },
        error => {
          reject(error);
        }
      )
    })
  };

  Vue.prototype.apiPost = function (url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(
        response => {
          resolve(response);
        },
        error => {
          reject(error);
        }
      )
    })
  };

  Vue.prototype.apiDelete = function (url, id) {
    return new Promise((resolve, reject) => {
      axios.delete(url + id).then(
        (response) => {
          resolve(response)
        },
        (error) => {
          reject(error)
        }
      )
    })
  },

  Vue.prototype.apiPut = function (url, id, obj) {
    return new Promise((resolve, reject) => {
      axios.put(url + id, obj).then(
        (response) => {
          resolve(response)
        },
        (error) => {
          reject(error)
        }
      )
    })
  },
    
  Vue.prototype.resetCommonData = function(data){
    
    if(window.localStorage){
      localStorage.setItem('menus', JSON.stringify(data.menusList));
      localStorage.setItem('authKey', data.authKey);
      localStorage.setItem('rememberKey', data.rememberKey);
      localStorage.setItem('authList', data.authList);
      localStorage.setItem('userInfo', JSON.stringify(data.userInfo));
      localStorage.setItem('coffeeSession', data.sessionId);
    }

    // let routerUrl = ''
    // if (data.menusList[0].url) {
    //     routerUrl = data.menusList[0].url
    // } else {
    //     routerUrl = data.menusList[0].child[0].child[0].url
    // }
    // setTimeout(() => {
    //     let path = this.$route.path
    //     if (routerUrl != path) {
    //         router.replace(routerUrl)
    //     } else {
    //         _g.shallowRefresh(this.$route.name)
    //     }
    // }, 1000)
  },
  Vue.prototype.handelResponse = function(res, cb, errCb) {
      // _g.closeGlobalLoading()
      if (res.code == 200) {
          cb(res.data)
      } else {
          if (typeof errCb == 'function') {
              errCb()
          }
          // this.handleError(res)
      }
  }
}

export default httpMethods


