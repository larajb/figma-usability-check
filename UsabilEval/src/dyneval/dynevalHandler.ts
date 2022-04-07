import { dispatch, handleEvent } from '../codeMessageHandler';
import { checkButtonValidity,
    checkInputValidity,
    checkLinkValidity,
    checkValidity } from './utils/validityUtils';
import { calculateTimeForTask } from './utils/gomsUtils';

export const dynevalView = () => {
    handleEvent('addTaskStep', (args) => {
        if (args.type === 'input') {
            createExampletext(args.input, args.taskname);
        }
        createAnnotation(args);
    });
    handleEvent('deleteSteps', (args) => {
        args.steps.forEach(step => {
            deleteAnnotation({ taskname: args.taskname, step: step});
        });
    });
    handleEvent('deleteStep', (args) => {
        deleteAnnotation(args);
    });
    handleEvent('updateStepNumbers', (tasks) => {
        for (let i = 0; i < tasks.length; i++) {
            for (let j = 0; j < tasks[i].steps.length; j++) {
                updateAnnotation(tasks[i].steps[j].id, j+1);
            }
        }
    })
    handleEvent('calculateGoms', (task) => {
        calculateTimeForTask(task);
    })

    handleEvent('checkStepValidityBefore', async (args) => {
        var validity = await checkValidity(args);
        dispatch('validityBefore', validity);
    });
    handleEvent('checkStepValidityAfter', async (args) => {
        var validity = await checkValidity(args);
        dispatch('validityAfter', validity);
    });
    handleEvent('checkButtonValidity', async () => {
        var validity = await checkButtonValidity();
        dispatch('buttonValidity', validity);
    });
    handleEvent('checkInputValidity', async (input) => {
        var validity = await checkInputValidity(input);
        dispatch('inputValidity', validity);
    });
    handleEvent('checkLinkValidity', async () => {
        console.log('check link validity');
        var validity = await checkLinkValidity();
        dispatch('linkValidity', validity);
    });

    handleEvent('getTaskStorage', async () => {
        var tasks = await figma.clientStorage.getAsync('tasks');
        dispatch('currentTaskStorage', tasks);
    });
    handleEvent('setTaskStorage', async (tasks) => {
        await figma.clientStorage.setAsync('tasks', tasks);
    })
};

const createAnnotation = (args) => {
    // create annotation with number in colored circle (text white with black stroke)
    var stepNumber = String(args.numSteps + 1);
    var color = convertColor(args.color);
    // var typeAnnotation = null;

    const groupNode: SceneNode[] = [];

    if (figma.currentPage.selection.length === 1) {
        for (const node of figma.currentPage.selection) {
            if ('relativeTransform' in node) {
                var selectionRelTransform = node.relativeTransform;
            }
            if ('parent' in node) {
                var selectionParent = node.parent;
            }
        }
    }

    // create Ellipse for annotation
    let ellipse = figma.createEllipse();
    ellipse.name = 'Annotation - ' + args.taskname + ' - ' + stepNumber;
    ellipse.resize(24, 24);
    if (selectionParent.name.endsWith('Annotation')) {
        ellipse.x = selectionRelTransform[0][2] + ((selectionParent.children.length - 2) * 12);
    } else {
        ellipse.x = selectionRelTransform[0][2] - 12;
    }
    ellipse.y = selectionRelTransform[1][2] - 12;
    ellipse.fills = [{ type: 'SOLID', color: color }];

    // create annotations text
    var text = figma.createText();
    text.name = 'Annotation - ' + args.taskname + ' - ' + stepNumber + ' - Text';
    if (selectionParent.name.endsWith('Annotation')) {
        text.x = selectionRelTransform[0][2] + ((selectionParent.children.length - 1) * 12) - 3;
    } else {
        text.x = selectionRelTransform[0][2] - 3;
    }
    text.y = selectionRelTransform[1][2] - 7;
    loadingFont().then(() => {
        text.fontName = { family: 'Roboto', style: 'Regular' };
        text.fills = [{ type: 'SOLID', color: {r: 1, g: 1, b: 1} }];
        const stroke: Paint = { type: "SOLID", color: {r: 0, g: 0, b: 0} };
        text.strokes = [stroke];
        text.characters = stepNumber;
    })

    // add ellipse and text to a group
    groupNode.push(ellipse, text);
    var group = figma.group(groupNode, figma.currentPage);
    group.name = 'Annotation - ' + args.taskname + ' - ' + stepNumber + ' - ' + group.id;

    if (selectionParent.name.endsWith('Annotation')) {
        selectionParent.insertChild(selectionParent.children.length, group);
    } else {
        const elementAndAnnotationGroupNode: SceneNode[] = [];
        elementAndAnnotationGroupNode.push(group);
        var elementAndAnnotationGroup = figma.group(elementAndAnnotationGroupNode, figma.currentPage);
        for (const node of figma.currentPage.selection) {
            var parent = node.parent;
            elementAndAnnotationGroup.name = node.name + ' + Annotation';
            elementAndAnnotationGroup.insertChild(0, node);
            parent.appendChild(elementAndAnnotationGroup);
        }
    }

    dispatch('taskStepAdded', { taskname: args.taskname, id: group.id});
}

const createExampletext = (input, taskname) => {
    // get relativeTransform of selection
    if (figma.currentPage.selection.length === 1) {
        for (const node of figma.currentPage.selection) {
            if ('relativeTransform' in node) {
                var selectionRelTransform = node.relativeTransform;
            }
            if ('height' in node) {
                var selectionHeight = node.height;
            }
            if ('parent' in node) {
                var selectionParent = node.parent;
            }
        }
    }

    // create text field for example
    var text = figma.createText();
    text.name = 'Annotation - ' + taskname + ' - Eingabebeispiel ';
    text.x = selectionRelTransform[0][2] + 10;
    loadingFont().then(() => {
        text.fontName = { family: 'Roboto', style: 'Regular' };
        text.fontSize = 16;
        text.fills = [{ type: 'SOLID', color: {r: 0, g: 0, b: 1} }];
        text.characters = input;
    })
    text.y = selectionRelTransform[1][2] + selectionHeight / 2 - text.height / 2;

    if (selectionParent.name.endsWith('Annotation')) {
        selectionParent.insertChild(selectionParent.children.length, text);
    } else {
        const elementAndAnnotationGroupNode: SceneNode[] = [];
        elementAndAnnotationGroupNode.push(text);
        var elementAndAnnotationGroup = figma.group(elementAndAnnotationGroupNode, figma.currentPage);
        for (const node of figma.currentPage.selection) {
            var parent = node.parent;
            elementAndAnnotationGroup.name = node.name + ' + Annotation';
            elementAndAnnotationGroup.insertChild(0, node);
            parent.appendChild(elementAndAnnotationGroup);
        }
    }
}

const deleteAnnotation = (args) => {
    var group = figma.getNodeById(args.step.id);
    var parent = group.parent;
    group.remove();
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

    if (args.followingSteps !== undefined) {
        args.followingSteps.forEach(step => {
            var group = figma.getNodeById(step);
            if (group.type === 'GROUP') {
                for (let i = 0; i < group.children.length; i++) {
                    if (group.children[i].type === 'TEXT') {
                        var current = parseInt(group.children[i].characters);
                        group.children[i].characters = String(current - 1);
                    }
                }
            }
        });
    }
}

const updateAnnotation = (id, number) => {
    var group = figma.getNodeById(id);
    if (group.type === 'GROUP') {
        for (let i = 0; i < group.children.length; i++) {
            if(group.children[i].type === 'TEXT') {
                loadingFont().then(() => {
                    group.children[i].fontName = { family: 'Roboto', style: 'Regular' };
                    group.children[i].fills = [{ type: 'SOLID', color: {r: 1, g: 1, b: 1} }];
                    const stroke: Paint = { type: "SOLID", color: {r: 0, g: 0, b: 0} };
                    group.children[i].strokes = [stroke];
                    group.children[i].characters = String(number);
                })
            }
        }
    }
}

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

const loadingFont = async () => {
    await figma.loadFontAsync({ family: 'Roboto', style: 'Regular'});
}
