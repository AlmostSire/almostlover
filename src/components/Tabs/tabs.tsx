import React, { useState, FC, MouseEvent, Children, FunctionComponentElement } from 'react' 
import classNames from 'classnames'
import { TabItemProps } from './tabItem'

export interface TabsProps {
    /**可以扩展的 className */
    className?: string;
    /**Tabs的样式，两种可选，默认为 line */
    type?: 'line' | 'card';
    /**当前激活 tab 面板的 index，默认为0 */
    defaultIndex?: number;
    /**点击 Tab 触发的回调函数 */
    onSelect?: (index: number) => void;
}

/**
 * 选项卡切换组件。
 * 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
 * ### 引用方法
 * 
 * ~~~js
 * import { Tabs } from 'almostlover'
 * ~~~
 */

export const Tabs: FC<TabsProps> = ({ className, type, defaultIndex, onSelect, children }) => {

    const cls = classNames('al-tabs', className, {
        'al-tabs-inline': type === 'line',
        'al-tabs-card': type === 'card'
    })

    const [ activeIndex, setActiveIndex ] = useState(defaultIndex)

    const handleClick = (e: MouseEvent, index: number, disabled: boolean | undefined) => {
        e.preventDefault()
        if (!disabled) {
            setActiveIndex(index)
            if (onSelect) {
                onSelect(index)
            }
        }
    }

    const renderBar = () => {
        return Children.map(children, (child, index) => {
            const childEle = child as FunctionComponentElement<TabItemProps>
            const { label, disabled } = childEle.props
           
            const classes = classNames('al-tabs-bar', {
                'al-tabs-bar-active': activeIndex === index,
                'al-tabs-bar-disabled': disabled
            })
            return (
                <li
                    key={index}
                    onClick={(e: MouseEvent) => handleClick(e, index, disabled)}
                    className={classes}
                >
                    {label}
                </li>
            )
        })
    }

    const renderContent = () => {
        return Children.map(children, (child, index) => {
           
            if (index === activeIndex) {
                return child
            }
        })
    }

    return (
        <div className={cls} data-testid="test-tabs">
            <ul className="al-tabs-nav">
                {renderBar()}
            </ul>
            <div className="al-tabs-content">
                {renderContent()}
            </div>
        </div>
    )

}

Tabs.defaultProps = {
    type: 'line'
}

export default Tabs;