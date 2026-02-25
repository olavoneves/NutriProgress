import type { SidebarSection } from '../Sidebar';
export interface MainLayoutProps {
    userName?: string;
    userInfo?: string;
    userAvatar?: string;
    onLogout?: () => void;
    sidebarSections: SidebarSection[];
    version?: string;
    initialCollapsed?: boolean;
    hideSidebar?: boolean;
    hideHeader?: boolean;
    contentPadding?: boolean;
    maxWidth?: string;
}
export declare const MainLayout: React.FC<MainLayoutProps>;
//# sourceMappingURL=MainLayout.d.ts.map