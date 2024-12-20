declare class CookieStorage {
    get length(): number;
    setItem(key: string, value: string): void;
    getItem(key: string): string | null;
    removeItem(key: string): void;
    clear(): void;
    key(index: number): string | null;
    getAllItems(): {
        key: string;
        value: string;
    }[];
    hasItem(key: string): boolean;
}
declare function setInStorage(key: string, data: any, type?: string): void;
declare function getFromStorage(key: string, type: string): any;
declare function removeFromStorage(key: string, type?: string): void;
declare function clearStorage(type?: string): void;
declare function getAllStorageItems(type?: string): {
    key: string;
    value: any;
}[];
declare function hasItemInStorage(key: string, type?: string): boolean;
export { setInStorage, getFromStorage, removeFromStorage, clearStorage, getAllStorageItems, hasItemInStorage, CookieStorage, };
