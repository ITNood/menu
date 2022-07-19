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
        return is(element,'RefBpmn:RefServiceTask') && keys.filter(key => is(element, param[key].type)).length > 0;
    };

    this.drawShape = function (parent, shape) {

        let extendOption = {}
        let param = elementByType[shape.type + "|" + (shape.businessObject.get("ref") ? shape.businessObject.get("ref") : "")]
        if (param) {
            if (param && param.shapeImageUrl) {
                extendOption.href = param.shapeImageUrl
            } else if (param && param.icoImageUrl) {
                extendOption.href = param.icoImageUrl
            }
        } else if (shape.businessObject.ref) {
            extendOption.href = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjU3MDA3MDYzNDc5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijg5OCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPkBmb250LWZhY2UgeyBmb250LWZhbWlseTogZmVlZGJhY2staWNvbmZvbnQ7IHNyYzogdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzEwMzExNThfdTY5dzh5aHhkdS53b2ZmMj90PTE2MzAwMzM3NTk5NDQiKSBmb3JtYXQoIndvZmYyIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xMDMxMTU4X3U2OXc4eWh4ZHUud29mZj90PTE2MzAwMzM3NTk5NDQiKSBmb3JtYXQoIndvZmYiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzEwMzExNThfdTY5dzh5aHhkdS50dGY/dD0xNjMwMDMzNzU5OTQ0IikgZm9ybWF0KCJ0cnVldHlwZSIpOyB9Cjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik03NjkuNiA0NjcuMmMtMy4yLTEyLjgtNi40LTI1LjYtOS42LTM4LjRsLTE5LjIgNC44YzMuMiAxMS4yIDYuNCAyNCA5LjYgMzguNEw3NjkuNiA0NjcuMnoiIHAtaWQ9Ijg5OSI+PC9wYXRoPjxwYXRoIGQ9Ik02ODQuNTE2IDQ1NS4yNTJsMTI1LjE4MDY0IDMzLjU0MDQ4LTQuNTU0ODggMTYuOTk5ODQtMTI1LjE4MDY0LTMzLjU0MDQ4IDQuNTU0ODgtMTYuOTk5ODRaIiBwLWlkPSI5MDAiPjwvcGF0aD48cGF0aCBkPSJNNzkwLjQgNTU2LjhjLTkuNi0yMC44LTE3LjYtMzYuOC0yNS42LTUxLjJsLTE2IDhjOS42IDE5LjIgMTcuNiAzNi44IDI0IDUyLjhMNzkwLjQgNTU2Ljh6IiBwLWlkPSI5MDEiPjwvcGF0aD48cGF0aCBkPSJNODQxLjYgNjQ4YzI0LTI0IDQ0LjgtNTkuMiA2Mi40LTEwNy4ybDE3LjYgNC44IDQuOC0xNy42LTgwLTIwLjhjOS42LTEyLjggMTcuNi0yNy4yIDI1LjYtNDMuMmwtMTkuMi04Yy0xNiAzNS4yLTM4LjQgNjUuNi02NS42IDg4IDMuMiA2LjQgNi40IDEyLjggOCAxOS4yIDYuNC00LjggMTIuOC0xMS4yIDE3LjYtMTYtNC44IDMzLjYtMy4yIDY1LjYgMy4yIDk2LTIwLjggMTYtNDQuOCAyOC44LTczLjYgMzguNCA0LjggOCA4IDE0LjQgOS42IDE5LjIgMjcuMi05LjYgNTEuMi0yMC44IDcwLjQtMzYuOCA4IDIyLjQgMjIuNCA0NC44IDQwIDY0IDQuOC00LjggMTEuMi0xMS4yIDE5LjItMTZDODY0IDY5MS4yIDg1MS4yIDY3MC40IDg0MS42IDY0OHpNODM2LjggNTIxLjZsNDggMTIuOGMtMTIuOCAzNi44LTI4LjggNjcuMi00OS42IDg5LjZDODI4LjggNTkzLjYgODI4LjggNTYwIDgzNi44IDUyMS42eiIgcC1pZD0iOTAyIj48L3BhdGg+PHBhdGggZD0iTTcyNi40IDUwNy4ybC0xNC40LTE0LjRjLTIwLjggMTkuMi00MCAzMy42LTU2IDQ0LjggNC44IDYuNCA4IDExLjIgMTEuMiAxNkM2ODkuNiA1MzcuNiA3MDguOCA1MjMuMiA3MjYuNCA1MDcuMnoiIHAtaWQ9IjkwMyI+PC9wYXRoPjxwYXRoIGQ9Ik03MzEuMiA2MDkuNmMxMi44LTExLjIgMjQtMjQgMzUuMi0zOC40bC0xNi0xNC40Yy05LjYgMTIuOC0xOS4yIDI0LTMwLjQgMzUuMi04LTE0LjQtMTYtMjcuMi0yNC00MS42bC0xNiA4YzggMTQuNCAxNiAzMC40IDI1LjYgNDYuNC0yMi40IDE5LjItNDggMzItNzYuOCA0MCAzLjIgOCA2LjQgMTQuNCA4IDE5LjIgMTQuNC02LjQgMzItMTcuNiA0OC0zMi0xLjYgNC44LTQuOCA5LjYtOCAxNiAxMi44LTYuNCAyNS42LTE2IDM4LjQtMjUuNiA2LjQgMTIuOCAxNC40IDI3LjIgMjAuOCA0My4ybDIwLjgtOS42Qzc0OC44IDY0MCA3MzkuMiA2MjQgNzMxLjIgNjA5LjZ6IiBwLWlkPSI5MDQiPjwvcGF0aD48cGF0aCBkPSJNNDQ0LjggNDIwLjhsMzMuNiA5LjZjOC0zLjIgMTYtOCAyMi40LTE0LjRsLTQxLjYtMTEuMmM4LTkuNiAxNC40LTE5LjIgMjIuNC0zMC40bC0xNy42LTExLjJjLTE3LjYgMzAuNC00MCA1NC40LTY3LjIgNzUuMiA0LjggNi40IDkuNiAxMS4yIDEyLjggMTZDNDIwLjggNDQzLjIgNDMzLjYgNDMyIDQ0NC44IDQyMC44eiIgcC1pZD0iOTA1Ij48L3BhdGg+PHBhdGggZD0iTTUxMiA1MTUuMmwxMDcuMiAyOC44IDQuOC0xOS4yLTEwOC44LTI4LjhjNC44LTEyLjggOS42LTMwLjQgMTYtNTEuMmw5NC40IDI1LjYgNC44LTE5LjItOTIuOC0yNS42YzQuOC0xNC40IDkuNi0zMiAxNC40LTQ5LjZsLTIwLjgtNi40Yy00LjggMTcuNi05LjYgMzUuMi0xNC40IDQ5LjZsLTYuNC0xLjZjLTMuMiA2LjQtNi40IDExLjItMTEuMiAxNy42bDExLjIgMy4yYy02LjQgMjIuNC0xMS4yIDQwLTE2IDUxLjJMMzg0IDQ1OS4ybC00LjggMTkuMiAxMDcuMiAyOC44Yy0yMi40IDM2LjgtNjcuMiA1Ny42LTEzNiA2Mi40IDQuOCA5LjYgOCAxNy42IDkuNiAyNCA2Ny4yLTkuNiAxMTItMzIgMTM2LTY3LjIgNC44IDQ2LjQgMzIgODYuNCA4My4yIDEyMS42IDYuNC00LjggMTIuOC0xMS4yIDIwLjgtMTZDNTQ1LjYgNjAwIDUxNi44IDU2MS42IDUxMiA1MTUuMnoiIHAtaWQ9IjkwNiI+PC9wYXRoPjxwYXRoIGQ9Ik0yNjUuNiA2NDAgMzguNCA1NzkuMmMtMTEuMi0zLjItMTkuMi0xNi0xNi0yNy4ybDEyLjgtNDYuNGMtOCAxLjYtMTYgMS42LTI0IDEuNmwtOS42IDM4LjRjLTYuNCAyNCA4IDQ4IDMwLjQgNTQuNGwxODguOCA1MS4yQzIzMy42IDY0OS42IDI1Mi44IDY0Ni40IDI2NS42IDY0MHoiIHAtaWQ9IjkwNyI+PC9wYXRoPjxwYXRoIGQ9Ik0zMjQuOCA2NTZjLTkuNiAzLjItMTkuMiA2LjQtMjcuMiA0LjgtNi40LTEuNi0xMS4yLTgtMTIuOC0xNmwtMTYtNC44Yy00LjggNi40LTkuNiAxMi44LTE0LjQgMTkuMmwyMjcuMiA2MC44YzgtNC44IDE3LjYtMTEuMiAyNy4yLTE2TDMyNC44IDY1NnoiIHAtaWQ9IjkwOCI+PC9wYXRoPjxwYXRoIGQ9Ik0zOC40IDQ5Nmw3MC40LTI2Mi40YzMuMi0xMS4yIDE2LTE5LjIgMjcuMi0xNmw3MjMuMiAxOTMuNmMtNC44LTgtNC44LTE5LjItNC44LTI0TDE2OS42IDIwMy4yYzQuOCA2LjQgMTEuMiAxMi44IDE3LjYgMTcuNi0xMi44LTMuMi0zNS4yLTEyLjgtNDkuNi0yNS42LTIyLjQtMy4yLTQ0LjggOS42LTQ5LjYgMzJMMTcuNiA0ODhDMjQgNDkxLjIgMzAuNCA0OTIuOCAzOC40IDQ5NnoiIHAtaWQ9IjkwOSI+PC9wYXRoPjxwYXRoIGQ9Ik05MDcuMiA4MDMuMmMtNC44IDMuMi0xMS4yIDQuOC0xNy42IDMuMmwtMjc1LjItNzMuNmMtMjUuNi00LjgtNjUuNi05LjYtMTA3LjItNi40bDM3Ny42IDEwMC44YzMuMiAxLjYgOCAxLjYgMTEuMiAxLjZDODk3LjYgODIyLjQgOTAyLjQgODE0LjQgOTA3LjIgODAzLjJ6IiBwLWlkPSI5MTAiPjwvcGF0aD48cGF0aCBkPSJNOTYxLjYgNjMyYzAgMCA2LjQgNC44IDE2IDkuNmw0My4yLTE2NC44YzYuNC0yNC04LTQ4LTMwLjQtNTQuNGwtMTI5LjYtMzUuMmMxNC40IDggNDMuMiAyMi40IDc1LjIgMjUuNi04IDMuMi0yMi40IDYuNC0zNS4yIDhsODMuMiAyMi40YzExLjIgMy4yIDE5LjIgMTYgMTYgMjcuMmwtODEuNiAzMDUuNmMzLjIgMTIuOCA0LjggMjguOCAxLjYgNDMuMiA2LjQtNi40IDEyLjgtMTQuNCAxNi0yNGwzNS4yLTEzMS4yQzk2MCA2NTcuNiA5NjEuNiA2MzIgOTYxLjYgNjMyeiIgcC1pZD0iOTExIj48L3BhdGg+PHBhdGggZD0iTTMxMy42IDQ4My4yYy02LjQgMTcuNi0xMi44IDMwLjQtMTcuNiA0MC02LjQgOS42LTE2IDEyLjgtMzAuNCA4bC0xMjMuMi0zMy42Yy0xNC40LTMuMi0xOS4yLTEyLjgtMTYtMjcuMkMxMTguNCA0NjUuNiAxMTIgNDU3LjYgMTEyIDQ1Ny42czgtMS42IDE5LjItNC44bDE2LTU3LjYgMTQ4LjggNDAtNC44IDE2IDIwLjggNi40IDMyLTExOC40TDE0Mi40IDI4My4ybC00LjggMTkuMiAxNzkuMiA0OEwzMDAuOCA0MTZsLTE0OC44LTQwIDkuNi0zNS4yTDEzOS4yIDMzNmwtMzUuMiAxMzEuMmMtNi40IDI3LjIgMS42IDQzLjIgMjcuMiA0OS42bDEzMi44IDM1LjJjMjIuNCA2LjQgNDAgMCA0OS42LTE3LjYgNC44LTkuNiAxMS4yLTIyLjQgMTkuMi00MEMzMjQuOCA0OTEuMiAzMTguNCA0ODYuNCAzMTMuNiA0ODMuMnoiIHAtaWQ9IjkxMiI+PC9wYXRoPjwvc3ZnPg=='
        }
        // if (!extendOption.href) {
        //     extendOption.href = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjU3MDEwMDkyODYyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijk1NjciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj5AZm9udC1mYWNlIHsgZm9udC1mYW1pbHk6IGZlZWRiYWNrLWljb25mb250OyBzcmM6IHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xMDMxMTU4X3U2OXc4eWh4ZHUud29mZjI/dD0xNjMwMDMzNzU5OTQ0IikgZm9ybWF0KCJ3b2ZmMiIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTAzMTE1OF91Njl3OHloeGR1LndvZmY/dD0xNjMwMDMzNzU5OTQ0IikgZm9ybWF0KCJ3b2ZmIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xMDMxMTU4X3U2OXc4eWh4ZHUudHRmP3Q9MTYzMDAzMzc1OTk0NCIpIGZvcm1hdCgidHJ1ZXR5cGUiKTsgfQo8L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTE4LjQgNjI3LjJjMC0xOS4yIDE5LjItMzguNCAzOC40LTM4LjRoNTcuNlYyNzUuMkgyMTEuMnYzMTMuNmgxMjEuNmMxOS4yIDAgMzguNCAxOS4yIDM4LjQgMzguNHMtMTkuMiAzOC40LTM4LjQgMzguNGMtMTIuOCAwLTE0MC44IDAtMTQ3LjItNi40LTYuNC02LjQtMTkuMi02LjQtMjUuNi0xOS4yLTYuNC02LjQtMTIuOC0xMi44LTE5LjItMjUuNi02LjQtNi40LTYuNC0xOS4yLTYuNC0zMnYtMzIwYzAtMTIuOCAwLTE5LjIgNi40LTMyIDYuNC02LjQgNi40LTE5LjIgMTkuMi0yNS42IDYuNC02LjQgMTIuOC0xMi44IDI1LjYtMTkuMiA2LjQtNi40IDE5LjItNi40IDMyLTYuNGg0MDkuNmMxMi44IDAgMTkuMiAwIDMyIDYuNCA2LjQgNi40IDE5LjIgNi40IDI1LjYgMTkuMiA2LjQgNi40IDEyLjggMTIuOCAxOS4yIDI1LjYgNi40IDYuNCA2LjQgMTkuMiA2LjQgMzJ2MzIwYzAgMTIuOCAwIDE5LjItNi40IDMyLTYuNCA2LjQtNi40IDE5LjItMTkuMiAyNS42LTYuNCA2LjQtMTIuOCAxMi44LTI1LjYgMTkuMi02LjQgNi40LTc2LjggNi40LTgzLjIgNi40LTM4LjQgMC01Ny42LTE5LjItNTcuNi0zOC40eiBtLTQ0LjggMjM2LjhjLTEyLjggMC0xOS4yIDAtMzItNi40LTYuNC02LjQtMTkuMi02LjQtMjUuNi0xOS4yLTYuNC02LjQtMTIuOC0xMi44LTE5LjItMjUuNi02LjQtNi40LTYuNC0xOS4yLTYuNC0zMnYtMzIwYzAtMTIuOCAwLTE5LjIgNi40LTMyIDYuNC02LjQgNi40LTE5LjIgMTkuMi0yNS42IDYuNC02LjQgMTIuOC0xMi44IDI1LjYtMTkuMiA2LjQtNi40IDc2LjgtNi40IDgzLjItNi40IDE5LjIgMCAzOC40IDE5LjIgMzguNCAzOC40cy0xOS4yIDM4LjQtMzguNCAzOC40aC01MS4yVjc2OGg0MDMuMlY0NTQuNGgtMTIxLjZjLTE5LjIgMC0zOC40LTE5LjItMzguNC0zOC40czE5LjItMzguNCAzOC40LTM4LjRjMTIuOCAwIDE0MC44IDAgMTQ3LjIgNi40IDYuNCA2LjQgMTkuMiA2LjQgMjUuNiAxOS4yIDYuNCA2LjQgMTIuOCAxMi44IDE5LjIgMjUuNiA2LjQgNi40IDYuNCAxOS4yIDYuNCAzMnYzMjBjMCAxMi44IDAgMTkuMi02LjQgMzItNi40IDYuNC02LjQgMTkuMi0xOS4yIDI1LjYtNi40IDYuNC0xMi44IDEyLjgtMjUuNiAxOS4yLTYuNCA2LjQtMTkuMiA2LjQtMzIgNi40SDQ3My42eiIgZmlsbD0iIzMzMzMzMyIgcC1pZD0iOTU2OCI+PC9wYXRoPjwvc3ZnPg=='
        // }

        let catGfx = svgCreate('image', {x: 0, y: 0, width: shape.width, height: shape.height, ...extendOption});
        svgAppend(parent, catGfx);
        return catGfx;
    };
}

inherits(Prefabrication, BaseRenderer);

Prefabrication.$inject = ['eventBus', 'prefabricationPaletteExtendParam'];
