import { register } from "timeago.js";
import { App } from "vue";
import { Composer, createI18n, I18n } from "vue-i18n";

class I18nLoader {
  static i18n: I18n;
  static t: Composer["t"];

  constructor(app: App<Element>, callback: () => void) {
    this.setupVueI18n().then((instance) => {
      I18nLoader.i18n = instance;
      I18nLoader.t = instance.global.t;

      app.use(instance);
      callback();
      this.setupTimeagoLocale(instance);
    });
  }

  private async setupVueI18n() {
    const files = import.meta.glob("@/translations/*.ts", {
      import: "default",
    });

    let translations = {};

    for (const [key, value] of Object.entries(files)) {
      const dynamicImport = await value();
      const path = key.substring(key.lastIndexOf("/") + 1, key.lastIndexOf(".ts"));
      translations = Object.assign(translations, { [path]: dynamicImport });
    }

    return createI18n({
      locale: this.getBrowserLanguage(),
      fallbackLocale: "en-US",
      legacy: false,
      messages: translations,
    });
  }

  private async setupTimeagoLocale(i18n: I18n) {
    try {
      // @ts-ignore
      const locale = i18n!.global.t("app.timeago_locale");
      const localFile = (await import("timeago.js/esm/lang")) as never;
      if (localFile[locale]) {
        register(locale, localFile[locale]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  private getBrowserLanguage() {
    const searchParams = new URLSearchParams(location.search);
    let locale = "en_US";
    let fallbackLocale = "en_US";
    if (searchParams.has("lang")) {
      locale = searchParams.get("lang") ?? fallbackLocale;
    } else {
      locale = navigator.language ?? fallbackLocale;
    }
    return locale;
  }
}

export { I18nLoader };
