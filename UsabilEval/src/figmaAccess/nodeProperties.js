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
 * This is a function to get the relative transformation of a given node.
 * @param nodeId
 * @returns relativeTransformation as array
 */
export const getRelativeTransform = (nodeId) => {
    var relativeTransform = null;
    var node = figma.getNodeById(nodeId);
    if ('relativeTransform' in node) {
        relativeTransform = node.relativeTransform;
    }
    return relativeTransform;
};
/**
 * This is a function to set the relative Transformation of a given node.
 * @param nodeId
 * @param xTransformation
 * @param yTransformation
 */
export const setRelativeTransform = (node, xTransformation, yTransformation) => {
    node.x = xTransformation;
    node.y = yTransformation;
};
/**
 * This is a function to get the width of a given node.
 * @param nodeId
 * @returns width
 */
export const getWidth = (nodeId) => {
    var width = null;
    var node = figma.getNodeById(nodeId);
    if ('width' in node) {
        width = node.width;
    }
    return width;
};
/**
 * This is a function to get the height of a given node.
 * @param nodeId
 * @returns height
 */
export const getHeight = (nodeId) => {
    var height = null;
    var node = figma.getNodeById(nodeId);
    if ('height' in node) {
        height = node.height;
    }
    return height;
};
/**
 * This is a function to get the parent node of a given node.
 * @param nodeId
 * @returns parent
 */
export const getParent = (nodeId) => {
    var parent = null;
    var node = figma.getNodeById(nodeId);
    parent = node.parent;
    return parent;
};
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
 * This is a function to get the reactions of a given node.
 * @param nodeId
 * @returns reactions
 */
export const getReactions = (nodeId) => {
    var reactions = null;
    var node = figma.getNodeById(nodeId);
    if ('reactions' in node) {
        reactions = node.reactions;
    }
    return reactions;
};
/**
 * This is a function to get the center (point (x,y)) of a node.
 * @param nodeId
 * @returns object with x and y position
 */
export const getCenterOfNode = (nodeId) => {
    var centerX = 0;
    var centerY = 0;
    var relativeTransform = getRelativeTransform(nodeId);
    var width = getWidth(nodeId);
    var height = getHeight(nodeId);
    centerX = relativeTransform[0][2] + (1 / 2 * width);
    centerY = relativeTransform[1][2] + (1 / 2 * height);
    return { x: centerX, y: centerY };
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
