
// import all css file 
import '../css/main.css'
import {Form ,HasError,AlertError} from 'vform';
import Vue from 'vue'
 
// import all image or icon file

Vue.prototype.token = localStorage.getItem('token')
Vue.prototype.$role = localStorage.getItem('role')
import axios from 'axios'
const http = axios.create({
  baseURL: process.env.BACKEND_URL ? process.env.BACKEND_URL : 'http://127.0.0.1:3000',
  headers: {
    'Authorization':'Bearer '+Vue.prototype.token
  },
});
Vue.prototype.$http = http;



import Swal from 'sweetalert2'

window.Swal=Swal 
window.Fire=new Vue()



const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

window.Toast=Toast


window.Form=Form;
Vue.component(HasError.name,HasError)
Vue.component(AlertError.name,AlertError)


import myIcon from '../icons/myIcon.png'
// use iamge 
const myProfileIcon= new Image();
myProfileIcon.src=myIcon


//import Vue Object
// import Vue from 'vue'
window.Vue = require('vue');
//import vuetify  from myPlugin

// import  materialDesignIcon
import '@mdi/font/css/materialdesignicons.css'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
 
Vue.use(Vuetify)
// end Vuetify Import 
//import my route from my file routes.js
import routes from './routes';

//import vue-route module
import VueRouter from 'vue-router'
const router =new VueRouter({
  mode:'history',
  routes
})
Vue.use(VueRouter)

router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);

  // if(to.meta.requiresAuth){

  // }
  // console
  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (localStorage.getItem('token') == null) {
      
      next({
        path: '/login', 
        params: { nextUrl: to.fullPath }
      })
    } else {
      console.log("ana");

      let user = JSON.parse(localStorage.getItem('user'))
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.is_admin == 1) {
          next()
        } else {
          next({ name: 'userboard' })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next()
    } else {
      next({ name: 'userboard' })
    }
  } else {
    next()
  }
})







 
Vue.component('Navbar',require('./components/nav.component.vue').default)

// Vue.prototype.$router = router
   
const app=new Vue({
  router, 
  vuetify:new Vuetify({
    // rtl: true,
    icons: {
      iconfont: 'mdi',
    }, 
  }), 
    data:{
    isLoggin:false,    
  }
}).$mount('#app')



