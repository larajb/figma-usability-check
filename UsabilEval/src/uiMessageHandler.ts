const eventListeners: { type: String; callback: Function }[] = [];
export const dispatch = (action: String, data?: any) => {
	parent.postMessage({ pluginMessage: { action, data } }, '*');
};
export const handleEvent = (type: String, callback: Function) => {
	var isAdded = false;
	for(let i = 0; i < eventListeners.length; i++) {
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
			if (message.action === eventListener.type) eventListener.callback(message.data);
		}
	}
};
