import newI18n from "@/i18n";
import defaultLanguage from './lang/zh-CN'

export default function PrefabricationTranslate(template, replacements) {

    // Translate
    template = translations(template);

    return repeatReplace(template, replacements);
}

const sentencePrefix = 'bpmn.sentence';
const specialPrefix = 'bpmn.special';
const wordKeys = Object.keys(defaultLanguage);
const sentenceKeys = Object.keys(defaultLanguage.bpmn.sentence);
const specialKeys = Object.keys(defaultLanguage.bpmn.special);

// 定义详细的翻译方式
export function translations(template) {
    if (template) {
        return translations8BasePacker(template) ||template
    }
}

function repeatReplace(template, replacements) {

    replacements = replacements || {};
    // Replace
    return template.replace(/{([^}]+)}/g, function (_, key) {
        return translations(replacements[key] || key) || ('{' + key + '}');
    });
}

function translations8BasePacker(template) {
    if (template.indexOf(" ") < 0) {
        let templateL = template.substring(0,1).toUpperCase() + template.substring(1)
        if (wordKeys.indexOf(templateL) >= 0) {
            let t = newI18n.t(templateL)
            if (t != template) {
                return t;
            }
        }
    }
    return translations8BpmnSentencePacker(template)
}

function translations8BpmnSentencePacker(template) {
    if (template.indexOf(" ")) {
        if (sentenceKeys.indexOf(template) >= 0) {
            let key = sentencePrefix + "['" + template + "']";
            let t = newI18n.t(key)
            if (template != t) return t;
        }
    }
    return translations8BpmnSpecialPacker(template);
}

function translations8BpmnSpecialPacker(template) {
    // 所有Key为正则表达式
    for (let regularsKey of specialKeys) {
        let regexp = new RegExp(regularsKey, "gi");
        if (template.search(regexp) >= 0) {
            let specialKey = specialPrefix + "['" + regularsKey + "']";
            let replaceValue = newI18n.t(specialKey)

            if (specialKey != replaceValue) {
                return repeatReplace(template.replace(regexp, replaceValue), {})
            }
        }
    }
    return template;
}
