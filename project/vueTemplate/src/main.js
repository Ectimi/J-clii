import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'lib-flexible';
import 'vant/lib/index.css';
import { Col, Row, Button, Field, Cell, CellGroup, Icon, Toast,Loading } from 'vant';


Vue.use(Col).use(Row).use(Button).use(Field).use(Cell).use(CellGroup)
  .use(Icon).use(Toast).use(Loading);

Vue.config.productionTip = false

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
