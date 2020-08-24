import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module) 
    .add('welcome', () => {
        return (
            <>
                <h1>欢迎来到 vikingship 组件库</h1>
                <p>almostlover 为 Web 应用提供了丰富的基础 UI 组件</p>
                <h3>安装试试</h3>
                <code>
                    npm install almostlover --save
                </code>
            </>
        )
    }, {
        info: {
            disable: true
        }
    })