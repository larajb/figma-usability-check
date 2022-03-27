var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { dispatch, handleEvent } from '../codeMessageHandler';
var annotationsArray = [];
// const fs = require('fs');
// fs.readFile('./annotationsArray.json', 'utf-8', (err, jsonString) => {
//     if (err) {
//         console.log('Fehler beim Öffnen einer Datei.');
//     } else {
//         try {
//             annotationsArray = JSON.parse(jsonString);
//         } catch (err) {
//             console.log('Fehler beim Öffnen einer Datei.');
//         }
//     }
// })
export const annotationsView = () => {
    handleEvent('getAnnotations', () => {
        getAnnotations();
    });
    handleEvent('selection', (value) => {
        createAnnotation(value);
    });
    handleEvent('deleteAnnotation', (id) => {
        deleteAnnotation(id);
    });
};
const getAnnotations = () => {
    const annotations = [];
    // annotationsArray.forEach(a => {
    //     const node = figma.getNodeById(a);
    //     let nameSplitted = node.name.split(' - ');
    //     annotations.push({ type: nameSplitted[1], id: a });
    // })
    dispatch('currentAnnotations', annotations);
};
const createAnnotation = (type) => {
    const groupNode = [];
    var color = getColor(type);
    if (figma.currentPage.selection.length === 1) {
        // get height, width and transform of selected element
        for (const node of figma.currentPage.selection) {
            if ('height' in node) {
                var selectionHeight = node.height;
            }
            if ('width' in node) {
                var selectionWidth = node.width;
            }
            if ('relativeTransform' in node) {
                var selectionRelTransform = node.relativeTransform;
            }
        }
        // create Rectangle that is used as border
        let rect = figma.createRectangle();
        rect.name = 'Annotation - ' + type + ' - Rect';
        rect.resize(selectionWidth + 10, selectionHeight + 10);
        rect.x = selectionRelTransform[0][2] - 5;
        rect.y = selectionRelTransform[1][2] - 5;
        rect.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 0 }];
        const stroke = { type: "SOLID", color: color };
        rect.strokes = [stroke];
        // create annotations text and rectangle under the text
        var rectText = figma.createRectangle();
        var text = figma.createText();
        text.name = 'Annotation - ' + type + ' - Text';
        text.x = selectionRelTransform[0][2] + selectionWidth - 40;
        text.y = selectionRelTransform[1][2] - 4;
        loadingFont().then(() => {
            text.fontName = { family: 'Roboto', style: 'Regular' };
            text.fills = [{ type: 'SOLID', color: color }];
            text.characters = type;
        });
        rectText.name = 'Annotation - ' + type + ' - Rect2';
        rectText.resize(40, text.height); // TEXT WIDTH ?!
        rectText.x = selectionRelTransform[0][2] + selectionWidth - 40;
        rectText.y = selectionRelTransform[1][2] - 4;
        rectText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
        // add border-rectangle, text and underlying rectangle to a group
        groupNode.push(rect, rectText, text);
        var group = figma.group(groupNode, figma.currentPage);
        group.name = 'Annotation - ' + type + ' - ' + group.id;
        // annotationsArray.push(group.id);
        // fs.writeFile('./annotationsArray.json', JSON.stringify(annotationsArray, null, 2), err => {
        //     if (err) {
        //         console.log('Fehler beim Schreiben einer Datei.');
        //     }
        // })
        // TODO: check if element and annotation group bereits vorhanden
        const elementAndAnnotationGroupNode = [];
        elementAndAnnotationGroupNode.push(group);
        var elementAndAnnotationGroup = figma.group(elementAndAnnotationGroupNode, figma.currentPage);
        for (const node of figma.currentPage.selection) {
            var parent = node.parent;
            elementAndAnnotationGroup.name = node.name + ' + Annotation';
            elementAndAnnotationGroup.insertChild(0, node);
            parent.appendChild(elementAndAnnotationGroup);
        }
        dispatch('annotationAdded', { type: type, id: group.id });
    }
    else if (figma.currentPage.selection.length === 0) {
        dispatch('annotationCannotBeAdded', 0);
    }
    else if (figma.currentPage.selection.length > 1) {
        dispatch('annotationCannotBeAdded', 1);
    }
};
const deleteAnnotation = (id) => {
    var group = figma.getNodeById(id);
    var parent = group.parent;
    group.remove();
    if (parent.children.length === 1) {
        var node = parent.children[0];
        var parentsParent = parent.parent;
        var index = null;
        for (let i = 0; i < parentsParent.children.length; i++) {
            if (parentsParent.children[i].id === parent.id) {
                index = i;
            }
        }
        parentsParent.insertChild(index, node);
    }
    // var annotationsArrayTemp = annotationsArray.filter(function(value, index, arr){ 
    //     return value !== id;
    // });
};
const loadingFont = () => __awaiter(void 0, void 0, void 0, function* () {
    yield figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
});
const getColor = (type) => {
    var colors = {
        'button': { r: 1, g: 1, b: 0 },
        'form': { r: 0.62, g: 0, b: 0.77 },
        'homepage': { r: 0.25, g: 0.88, b: 0.82 },
        'input': { r: 0, g: 0, b: 1 },
        'link': { r: 1, g: 1, b: 0 }
    };
    return colors[type];
};
