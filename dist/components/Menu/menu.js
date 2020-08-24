import React, { createContext, useState, Children, cloneElement } from 'react';
import classNames from 'classnames';
export var MenuContext = createContext({});
export var Menu = function (props) {
    var _a;
    var className = props.className, style = props.style, mode = props.mode, defaultSelectedKey = props.defaultSelectedKey, selectedKey = props.selectedKey, onSelect = props.onSelect, children = props.children, defaultOpenKeys = props.defaultOpenKeys;
    var cls = classNames('al-menu', className, (_a = {},
        _a["al-menu-" + mode] = mode,
        _a));
    var _b = useState(selectedKey), activeKey = _b[0], setActive = _b[1];
    var handleClick = function (selectedKey) {
        setActive(selectedKey);
        if (onSelect) {
            onSelect(selectedKey);
        }
    };
    var passedContext = {
        selectedKey: activeKey || defaultSelectedKey,
        onSelect: handleClick,
        mode: mode,
        defaultOpenKeys: defaultOpenKeys
    };
    var renderChildren = function () {
        return Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return cloneElement(childElement, {
                    index: index.toString()
                });
            }
            else {
                console.error('Warning: Menu has a child which is not a MenuItem');
            }
        });
    };
    return (React.createElement("ul", { className: cls, style: style, "data-testid": "test-menu" },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    mode: 'horizontal',
    defaultOpenKeys: []
};
export default Menu;
