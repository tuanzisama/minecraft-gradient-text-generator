/// <reference types="vite/client" />

declare module "color-stepper";

interface ImportMetaEnv {
  /**
   * Google Analytics Code
   */
  readonly VITE_GOOGLE_ANALYTICS: string;
  /**
   * Baidu Tongji Code
   */
  readonly VITE_BAIDU_TONGJI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
