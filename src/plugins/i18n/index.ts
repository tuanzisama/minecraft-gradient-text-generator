import { register } from "timeago.js";
import { createI18n } from "vue-i18n";

const files = import.meta.glob("@/translations/*.ts", {
  import: "default",
});

let translations = {};

for await (const [key, value] of Object.entries(files)) {
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

const t = i18n.global.t;
const locale = i18n.global.locale;

async function setupTimeagoLocale() {
  const timeagoLocale = t("app.timeago_locale");
  try {
    const localFile = (await import("timeago.js/esm/lang")) as never;
    if (localFile[timeagoLocale]) {
      register(timeagoLocale, localFile[timeagoLocale]);
    }
  } catch (error) {
    console.error(error);
  }
}

setupTimeagoLocale();

export { i18n, t, locale };
