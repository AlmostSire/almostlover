import React, { FC, ReactElement, InputHTMLAttributes, ChangeEvent, forwardRef } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'

// Omit可以忽略某属性

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /**是否禁用 Input */
    disabled?: boolean;
    /**设置 input 大小，支持 lg 或者是 sm */
    size?: 'lg' | 'sm';
    /**添加图标，在右侧悬浮添加一个图标，用于提示 */
    icon?: IconProp;
    /**带标签的 input，设置前置标签 */
    addonBefore?: string | ReactElement;
    /**带标签的 input，设置后置标签 */
    addonAfter?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 * 
 * ~~~js
 * // 这样引用
 * import { Input } from 'almostlover'
 * ~~~
 * 
 * 支持 HTMLInput 的所有基本属性
 */

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    // 取出各种属性
    const { disabled, size, icon, addonAfter, addonBefore, className, ...restProps } = props
    const fixControlledValue = (value: any) => {
        if (value === undefined || value === null) {
            return ''
        }
        return value
    }
    if ('value' in restProps) {
        delete restProps.defaultValue
        restProps.value = fixControlledValue(restProps.value)
    }
    // 根据属性计算不同的className
    const cls = classNames('al-input-wrapper', className, {
        [`al-input-${size}`]: size,
        'al-input-group': addonAfter || addonBefore,
        'al-input-affix': icon
    })
    return (
        // 根据属性判断是否要添加特定的节点
        <span className="al-input-group-wrapper">
            <span className={cls}>
                {addonBefore && <span className="al-input-group-addon">{addonBefore}</span>}
                <input className="al-input-inner" {...restProps} disabled={disabled} ref={ref}/>
                {icon && <span className="al-input-icon">
                    <Icon icon={icon} title={`title-${icon}`}/>
                </span>}
                {addonAfter && <span className="al-input-group-addon">{addonAfter}</span>}
            </span>
        </span>
        
    )
})

export default Input;