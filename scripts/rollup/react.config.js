/**
 * react 包打包脚本
 */
import { getBaseRollupPlugins, getPackageJson, resolvePkgPath } from "./utils";
import generatePkgJson from "rollup-plugin-generate-package-json";

const { name, module } = getPackageJson("react");
// react 包的路径
const pkgPath = resolvePkgPath("react");
const pkgDIstPath = resolvePkgPath("react", true);

/** @type {import("rollup").RollupOptions[]} */
const config = [
	// react 包
	{
		input: `${pkgPath}/${module}`,
		output: {
			file: `${pkgDIstPath}/index.js`,
			name: "index.js",
			// umd格式兼容 esm 和 commonJS
			format: "umd"
		},
		plugins: [
			getBaseRollupPlugins(),
			generatePkgJson({
				inputFold: pkgPath,
				outputFold: pkgDIstPath,
				baseContents: ({ description, version }) => ({
					name,
					description,
					version,
					main: "index.js"
				})
			})
		]
	},
	// react/jsx-runtime 与 react/jsx-dev-runtime 包
	{
		input: `${pkgPath}/src/jsx.ts`,
		output: [
			// react/jsx-runtime
			{
				file: `${pkgDIstPath}/jsx-runtime.js`,
				name: "jsx-runtime.js",
				format: "umd"
			},
			// react/jsx-dev-runtime
			{
				file: `${pkgDIstPath}/jsx-dev-runtime.js`,
				name: "jsx-dev-runtime.js",
				format: "umd"
			}
		],
		plugins: [getBaseRollupPlugins()]
	}
];

export default config;
