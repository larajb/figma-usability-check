import { resourceLimits } from "worker_threads";
import { addAnnotationToFile, getCurrentSelection, getNode } from "../../figmaAccess/fileContents";
import { createEllipseNode, createGroupNode, createTextNode } from "../../figmaAccess/nodeCreator";
import { getHeight, getParent, getRelativeTransform, getType, setRelativeTransform, setText } from "../../figmaAccess/nodeProperties";
import { distantContent, laboriousTask, tooManyLayers } from "./usabilitySmellsHelper";

/**
 * This is a function to create an example text for an input field.
 * @param input 
 * @param taskname
 * @returns text
 */
export const createExampletext = (input, taskname) => {
    var currentSelection = getCurrentSelection();
    var selectionRelTransform = getRelativeTransform(currentSelection.id);
    var selectionHeight = getHeight(currentSelection.id);

    var text = createTextNode('Annotation - ' + taskname + ' - Eingabebeispiel ', {r: 0, g: 0, b: 1}, null, input)
    setRelativeTransform(text, selectionRelTransform[0][2] + 10, selectionRelTransform[1][2] + selectionHeight / 2 - text.height / 2)

    addAnnotationToFile(currentSelection, text);

    return text;
}

/**
 * This is a function to create a task annotation to the current selection.
 * @param taskname 
 * @param numSteps 
 * @param color 
 * @returns annotation
 */
export const createTaskAnnotation = (taskname, numSteps, color) => {
    var stepNumber = String(numSteps + 1);
    var convertedColor = convertColor(color);
    var currentSelection = getCurrentSelection();
    var selectionRelTransform = getRelativeTransform(currentSelection.id);
    var selectionParent = getParent(currentSelection.id);

    var ellipse = createEllipseNode('Annotation - ' + taskname + ' - ' + stepNumber, 24, 24, convertedColor);
    var text = createTextNode('Annotation - ' + taskname + ' - ' + stepNumber + ' - Text', {r: 1, g: 1, b: 1}, {r: 0, g: 0, b: 0}, stepNumber)
    if (selectionParent.name.endsWith('Annotation')) {
        setRelativeTransform(ellipse, selectionRelTransform[0][2] + ((selectionParent.children.length - 2) * 12), selectionRelTransform[1][2] - 12);
        setRelativeTransform(text, selectionRelTransform[0][2] + ((selectionParent.children.length - 1) * 12) - 3, selectionRelTransform[1][2] - 7);
    } else {
        setRelativeTransform(ellipse, selectionRelTransform[0][2] - 12, selectionRelTransform[1][2] - 12);
        setRelativeTransform(text, selectionRelTransform[0][2] - 3, selectionRelTransform[1][2] - 7);
    }

    var annotation = createGroupNode('Annotation - ' + taskname + ' - ' + stepNumber + ' - ', [ellipse, text]);

    addAnnotationToFile(currentSelection, annotation);

    return annotation;
}

/**
 * This is a function to delete a step annotation and adapt the following step annotation numbers.
 * @param step 
 * @param followingSteps 
 */
export const deleteStepAnnotation = (step, followingSteps) => {
    var stepAnnotation = getNode(step.id);
    var annotationInput = step.input;
    var parent = getParent(step.id);
    stepAnnotation.remove();
    if (annotationInput !== '') {
        for (let i = 0; i < parent.children.length; i++) {
            if (getType(parent.children[i].id) === 'TEXT' && parent.children[i].characters === annotationInput) {
                parent.children[i].remove();
            }
        }
    }
    if (parent.children.length === 1) {
        var node = parent.children[0];
        var parentsParent = parent.parent;
        var index = null;
        for(let i = 0; i < parentsParent.children.length; i++) {
            if (parentsParent.children[i].id === parent.id) {
                index = i;
            }
        }
        parentsParent.insertChild(index, node);
    }
    if (followingSteps !== undefined) {
        followingSteps.forEach(step => {
            var stepNode = getNode(step.id);
            if (getType(stepNode.id) === 'GROUP') {
                for (let i = 0; i < stepNode.children.length; i++) {
                    if (getType(stepNode.children[i].id) === 'TEXT') {
                        var current = parseInt(stepNode.children[i].characters);
                        stepNode.children[i].characters = String(current - 1);
                    }
                }
            }
        });
    }
}

/**
 * This is a function to update a step annotation number.
 * @param annotationId 
 * @param number 
 */
export const updateStepAnnotation = (annotationId, number) => {
    var annotation = getNode(annotationId);
    if (getType(annotationId) === 'GROUP') {
        for (let i = 0; i < annotation.children.length; i++) {
            if(getType(annotation.children[i].id) === 'TEXT') {
                setText(annotation, {r: 1, g: 1, b: 1}, {r: 0, g: 0, b: 0}, String(number));
            }
        }
    }
}

/**
 * This is a function to check some usability smells saved in a js file.
 * @param task 
 * @returns result
 */
export const checkUsabilitySmells = (history, task) => {
    var results = [];            // smells = [ { title: ..., value: ... }, ... ]
    // Too Many Layers
    var tooManyLayersResult = tooManyLayers(task);
    if (tooManyLayersResult.isFound) {
        results.push({ title: 'Too Many Layers', value: tooManyLayersResult.value });
    }
    // High Website Element Distance
    // Laborious Task
    var laboriousTaskResult = laboriousTask(history, task);
    if (laboriousTaskResult.isFound) {
        results.push({ title: 'Too Many Layers', value: laboriousTaskResult.value });
    }
    // Cyclic Task
    // Distant Content
    var distantContentResult = distantContent(task);
    if (distantContentResult.isFound) {
        results.push({ title: 'Distant Content', value: distantContentResult.value });
    }
    return results;
}

/**
 * This is a function to convert a css formatted rgb color to a figma formatted rgb color.
 * @param color 
 * @returns 
 */
const convertColor = (color) => {
    color = color.replace('rgb(', '');
    color = color.replace(')', '');
    var colorSplitted = color.split(',');
    return {
        r: parseInt(colorSplitted[0]) / 255,
        g: parseInt(colorSplitted[1]) / 255,
        b: parseInt(colorSplitted[2]) / 255,
    }
}
