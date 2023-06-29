import { createApp } from "vue";
import ViewUIPlus from "view-ui-plus";
import App from "./App.vue";
import "view-ui-plus/dist/styles/viewuiplus.css";
import "reset.css";
import "./assets/styles/main.less";

createApp(App).use(ViewUIPlus).mount("#app");
