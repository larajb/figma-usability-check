const eventListeners = [];
export const dispatch = (action, data) => {
    parent.postMessage({ pluginMessage: { action, data } }, '*');
};
export const handleEvent = (type, callback) => {
    var isAdded = false;
    for (let i = 0; i < eventListeners.length; i++) {
        if (eventListeners[i].type === type) {
            isAdded = true;
            eventListeners[i].callback = callback;
        }
    }
    if (!isAdded) {
        eventListeners.push({ type, callback });
    }
};
window.onmessage = event => {
    const message = event.data.pluginMessage;
    if (message) {
        for (let eventListener of eventListeners) {
            if (message.action === eventListener.type)
                eventListener.callback(message.data);
        }
    }
};
