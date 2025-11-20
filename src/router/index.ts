import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import Onboarding from '@/views/Onboarding.vue'
import MemberLogin from '@/views/MemberLogin.vue'

const routes = [
  { path: '/', name: 'Index', component: Index },
  { path: '/onboarding', name: 'Onboarding', component: Onboarding },
  // { path: '/member-login', name: 'MemberLogin', component: MemberLogin }
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from, next) => {
  const isLogged = localStorage.getItem('isLogged') === 'true'
  // if (to.name === 'Index' && isLogged) {
  //   next({ name: 'Onboarding' })
  // }
  // if ((to.name === 'Onboarding' || to.name === 'MemberLogin') && !isLogged) {
  //   next({ name: 'Index' })
  // } else {
  //   next()
  // }
  next()
})

export default router
