import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Alert from './alert'

const defaultAlert = () => {
    return <Alert type="default" title="this is alert!"/>
}

const stylesAlert = () => {
    return (
        <div>
            <Alert title="this is Success" type="success"/>
            <Alert title="this is Danger!" type="danger"/>
            <Alert title="this is Warning!" type="warning"/>
        </div>
    )
}
const descAlert = () => {
    return <Alert title="提示标题欧亲" desc="this is a long description" onClose={action('closed')}></Alert>
}

storiesOf('Alert', module)
  .add('基本使用', defaultAlert)
  .add('不同样式的 Alert', stylesAlert)
  .add('添加描述的 Alert', descAlert)