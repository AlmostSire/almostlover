import React, { useState, FC, CSSProperties, ReactNode } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'

export type AlertType = 'success' | 'default' | 'danger' | 'warning'

export interface AlertProps {
    className?: string;
    /**指定警告提示的样式，有四种选择 */
    type?: AlertType;
    /**标题 */
    title: string;
    /**描述 */
    desc?: ReactNode;
    /**是否显示关闭图标 */
    closable?: boolean;
    /**关闭时触发的回调函数 */
    onClose?: () => void;
}

/** 
 * 用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失
 * ### 引用方法
 * 
 * ~~~js
 * import { Alert } from 'almostlover'
 * ~~~
*/

export const Alert: FC<AlertProps> = props => {
    const { type, title, desc, closable, onClose, className } = props
    
    const cls = classNames('al-alert', {
        [`al-alert-${type}`]: type,
    })
    const titCls = classNames('al-alert-title', className, {
        'al-alert-bold-title': desc
    })
    const [close, setClose] = useState(false)

    const handleClick = () => {
        if (onClose) {
            onClose()
        }
        setClose(true)
    }
   
    return (
        <Transition
            in={!close}
            timeout={300}
            animation="zoom-in-top"
        >
             <div className={cls}>
                <div className={titCls}>{title}</div>
                {desc &&<div className="al-alert-desc">{desc}</div>}
                {closable && <div className="al-alert-close" onClick={handleClick}>
                    <Icon icon="times"/>
                </div>}
            </div>
        </Transition>

       
    )
}

Alert.defaultProps = {
    closable: true,
    type: 'default',
};

export default Alert;