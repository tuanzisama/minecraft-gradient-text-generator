import { Component, createApp, h } from "vue";
import Preview from "./preview.vue";
import { useTextStore } from "@/plugins/store/modules/text";

export async function previewPip() {
  const textStore = useTextStore();

  const wrapperEl = document.createElement("div");
  const app = createApp({
    render: () => h(Preview as Component, { adapter: textStore.adapter }),
  });

  app.mount(wrapperEl);

  // see more: https://developer.mozilla.org/en-US/docs/Web/API/Document_Picture-in-Picture_API
  const pipWindow = await window.documentPictureInPicture!.requestWindow({
    width: 854,
    height: 480,
  });
  pipWindow.document.body.append(wrapperEl);

  document.querySelectorAll("style").forEach((style) => {
    pipWindow.document.head.appendChild(style.cloneNode(true));
  });
}

export { Preview };
