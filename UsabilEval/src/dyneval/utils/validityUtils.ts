
export const checkButtonValidity = () => {
    // target size should be min. 44 x 44
    var width = 0;
    var height = 0;
    if (figma.currentPage.selection.length === 1) {
        for (const node of figma.currentPage.selection) {
            if ('width' in node) {
                width = node.width;
            }
            if ('height' in node) {
                height = node.height;
            }
        }
    }
    return (width >= 44) && (height >= 44)
}

export const checkInputValidity = (input) => {
    // input field size should fit with input (example) text
    var text = figma.createText();
    loadingFont().then(() => {
        text.fontName = { family: 'Roboto', style: 'Regular' };
        text.fills = [{ type: 'SOLID', color: {r: 0, g: 0, b: 1} }];
        text.characters = input;
    })
    // var width = text.width;     // DOESN'T WORK! WHY?!

    return true;
}

export const checkLinkValidity = () => {
    var validity = false;
    var isText = false;
    var isImage = false;
    var selectedNode = null;

    for (const node of figma.currentPage.selection) {
        selectedNode = node;
        if (node.type === 'TEXT') {
            isText = true;
        } else {
            isImage = true;
        }
    }
    if (isText) {
        // textual link: state should be changed when clicked --> CAN'T BE CHECKED (STATE CHANGE NOT POSSIBLE, JUST WITH ANOTHER PAGE)
        var lengthIsValid = false;
        // textual link: length should be valid > What is a valid length?
    }
    if (isImage) {
        var sizeIsValid = false;
        // graphical link: size should be valid > When is the size valid?
    }
    
    return true;
}

export const checkValidity = (args) => {
    var validity = false;

    // get frame of step before
    var beforeNode = null;
    var beforeFrame = null;
    if (args.before === null) {
        if (figma.currentPage.selection.length === 1) {
            for (const node of figma.currentPage.selection) {
                beforeNode = node;
                while (beforeNode.type !== 'FRAME') {
                    beforeNode = beforeNode.parent;
                }
            }
            beforeFrame = beforeNode;
        }
    } else {
        beforeNode = figma.getNodeById(args.before);
        var beforeParent = beforeNode.parent;
        while (beforeParent.type !== 'FRAME') {
            beforeParent = beforeParent.parent;
        }
        beforeFrame = beforeParent;
    }

    // get frame of step after
    var afterNode = null;
    var afterFrame = null;
    if (args.after === null) {
        if (figma.currentPage.selection.length === 1) {
            for (const node of figma.currentPage.selection) {
                afterNode = node;
                while (afterNode.type !== 'FRAME') {
                    afterNode = afterNode.parent;
                }
            }
            afterFrame = afterNode;
        }
    } else {
        afterNode = figma.getNodeById(args.after);
        var afterParent = afterNode.parent;
        while (afterParent.type !== 'FRAME') {
            afterParent = afterParent.parent;
        }
        afterFrame = afterParent;
    }

    // compare frames
    if (beforeFrame.id !== afterFrame.id) {
        // get interaction of before step
        var beforeNodeParent = beforeNode.parent;
        var element = beforeNodeParent.children[0];
        for (let i = 0; i < element.reactions.length; i++) {
            if (element.reactions[i].action.destinationId === afterFrame.id) {
                validity = true;
            }
        }
    } else {
        validity = true;
    }

    return validity;
}

const loadingFont = async () => {
    await figma.loadFontAsync({ family: 'Roboto', style: 'Regular'});
}
