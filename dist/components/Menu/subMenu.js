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
import React, { useContext, useState, cloneElement, Children } from 'react';
import classNames from 'classnames';
import Transition from '../Transition/transition';
import { MenuContext } from './menu';
import Icon from '../Icon/icon';
export var SubMenu = function (props) {
    var className = props.className, style = props.style, disabled = props.disabled, children = props.children, index = props.index, title = props.title;
    var _a = useContext(MenuContext), mode = _a.mode, defaultOpenKeys = _a.defaultOpenKeys;
    var openedSubMenus = defaultOpenKeys;
    var isOpened = (index && mode === 'vertical') ? openedSubMenus.includes(index) : false;
    var _b = useState(isOpened), open = _b[0], setOpen = _b[1];
    var cls = classNames('al-menu-item al-menu-submenu', className, {
        'al-menu-item-disabled': disabled,
        'al-menu-submenu-open': open
    });
    var timer;
    var handleHover = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 200);
    };
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!open);
    };
    var clickEvents = mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    var hoverEvents = mode === 'horizontal' ? {
        onMouseEnter: function (e) { return handleHover(e, true); },
        onMouseLeave: function (e) { return handleHover(e, false); },
    } : {};
    var renderChildren = function () {
        var childrenComponent = Children.map(children, function (child, i) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem') {
                return cloneElement(childElement, {
                    index: index + "-" + i
                });
            }
            else {
                console.error('Warning: SubMenu has a child which is not a MenuItem');
            }
        });
        return (React.createElement(Transition, { in: open, timeout: 300, animation: "zoom-in-left" },
            React.createElement("ul", { className: "al-menu-submenu-popup" }, childrenComponent)));
    };
    return (React.createElement("li", __assign({ className: cls, style: style }, hoverEvents),
        React.createElement("div", __assign({ className: "al-menu-submenu-title" }, clickEvents),
            title,
            React.createElement(Icon, { icon: "angle-down", className: "arrow-icon" })),
        renderChildren()));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
