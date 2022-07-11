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


/**
 * This is a function to add an annotation to a file
 * @param annotation
 */
export const addAnnotationToFile = (currentSelection, annotation) => {
    var selectionParent = getParent(currentSelection.id);
    var index = selectionParent.children.findIndex(child => JSON.stringify(child) === JSON.stringify(currentSelection));
    if (selectionParent.name.endsWith('Annotation')) {
        selectionParent.insertChild(selectionParent.children.length, annotation);
        index = selectionParent.parent.children.findIndex(child => JSON.stringify(child) === JSON.stringify(selectionParent));
    } else {
        const elementAndAnnotationGroupNode: SceneNode[] = [];
        elementAndAnnotationGroupNode.push(annotation);
        var elementAndAnnotationGroup = figma.group(elementAndAnnotationGroupNode, figma.currentPage);
        for (const node of figma.currentPage.selection) {
            var parent = node.parent;
            elementAndAnnotationGroup.name = node.name + ' + Annotation';
            elementAndAnnotationGroup.insertChild(0, node);
            parent.insertChild(index, elementAndAnnotationGroup);
        }
    }
}
