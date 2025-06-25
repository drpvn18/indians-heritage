import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

// Helper to trim whitespace in global keys
const cleanGlobals = (obj) =>
	Object.fromEntries(
		Object.entries(obj).map(([key, value]) => [key.trim(), value])
	);

export default [
	{
		files: ["**/*.{js,mjs,cjs,jsx}"],
		languageOptions: {
			globals: {
				...cleanGlobals(globals.browser),
				...cleanGlobals(globals.node),
				AudioWorkletGlobalScope: "readonly", // Add manually if needed
			},
		},
	},
	pluginJs.configs.recommended,
	{
		...pluginReact.configs.flat.recommended,
		rules: {
			...pluginReact.configs.flat.recommended.rules,
			"react/prop-types": "off",
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},
	{
		ignores: [".next/"],
	},
];
