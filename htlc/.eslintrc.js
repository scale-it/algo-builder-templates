module.exports = {
	env: {
		browser: true,
		node: true,
		es6: true,
		es2020: true,
		mocha: true,
	},
	plugins: ["simple-import-sort", "sonarjs"],
	extends: [
		"plugin:sonarjs/recommended",
		"eslint:recommended",
		"plugin:react/recommended",
	],
	parser: "@babel/eslint-parser", // for react
	parserOptions: {
		ecmaVersion: 2020,
		requireConfigFile: false,
		babelOptions: {
			presets: ["@babel/preset-react"],
		},
	},
	rules: {
		"import/no-extraneous-dependencies": 0,
		"import/prefer-default-export": "off",
		"max-classes-per-file": 0,
		"max-len": [
			"error",
			{
				code: 110,
				ignoreTrailingComments: true,
				ignoreStrings: true,
				ignoreUrls: true,
				ignoreTemplateLiterals: true,
			},
		],
		"no-underscore-dangle": 0,
		"simple-import-sort/imports": "warn",
		"sort-imports": "off",
		"sonarjs/cognitive-complexity": ["error", 16],
		"no-unused-vars": [
			"warn",
			{ vars: "all", args: "after-used", ignoreRestSiblings: false },
		],
		quotes: "off",
		"no-console": "off",
		"no-constant-condition": ["error", { checkLoops: false }],
	},
	overrides: [
		{
			files: [
				"**/*.test.js",
				"**/*.test.jsx",
				"**/*.test.tsx",
				"**/*.spec.js",
				"**/*.spec.jsx",
				"**/*.spec.tsx",
			],
			env: {
				jest: true,
			},
		},
	],
	settings: {
		react: {
			version: "detect",
		},
	},
};
