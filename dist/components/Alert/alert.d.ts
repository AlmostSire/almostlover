import { FC, ReactNode } from 'react';
export declare type AlertType = 'success' | 'default' | 'danger' | 'warning';
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
export declare const Alert: FC<AlertProps>;
export default Alert;
