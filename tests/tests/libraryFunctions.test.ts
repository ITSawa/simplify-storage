import {
  setInStorage,
  getFromStorage,
  removeFromStorage,
  clearStorage,
  getAllStorageItems,
  hasItemInStorage,
  CookieStorage,
} from "../../lib/src/script";

describe("Storage functions", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie = "";
  });

  it("should store and retrieve an object from localStorage", () => {
    const obj = { name: "Test", value: 123 };
    setInStorage("testObject", obj, "local");
    const result = getFromStorage("testObject", "local");
    expect(result).toEqual(obj);
  });

  it("should store and retrieve a string from localStorage", () => {
    setInStorage("testString", "hello", "local");
    const result = getFromStorage("testString", "local");
    expect(result).toBe("hello");
  });

  it("should store and retrieve a number from sessionStorage", () => {
    setInStorage("testNumber", 42, "session");
    const result = getFromStorage("testNumber", "session");
    expect(result).toBe(42);
  });

  it("should store and retrieve a boolean from localStorage", () => {
    setInStorage("testBoolean", true, "local");
    const result = getFromStorage("testBoolean", "local");
    expect(result).toBe(true);
  });

  it("should store and retrieve an array from sessionStorage", () => {
    const arr = [1, 2, 3];
    setInStorage("testArray", arr, "session");
    const result = getFromStorage("testArray", "session");
    expect(result).toEqual(arr);
  });

  it("should remove an item from localStorage", () => {
    setInStorage("toBeRemoved", "value", "local");
    removeFromStorage("toBeRemoved", "local");
    const result = getFromStorage("toBeRemoved", "local");
    expect(result).toBeNull();
  });

  it("should clear all items from sessionStorage", () => {
    setInStorage("item1", "value1", "session");
    setInStorage("item2", "value2", "session");
    clearStorage("session");
    expect(getFromStorage("item1", "session")).toBeNull();
    expect(getFromStorage("item2", "session")).toBeNull();
  });

  it("should return all items from localStorage", () => {
    setInStorage("item1", "value1", "local");
    setInStorage("item2", { a: 1 }, "local");
    const items = getAllStorageItems("local");
    expect(items).toEqual([
      { key: "item1", value: "value1" },
      { key: "item2", value: { a: 1 } },
    ]);
  });

  it("should check if an item exists in localStorage", () => {
    setInStorage("existingItem", "value", "local");
    expect(hasItemInStorage("existingItem", "local")).toBe(true);
    expect(hasItemInStorage("nonExistingItem", "local")).toBe(false);
  });

  it("should handle special characters in keys and values", () => {
    const specialKey = "key!@#$%^&*()_+";
    const specialValue = "value!@#$%^&*()_+";
    setInStorage(specialKey, specialValue, "local");
    const result = getFromStorage(specialKey, "local");
    expect(result).toBe(specialValue);
  });

  it("should handle long strings as values", () => {
    const longString = "a".repeat(10000);
    setInStorage("longString", longString, "local");
    const result = getFromStorage("longString", "local");
    expect(result).toBe(longString);
  });

  it("should handle cookie storage correctly", () => {
    const cookieStorage = new CookieStorage();
    cookieStorage.setItem("testCookie", "cookieValue");
    expect(cookieStorage.getItem("testCookie")).toBe("cookieValue");
    expect(cookieStorage.length).toBe(1);
    cookieStorage.removeItem("testCookie");
    expect(cookieStorage.getItem("testCookie")).toBeNull();
    expect(cookieStorage.length).toBe(0);
  });

  it("should clear all cookies", () => {
    const cookieStorage = new CookieStorage();
    cookieStorage.setItem("testCookie1", "value1");
    cookieStorage.setItem("testCookie2", "value2");
    cookieStorage.clear();
    expect(cookieStorage.getItem("testCookie1")).toBeNull();
    expect(cookieStorage.getItem("testCookie2")).toBeNull();
    expect(cookieStorage.length).toBe(0);
  });

  it("should handle special characters in cookie keys and values", () => {
    const cookieStorage = new CookieStorage();
    const specialKey = "key!@#$%^&*()_+";
    const specialValue = "value!@#$%^&*()_+";
    cookieStorage.setItem(specialKey, specialValue);
    const result = cookieStorage.getItem(specialKey);
    expect(result).toBe(specialValue);
  });

  it("should handle long strings as cookie values", () => {
    const cookieStorage = new CookieStorage();
    const longString = "a".repeat(10000);
    cookieStorage.setItem("longString", longString);
    const result = cookieStorage.getItem("longString");
    expect(result).toBe(longString);
  });
});
