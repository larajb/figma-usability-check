var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getCurrentSelection } from "../../figmaAccess/fileContents";
import { getHeight, getWidth, getParent, getFrame } from "../../figmaAccess/nodeProperties";
/**
 * This is a function to check if the selected element is an annotation group.
 * @returns Boolean
 */
export const checkForAnnotationGroup = () => {
    const selection = getCurrentSelection();
    var selected = null;
    if (selection !== null && selection.name.endsWith('Annotation') === false) {
        selected = 'element';
    }
    else if (selection !== null && selection.name.endsWith('Annotation') === true) {
        selected = 'annotation';
    }
    return selected;
};
/**
 * This is a function to check the validity of a connection between two nodes.
 * @param args
 * @returns Boolean
 */
export const checkValidity = (args) => {
    // get frame of step before
    var beforeNode = null;
    var beforeFrame = null;
    if (args.before === null) {
        var beforeNode = getCurrentSelection();
        beforeFrame = getFrame(beforeNode.id);
    }
    else {
        beforeNode = figma.getNodeById(args.before.id);
        beforeFrame = getFrame(args.before.id);
    }
    // get frame of step after
    var afterNode = null;
    var afterFrame = null;
    if (args.after === null) {
        var afterNode = getCurrentSelection();
        afterFrame = getFrame(afterNode.id);
    }
    else {
        afterNode = figma.getNodeById(args.after.id);
        afterFrame = getFrame(args.after.id);
    }
    // compare frames
    if (beforeFrame.id !== afterFrame.id) {
        var beforeNodeParent = getParent(beforeNode.id);
        if (beforeNodeParent.name.endsWith('Annotation')) {
            var element = beforeNodeParent.children[0];
            for (let i = 0; i < element.reactions.length; i++) {
                if (element.reactions[i].action.destinationId === afterFrame.id) {
                    return true;
                }
            }
        }
        else {
            for (let i = 0; i < beforeNode.reactions.length; i++) {
                if (beforeNode.reactions[i].action.destinationId === afterFrame.id) {
                    return true;
                }
            }
        }
    }
    else {
        return true;
    }
    return false;
};
/**
 * This is a function to check the validity of a button that is currently selected. The target size of 44 x 44 pixels is taken from the WCAG 2.1 standard (2.5.5) where it is
 * recommended for both desktop and touch devices.
 * @returns validity
 */
export const checkButtonValidity = () => {
    var currentSelection = getCurrentSelection();
    var width = getWidth(currentSelection.id);
    var height = getHeight(currentSelection.id);
    if ((width >= 44) && (height >= 44)) {
        return true;
    }
    return false;
};
/**
 * This is a function to check if the selected element already contains an example.
 * @returns Boolean
 */
export const checkInputExample = () => {
    var currentSelection = getCurrentSelection();
    var selectionParent = getParent(currentSelection.id);
    if (selectionParent.name.endsWith('Annotation')) {
        for (let i = 0; i < selectionParent.children.length; i++) {
            if (selectionParent.children[i].name.endsWith('Eingabebeispiel')) {
                return selectionParent.children[i].characters;
            }
        }
    }
    return null;
};
/**
 * This is a function to check the validity of an input field. The text width of the input example should be smaller than the width of the input field.
 * @param input
 * @returns Boolean
 */
export const checkInputValidity = (input) => __awaiter(void 0, void 0, void 0, function* () {
    var selection = getCurrentSelection();
    var selectionWidth = getWidth(selection.id);
    var text = figma.createText();
    var textWidth = null;
    yield loadingFont().then(() => {
        text.fontName = { family: 'Roboto', style: 'Regular' };
        text.fontSize = 16;
        text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 1 } }];
        text.characters = input;
    });
    textWidth = text.width;
    text.remove();
    if (textWidth < selectionWidth) {
        return true;
    }
    return false;
});
/**
 * This is a function to check the validity of a link that is currently selected. A text link should not wrap to a second line (Research-Based Web Design and Usability Guidelines 10.11).
 * @returns Boolean
 */
export const checkLinkValidity = () => __awaiter(void 0, void 0, void 0, function* () {
    var isText = false;
    var isImageOrShape = false;
    var selection = getCurrentSelection();
    if (selection.type === 'TEXT') {
        isText = true;
    }
    else {
        isImageOrShape = true;
    }
    if (isText) {
        var selectionHeight = getHeight(selection.id);
        var fontSize = 16;
        if (selection.type === 'TEXT') {
            fontSize = selection.fontSize;
        }
        var text = figma.createText();
        var textHeight = null;
        yield loadingFont().then(() => {
            text.fontName = { family: 'Roboto', style: 'Regular' };
            text.fontSize = fontSize;
            text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 1 } }];
            text.characters = 'Test';
        });
        textHeight = text.height;
        if (selectionHeight <= textHeight) {
            return true;
        }
    }
    if (isImageOrShape) {
        var width = getWidth(selection.id);
        var height = getHeight(selection.id);
        if ((width >= 44) && (height >= 44)) {
            return true;
        }
    }
    return false;
});
/**
 * This is a function to load a font
 */
const loadingFont = () => __awaiter(void 0, void 0, void 0, function* () {
    yield figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
});
