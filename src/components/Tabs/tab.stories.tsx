import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Icon from '../Icon/icon'

import Tabs from './tabs'
import TabItem from './tabItem'

const baseTabs = () => (
    <Tabs onSelect={action('selected')} defaultIndex={0}>
        <TabItem label="tab 1">Content of Tab 1</TabItem>
        <TabItem label="tab 2">Content of Tab 2</TabItem>
        <TabItem label="tab 3">Content of Tab 3</TabItem>
    </Tabs>
)

const disabledTabs = () => (
    <Tabs defaultIndex={0}>
        <TabItem label="tab 1">Content of Tab 1</TabItem>
        <TabItem label="tab 2" disabled>Content of Tab 2</TabItem>
        <TabItem label="tab 3">Content of Tab 3</TabItem>
    </Tabs>
)

const iconTabs = () => (
    <Tabs defaultIndex={0}>
        <TabItem
            label={
                <span>
                    <Icon icon="bath" />
                    Tab 1
                </span>
            }
        >
            Tab 1
        </TabItem>
        <TabItem
            label={
                <span>
                    <Icon icon="address-book" />
                    Tab 2
                </span>
            }
        >
            Tab 2
        </TabItem>
        <TabItem
            label={
                <span>
                    <Icon icon="adjust" />
                    Tab 3
                </span>
            }
        >
            Tab 3
        </TabItem>
    </Tabs>
)

const cardTabs = () => (
    <Tabs onSelect={action('selected')} defaultIndex={0} type="card">
        <TabItem label="tab 1">Content of Tab 1</TabItem>
        <TabItem label="tab 2">Content of Tab 2</TabItem>
        <TabItem label="tab 3">Content of Tab 3</TabItem>
    </Tabs>
)


  storiesOf('Tabs', module)
    .add('基本：默认选用第一项', baseTabs)
    .add('禁用：禁用某一项', disabledTabs)
    .add('图标：有图标的标签', iconTabs)
    .add('卡片样式页签', cardTabs)
