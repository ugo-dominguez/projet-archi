import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./components/QuizList.vue')
    },
    {
      path: '/quiz/:id',
      name: 'quiz-editor',
      component: () => import('./components/QuizEditor.vue'),
      props: true
    }
  ]
})