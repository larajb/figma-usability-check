import { annotationsView } from './annotations/annotationHandler';
switch (figma.command) {
    case 'annotations':
        figma.showUI(__uiFiles__.annotations);
        annotationsView();
        break;
    case 'stateval':
        figma.showUI(__uiFiles__.stateval);
        break;
    case 'dyneval':
        figma.showUI(__uiFiles__.dyneval);
        break;
}
figma.ui.resize(400, 550);
