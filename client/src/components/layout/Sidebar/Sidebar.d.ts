import React from 'react';
export interface SidebarMenuItem {
    id: string;
    label: string;
    path: string;
    icon: React.ReactNode;
    badge?: string | number;
    disabled?: boolean;
}
export interface SidebarSection {
    title?: string;
    items: SidebarMenuItem[];
}
export interface SidebarProps {
    sections: SidebarSection[];
    collapsed?: boolean;
    version?: string;
}
export declare const Sidebar: React.FC<SidebarProps>;
//# sourceMappingURL=Sidebar.d.ts.map