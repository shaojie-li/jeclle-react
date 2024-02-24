import * as path from "path";
import * as fs from "fs";
import cjs from "@rollup/plugin-commonjs";
import ts from "rollup-plugin-typescript2";

// 源码路径
const pkgPath = path.resolve(__dirname, "../../packages");
// 打包产物的路径
const distPath = path.resolve(__dirname, "../../dist/node_modules");

/**
 * 解析包的路径，可能是 packages 目录下的路径，也可能是生成的产物的包的路径
 */
export function resolvePkgPath(pkgName, isDist = false) {
	if (isDist) {
		return `${distPath}/${pkgName}`;
	}
	return `${pkgPath}/${pkgName}`;
}

/**
 * 获取包的 package.json 内容
 */
export function getPackageJson(pkgName) {
	// 包路径
	const path = `${resolvePkgPath(pkgName)}/package.json`;
	const str = fs.readFileSync(path, { encoding: "utf-8" });

	return JSON.parse(str);
}

/**
 * 获取基础的 rollup 插件，每个包都会用到
 * 1. 用于解析 commonJS 规范的插件 `rollup-plugin-typescript2 `
 * 2. 将源码中的 typescript 代码转换成 javascript 代码的插件 `@rollup/plugin-commonjs`
 */
export function getBaseRollupPlugins(typescript = {}) {
	return [cjs(), ts(typescript)];
}
