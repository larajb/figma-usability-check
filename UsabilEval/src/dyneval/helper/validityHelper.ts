import { getCurrentSelection, getNode } from "../../figmaAccess/fileContents";
import { getHeight, getWidth, getFrame, getParent, getType } from "../../figmaAccess/nodeProperties";

/**
 * This is a function to check the validity of a connection between two nodes.
 * @param args 
 * @returns 
 */
export const checkValidity = (args) => {
    var validity = false;

    // get frame of step before
    var beforeNode = null;
    var beforeFrame = null;
    if (args.before === null) {
        var beforeNode = getCurrentSelection();
        beforeFrame = getFrame(beforeNode.id);
    } else {
        beforeNode = getNode(args.before);
        beforeFrame = getFrame(args.before);
    }

    // get frame of step after
    var afterNode = null;
    var afterFrame = null;
    if (args.after === null) {
        var afterNode = getCurrentSelection();
        afterFrame = getFrame(afterNode.id);
    } else {
        afterNode = getNode(args.after);
        afterFrame = getFrame(args.after);
    }

    // compare frames
    if (beforeFrame.id !== afterFrame.id) {
        var beforeNodeParent = getParent(beforeNode.id);
        if (beforeNodeParent.name.endsWith('Annotation')) {
            var element = beforeNodeParent.children[0];
            for (let i = 0; i < element.reactions.length; i++) {
                if (element.reactions[i].action.destinationId === afterFrame.id) {
                    validity = true;
                }
            }
        } else {
            for (let i = 0; i < beforeNode.reactions.length; i++) {
                if (beforeNode.reactions[i].action.destinationId === afterFrame.id) {
                    validity = true;
                }
            }
        }
    } else {
        validity = true;
    }

    return validity;
}

/**
 * This is a function to check the validity of a button that is currently selected. The target size of 44 x 44 pixels is taken from the WCAG 2.1 standard (2.5.5) where it is 
 * recommended for both desktop and touch devices.
 * @returns validity
 */
export const checkButtonValidity = (platform) => {
    var currentSelection = getCurrentSelection();
    var width = getWidth(currentSelection.id);
    var height = getHeight(currentSelection.id);
    if ((width >= 44) && (height >= 44)) {
        return true
    }
    return false;
}

/**
 * This is a function to check if the selected element already contains an example.
 */
export const checkInputExample = (platform) => {
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
}

/**
 * This is a function to check the validity of an input field. The text width of the input example should be smaller than the width of the input field.
 * @param input 
 * @returns validity
 */
export const checkInputValidity = async (input, platform) => {
    var selection = getCurrentSelection();
    var selectionWidth = getWidth(selection.id);
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
 * This is a function to check the validity of a link that is currently selected. A text link should not wrap to a second line (Research-Based Web Design and Usability Guidelines 10.11).
 * @returns validity
 */
export const checkLinkValidity = async (platform) => {
    var isText = false;
    var isImage = false;
    var currentSelection = getCurrentSelection();
    if (getType(currentSelection.id) === 'TEXT') {
        isText = true;
    } else {
        isImage = true;
    }
    if (isText) {
        var selection = getCurrentSelection();
        var selectionHeight = getHeight(selection.id);
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
    if (isImage) {
        var currentSelection = getCurrentSelection();
        var width = getWidth(currentSelection.id);
        var height = getHeight(currentSelection.id);
        if ((width >= 44) && (height >= 44)) {
            return true
        }
    }
    return false;
}

/**
 * This is a function to check if two tasks can be compared.
 * @param firstTask 
 * @param secondTask 
 * @returns Boolean
 */
export const checkTaskComparisonValidity = (firstTask, secondTask) => {
    var firstTaskEndFrame = getFrame(firstTask.steps[firstTask.steps.length-1].id);
    var secondTaskEndFrame = getFrame(secondTask.steps[secondTask.steps.length-1].id);
    if (firstTask.steps[0].id === secondTask.steps[0].id && firstTaskEndFrame === secondTaskEndFrame) {
        return true;
    }
    return false;
}

const loadingFont = async () => {
    await figma.loadFontAsync({ family: 'Roboto', style: 'Regular'});
}
