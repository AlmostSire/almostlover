var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { forwardRef } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/icon';
/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * // 这样引用
 * import { Input } from 'almostlover'
 * ~~~
 *
 * 支持 HTMLInput 的所有基本属性
 */
export var Input = forwardRef(function (props, ref) {
    var _a;
    // 取出各种属性
    var disabled = props.disabled, size = props.size, icon = props.icon, addonAfter = props.addonAfter, addonBefore = props.addonBefore, className = props.className, restProps = __rest(props, ["disabled", "size", "icon", "addonAfter", "addonBefore", "className"]);
    var fixControlledValue = function (value) {
        if (value === undefined || value === null) {
            return '';
        }
        return value;
    };
    if ('value' in restProps) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(restProps.value);
    }
    // 根据属性计算不同的className
    var cls = classNames('al-input-wrapper', className, (_a = {},
        _a["al-input-" + size] = size,
        _a['al-input-group'] = addonAfter || addonBefore,
        _a['al-input-affix'] = icon,
        _a));
    return (
    // 根据属性判断是否要添加特定的节点
    React.createElement("span", { className: "al-input-group-wrapper" },
        React.createElement("span", { className: cls },
            addonBefore && React.createElement("span", { className: "al-input-group-addon" }, addonBefore),
            React.createElement("input", __assign({ className: "al-input-inner" }, restProps, { disabled: disabled, ref: ref })),
            icon && React.createElement("span", { className: "al-input-icon" },
                React.createElement(Icon, { icon: icon, title: "title-" + icon })),
            addonAfter && React.createElement("span", { className: "al-input-group-addon" }, addonAfter))));
});
export default Input;
