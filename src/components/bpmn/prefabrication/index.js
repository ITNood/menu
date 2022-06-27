/**
 * 用于提供额外的组件解析库，Bpmn通过此类内容附加到 moddleExtensions的操作来验证xml中的格式
 * Prefabrication Add New Xml Element
 * ```javascript
 * moddleExtensions:{
 *   ...PrefabricationModuleDescriptor
 *  }
 * ```
 */
import Descriptors from "./descriptors";
/**
 * 通过此组件可以使自定义组件展示在中间的流程面板上
 * Prefabrication Add A New Shape To Your Process, Must Use This Module before {@link PrefabricationModuleDescriptor}
 * ```javascript
 * additionalModules: [
 *   PrefabricationPaletteProviderModule,
 * ]
 * ```
 */
import Reader from "./draw";
/**
 * 在左侧工具上添加一些自定义的元素
 * Prefabrication Add Left Panel Item, This Module Have Descriptor For Addition Item
 * ```javascript
 * additionalModules: [
 *   PrefabricationPaletteProvide,
 * ]
 * ```
 */
import Palette from "./palette";
/**
 * 使元素组件具有翻译功能
 * Translate Bpmn ,Use i18n, You Need Add New Item( bpmn ) In LanguageMap
 */
import Translate from "./translate";

export {
    Descriptors as PrefabricationModuleDescriptor,
    Reader as PrefabricationReaderModule,
    Palette as PrefabricationPaletteModule,
    Translate as PrefabricationTranslateModule,
}
