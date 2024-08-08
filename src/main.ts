import { createApp } from "vue";
import store from "./plugins/store";
import { I18nLoader } from "./plugins/i18n";

import "reset.css";
import "./styles/global.scss";
import "tdesign-vue-next/es/style/index.css";
import "./styles/responsive.scss";

import App from "./App.vue";

const app = createApp(App);
app.use(store);

new I18nLoader(app, () => {
  app.mount("#app");
});
