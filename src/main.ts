import { createApp } from "vue";
import store from "./plugins/store";
import { i18n } from "./plugins/i18n";

import "reset.css";
import "./styles/global.scss";
import "tdesign-vue-next/es/style/index.css";
import "./styles/responsive.scss";

import App from "./App.vue";

const app = createApp(App);
app.use(store);
app.use(i18n);
app.mount("#app");
