/**
 * This is a function to get the underlying frame that contains a given node.
 * @param nodeId
 * @returns frame
 */
export const getFrame = (nodeId) => {
    var frame = null;
    var node = figma.getNodeById(nodeId);
    if (node.type !== 'FRAME') {
        var nodeParent = node.parent;
        while (nodeParent.type !== 'FRAME') {
            nodeParent = nodeParent.parent;
        }
        frame = nodeParent;
    }
    else {
        frame = node;
    }
    return frame;
};
/**
 * This is a function to get the underlying page that contains a given node.
 * @param nodeId
 * @returns page
 */
export const getPage = (nodeId) => {
    var page = null;
    var node = figma.getNodeById(nodeId);
    if (node.type !== 'PAGE') {
        var nodeParent = node.parent;
        while (nodeParent.type !== 'PAGE') {
            nodeParent = nodeParent.parent;
        }
        page = nodeParent;
    }
    else {
        page = node;
    }
    return page;
};
/**
 * This is a function to get the current selection.
 * @returns selection
 */
export const getCurrentSelection = () => {
    var selection = null;
    if (figma.currentPage.selection.length === 1) {
        for (const node of figma.currentPage.selection) {
            selection = node;
        }
    }
    return selection;
};
/**
 * This is a function to get the center (point (x,y)) of a node.
 * @param nodeId
 * @returns object with x and y position
 */
export const getCenterOfNode = (nodeId) => {
    var centerX = 0;
    var centerY = 0;
    var node = figma.getNodeById(nodeId);
    var relativeTransform = node.relativeTransform;
    var width = node.width;
    var height = node.height;
    centerX = relativeTransform[0][2] + (1 / 2 * width);
    centerY = relativeTransform[1][2] + (1 / 2 * height);
    return { x: centerX, y: centerY };
};
