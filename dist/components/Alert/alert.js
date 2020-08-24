import React, { useState } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
/**
 * 用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失
 * ### 引用方法
 *
 * ~~~js
 * import { Alert } from 'almostlover'
 * ~~~
*/
export var Alert = function (props) {
    var _a;
    var type = props.type, title = props.title, desc = props.desc, closable = props.closable, onClose = props.onClose, className = props.className;
    var cls = classNames('al-alert', (_a = {},
        _a["al-alert-" + type] = type,
        _a));
    var titCls = classNames('al-alert-title', className, {
        'al-alert-bold-title': desc
    });
    var _b = useState(false), close = _b[0], setClose = _b[1];
    var handleClick = function () {
        if (onClose) {
            onClose();
        }
        setClose(true);
    };
    return (React.createElement(Transition, { in: !close, timeout: 300, animation: "zoom-in-top" },
        React.createElement("div", { className: cls },
            React.createElement("div", { className: titCls }, title),
            desc && React.createElement("div", { className: "al-alert-desc" }, desc),
            closable && React.createElement("div", { className: "al-alert-close", onClick: handleClick },
                React.createElement(Icon, { icon: "times" })))));
};
Alert.defaultProps = {
    closable: true,
    type: 'default',
};
export default Alert;
