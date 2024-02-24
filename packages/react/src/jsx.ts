import { REACT_ELEMENT_TYPE } from "shared/ReactSymbol";
import {
	ElementType,
	ReactElementType,
	Key,
	Props,
	Ref,
	Type
} from "shared/ReactTypes";

/**
 * 实现 jsx 方法
 */

// jsx的返回结果是一个被称为 ReactElement 的对象
const ReactElement = (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType => {
	return {
		/**
		 * 识别是否为 ReactElement
		 * 为了防止这个值被滥用，将其值定义为全局唯一的 Symbol 类型的值
		 * */
		"@@typeof": REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props
	};
};

export const jsx = (
	type: ElementType,
	config: any,
	...maybeChildren: any[]
) => {
	let key: Key = null;
	let ref: Ref = null;
	const props: Props = {};

	// 处理 props 上除了 children 的属性
	for (const prop in config) {
		const val = config[prop];
		// key 和 ref 不放到 props 上
		if (prop === "key") {
			if (val !== undefined) {
				key = "" + val;
			}
			continue;
		}
		if (prop === "ref") {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}
		// 如果是它自己的prop，就给它赋值。避免赋值给原型上的属性
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}

	// 处理children
	const maybeChildrenLength = maybeChildren.length;
	if (maybeChildrenLength) {
		// 如果只有一个children，则将数组解开，直接将children赋值给props.children
		if (maybeChildrenLength === 1) {
			props.chidren = maybeChildren[0];
		} else {
			props.chidren = maybeChildren;
		}
	}

	return ReactElement(type, key, ref, props);
};

/**
 * 开发环境的 jsx 方法
 */
export const jsxDEV = (type: ElementType, config: any) => {
	let key: Key = null;
	let ref: Ref = null;
	const props: Props = {};

	for (const prop in config) {
		const val = config[prop];
		// key 和 ref 不放到 props 上
		if (prop === "key") {
			if (val !== undefined) {
				key = "" + val;
			}
			continue;
		}
		if (prop === "ref") {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}
		// 如果是它自己的prop，就给它赋值。避免赋值给原型上的属性
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}

	return ReactElement(type, key, ref, props);
};
