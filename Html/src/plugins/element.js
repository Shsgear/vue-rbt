import Vue from 'vue'
import { Button, Notification } from 'element-ui'

Vue.use(Button);
Vue.component(Notification.name, Notification);

Vue.prototype.$notify = Notification;
