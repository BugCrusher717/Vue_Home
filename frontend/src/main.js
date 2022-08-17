import  { createApp } from 'vue'
import App from './App.vue'
import router from './router/router';
import { createAuth0 } from '@auth0/auth0-vue';

const app = createApp(App)

app.use(
  createAuth0({
    domain: "dev-wtad6762.us.auth0.com",
    client_id: "rjRcD6ebdaYqr9A4sMei7zVLBM2m78Cc",
    redirect_uri: "https://127.0.0.1:8081/#/signin",
    logout_uri: "https://127.0.0.1:8081/#/weather"
  })
);

app.use(router);
app.mount('#app');
