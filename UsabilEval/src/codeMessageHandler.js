const eventListeners = [];
export const dispatch = (action, data) => {
    figma.ui.postMessage({ action, data });
};
export const handleEvent = (type, callback) => {
    eventListeners.push({ type, callback });
};
figma.ui.onmessage = message => {
    for (let eventListener of eventListeners) {
        if (message.action === eventListener.type)
            eventListener.callback(message.data);
    }
};
