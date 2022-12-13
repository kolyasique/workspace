module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': 0,
    'linebreak-style': 0,
    'jsx-a11y/label-has-associated-control': 0,
    // https://ru.react.js.org/docs/typechecking-with-proptypes.html
    'react/prop-types': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'import/prefer-default-export': 0,
    'default-param-last': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
  },
};
