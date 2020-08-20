import React, { useContext, CSSProperties, FC } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'

export interface MenuItemProps {
    index?: string;
    /**选项扩展的 className */
    className?: string;
    /**选项的自定义 style */
    style?: CSSProperties;
    /**选项是否被禁用 */
    disabled?: boolean;
}

export const MenuItem: FC<MenuItemProps> = props => {
    const { className, style, disabled, children, index } = props
   
    const { selectedKey, onSelect } = useContext(MenuContext)

    const cls = classNames('al-menu-item', className, {
        'al-menu-item-disabled': disabled,
        'al-menu-item-selected': selectedKey === index
    })

    const handleClick = () => {
        if (onSelect && !disabled && typeof index === 'string') {
            onSelect(index)
        }
    }

    return (
        <li className={cls} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem;