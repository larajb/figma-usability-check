import { annotationsView } from './annotations/annotationHandler';
import { dynevalView } from './dyneval/dynevalHandler';
import { statevalView } from './stateval/statevalHandler';

switch(figma.command) {
    case 'annotations':
        figma.showUI(__uiFiles__.annotations);
        annotationsView();
        break;
    case 'stateval':
        figma.showUI(__uiFiles__.stateval);
        statevalView();
        break;
    case 'dyneval':
        figma.showUI(__uiFiles__.dyneval);
        dynevalView();
        break;
}
figma.ui.resize(400, 550);