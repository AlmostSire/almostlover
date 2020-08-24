import { FC, ReactElement } from 'react';
export interface TabItemProps {
    /** Tab选项上面的文字 */
    label: string | ReactElement;
    /** Tab选项是否被禁用 */
    disabled?: boolean;
}
export declare const TabItem: FC<TabItemProps>;
export default TabItem;
