import { CookieStorage } from "../../lib/src/script"; // Укажите путь к вашему файлу с библиотекой

describe("CookieStorage", () => {
  let cookieStorage: CookieStorage;

  beforeEach(() => {
    // Очистка cookies перед каждым тестом
    document.cookie.split(";").forEach((cookie) => {
      const [key] = cookie.split("=");
      document.cookie = `${key}=; max-age=-1; path=/`;
    });
    cookieStorage = new CookieStorage();
  });

  it("should set an item in cookie", () => {
    cookieStorage.setItem("key1", "value1");
    expect(cookieStorage.getItem("key1")).toBe("value1");
  });

  it("should remove an item from cookie", () => {
    cookieStorage.setItem("key2", "value2");
    cookieStorage.removeItem("key2");
    expect(cookieStorage.getItem("key2")).toBeNull();
  });

  it("should clear all cookies", () => {
    cookieStorage.setItem("key3", "value3");
    cookieStorage.clear();
    expect(cookieStorage.getItem("key3")).toBeNull();
    expect(cookieStorage.length).toBe(0);
  });

  it("should return the correct key by index", () => {
    cookieStorage.setItem("key4", "value4");
    expect(cookieStorage.key(0)).toBe("key4");
  });

  it("should handle hasItem correctly", () => {
    cookieStorage.setItem("key5", "value5");
    expect(cookieStorage.hasItem("key5")).toBe(true);
    cookieStorage.removeItem("key5");
    expect(cookieStorage.hasItem("key5")).toBe(false);
  });

  it("should update the length property correctly", () => {
    expect(cookieStorage.length).toBe(0);
    cookieStorage.setItem("key1", "value1");
    expect(cookieStorage.length).toBe(1);
    cookieStorage.setItem("key2", "value2");
    expect(cookieStorage.length).toBe(2);
    cookieStorage.removeItem("key1");
    expect(cookieStorage.length).toBe(1);
    cookieStorage.clear();
    expect(cookieStorage.length).toBe(0);
  });

  it("should handle special characters in keys and values", () => {
    const specialKey = "key!@#$%^&*()_+";
    const specialValue = "value!@#$%^&*()_+";
    cookieStorage.setItem(specialKey, specialValue);
    expect(cookieStorage.getItem(specialKey)).toBe(specialValue);
  });

  it("should handle long strings as values", () => {
    const longString = "a".repeat(1000);
    cookieStorage.setItem("longKey", longString);
    expect(cookieStorage.getItem("longKey")).toBe(longString);
  });

  it("should handle multiple cookies correctly", () => {
    cookieStorage.setItem("key1", "value1");
    cookieStorage.setItem("key2", "value2");
    cookieStorage.setItem("key3", "value3");
    expect(cookieStorage.getItem("key1")).toBe("value1");
    expect(cookieStorage.getItem("key2")).toBe("value2");
    expect(cookieStorage.getItem("key3")).toBe("value3");
    cookieStorage.removeItem("key2");
    expect(cookieStorage.getItem("key2")).toBeNull();
    expect(cookieStorage.length).toBe(2);
  });
});
