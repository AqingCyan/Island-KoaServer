module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'semi': 0,
    'arrow-parens': 0,
    'no-unneeded-ternary': 0,
    'import/no-unresolved': 0,
    'no-return-await': 0,
    'max-classes-per-file': 0,
    'object-curly-newline': 0,
    'class-methods-use-this': 0,
  },
};
