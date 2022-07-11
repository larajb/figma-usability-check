import { getCurrentSelection } from "../../figmaAccess/fileContentGetters";
import { getFrame } from "../../figmaAccess/fileContentGetters";

/**
 * This is a function to check if the selected element is an annotation group.
 * @returns Boolean
 */
export const checkForAnnotationGroup = () => {
    const selection = getCurrentSelection();
    var selected = null;
    if (selection !== null && selection.name.endsWith('Annotation') === false) {
        selected = 'element';
    } else if (selection !== null && selection.name.endsWith('Annotation') === true) {
        selected = 'annotation';
    }
    return selected;
}

/**
 * This is a function to check the validity of a connection between two nodes.
 * @param args 
 * @returns Boolean
 */
 export const checkValidity = (args) => {
    var beforeNode = null;
    var beforeFrame = null;
    if (args.before === null) {
        var beforeNode = getCurrentSelection();
        beforeFrame = getFrame(beforeNode.id);
    } else {
        beforeNode = figma.getNodeById(args.before.id);
        beforeFrame = getFrame(args.before.id);
    }

    var afterNode = null;
    var afterFrame = null;
    if (args.after === null) {
        var afterNode = getCurrentSelection();
        afterFrame = getFrame(afterNode.id);
    } else {
        afterNode = figma.getNodeById(args.after.id);
        afterFrame = getFrame(args.after.id);
    }

    if (beforeFrame.id !== afterFrame.id) {
        var beforeNodeParent = beforeNode.parent;
        if (beforeNodeParent.name.endsWith('Annotation')) {
            var element = beforeNodeParent.children[0];
            for (let i = 0; i < element.reactions.length; i++) {
                if (element.reactions[i].action.destinationId === afterFrame.id) {
                    return true;
                }
            }
        } else {
            for (let i = 0; i < beforeNode.reactions.length; i++) {
                if (beforeNode.reactions[i].action.destinationId === afterFrame.id) {
                    return true;
                }
            }
        }
    } else {
        return true;
    }

    return false;
}

/**
 * This is a function to check the validity of a button that is currently selected. The target size of 44 x 44 pixels is taken from the WCAG 2.1 standard (2.5.5) where it is 
 * recommended for both desktop and touch devices.
 * @returns validity
 */
export const checkButtonValidity = () => {
    var currentSelection = getCurrentSelection();
    var width = currentSelection.width;
    var height = currentSelection.height;
    if ((width >= 44) && (height >= 44)) {
        return true
    }
    return false;
}

/**
 * This is a function to check if the selected element already contains an example.
 * @returns Boolean
 */
export const checkInputExample = () => {
    var currentSelection = getCurrentSelection();
    var selectionParent = currentSelection.parent;
    if (selectionParent.name.endsWith('Annotation')) {
        for (let i = 0; i < selectionParent.children.length; i++) {
            if (selectionParent.children[i].name.endsWith('Eingabebeispiel')) {
                return selectionParent.children[i].characters;
            }
        }
    }
    return null;
}

/**
 * This is a function to check the validity of an input field. The text width of the input example should be smaller than the width of the input field.
 * @param input 
 * @returns Boolean
 */
export const checkInputValidity = async (input) => {
    var selection = getCurrentSelection();
    var selectionWidth = selection.width;
    var text = figma.createText();
    var textWidth = null;
    await loadingFont().then(() => {
        text.fontName = { family: 'Roboto', style: 'Regular' };
        text.fontSize = 16;
        text.fills = [{ type: 'SOLID', color: {r: 0, g: 0, b: 1} }];
        text.characters = input;
    })
    textWidth = text.width;
    text.remove();
    if (textWidth < selectionWidth) {
        return true;
    }
    return false;
}

/**
 * This is a function to check the validity of a link that is currently selected.
 * A text link should not wrap to a second line (Research-Based Web Design and Usability Guidelines 10.11).
 * @returns Boolean
 */
export const checkLinkValidity = async () => {
    var isText = false;
    var isImageOrShape = false;
    var selection = getCurrentSelection();
    if (selection.type === 'TEXT') {
        isText = true;
    } else {
        isImageOrShape = true;
    }
    if (isText) {
        var selectionHeight = selection.height;
        var fontSize = 16;
        if (selection.type === 'TEXT') {
            fontSize = selection.fontSize;
        }
        var text = figma.createText();
        var textHeight = null;
        await loadingFont().then(() => {
            text.fontName = { family: 'Roboto', style: 'Regular' };
            text.fontSize = fontSize;
            text.fills = [{ type: 'SOLID', color: {r: 0, g: 0, b: 1} }];
            text.characters = 'Test';
        })
        textHeight = text.height;
        if (selectionHeight <= textHeight) {
            return true;
        }
    }
    if (isImageOrShape) {
        var width = selection.width;
        var height = selection.height;
        if ((width >= 44) && (height >= 44)) {
            return true
        }
    }
    return false;
}

/**
 * This is a function to load a font
 */
const loadingFont = async () => {
    await figma.loadFontAsync({ family: 'Roboto', style: 'Regular'});
}
