import React, { createContext, useState, FC, FunctionComponentElement, Children, cloneElement } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'

export interface MenuProps {
    className?: string;
    style?: React.CSSProperties;
    mode?: MenuMode;
    defaultSelectedKey?: string;
    selectedKey?: string;
    onSelect?: (selectedKey: string) => void;
    defaultOpenKeys?: string[];
}

interface IMneuContext {
    selectedKey?: string;
    onSelect?: (selectedKey: string) => void;
    mode?: MenuMode;
    defaultOpenKeys?: string[];
}

export const MenuContext = createContext<IMneuContext>({})

export const Menu: FC<MenuProps> = props => {
    const { className, style, mode, defaultSelectedKey, selectedKey, onSelect, children, defaultOpenKeys } = props

    const cls = classNames('al-menu', className, {
        [`al-menu-${mode}`]: mode
    })

    const [ activeKey, setActive ] = useState(selectedKey)

    const handleClick = (selectedKey: string) => {
        setActive(selectedKey)
        if (onSelect) {
            onSelect(selectedKey)
        }
    }
    
    const passedContext: IMneuContext = {
        selectedKey: activeKey || defaultSelectedKey,
        onSelect: handleClick,
        mode,
        defaultOpenKeys
    }

    const renderChildren = () => {
        return Children.map(children, (child, index) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return cloneElement(childElement, {
                    index: index.toString()
                })
            } else {
                console.error('Warning: Menu has a child which is not a MenuItem')
            }
        })
    }

    return (
        <ul className={cls} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
           
        </ul>
    )
}

Menu.defaultProps = {
    mode: 'horizontal',
    defaultOpenKeys: []
}

export default Menu;