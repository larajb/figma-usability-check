import { addAnnotationToFile, getCurrentSelection } from "../../figmaAccess/fileContents";
import { createEllipseNode, createGroupNode, createTextNode } from "../../figmaAccess/nodeCreator";
import { getHeight, getParent, getRelativeTransform, setRelativeTransform, setText } from "../../figmaAccess/nodeProperties";
import { checkInputExample } from "./validityHelper";
/**
 * This is a function to create an example text for an input field.
 * @param input
 * @param taskname
 * @returns Boolean
 */
export const createExampletext = (input, taskname) => {
    var result = checkInputExample();
    if (result === null) {
        var selection = getCurrentSelection();
        if (selection !== null) {
            var selectionRelTransform = getRelativeTransform(selection.id);
            var selectionHeight = getHeight(selection.id);
            var text = createTextNode('Annotation - ' + taskname + ' - Eingabebeispiel', { r: 0, g: 0, b: 1 }, null, input);
            setRelativeTransform(text, selectionRelTransform[0][2] + 10, selectionRelTransform[1][2] + selectionHeight / 2 - text.height / 2);
            addAnnotationToFile(selection, text);
        }
    }
    return true;
};
/**
 * This is a function to create a task annotation to the current selection.
 * @param taskname
 * @param numSteps
 * @param color
 * @param selection
 * @param index
 * @returns annotation
 */
export const createTaskAnnotation = (taskname, numSteps, color, selection = null, index = null) => {
    var stepNumber = String(numSteps + 1);
    if (index !== null) {
        stepNumber = String(index++);
    }
    var convertedColor = convertColor(color);
    var currentSelection = null;
    if (selection !== null) {
        currentSelection = selection;
    }
    else {
        currentSelection = getCurrentSelection();
    }
    if (currentSelection !== null) {
        var selectionRelTransform = getRelativeTransform(currentSelection.id);
        var selectionParent = getParent(currentSelection.id);
        var ellipse = createEllipseNode('Annotation - ' + taskname, 24, 24, convertedColor);
        var text = createTextNode('Annotation - ' + taskname + ' - Text', { r: 1, g: 1, b: 1 }, { r: 0, g: 0, b: 0 }, stepNumber);
        var containsExample = false;
        var containsJustExample = false;
        for (let i = 0; i < selectionParent.children.length; i++) {
            if (selectionParent.children[i].name.endsWith('Eingabebeispiel')) {
                containsExample = true;
                if (selectionParent.children.length === 2) {
                    containsJustExample = true;
                }
            }
        }
        if (selectionParent.name.endsWith('Annotation') === false) {
            setRelativeTransform(ellipse, selectionRelTransform[0][2] - 12, selectionRelTransform[1][2] - 12);
            setRelativeTransform(text, selectionRelTransform[0][2] - 4, selectionRelTransform[1][2] - 9);
        }
        else if (containsJustExample === true) {
            setRelativeTransform(ellipse, selectionRelTransform[0][2] - 12, selectionRelTransform[1][2] - 12);
            setRelativeTransform(text, selectionRelTransform[0][2] - 4, selectionRelTransform[1][2] - 9);
        }
        else if (containsExample === true) {
            setRelativeTransform(ellipse, selectionRelTransform[0][2] + ((selectionParent.children.length - 3) * 12) + ((selectionParent.children.length - 2) * 4), selectionRelTransform[1][2] - 12);
            setRelativeTransform(text, selectionRelTransform[0][2] + ((selectionParent.children.length - 2) * 16) - 4, selectionRelTransform[1][2] - 9);
        }
        else if (containsExample === false) {
            setRelativeTransform(ellipse, selectionRelTransform[0][2] + ((selectionParent.children.length - 2) * 12) + ((selectionParent.children.length - 1) * 4), selectionRelTransform[1][2] - 12);
            setRelativeTransform(text, selectionRelTransform[0][2] + ((selectionParent.children.length - 1) * 16) - 4, selectionRelTransform[1][2] - 9);
        }
        var annotation = createGroupNode('Annotation - ' + taskname + ' - ', [ellipse, text]);
        addAnnotationToFile(currentSelection, annotation);
        return annotation;
    }
};
/**
 * This is a function to delete a step annotation and adapt the following step annotation numbers.
 * @param step
 * @param followingSteps
 */
export const deleteStepAnnotation = (step, followingSteps) => {
    var stepAnnotation = figma.getNodeById(step.id);
    var annotationInput = step.input;
    var parent = getParent(step.id);
    stepAnnotation.remove();
    if (annotationInput !== '' && parent.children.length === 2) {
        for (let i = 0; i < parent.children.length; i++) {
            if (parent.children[i].type === 'TEXT' && parent.children[i].characters === annotationInput) {
                parent.children[i].remove();
            }
        }
    }
    if (parent.children.length === 1) {
        var node = parent.children[0];
        var parentsParent = parent.parent;
        var index = null;
        for (let i = 0; i < parentsParent.children.length; i++) {
            if (parentsParent.children[i].id === parent.id) {
                index = i;
            }
        }
        parentsParent.insertChild(index, node);
    }
    if (followingSteps !== undefined) {
        followingSteps.forEach(step => {
            var stepNode = figma.getNodeById(step.id);
            if (stepNode.type === 'GROUP') {
                for (let i = 0; i < stepNode.children.length; i++) {
                    if (stepNode.children[i].type === 'TEXT') {
                        var current = parseInt(stepNode.children[i].characters);
                        setText(stepNode.children[i], { r: 1, g: 1, b: 1 }, { r: 0, g: 0, b: 0 }, String(current - 1));
                    }
                }
            }
        });
    }
};
/**
 * This is a function to update a step annotation number.
 * @param annotationId
 * @param number
 */
export const updateStepAnnotation = (annotationId, number) => {
    var annotation = figma.getNodeById(annotationId);
    if (annotation.type === 'GROUP') {
        for (let i = 0; i < annotation.children.length; i++) {
            if (annotation.children[i].type === 'TEXT') {
                setText(annotation.children[i], { r: 1, g: 1, b: 1 }, { r: 0, g: 0, b: 0 }, String(number));
            }
        }
    }
};
/**
 * This function is used to get the node of an annotated element by annotation id.
 * @param id
 * @returns selection
 */
export const getElementToAnnotation = (id) => {
    var annotation = figma.getNodeById(id);
    var parent = getParent(annotation.id);
    var selection = parent.children[0];
    return selection;
};
/**
 * This is a function to convert a css formatted rgb color to a figma formatted rgb color.
 * @param color
 * @returns Object
 */
const convertColor = (color) => {
    color = color.replace('rgb(', '');
    color = color.replace(')', '');
    var colorSplitted = color.split(',');
    return {
        r: parseInt(colorSplitted[0]) / 255,
        g: parseInt(colorSplitted[1]) / 255,
        b: parseInt(colorSplitted[2]) / 255,
    };
};
