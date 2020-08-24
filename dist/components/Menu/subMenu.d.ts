import { CSSProperties, FC } from 'react';
export interface SubMenuProps {
    index?: string;
    /**下拉菜单选项的文字 */
    title: string;
    /**选项扩展的 className */
    className?: string;
    /**选项的自定义 style */
    style?: CSSProperties;
    /**选项是否被禁用 */
    disabled?: boolean;
}
export declare const SubMenu: FC<SubMenuProps>;
export default SubMenu;
