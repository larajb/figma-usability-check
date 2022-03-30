import { dispatch, handleEvent } from '../codeMessageHandler';

export const dynevalView = () => {
    handleEvent('addTaskStep', (args) => {
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
                updateAnnotation(tasks[i].steps[j], j+1);
            }
        }
    })
    handleEvent('checkStepValidityBefore', async (args) => {
        var validity = await checkValidityBefore(args);
        dispatch('validityBefore', validity);
    });
    handleEvent('checkStepValidityAfter', async (args) => {
        var validity = await checkValidityAfter(args);
        dispatch('validityAfter', validity);
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
    // args.numSteps, args.color
    // create annotation with number in colored circle (text white with black stroke)
    var stepNumber = String(args.numSteps + 1);
    var color = convertColor(args.color);

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
    ellipse.resize(20, 20);
    if (selectionParent.name.endsWith('Annotation')) {
        ellipse.x = selectionRelTransform[0][2] + ((selectionParent.children.length - 2) * 10);
    } else {
        ellipse.x = selectionRelTransform[0][2] - 10;
    }
    ellipse.y = selectionRelTransform[1][2] - 10;
    ellipse.fills = [{ type: 'SOLID', color: color }];

    // create annotations text
    var text = figma.createText();
    text.name = 'Annotation - ' + args.taskname + ' - ' + stepNumber + ' - Text';
    if (selectionParent.name.endsWith('Annotation')) {
        text.x = selectionRelTransform[0][2] + ((selectionParent.children.length - 1) * 10) - 3;
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

const deleteAnnotation = (args) => {
    var group = figma.getNodeById(args.step);
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
            if (group.children[i].type === 'TEXT') {
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

const checkValidityBefore = (args) => {
    var validity = false;

    // get frame of current selection
    var currentNode = null;
    var currentFrame = null;
    if (args.current === null) {
        if (figma.currentPage.selection.length === 1) {
            for (const node of figma.currentPage.selection) {
                currentNode = node;
                while (currentNode.type !== 'FRAME') {
                    currentNode = currentNode.parent;
                }
            }
            currentFrame = currentNode;
        }
    } else {
        currentNode = figma.getNodeById(args.current);
        var temp = currentNode.parent;
        while (temp.type !== 'FRAME') {
            temp = temp.parent;
        }
        currentFrame = temp;
    }
    // get frame of step before
    var beforeNode = figma.getNodeById(args.before);
    var beforeFrame = null;
    var beforeParent = beforeNode.parent;
    while (beforeParent.type !== 'FRAME') {
        beforeParent = beforeParent.parent;
    }
    beforeFrame = beforeParent;

    // compare frames
    if (currentFrame.id !== beforeFrame.id) {
        // get interaction of before step
        var beforeNodeParent = beforeNode.parent;
        var element = beforeNodeParent.children[0];
        for (let i = 0; i < element.reactions.length; i++) {
            if (element.reactions[i].action.destinationId === currentFrame.id) {
                validity = true;
            }
        }
    } else {
        validity = true;
    }

    return validity;
}

const checkValidityAfter = (args) => {
    var validity = false;

    // get frame of current selection
    var currentNode = null;
    var currentFrame = null;
    if (args.current === null) {
        if (figma.currentPage.selection.length === 1) {
            for (const node of figma.currentPage.selection) {
                currentNode = node;
                while (currentNode.type !== 'FRAME') {
                    currentNode = currentNode.parent;
                }
            }
            currentFrame = currentNode;
        }
    } else {
        currentNode = figma.getNodeById(args.current);
        var temp = currentNode.parent;
        while (temp.type !== 'FRAME') {
            temp = temp.parent;
        }
        currentFrame = temp;
    }
    // get frame of step after
    var afterNode = figma.getNodeById(args.after);
    var afterFrame = null;
    var afterParent = afterNode.parent;
    while (afterParent.type !== 'FRAME') {
        afterParent = afterParent.parent;
    }
    afterFrame = afterParent;

    // compare frames
    if (currentFrame.id !== afterFrame.id) {
        // get interaction of before step
        var currentNodeParent = currentNode.parent;
        var element = currentNodeParent.children[0];
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