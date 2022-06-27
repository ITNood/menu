import inherits from 'inherits';
import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import {is} from 'bpmn-js/lib/util/ModelUtil';
import {append as svgAppend, create as svgCreate} from 'tiny-svg';


export default function Prefabrication(eventBus, prefabricationPaletteExtendParam) {
    BaseRenderer.call(this, eventBus, 1500);

    let elementByType = {};

    let keys = Object.keys(prefabricationPaletteExtendParam).filter(key => typeof (prefabricationPaletteExtendParam[key]) != "string")

    keys.forEach(key => elementByType[prefabricationPaletteExtendParam[key].type] = prefabricationPaletteExtendParam[key]);

    this.canRender = function (element) {
        return keys.filter(key => is(element, prefabricationPaletteExtendParam[key].type)).length > 0;
    };

    this.drawShape = function (parent, shape) {
        let extendOption = {}

        let param = elementByType[shape.type]

        if (param.shapeImageUrl) {
            extendOption.href = param.shapeImageUrl
        } else if (param.icoImageUrl) {
            extendOption.href = param.icoImageUrl
        }

        let catGfx = svgCreate('image', {x: 0, y: 0, width: shape.width, height: shape.height, ...extendOption});
        svgAppend(parent, catGfx);
        return catGfx;
    };
}

inherits(Prefabrication, BaseRenderer);

Prefabrication.$inject = ['eventBus', 'prefabricationPaletteExtendParam'];
