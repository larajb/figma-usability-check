import { dynevalView } from './dyneval/dynevalHandler';
import { startView } from './start/startHandler';
import { statevalView } from './stateval/statevalHandler';

switch(figma.command) {
    case 'start':
        figma.showUI(__uiFiles__.start);
        startView();
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
figma.ui.resize(450, 550);