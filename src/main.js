import { createApp } from 'vue';
import App from './App.vue';
import * as Global from './components/global/global';

const wazzup = createApp(App);

wazzup.mount('#app');

Object.keys(Global).forEach((key) => {
	wazzup.component(key, Global[key]);
});
