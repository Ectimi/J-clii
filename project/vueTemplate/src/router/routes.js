export default [
    {
        path: '/',
        name: 'Main',
        meta: { requireAuth: true },
        component: () => import(/* webpackChunkName: "mainView" */ '../views/Main.vue'),
        children: [
        ]
    }
]