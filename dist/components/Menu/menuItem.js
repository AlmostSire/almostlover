import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
export var MenuItem = function (props) {
    var className = props.className, style = props.style, disabled = props.disabled, children = props.children, index = props.index;
    var _a = useContext(MenuContext), selectedKey = _a.selectedKey, onSelect = _a.onSelect;
    var cls = classNames('al-menu-item', className, {
        'al-menu-item-disabled': disabled,
        'al-menu-item-selected': selectedKey === index
    });
    var handleClick = function () {
        if (onSelect && !disabled && typeof index === 'string') {
            onSelect(index);
        }
    };
    return (React.createElement("li", { className: cls, style: style, onClick: handleClick }, children));
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
