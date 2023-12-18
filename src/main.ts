import { createApp } from "vue";
import store from "./plugins/store";

import "reset.css";
import "./styles/global.scss";
import "tdesign-vue-next/es/style/index.css";

import App from "./App.vue";

const app = createApp(App);
app.use(store);
app.mount("#app");
