import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import Input from './input'
import Icon from '../Icon/icon'

const ControlInput = () => {
    const [value, setValue] = useState()
    console.log(value)
    return (
        <Input value={value} defaultValue={value} onChange={e => { setValue(e.target.value) }} />
    )
}

const baseInput = () => (
    <div>
        <Input placeholder="base usage"/>
        <ControlInput />
    </div>
)

const sizeInput = () => (
    <div>
        <Input size="lg" placeholder="large size" />
        <Input placeholder="default size" />
        <Input size="sm" placeholder="small size" />
    </div>
)

const addonInput = () => (
    <div>
        <Input defaultValue="mysite" addonBefore="Http://" addonAfter=".com" />
        <Input defaultValue="mysite" addonAfter={<Icon icon="address-book"/>} />
    </div>
)

const disabledInput = () => (
    <Input placeholder="disabled" disabled/>
)

const iconInput = () => (
    <Input placeholder="icon" icon="address-card"/>
)
storiesOf('Input', module)
    .add('基本使用', baseInput)
    .add('三种大小', sizeInput)
    .add('前置/后置标签', addonInput)
    .add('禁用', disabledInput)
    .add('图标', iconInput)