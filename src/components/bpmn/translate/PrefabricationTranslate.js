import i18n from "@/i18n";

export default function PrefabricationTranslate(template, replacements) {
    replacements = replacements || {};

    // Translate
    // template = translations[template] || template;
    template = translations(template);

    // Replace
    return template.replace(/{([^}]+)}/g, function (_, key) {
        return translations(replacements[key]) || '{' + translations(key) + '}';
    });
}

// 定义详细的翻译方式
function translations(template) {
    return i18n.t('bpmn["'+template+'"]') || template;
}
