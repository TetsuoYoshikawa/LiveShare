import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Share from '../views/Share.vue';
import Comment from '../views/Comment.vue';
import Profile from '../views/Profile.vue';
import Favorite from '../views/Favorite.vue';
import userProfile from '../views/UserProfile.vue';
import want from '../views/Want.vue';
import Userwant from '../views/UserWant.vue';

Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    name:'home',
    component:Home
  },
  {
    path: '/login',
    name: 'login',
    component:Login
  },
  {
    path: '/register',
    name: 'Register',
    component:Register
  },
  {
    path: '/share',
    name: 'Share',
    component:Share,
    props: true
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component:Favorite,
    props: true
  },
  {
    path: '/comment',
    name: 'Comment',
    component: Comment,
    props: true
  },
  {
    path: '/profile',
    name: 'Profile',
    component:Profile,
    props: true
  },
  {
    path: '/userProfile/:id',
    name: 'userProfile',
    component:userProfile,
    props: true
  },
  {
    path:'/want',
    name:'Want',
    component:want,
    props:true
  },
  {
    path:'/userWant/:id',
    name:'UserWant',
    component:Userwant,
    props:true
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    (to.matched.some((record) => record.meta.requiresAuth)
    // このルートはログインされているかどうか認証が必要です。
    && !this.$store.state.auth)
  ) {
    next({
      path: "/login",
      query: {
        redirect: to.fullPath,
      },
    });
  } else {
    next();
  }
});

export default router;
