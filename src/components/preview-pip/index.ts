import { Component, createApp, h } from "vue";
import Preview from "./preview.vue";
import pinia from "@/plugins/store";

interface PreviewPipOptions {
  onClose?: (event: PageTransitionEvent) => void;
}

export interface PreviewPip {
  close: () => void;
}

export async function requestPreviewPip(options?: PreviewPipOptions): Promise<PreviewPip> {
  const wrapperEl = document.createElement("div");
  const app = createApp({
    render: () => h(Preview as Component),
  });

  app.use(pinia);

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

  document.querySelectorAll("link").forEach((link) => {
    if (link.getAttribute("rel") === "stylesheet") {
      pipWindow.document.head.appendChild(link.cloneNode(true));
    }
  });

  pipWindow.addEventListener("pagehide", (event: PageTransitionEvent) => {
    app.unmount();
    options?.onClose?.(event);
  });

  return {
    close: () => window.documentPictureInPicture?.window?.close(),
  };
}

export { Preview };
