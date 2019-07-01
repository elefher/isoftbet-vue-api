import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

Vue.use(VueRouter);
Vue.use(Vuex);

import auth from './auth'
import App from './components/App.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Transactions from './components/Transactions.vue'



export const store = new Vuex.Store({
  state:{
    token: ''
  }
})

function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

const router = new VueRouter({
  mode: 'history',
  routes: [
    { name:'login', path: '/login', component: Login, props: true},
    { name:'register', path: '/register', component: Register, props: true},
    { name:'transactions', path: '/transactions', component: Transactions, beforeEnter: requireAuth, props:true},
    { path: '/logout',
      beforeEnter (to, from, next) {
        auth.logout()
        next('/')
      }
    }
  ]
});



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
