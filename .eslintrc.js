module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'unused-imports',
    'react',
    'react-native',
    'import',
  ],
  extends: [
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // --- TypeScript rules ---
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],

        // --- Unused import cleanup ---
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],

        // --- Other rules ---
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/func-call-spacing': 'off',
        'react-native/no-inline-styles': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-console': ['error', { allow: ['warn'] }],
        'react-hooks/exhaustive-deps': 'off',
        'react/jsx-key': ['error', { checkFragmentShorthand: true }],

        // --- Import order rule ---
        'import/order': [
          'error',
          {
            groups: [
              'external', // Packages from node_modules
              'builtin', // Node "builtin" modules (fs, path, etc)
              'internal', // Aliases like @/utils, @/components, etc.
              ['parent', 'sibling', 'index'], // Relative imports
              'object', // import type {...} from ...
              'type',
            ],
            pathGroups: [
              {
                pattern: '@(react|react-native)',
                group: 'external',
                position: 'before',
              },
              {
                pattern: '@/**',
                group: 'internal',
              },
            ],
            pathGroupsExcludedImportTypes: ['react'],
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {}, // agar eslint bisa resolve path alias tsconfig
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  env: {
    jest: true,
  },
};
