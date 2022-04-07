import { dispatch, handleEvent } from '../codeMessageHandler';

export const statevalView = () => {
    handleEvent('loadMetrics', () => {
        loadMetrics();
    });
}

const loadMetrics = () => {
    
}