import { handleEvent } from '../codeMessageHandler';

import { dynevalView } from '../dyneval/dynevalHandler';
import { statevalView } from '../stateval/statevalHandler';

export const startView = () => {
    handleEvent('showStatEval', () => {
        figma.showUI(__uiFiles__.stateval);
        statevalView();
        figma.ui.resize(450, 550);
    });

    handleEvent('showDynEval', () => {
        figma.showUI(__uiFiles__.dyneval);
        dynevalView();
        figma.ui.resize(450, 550);
    })
}
