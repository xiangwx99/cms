import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('views/login/Login')
const Home = () => import('views/home/Home')
const Messages = () => import('views/messages/Messages')
const Upload = () => import('views/upload/Uploads') 
const Navigation = () => import('views/navigation/Navigation') 
const AddProject = () => import('views/addProject/AddProject') 
const AddGameType = () => import('views/addGameType/AddGameType') 
const AddQq = () => import('views/addQq/AddQq') 

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },

  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '',
        component: Messages,
        name: 'message'
      },

      {
        path: 'messages',
        component: Messages,
        name: 'messages'
      },
       
      {
        path: 'upload',
        component: Upload,
        name: 'upload'
      },

      {
        path: 'addNav',
        component: Navigation,
        name: 'Navigation'
      },

      {
        path: 'addProject',
        component: AddProject,
        name: 'Project'
      },

      {
        path: 'addGameType',
        component: AddGameType,
        name: 'addGameType'
      },

      {
        path: 'addQq',
        component: AddQq,
        name: 'AddQq'
      }
    ]
  },

  {
    path: '/login',
    component: Login,
    name: 'login'
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// router.beforeEach((to, from, next) => {
//   const token = localstorage.getLocalStorage('token')
//   if(token) {
//     next()
//   } else {
//     if(to.path !== "/login"){
//       next('/login')
//     } else {
//       next()
//     }
//   }
// })
export default router
