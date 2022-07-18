export const storeInLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        console.error(error)
    }
}

export const readLocalStorage = (key) => {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.error(error)
    }
}

export const clearLocalStorage = () => {
    try {
        localStorage.clear();
    } catch (error) {
        console.error(error)
    }
}
