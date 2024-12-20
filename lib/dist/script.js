class CookieStorage {
    get length() {
        return document.cookie ? document.cookie.split("; ").length : 0;
    }
    setItem(key, value) {
        document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; path=/`;
    }
    getItem(key) {
        const matches = document.cookie.match(new RegExp(`(?:^|; )${encodeURIComponent(key).replace(/([.$?*|{}()[\]\\\/+^])/g, "\\$1")}=([^;]*)`));
        return matches ? decodeURIComponent(matches[1]) : null;
    }
    removeItem(key) {
        document.cookie = `${encodeURIComponent(key)}=; max-age=-1; path=/`;
    }
    clear() {
        const items = this.getAllItems();
        items.forEach((item) => this.removeItem(item.key));
    }
    key(index) {
        const items = this.getAllItems();
        return items.length > index ? items[index].key : null;
    }
    getAllItems() {
        return document.cookie.split("; ").map((cookie) => {
            const [key, value] = cookie.split("=");
            return { key: decodeURIComponent(key), value: decodeURIComponent(value) };
        });
    }
    hasItem(key) {
        return this.getItem(key) !== null;
    }
}
function setStorageByType(type) {
    switch (type.toLowerCase()) {
        case "l":
        case "local":
            return localStorage;
        case "s":
        case "session":
            return sessionStorage;
        case "c":
        case "cookie":
            return new CookieStorage();
        default:
            throw new Error("Incorrect type of storage (session, local, cookie)");
    }
}
function setInStorage(key, data, type = "local") {
    if (!key) {
        throw new Error("Not acceptable value of key in storage");
    }
    if (data == null) {
        console.warn("Data is null or undefined, it may be dangerous");
    }
    const storage = setStorageByType(type);
    const dataType = Array.isArray(data) ? "array" : typeof data;
    switch (dataType) {
        case "object":
        case "array":
            storage.setItem(key, `${dataType}_prfx_${JSON.stringify(data)}`);
            break;
        default:
            storage.setItem(key, `${dataType}_prfx_${String(data)}`);
            break;
    }
}
function changeStringStorageDataType(type, dataString) {
    let data;
    try {
        switch (type.toLowerCase()) {
            case "array":
                data = JSON.parse(dataString);
                if (!Array.isArray(data)) {
                    throw new Error("Parsed data is not an array");
                }
                break;
            case "object":
                data = JSON.parse(dataString);
                if (typeof data !== "object" || data === null || Array.isArray(data)) {
                    throw new Error("Parsed data is not an object");
                }
                break;
            case "number":
                data = Number(dataString);
                if (isNaN(data)) {
                    throw new Error("Data is not a valid number");
                }
                break;
            case "string":
                data = dataString;
                break;
            case "boolean":
                data = dataString.toLowerCase() === "true";
                break;
            default:
                throw new Error("Unsupported type");
        }
    }
    catch (error) {
        console.error("Error parsing data: ", error);
        return null; // Return null on error
    }
    return data;
}
function getFromStorage(key, type) {
    if (!key) {
        throw new Error("Impossible key");
    }
    const storage = setStorageByType(type);
    const dataStorage = storage.getItem(key);
    if (!dataStorage) {
        return null;
    }
    const [dataType, dataString] = dataStorage.split("_prfx_");
    return changeStringStorageDataType(dataType, dataString);
}
function removeFromStorage(key, type = "local") {
    if (!key) {
        throw new Error("Impossible key");
    }
    const storage = setStorageByType(type);
    storage.removeItem(key);
}
function clearStorage(type = "local") {
    const storage = setStorageByType(type);
    storage.clear();
}
function getAllStorageItems(type = "local") {
    const storage = setStorageByType(type);
    const items = [];
    for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (key) {
            const value = getFromStorage(key, type);
            items.push({ key, value });
        }
    }
    return items;
}
function hasItemInStorage(key, type = "local") {
    if (!key) {
        throw new Error("Impossible key");
    }
    const storage = setStorageByType(type);
    return storage.getItem(key) !== null;
}
export { setInStorage, getFromStorage, removeFromStorage, clearStorage, getAllStorageItems, hasItemInStorage, CookieStorage, };
//# sourceMappingURL=script.js.map