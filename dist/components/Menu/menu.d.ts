import React, { FC } from 'react';
declare type MenuMode = 'horizontal' | 'vertical';
export interface MenuProps {
    className?: string;
    style?: React.CSSProperties;
    mode?: MenuMode;
    defaultSelectedKey?: string;
    selectedKey?: string;
    onSelect?: (selectedKey: string) => void;
    defaultOpenKeys?: string[];
}
interface IMneuContext {
    selectedKey?: string;
    onSelect?: (selectedKey: string) => void;
    mode?: MenuMode;
    defaultOpenKeys?: string[];
}
export declare const MenuContext: React.Context<IMneuContext>;
export declare const Menu: FC<MenuProps>;
export default Menu;
