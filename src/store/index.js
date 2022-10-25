/** Vuex Store */
import { createStore } from '@logue/vue2-helpers/vuex';
import openapi from '@/store/modules/openapi';

export default createStore({
  modules: { openapi },
  devtools: import.meta.env.PROD,
});
