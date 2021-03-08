module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    es2020: true,
    mocha: true
  },
  plugins: ["simple-import-sort", "sonarjs"],
  extends: [
    "plugin:sonarjs/recommended",
    'airbnb',
    "eslint:recommended", // recommended rules
    "plugin:prettier/recommended"
  ],
  parser: "babel-eslint", // for react
  parserOptions: {
    ecmaVersion: 2020,
    // sourceType: "module"
  },
  rules:  {
    "import/no-extraneous-dependencies": 0,
    "import/prefer-default-export": "off",
    "max-classes-per-file": 0,
    "max-len": ["error", { "code": 110, "ignoreTrailingComments": true, "ignoreStrings": true, "ignoreUrls": true, "ignoreTemplateLiterals": true}],
    "no-underscore-dangle": 0,
    "simple-import-sort/imports": "warn",
    "sort-imports": "off",
    "sonarjs/cognitive-complexity": ["error", 16],
    "no-unused-vars": ["warn", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    "quotes": "off",
    "strict-boolean-expressions": "off",
    "react/jsx-filename-extension": "off",
    "react/react-in-jsx-scope": "off",
    "no-console": "off"
  },
  overrides: [
    {
      files: [
        '**/*.test.js',
        '**/*.test.jsx',
        '**/*.test.tsx',
        '**/*.spec.js',
        '**/*.spec.jsx',
        '**/*.spec.tsx',
      ],
      env: {
          jest: true,
      },
    },
  ],
}
