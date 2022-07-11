var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * This is a function to create a text node.
 * @param name
 * @param fillsColor
 * @param strokeColor
 * @param textContent
 * @returns text
 */
export const createTextNode = (name, fillsColor, strokeColor, textContent) => {
    var text = figma.createText();
    text.name = name;
    setText(text, fillsColor, strokeColor, textContent);
    return text;
};
/**
 * This is a function to create an ellipse node.
 * @param name
 * @param width
 * @param height
 * @param fillsColor
 * @returns ellipse
 */
export const createEllipseNode = (name, width, height, fillsColor) => {
    let ellipse = figma.createEllipse();
    ellipse.name = name;
    ellipse.resize(width, height);
    ellipse.fills = [{ type: 'SOLID', color: fillsColor }];
    return ellipse;
};
/**
 * This is a function to create a group node.
 * @param name
 * @param children
 * @returns group
 */
export const createGroupNode = (name, children) => {
    const groupNode = [];
    children.forEach(child => {
        groupNode.push(child);
    });
    var group = figma.group(groupNode, figma.currentPage);
    group.name = name + group.id;
    return group;
};
/**
 * This is a function to add an annotation to a file
 * @param annotation
 */
export const addAnnotationToFile = (currentSelection, annotation) => {
    var selectionParent = currentSelection.parent;
    var index = selectionParent.children.findIndex(child => JSON.stringify(child) === JSON.stringify(currentSelection));
    if (selectionParent.name.endsWith('Annotation')) {
        selectionParent.insertChild(selectionParent.children.length, annotation);
        index = selectionParent.parent.children.findIndex(child => JSON.stringify(child) === JSON.stringify(selectionParent));
    }
    else {
        const elementAndAnnotationGroupNode = [];
        elementAndAnnotationGroupNode.push(annotation);
        var elementAndAnnotationGroup = figma.group(elementAndAnnotationGroupNode, figma.currentPage);
        for (const node of figma.currentPage.selection) {
            var parent = node.parent;
            elementAndAnnotationGroup.name = node.name + ' + Annotation';
            elementAndAnnotationGroup.insertChild(0, node);
            parent.insertChild(index, elementAndAnnotationGroup);
        }
    }
};
/**
 * This is a function to set the content of a text node.
 * @param node
 */
export const setText = (text, fillsColor, strokeColor, textContent) => {
    loadingFont().then(() => {
        text.fontName = { family: 'Roboto', style: 'Regular' };
        text.fontSize = 16;
        text.fills = [{ type: 'SOLID', color: fillsColor }];
        if (strokeColor !== null) {
            const stroke = { type: "SOLID", color: strokeColor };
            text.strokes = [stroke];
        }
        text.characters = textContent;
    }).catch((err) => {
        console.log(err);
    });
};
/**
 * This is a function to load a font.
 */
const loadingFont = () => __awaiter(void 0, void 0, void 0, function* () {
    yield figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
});
