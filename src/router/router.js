import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: () => import('../pages/Home.vue')
    },
    {
        path: '/job/:id',
        name: 'JobPage',
        component: () => import('../pages/JobPage.vue')
    }
   
]
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;