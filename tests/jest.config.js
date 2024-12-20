module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // для работы с браузерными API, такими как cookies
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
