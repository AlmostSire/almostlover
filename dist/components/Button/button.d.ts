import { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
export declare type ButtonType = 'primary' | 'danger' | 'link';
export declare type ButtonSize = 'lg' | 'sm';
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
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type LinkButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & LinkButtonProps>;
/**
 * 这是我们的第一个 Button 组件
 * ## Button header
 * ~~~js
 * import { Button } from 'almostlover'
 * ~~~
 */
export declare const Button: FC<ButtonProps>;
export default Button;
