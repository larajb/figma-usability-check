import { setText } from "./nodeProperties";
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
