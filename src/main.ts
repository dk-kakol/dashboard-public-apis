import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import vuetify from '@/plugins/vuetify';
import i18n from '@/plugins/i18n';
import '@/plugins/vee-validate';
import initDirectives from '@/directives';

import './assets/main.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(vuetify);
app.use(i18n);

initDirectives(app);

app.mount('#app');
