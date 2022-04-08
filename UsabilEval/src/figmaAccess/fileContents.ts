import { getParent } from "./nodeProperties";

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
}

export const getNode = (nodeId) => {
    var node = figma.getNodeById(nodeId);
    return node;
}

/**
 * This is a function to get all nodes on the current page.
 * @returns nodes
 */
export const getAllNodes = () => {
    const nodes = figma.currentPage.findAll();
    return nodes;
}

/**
 * This is a function to get all  nodes on the current page that have a given type.
 * @returns frameNodes
 */
export const getAllNodesOfType = (type) => {
    const frameNodes = figma.currentPage.findAll(n => n.type === type);
    return frameNodes;
}


/**
 * This is a function to add an annotation to a file
 * @param annotation
 */
export const addAnnotationToFile = (currentSelection, annotation) => {
    var selectionParent = getParent(currentSelection.id);
    if (selectionParent.name.endsWith('Annotation')) {
        selectionParent.insertChild(selectionParent.children.length, annotation);
    } else {
        const elementAndAnnotationGroupNode: SceneNode[] = [];
        elementAndAnnotationGroupNode.push(annotation);
        var elementAndAnnotationGroup = figma.group(elementAndAnnotationGroupNode, figma.currentPage);
        for (const node of figma.currentPage.selection) {
            var parent = node.parent;
            elementAndAnnotationGroup.name = node.name + ' + Annotation';
            elementAndAnnotationGroup.insertChild(0, node);
            parent.appendChild(elementAndAnnotationGroup);
        }
    }
}
