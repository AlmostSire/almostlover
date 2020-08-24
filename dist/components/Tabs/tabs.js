import React, { useState, Children } from 'react';
import classNames from 'classnames';
/**
 * 选项卡切换组件。
 * 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
 * ### 引用方法
 *
 * ~~~js
 * import { Tabs } from 'almostlover'
 * ~~~
 */
export var Tabs = function (_a) {
    var className = _a.className, type = _a.type, defaultIndex = _a.defaultIndex, onSelect = _a.onSelect, children = _a.children;
    var cls = classNames('al-tabs', className, {
        'al-tabs-inline': type === 'line',
        'al-tabs-card': type === 'card'
    });
    var _b = useState(defaultIndex), activeIndex = _b[0], setActiveIndex = _b[1];
    var handleClick = function (e, index, disabled) {
        e.preventDefault();
        if (!disabled) {
            setActiveIndex(index);
            if (onSelect) {
                onSelect(index);
            }
        }
    };
    var renderBar = function () {
        return Children.map(children, function (child, index) {
            var childEle = child;
            var _a = childEle.props, label = _a.label, disabled = _a.disabled;
            var classes = classNames('al-tabs-bar', {
                'al-tabs-bar-active': activeIndex === index,
                'al-tabs-bar-disabled': disabled
            });
            return (React.createElement("li", { key: index, onClick: function (e) { return handleClick(e, index, disabled); }, className: classes }, label));
        });
    };
    var renderContent = function () {
        return Children.map(children, function (child, index) {
            if (index === activeIndex) {
                return child;
            }
        });
    };
    return (React.createElement("div", { className: cls, "data-testid": "test-tabs" },
        React.createElement("ul", { className: "al-tabs-nav" }, renderBar()),
        React.createElement("div", { className: "al-tabs-content" }, renderContent())));
};
Tabs.defaultProps = {
    type: 'line'
};
export default Tabs;
