const supportSymbol = typeof Symbol === "function" && Symbol.for;

/**
 * React element 的类型定义
 */
export const REACT_ELEMENT_TYPE: symbol | number = supportSymbol
	? Symbol.for("react.element")
	: 0xeac7;
