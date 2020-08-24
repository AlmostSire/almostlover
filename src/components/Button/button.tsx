import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes,  } from 'react'
import classNames from 'classnames'

export type ButtonType = 'primary' | 'danger' | 'link'
export type ButtonSize = 'lg' | 'sm'


interface BaseButtonProps {
 
    /**设置 Button 的禁用 */
    disabled?: boolean;
    /**设置 Button 的尺寸 */
    size?: ButtonSize;
    /**设置 Button 的类型 */
    btnType?: ButtonType;
    /**点击跳转的地址，指定此属性 button 的行为和 a 链接一致 */
    href?: string;    
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type LinkButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>

export type ButtonProps = Partial<NativeButtonProps & LinkButtonProps>

/**
 * 这是我们的第一个 Button 组件
 * ## Button header
 * ~~~js
 * import { Button } from 'almostlover'
 * ~~~
 */

export const Button: FC<ButtonProps> = props => {
    const { btnType, size, disabled, className, style, children, ...restProps } = props

    const cls = classNames('al-btn', className, {
        [`al-btn-${btnType}`]: btnType,
        [`al-btn-${size}`]: size,
        'disabled': btnType === 'link' && disabled
    })

    if (btnType === 'link') {
        return (
            <a 
                className={cls}
                style={style}
                {...restProps}
            >
                {children}
            </a>
        )
    } else {
        return (
            <button
                className={cls}
                style={style}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }
}

Button.defaultProps = {
    disabled: false,
    
}

export default Button
