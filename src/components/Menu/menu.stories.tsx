import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Menu from './menu'
import SubMenu from './subMenu'
import MenuItem from './menuItem'

const defaultMenu = () => (
    <Menu selectedKey="0">
        <MenuItem>Nav One</MenuItem>
        <MenuItem disabled>Nav Disabled</MenuItem>
        <MenuItem>Nav Three</MenuItem>
        <SubMenu title="Navigation Three - Submenu">
            <MenuItem>Option 1</MenuItem>
            <MenuItem>Option 2</MenuItem>
        </SubMenu>
    </Menu>
)

const verticalMenu = () => (
    <Menu selectedKey="0" onSelect={action('selected!')} mode="vertical" defaultOpenKeys={['3']}>
        <MenuItem>Nav One</MenuItem>
        <MenuItem disabled>Nav Disabled</MenuItem>
        <MenuItem>Nav Three</MenuItem>
        <SubMenu title="Navigation Three - Submenu">
            <MenuItem>Option 1</MenuItem>
            <MenuItem>Option 2</MenuItem>
        </SubMenu>
    </Menu>
)



storiesOf('Menu', module)
    .add('顶部导航', defaultMenu)
    .add('垂直导航', verticalMenu)

