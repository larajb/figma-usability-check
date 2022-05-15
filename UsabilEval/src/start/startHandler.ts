import { handleEvent } from '../codeMessageHandler';

import { metricEvalView } from '../metricEval/metricEvalHandler';
import { taskEvalView } from '../taskEval/taskEvalHandler';

export const startView = () => {
    handleEvent('showMetricEval', () => {
        figma.showUI(__uiFiles__.metricEval);
        metricEvalView();
        figma.ui.resize(450, 550);
    });

    handleEvent('showTaskEval', () => {
        figma.showUI(__uiFiles__.taskEval);
        taskEvalView();
        figma.ui.resize(450, 550);
    })
}
