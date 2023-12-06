import { createI18n } from "vue-i18n";
import zh from "./locale/zh.json";
import en from "./locale/en.json";
// import ja from "./locale/ja.json";
// import kr from "./locale/kr.json";

// import ins from "./locale/ins.json";
// import th from "./locale/th.json";
// import vi from "./locale/vi.json";
// import fr from "./locale/fr.json";
// import ID from "./locale/ID.json";
// import ru from "./locale/ru.json";

import zhLogo from "@/assets/images/common/lang/China.png";
import jaLogo from "@/assets/images/common/lang/Japan.png";
import enLogo from "@/assets/images/common/lang/English.png";
import krLogo from "@/assets/images/common/lang/Korean.png";
import insLogo from "@/assets/images/common/lang/yingdu.png";
import thLogo from "@/assets/images/common/lang/taigou.png";
import viLogo from "@/assets/images/common/lang/yuenan.png";
import frLogo from "@/assets/images/common/lang/fayu.png";
import idLogo from "@/assets/images/common/lang/yinniyu.png";
import ruLogo from "@/assets/images/common/lang/eyu.png";

const messages = {
  zh,
  en
  // ja,
  // kr,
  // ins,
  // th,
  // vi,
  // fr,
  // ID,
  // ru
};

export const langList = [
  {
    name: "中文繁體",
    value: "zh",
    logo: zhLogo
  },
  {
    name: "English",
    value: "en",
    logo: enLogo
  },
  {
    name: "日本语",
    value: "ja",
    logo: jaLogo
  },
  {
    name: "한국인",
    value: "kr",
    logo: krLogo
  },
  {
    name: "भारत", // 印度
    value: "ins",
    logo: insLogo
  },
  {
    name: "ไทย", // 泰语
    value: "th",
    logo: thLogo
  },
  {
    name: "Việt Nam", //  越南
    value: "vi",
    logo: viLogo
  },

  {
    name: "Français", //  法语
    value: "fr",
    logo: frLogo
  },
  {
    name: "Indonesia", //   印尼语
    value: "ID",
    logo: idLogo
  },
  {
    name: "Русский", //  俄语
    value: "ru",
    logo: ruLogo
  }
];

const language = (navigator.language || "zh").toLocaleLowerCase(); // 这是获取浏览器的语言

export const LOCAL_STORAGE_KEY = "language";

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem(LOCAL_STORAGE_KEY) || language.split("-")[0] || "zh", // 首先从缓存里拿，没有的话就用浏览器语言，
  fallbackLocale: "zh",
  globalInjection: true,// 设置备用语言
  messages
});

export default i18n;
