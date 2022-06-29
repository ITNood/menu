import inherits from 'inherits';
import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import {is} from 'bpmn-js/lib/util/ModelUtil';
import {append as svgAppend, create as svgCreate} from 'tiny-svg';


export default function Prefabrication(eventBus, prefabricationPaletteExtendParam) {
    const param = prefabricationPaletteExtendParam;
    BaseRenderer.call(this, eventBus, 1500);

    let elementByType = {};

    let keys = Object.keys(param).filter(key => typeof (param[key]) != "string")

    keys.forEach(key => elementByType[param[key].type + "|" + (param[key].index ? param[key].index : "")] = param[key]);

    this.canRender = function (element) {
        return keys.filter(key => is(element, param[key].type)).length > 0;
    };

    this.drawShape = function (parent, shape) {
        let extendOption = {}

        console.log(elementByType)
        let param = elementByType[shape.type + "|" + (shape.index ? shape.index : "")]

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
