import React, { FC, ReactElement } from 'react'

export interface TabItemProps {
    /** Tab选项上面的文字 */
    label: string | ReactElement;
    /** Tab选项是否被禁用 */
    disabled?: boolean;
}

export const TabItem: FC<TabItemProps> = ({ children }) => {
    return (
        <div className="al-tab-panel">
            {children}
        </div>
    )
}

export default TabItem;