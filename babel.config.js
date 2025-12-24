module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    // Add any other plugins here if needed (e.g., reanimated must be last)
    plugins: [
      // "expo-router/babel",  // Usually not needed manually
      // "react-native-reanimated/plugin",  // If using Reanimated, add it last
    ],
  };
};