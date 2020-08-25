export default [
    {
        path: '/',
        name: 'Main',
        meta: { requireAuth: true },
        component: () => import(/* webpackChunkName: "main" */ '../views/Main.vue'),
        children: [
        ]
    }
]