declare global {
  interface Window {
    /**
     * ⚠️ Experimental API
     * As of August 2024, only Chromium 116+ will be available.
     * View Compatibility: https://caniuse.com/mdn-api_documentpictureinpicture
     */
    documentPictureInPicture?: DocumentPictureInPicture;
  }
}

interface DocumentPictureInPicture {
  requestWindow: (options: RequestWindowOptions) => Promise<Window>;
  window: Window | null;
}

interface RequestWindowOptions {
  /**
   * Sets the initial width of the Picture-in-Picture window.
   */
  width: number;
  /**
   * Sets the initial height of the Picture-in-Picture window.
   */
  height: number;
  /**
   * Hides the "back to tab" button in the Picture-in-Picture window if true. It is false by default.
   */
  disallowReturnToOpener?: boolean;
}

export {};
