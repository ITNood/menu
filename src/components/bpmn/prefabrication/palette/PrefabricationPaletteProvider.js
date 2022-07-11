import {assign} from 'min-dash';
import {getDi} from "bpmn-js/lib/util/ModelUtil";

/**
 * 预制的Palette/调色盘供应器，即左侧的Shape选择器
 * @param palette
 * @param create
 * @param elementFactory
 * @param translate
 * @constructor
 */
export default function PrefabricationPaletteProvider(palette, create, elementFactory, translate, prefabricationPaletteExtendParam, modeling) {
    this._create = create;
    this._elementFactory = elementFactory;
    this._translate = translate;
    this._extendParam = prefabricationPaletteExtendParam;
    this._modeling = modeling;
    palette.registerProvider(this);
}

/**
 * 为构造器传递初始参数
 * @type {string[]}
 */
PrefabricationPaletteProvider.$inject = ['palette', 'create', 'elementFactory', 'translate', 'prefabricationPaletteExtendParam', 'modeling'];

/**
 * 重构的Shape选项内容，支持两种返回结构，返回一个处理原有内容的方法，或者返回仅需要添加的新元素信息
 * @returns {function(*): *&{"entry-1": {action: function(): void, label: string}}}
 */
PrefabricationPaletteProvider.prototype.getPaletteEntries = function () {
    var create = this._create, elementFactory = this._elementFactory, translate = this._translate,
        modeling = this._modeling,
        extendParam = this._extendParam;

    function createAction({
                              type, group = 'prefabrication',
                              className = 'bpmn-icon-subprocess-expanded',
                              title, icoImageUrl = null, options, index
                          }) {
        function createListener(event) {
            var shape = elementFactory.createShape(assign({type: type}, options));
            modeling.updateProperties(shape, {ref: index,name:title})
            if (options) {
                var di = getDi(shape);
                di.isExpanded = options.isExpanded ? options.isExpanded : di.isExpanded;
            }
            create.start(event, shape);
        }
        var shortType = type.replace(/^bpmn:/, '');
        return {
            group: group,
            className: className,
            title: title,
            imageUrl: icoImageUrl,
            moduleName: title,
            action: {
                dragstart: createListener, click: createListener
            }
        };
    }

    function createSeparator(group) {
        return {
            group: group,
            separator: true
        };
    }

    // 使用方法类型返回时，可以处理原有的元素，现在即为 entries 再该方法返回时去除 ...entries将会移出原有的所有元素
    return function (entries) {
        let newExtendParam = {};
        Object.keys(extendParam).forEach(paramKey => {
            let relevant = extendParam[paramKey]
            newExtendParam[paramKey] = typeof (relevant) === "string" ?
                createSeparator(relevant) : createAction(relevant)
        })
        return {
            ...entries,
            ...newExtendParam
        };
    }
};
