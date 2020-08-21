module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'react-app',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'import', 'jsx-a11y', 'es'],
  rules: {
    semi: 'off',
    'no-console': 'off',
    'multiline-ternary': ['error', 'never'],

    'react/jsx-filename-extension': ['error',
      { extensions: ['.tsx'] },
    ],

    'import/prefer-default-export': 'off',
    'import/no-namespace': ['error'],
    'import/no-dynamic-require': ['error'],
    'import/no-extraneous-dependencies': ['error', { packageDir: './' }],
    'import/extensions': ['error', {
      ts: 'never',
      tsx: 'never',
    }],

    'es/no-destructuring': 'error',

    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/semi': 'error',
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'semi',
        requireLast: true,
      },
      singleline: {
        delimiter: 'semi',
        requireLast: true,
      },
    }],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      }
    },
  },
};
