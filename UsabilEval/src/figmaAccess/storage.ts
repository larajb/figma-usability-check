/**
 * This is a function to get the storage for a given key.
 * @param type 
 * @returns storage
 */
export const getStorage = async (key) => {
    var storage = await figma.clientStorage.getAsync(key);
    return storage;
}

/**
 * This is a function to set the storage for a given key.
 * @param key 
 * @param content 
 */
export const setStorage = async (key, content) => {
    await figma.clientStorage.setAsync(key, content);
}
