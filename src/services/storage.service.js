function loadFromStorage(key) {
    // debugger
    var val = localStorage.getItem(key)
    return (val) ? JSON.parse(val) : null;
}

function saveToStorage(key, val) {
    localStorage[key] = JSON.stringify(val);
}

function removeFromStorage(key) {
    localStorage.removeItem(key)
}

const storageService = {
    loadFromStorage,
    saveToStorage,
    removeFromStorage
}
export default storageService