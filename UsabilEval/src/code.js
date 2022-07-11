import { startView } from './start/startHandler';
import { metricEvalView } from './metricEval/metricEvalHandler';
import { taskEvalView } from './taskEval/taskEvalHandler';
switch (figma.command) {
    case 'start':
        figma.showUI(__uiFiles__.start);
        startView();
        break;
    case 'metricEval':
        figma.showUI(__uiFiles__.metricEval);
        metricEvalView();
        break;
    case 'taskEval':
        figma.showUI(__uiFiles__.taskEval);
        taskEvalView();
        break;
}
figma.ui.resize(450, 550);
