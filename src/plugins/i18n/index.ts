import { register } from "timeago.js";
import { createI18n } from "vue-i18n";

async function setupI18n() {
  const files = import.meta.glob("@/translations/*.ts", {
    import: "default",
  });

  let translations = {};

  for (const [key, value] of Object.entries(files)) {
    const dynamicImport = await value();
    const path = key.substring(key.lastIndexOf("/") + 1, key.lastIndexOf(".ts"));
    translations = Object.assign(translations, { [path]: dynamicImport });
  }

  const i18n = createI18n({
    locale: getBrowserLanguage(),
    fallbackLocale: "en-US",
    legacy: false,
    messages: translations,
  });

  setupTimeagoLocale(i18n.global.t("app.timeago_locale"));
  return i18n;
}

async function setupTimeagoLocale(locale: string) {
  try {
    const localFile = (await import("timeago.js/esm/lang")) as never;
    if (localFile[locale]) {
      register(locale, localFile[locale]);
    }
  } catch (error) {
    console.error(error);
  }
}

function getBrowserLanguage() {
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

const i18n = await setupI18n();
const t = i18n.global.t;
const locale = i18n.global.locale;

export { i18n, t, locale };
