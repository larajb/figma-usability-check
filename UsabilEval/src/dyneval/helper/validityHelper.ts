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
 * This is a function to check the validity of a button that is currently selected.
 * @returns validity
 */
export const checkButtonValidity = (platform) => {
    var validity = false;
    var currentSelection = getCurrentSelection();
    var width = getWidth(currentSelection.id);
    var height = getHeight(currentSelection.id);
    /** different min values depending on platform and frame size?
     * WCAG Richtlinie allgemeingültig > kein Bezug auf Plattform oder Bildschirmgröße
     */
    validity = (width >= 44) && (height >= 44);
    return validity;
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
 * This is a function to check the validity of an input field.
 * @param input 
 * @returns validity
 */
export const checkInputValidity = (input, platform) => {
    // input field size should fit with input (example) text
    // var text = figma.createText();
    // loadingFont().then(() => {
    //     text.fontName = { family: 'Roboto', style: 'Regular' };
    //     text.fills = [{ type: 'SOLID', color: {r: 0, g: 0, b: 1} }];
    //     text.characters = input;
    // })
    // /**
    //  * The width of an element always = 0 when accessed directly, even if it != 0 when checking inside the node
    //  */
    // var width = text.width;     // DOESN'T WORK! WHY?!
    return true;
}

/**
 * This is a function to check the calidity of a link that is currently selected.
 * @returns validity
 */
export const checkLinkValidity = (platform) => {
    var validity = false;
    var isText = false;
    var isImage = false;
    var currentSelection = getCurrentSelection();
    if (getType(currentSelection.id) === 'TEXT') {
        isText = true;
    } else {
        isImage = true;
    }
    if (isText) {
        // textual link: state should be changed when clicked --> CAN'T BE CHECKED (STATE CHANGE NOT POSSIBLE, JUST WITH ANOTHER PAGE)
        var lengthIsValid = false;
        /** textual link: length should be valid > Nicht mehr als eine Zeile, manchmal aber auch ein Wort gut... schwierig auszulegen
         */
    }
    if (isImage) {
        var sizeIsValid = false;
        /** graphical link: size should be valid > When is the size valid?
         */
    }
    
    return true;
}

const loadingFont = async () => {
    await figma.loadFontAsync({ family: 'Roboto', style: 'Regular'});
}
