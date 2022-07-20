export const storeInLocalStorage = (key: string, value: any) => {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        console.error(error)
    }
}

export const readLocalStorage = (key: string) => {
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
