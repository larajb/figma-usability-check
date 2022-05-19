import { getReactions } from "../../figmaAccess/nodeProperties";

/**
 * This is a function to evaluate the color consistency above multiple frames in a document.
 * This function is applied to all frames together.
 * @param frames
 * @returns Object 
 */
export const localColorConsistency = (frames) => {
    var colorStyles = figma.getLocalPaintStyles();
    var predefinedColorStyles = [];
    colorStyles.forEach(style => {
        const index = predefinedColorStyles.findIndex((colorStyle) => JSON.stringify(colorStyle) === JSON.stringify(style.paints));
        if (index < 0 && containsBlackOrWhite(style.paints) === false && style.paints.length > 0) {
            predefinedColorStyles.push(style.paints);
        }
    })
    var nodeFills = [];
    frames.forEach(frame => {
        const frameNode = figma.getNodeById(frame.id);
        if (frameNode.type === 'FRAME') {
            const nodes = frameNode.findAll();
            nodes.forEach(node => {
                if (!node.name.startsWith('Annotation')) {
                    if ('fills' in node) {
                        const index = nodeFills.findIndex((nodeFill) => JSON.stringify(nodeFill.fill) === JSON.stringify(node.fills));
                        if (containsBlackOrWhite(node.fills) === false && containsImage(node.fills) === false && node.fills.length > 0) {
                            if (index < 0) {
                                nodeFills.push({ nodes: [node.id], fill: node.fills });
                            } else if (index >= 0) {
                                nodeFills[index].nodes.push(node.id);
                            }
                        }
                    }
                }
            });
        }
    });
    var notPredefined = [];
    nodeFills.forEach(nodeFill => {
        const index = predefinedColorStyles.findIndex((style) => JSON.stringify(style) === JSON.stringify(nodeFill.fill));
        if (index < 0) {
            notPredefined.push(nodeFill);
        }
    });
    var colorConsistencyValue = (colorStyles.length / nodeFills.length) * 100;
    return { value: colorConsistencyValue, nodes: notPredefined };
}

/**
 * This is a function to evaluate the font consistency above multiple frames in a document.
 * This function is applied to all frames together.
 * @param frames
 * @returns Object
 */
export const localFontConsistency = (frames) => {
    var textStyles = figma.getLocalTextStyles();
    var predefinedTextStyles = [];
    textStyles.forEach(style => {
        var fontNameAndSize = { fontName: style.fontName, fontSize: style.fontSize };
        var index = predefinedTextStyles.findIndex((style) => JSON.stringify(style) === JSON.stringify(fontNameAndSize));
        if (index < 0) {
            predefinedTextStyles.push(fontNameAndSize);
        }
    });
    var nodeTextStyles = [];
    frames.forEach(frame => {
        const frameNode = figma.getNodeById(frame.id);
        if (frameNode.type === 'FRAME') {
            const nodes = frameNode.findAll();
            nodes.forEach(node => {
                if (!node.name.startsWith('Annotation')) {
                    if (node.type === 'TEXT') {
                        var fontNameAndSize = { fontName: node.fontName, fontSize: node.fontSize };
                        var index = nodeTextStyles.findIndex((style) => JSON.stringify(style.fontStyle) === JSON.stringify(fontNameAndSize));
                        if (index < 0) {
                            nodeTextStyles.push({ nodes: [node.id], fontStyle: fontNameAndSize });
                        } else if (index >= 0) {
                            nodeTextStyles[index].nodes.push(node.id);
                        }
                    }
                }
            });
        }
    });
    var notPredefined = [];
    nodeTextStyles.forEach(textStyle => {
        const index = predefinedTextStyles.findIndex((style) => JSON.stringify(style) === JSON.stringify(textStyle.fontStyle));
        if (index < 0) {
            notPredefined.push(textStyle);
        }
    });
    var fontConsistencyValue = (textStyles.length / nodeTextStyles.length) * 100;
    return { value: fontConsistencyValue, nodes: notPredefined };
}

/**
 * This is a function to check that the font size of a text is equal to or bigger than 12pt.
 * This function is appliex to one text element.
 * @param frames
 * @returns Object
 */
export const fontSize = (frames) => {
    var textsWithSmallerFontSize = [];
    frames.forEach(frame => {
        const frameNode = figma.getNodeById(frame.id);
        if (frameNode.type === 'FRAME') {
            const textNodes = frameNode.findAll(node => node.type === 'TEXT');
            textNodes.forEach(text => {
                if (text.fontSize < 12) {
                    var name = text.name;
                    if (name.length > 30) {
                        name = (name.slice(0, 30)) + '...';
                    }
                    textsWithSmallerFontSize.push({ id: text.id, name: name });
                }
            });
        }
    });
    return { value: null, nodes: textsWithSmallerFontSize };
}

/**
 * This is a function to check if any frame is missing a homepage reference.
 * The function is applied to all frames together.
 * @param selectedFrames
 * @param homepageId
 * @returns Object
 */
export const homepageReference = (selectedFrames, homepageId) => {
    var missingReferences = [];
    selectedFrames.forEach(frame => {
        var isFound = false;
        if (frame.id !== homepageId) {
            var frameNode = figma.getNodeById(frame.id);
            if (frameNode.type === 'FRAME') {
                const nodes = frameNode.findAll();
                nodes.forEach(node => {
                    var reactions = getReactions(node.id);
                    if (reactions.length > 0) {
                        reactions.forEach(reaction => {
                            if (reaction.action !== null && reaction.action.destinationId === homepageId) {
                                isFound = true;
                            }
                        });
                    }
                });
            }
        } else {
            var isFound = true;
        }
        if (isFound === false) {
            missingReferences.push({ id: frame.id, name: frame.name });
        }
    });
    var homepageReferenceValue = (selectedFrames.length - missingReferences.length) / selectedFrames.length;
    return { value: homepageReferenceValue, nodes:  missingReferences };
}

/**
 * This is a function to check if the current page contains any orphan frames.
 * The function is applied to all frames together.
 * @param selectedFrames
 * @returns Object
 */
export const orphanPages = (selectedFrames) => {
    var orphanPages = [];
    selectedFrames.forEach(frame1 => {
        var targetId = frame1.id;
        var isFound = false;
        selectedFrames.forEach(frame2 => {
            const frameNode2 = figma.getNodeById(frame2.id);
            if (frameNode2.type === 'FRAME') {
                const nodes = frameNode2.findAll();
                nodes.forEach(node => {
                    var reactions = getReactions(node.id);
                    if (reactions.length > 0) {
                        reactions.forEach(reaction => {
                            if (reaction.action !== null && reaction.action.destinationId === targetId) {
                                isFound = true;
                            }
                        });
                    }
                });
            }
        });
        if(isFound === false) {
            orphanPages.push({ id: frame1.id, name: frame1.name });
        }
    });
    var orphanPagesValue = orphanPages.length / selectedFrames.length;
    return { value: orphanPagesValue, nodes: orphanPages };
}


/********************
 * HELPER
 ********************/

/**
 * This is a function to check if a fills object only contains the colors black or white.
 * @param fills 
 * @returns containsBlackOrWhite
 */
 const containsBlackOrWhite = (fills) => {
    var containsBlackOrWhite = false;
    if (fills.length === 1) {
        fills.forEach(fill => {
            if (JSON.stringify(fill.color) === JSON.stringify({ r: 0, g: 0, b: 0 }) || JSON.stringify(fill.color) === JSON.stringify({ r: 1, g: 1, b: 1 })) {
                containsBlackOrWhite = true;
            }
        });
    } else {
        var containsArray = [];
        fills.forEach(fill => {
            if (JSON.stringify(fill.color) === JSON.stringify({ r: 0, g: 0, b: 0 }) || JSON.stringify(fill.color) === JSON.stringify({ r: 1, g: 1, b: 1 })) {
                containsArray.push(true);
            }
        });
        const foundings = containsArray.find(contains => contains === false);
        if (foundings === undefined) {
            containsBlackOrWhite = true
        }
    }
    return containsBlackOrWhite;
}

/**
 * This is a function to check if a fills object contains an image.
 * @param fills 
 * @returns containsImage
 */
const containsImage = (fills) => {
    var containsImage = false;
    fills.forEach(fill => {
        if (fill.type === 'IMAGE') {
            containsImage = true;
        }
    });
    return containsImage;
}
