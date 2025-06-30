import Vue from 'vue'
import App from './App.vue'
//全局引入
import ElementUI from 'element-ui'
//按需引入
//import {Row,Button} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import './api/mock'
import Cookie from 'js-cookie'

Vue.use(ElementUI);//全局注册ElementUI

//按需引入
//Vue.use(Row)
//Vue.use(Button)

Vue.config.productionTip = false

//添加全局前置导航守卫
router.beforeEach((to,from,next)=>{
  //判断token存在
  const token = Cookie.get('token')
  //token不存在，说明当前用户未登录，应该跳转至登录页
  if(!token&&to.name!=='login'){
    next({name:'login'})
  }else if(token&&to.name==='login'){//如果token存在，说明用户登录，此时跳转至首页
    next({name:'home'})
  }else{
    next()
  }
})

new Vue({
  router,//给vue实例添加路由功能
  store,//将store挂在到vue实例上
  render: h => h(App),
  created(){//动态组装路由
    store.commit('addMenu',router)
  }
}).$mount('#app')
