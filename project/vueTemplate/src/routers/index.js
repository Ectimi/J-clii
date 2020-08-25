import Vue from 'vue'
import routes from './routes'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
	routes
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(m => m.meta.requireAuth)) { // 需要登录
		
	} else { // 不需要登录
		next()
	}
})

export default router
