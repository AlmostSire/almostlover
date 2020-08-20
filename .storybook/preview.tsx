import React from 'react'
import { addDecorator, configure, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import '../src/styles/index.scss'
import "./fix_info_style.scss"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

const wrapperStyle: React.CSSProperties = {
    padding: '20px 40px'
}
const storyWrapper = (storyFn: any) => (
    <div className="component-demo" style={wrapperStyle}>
        <h3>组件演示</h3>
        {storyFn()}
    </div>
)

addDecorator(storyWrapper)
addDecorator(withInfo)
addParameters({
    info: { inline: true, header: false }
})