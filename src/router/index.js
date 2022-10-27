import { createRouter } from '@logue/vue2-helpers/vue-router';
import Home from '@/views/Home.vue';
import OperationView from '@/views/OperationView.vue';

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

export default createRouter({ routes });
