import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import { OperationView } from '../views';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/view/:operationId',
    name: 'operation',
    component: OperationView,
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
