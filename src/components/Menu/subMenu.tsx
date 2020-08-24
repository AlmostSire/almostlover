import React, { useContext, useState, CSSProperties, FC, MouseEvent, FunctionComponentElement, cloneElement, Children } from 'react'
import classNames from 'classnames'
import Transition from '../Transition/transition'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Icon from '../Icon/icon'

export interface SubMenuProps {
    index?: string;
    /**下拉菜单选项的文字 */
    title: string;
    /**选项扩展的 className */
    className?: string;
    /**选项的自定义 style */
    style?: CSSProperties;
    /**选项是否被禁用 */
    disabled?: boolean;
}

export const SubMenu: FC<SubMenuProps> = props => {
    const { className, style, disabled, children, index, title } = props

    const { mode, defaultOpenKeys } = useContext(MenuContext)

    const openedSubMenus = defaultOpenKeys as Array<string>

    const isOpened = (index && mode === 'vertical') ? openedSubMenus.includes(index) : false

    const [ open, setOpen ] = useState(isOpened)

    

    const cls = classNames('al-menu-item al-menu-submenu', className, {
        'al-menu-item-disabled': disabled,
        'al-menu-submenu-open': open
    })
    let timer: any
    const handleHover = (e: MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setOpen(toggle)
        }, 200)
    }
    const handleClick = (e: MouseEvent) => {
        e.preventDefault()
        setOpen(!open)
    }
    const clickEvents = mode === 'vertical' ? {
        onClick: handleClick
    } : {}
    const hoverEvents = mode === 'horizontal' ? {
        onMouseEnter: (e: MouseEvent) => handleHover(e, true),
        onMouseLeave: (e: MouseEvent) => handleHover(e, false),
    } : {}
    const renderChildren = () => {
        
        const childrenComponent = Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if (displayName === 'MenuItem') {
                return cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            } else {
                console.error('Warning: SubMenu has a child which is not a MenuItem')
            }
        })
        return (
            <Transition
                in={open}
                timeout={300}
                animation="zoom-in-left"
                
            >
                <ul className="al-menu-submenu-popup">
                    {childrenComponent}
                </ul>
            </Transition>
            
        )
    }
    return (
        <li className={cls} style={style} {...hoverEvents}>
            <div className="al-menu-submenu-title" {...clickEvents}>
                {title}
                <Icon icon="angle-down" className="arrow-icon"/>
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu;