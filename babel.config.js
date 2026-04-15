module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo'], '@babel/preset-typescript'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@api': './src/api',
            '@assets': './src/assets',
            '@components': './src/components',
            '@constants': './src/constants',
            '@hooks': './src/hooks',
            '@navigation': './src/navigation',
            '@screens': './src/screens',
            '@storehooks': './src/store/hooks.ts',
            '@store': './src/store',
            '@slice': './src/store/slice',
            '@type': './src/type',
            '@utils': './src/utils',
          },
        },
      ],
      'react-native-worklets/plugin',
    ],
  };
};
