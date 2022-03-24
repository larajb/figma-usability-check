import { dispatch, handleEvent } from '../codeMessageHandler';

var annotationsGroup = null;

export const annotationsView = () => {
    handleEvent('getAnnotations', () => {
        getAnnotations();
    });
    handleEvent('selection', (value) => {
        createAnnotation(value);
    });
    handleEvent('deleteAnnotation', (id) => {
        deleteAnnotation(id);
    })
};

const getAnnotations = () => {
    const node: GroupNode = figma.currentPage.findOne(node => node.type === 'GROUP' && node.name === 'UsabilEval - Annotationen');
    const annotations = [];
    if (node !== null) {
        for (let i = 0; i < node.children.length; i++) {
            let nameSplitted = node.children[i].name.split(' - ');
            annotations[i] = { type: nameSplitted[1], id: nameSplitted[2] };
        }
    }
    dispatch('currentAnnotations', annotations);
}

const createAnnotation = (type) => {
    const groupNode: SceneNode[] = [];
    var color = getColor(type);
    for (const node of figma.currentPage.selection) {
        if ('height' in node) {
            var selectionHeight = node.height;
        }
        if ('width' in node) {
            var selectionWidth = node.width;
        }
        if ('absoluteTransform' in node) {
            var selectionAbsTransform = node.absoluteTransform;
        }
    }
    let rect = figma.createRectangle();
    rect.name = 'Annotation - ' + type + ' - Rect';
    rect.resize(selectionWidth + 10, selectionHeight + 10);
    rect.x = selectionAbsTransform[0][2] - 5;
    rect.y = selectionAbsTransform[1][2] - 5;
    rect.fills = [{ type: 'SOLID', color: {r: 0, g: 0, b: 0}, opacity: 0 }];
    const stroke: Paint = { type: "SOLID", color: color };
    rect.strokes = [stroke];

    var rectText = figma.createRectangle();
    rectText.name = 'Annotation - ' + type + ' - Rect2';
    rectText.resize(40, 14);
    rectText.x = selectionAbsTransform[0][2] - 4;
    rectText.y = selectionAbsTransform[1][2] - 4;
    rectText.fills = [{ type: 'SOLID', color: {r: 1, g: 1, b: 1} }];

    var text = figma.createText();
    text.name = 'Annotation - ' + type + ' - Text';
    text.x = selectionAbsTransform[0][2] - 3;
    text.y = selectionAbsTransform[1][2] - 4;
    loadingFont().then(() => {
        text.fontName = { family: 'Roboto', style: 'Regular' };
        text.fills = [{ type: 'SOLID', color: color }];
        text.characters = type;
    })
    groupNode.push(rect, rectText, text);
    
    for (const node of figma.currentPage.selection) {
        var newNode = node;
        if (newNode.type !== 'FRAME') {
            newNode = node.parent;
            while (newNode.type !== 'FRAME') {
                newNode = newNode.parent;
            }
        }
        var group = figma.group(groupNode, figma.currentPage);
        group.name = 'Annotation - ' + type + ' - ' + group.id;
        if (annotationsGroup == null || annotationsGroup.children.length == 0 ) {
            const groupNodeParentGroup: SceneNode[] = [];
            groupNodeParentGroup.push(group);

            annotationsGroup = figma.group(groupNodeParentGroup, figma.currentPage);
            annotationsGroup.name = 'UsabilEval - Annotationen';
        } else {
            annotationsGroup.appendChild(group);
        }
    }

    dispatch('annotationAdded', { type: type, id: group.id});
}

const deleteAnnotation = (id) => {
    var group = figma.getNodeById(id);
    group.remove();
}

const loadingFont = async () => {
    await figma.loadFontAsync({ family: 'Roboto', style: 'Regular'});
}

const getColor = (type) => {
    var colors = {
        'button': {r: 1, g: 1, b: 0},
        'footer': {r: 1, g: 0.65, b: 0},
        'form': {r: 0.62, g: 0, b: 0.77},
        'header': {r: 1, g: 0.65, b: 0},
        'homepage': {r: 0.25, g: 0.88, b: 0.82},
        'input': {r: 0, g: 0, b: 1},
        'link': {r: 1, g: 1, b: 0},
        // 'main': {r: 1, g: 1, b: 1},
        'menu': {r: 0.5, g: 1, b: 1},
        'nav': {r: 0, g: 1, b: 0},
        // 'section': {r: 1, g: 1, b: 1}
    };
    return colors[type];
}