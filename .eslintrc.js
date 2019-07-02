module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"node": true,
		"mocha": true
	},
	"extends": ["eslint:recommended", "plugin:react/recommended"],
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"mocha"
	],
	"rules": {
		"no-console": ["error", { allow: ["warn", "error"] }],
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"quotes": [
			"error",
			"single"
		],
		"semi": [
			"error",
			"always"
		],
		"require-atomic-updates": 0
	}
};