import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Select from './select'
import Option from './option'

const defaultSelect = () => (
    <Select
        placeholder="请选择"
        onChange={action('changed')}
        onVisibleChange={action('visible')}
        defaultValue="nihao"
    >
        <Option value="nihao" />
        <Option value="nihao2" />
        <Option value="nihao3" />
        <Option value="disabled" disabled/>
        <Option value="nihao5" />
    </Select>
)

const multipleSelect = () => (
    <Select
        placeholder="支持多选欧！"
        onChange={action('changed')}
        onVisibleChange={action('visible')}
        multiple
    >
        <Option value="nihao" />
        <Option value="nihao2" />
        <Option value="nihao3" />
        <Option value="viking" />
        <Option value="viking2" />
    </Select>
)
  
const disabledSelect = () => (
    <Select
        placeholder="禁用啦！"
        disabled
    >
        <Option value="nihao" />
        <Option value="nihao2" />
        <Option value="nihao3" />
    </Select>  
)

storiesOf('Select', module)
    .add('基本使用', defaultSelect)
    .add('多选', multipleSelect)
    .add('禁用', disabledSelect)