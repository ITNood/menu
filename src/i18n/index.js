import Vue from 'vue'
import VueI18n from 'vue-i18n'

import localeLib from 'element-ui/lib/locale'  //本地
import enLocale from "element-ui/lib/locale/lang/en"; //英文
import zhLocale from "element-ui/lib/locale/lang/zh-CN";  //中文
import zhTwLocale from "element-ui/lib/locale/lang/zh-TW";  //中文-台湾

import enLang from "./lang/en"; //英文
import zhLang from "./lang/zh-CN";  //中文
import zhTwLang from "./lang/zh-TW";  //中文-台湾

Vue.use(VueI18n)

let lang =
    localStorage.getItem('lang') ||
    navigator.language ||
    "zh_CN";

const i18n = new VueI18n({
    locale: lang, // 语言标识
    fallbackLocale: 'zh_CN',
    messages: {
        en_US: {...enLang, ...enLocale}, // 英文
        zh_CN: {...zhLang, ...zhLocale}, // 简体中文
        zh_TW: {...zhTwLang, ...zhTwLocale}, // 繁体中文-台湾
    }
})

localeLib.i18n((key, value) => i18n.t(key, value))

export default i18n
