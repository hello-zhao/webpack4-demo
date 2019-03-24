module.exports = {
  root: true,
    env: {
    node: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended"
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    "no-debugger": "off",
    "no-console": "off",
    "no-multi-spaces": "error",
    "no-trailing-spaces": "error",
    "space-before-function-paren": ["error", "never"],
    "max-len": ["error", {
      "ignoreUrls": true,
      "ignoreStrings": true,
      "ignoreComments": true,
      "ignoreTrailingComments": true,
      "ignoreTemplateLiterals": true,
      "ignoreRegExpLiterals": true
    }],
    // "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
  },
  "overrides": [
    {
      "files": ["*.vue"],
      "rules": {
        "max-len": 0,
        "vue/valid-v-pre": 0,
      }
    }
  ]
}
