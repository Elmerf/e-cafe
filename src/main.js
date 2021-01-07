import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import mitt from 'mitt';

const emitter = mitt();
let app = createApp(App)

app.config.globalProperties.emitter = emitter
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')