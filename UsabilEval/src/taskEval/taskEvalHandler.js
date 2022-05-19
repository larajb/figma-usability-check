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
export const dynevalView = () => {
    handleEvent('addTaskStep', (args) => {
        createAnnotation(args);
    });
    handleEvent('deleteSteps', (args) => {
        args.steps.forEach(step => {
            deleteAnnotation({ taskname: args.taskname, step: step });
        });
    });
    handleEvent('deleteStep', (args) => {
        deleteAnnotation(args);
    });
};
const createAnnotation = (args) => {
    // args.numSteps, args.color
    // create annotation with number in colored circle (text white with black stroke)
    var stepNumber = String(args.numSteps + 1);
    var color = convertColor(args.color);
    const groupNode = [];
    if (figma.currentPage.selection.length === 1) {
        for (const node of figma.currentPage.selection) {
            if ('relativeTransform' in node) {
                var selectionRelTransform = node.relativeTransform;
            }
            if ('parent' in node) {
                var selectionParent = node.parent;
            }
        }
    }
    // create Ellipse for annotation
    let ellipse = figma.createEllipse();
    ellipse.name = 'Annotation - ' + args.taskname + ' - ' + stepNumber;
    ellipse.resize(20, 20);
    ellipse.x = selectionRelTransform[0][2] - 10;
    ellipse.y = selectionRelTransform[1][2] - 10;
    ellipse.fills = [{ type: 'SOLID', color: color }];
    // create annotations text
    var text = figma.createText();
    text.name = 'Annotation - ' + args.taskname + ' - ' + stepNumber + ' - Text';
    text.x = selectionRelTransform[0][2] - 3;
    text.y = selectionRelTransform[1][2] - 7;
    loadingFont().then(() => {
        text.fontName = { family: 'Roboto', style: 'Regular' };
        text.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
        const stroke = { type: "SOLID", color: { r: 0, g: 0, b: 0 } };
        text.strokes = [stroke];
        text.characters = stepNumber;
    });
    // add ellipse and text to a group
    groupNode.push(ellipse, text);
    var group = figma.group(groupNode, figma.currentPage);
    group.name = 'Annotation - ' + args.taskname + ' - ' + stepNumber + ' - ' + group.id;
    if (selectionParent.name.endsWith('Annotation')) {
        selectionParent.insertChild(selectionParent.children.length, group);
    }
    else {
        const elementAndAnnotationGroupNode = [];
        elementAndAnnotationGroupNode.push(group);
        var elementAndAnnotationGroup = figma.group(elementAndAnnotationGroupNode, figma.currentPage);
        for (const node of figma.currentPage.selection) {
            var parent = node.parent;
            elementAndAnnotationGroup.name = node.name + ' + Annotation';
            elementAndAnnotationGroup.insertChild(0, node);
            parent.appendChild(elementAndAnnotationGroup);
        }
    }
    dispatch('taskStepAdded', { taskname: args.taskname, id: group.id });
};
const deleteAnnotation = (args) => {
    var group = figma.getNodeById(args.step);
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
    args.followingSteps.forEach(step => {
        var group = figma.getNodeById(step);
        if (group.type === 'GROUP') {
            for (let i = 0; i < group.children.length; i++) {
                if (group.children[i].type === 'TEXT') {
                    var current = parseInt(group.children[i].characters);
                    group.children[i].characters = String(current - 1);
                }
            }
        }
    });
};
const convertColor = (color) => {
    color = color.replace('rgb(', '');
    color = color.replace(')', '');
    var colorSplitted = color.split(',');
    return {
        r: parseInt(colorSplitted[0]) / 255,
        g: parseInt(colorSplitted[1]) / 255,
        b: parseInt(colorSplitted[2]) / 255,
    };
};
const loadingFont = () => __awaiter(void 0, void 0, void 0, function* () {
    yield figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
});
