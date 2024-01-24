import * as React from 'react';

import { useRouter, usePathname } from 'next/navigation';

import { TooltipProvider } from "../ui/tooltip";
import { ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import { AccountSwitcher } from './account-switcher';
import { Separator } from '../ui/separator';
import { Nav } from './nav';

import { AlertCircle, Archive, ArchiveX, File, Inbox, MessagesSquare, Send, ShoppingCart, Trash2, Users2, HomeIcon } from 'lucide-react';

import { accounts } from '@/lib/data';
import { cn } from '@/lib/utils';

interface DefaultLayoutProps {
    children: React.ReactNode,
};

export default function DefaultLayout({ children }: DefaultLayoutProps) {

    const pathname = usePathname();

    const [tab, setTab] = React.useState(0);
    const router = useRouter();

    React.useEffect(() => {
        const tab = {
            '/dashboard': 1,
            '/dashboard/inbox': 2,
            '/dashboard/draft': 3,
            '/dashboard/sent': 4,
            '/dashboard/junk': 5,
            '/dashboard/trash': 6,
            '/dashboard/archive': 7,
            '/dashboard/social': 8,
            '/dashboard/updates': 9,
            '/dashboard/forums': 10,
            '/dashboard/shopping': 11,
            '/dashboard/promotions': 12,
        }[pathname] || 0;

        setTab(tab);
    },[]);

    const handleChangeTab = (tab: number) => {
        setTab(tab);

        const navigate = {
            2: '/dashboard/inbox',
            3: '/dashboard/draft',
            4: '/dashboard/sent',
            5: '/dashboard/junk',
            6: '/dashboard/trash',
            7: '/dashboard/archive',
            8: '/dashboard/social',
            9: '/dashboard/updates',
            10: '/dashboard/forums',
            11: '/dashboard/shopping',
            12: '/dashboard/promotions'
        }[tab] || '/dashboard';

        router.push(navigate);
    };

    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
                direction="horizontal"
                onLayout={(sizes: number[]) => {
                    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
                }}
                className="!h-screen items-stretch"
            >
                <ResizablePanel
                    defaultSize={10}
                    collapsedSize={4}
                    collapsible={true}
                    minSize={20}
                    maxSize={20}
                    className={"max-w-[50px] min-w-[50px] h-full border-r border-rgb(226,232,241) transition-all duration-300 ease-in-out"}
                >
                    <div className={cn("flex h-[52px] w-full items-center justify-center")}>
                        <AccountSwitcher isCollapsed={true} accounts={accounts} />
                    </div>
                    <Separator />
                    <Nav
                        tabActive={tab}
                        handleChangeTab={handleChangeTab}
                        links={[
                            {
                                title: "Home",
                                icon: HomeIcon,
                                variant: tab === 1 ?  "default" : "secondary",
                                tab: 1,
                            },
                            {
                                title: "Inbox",
                                label: "128",
                                icon: Inbox,
                                variant: tab === 2 ?  "default" : "secondary",
                                tab: 2,
                            },
                            {
                                title: "Drafts",
                                label: "9",
                                icon: File,
                                variant: tab === 3 ?  "default" : "secondary",
                                tab: 3
                            },
                            {
                                title: "Sent",
                                label: "",
                                icon: Send,
                                variant: tab === 4 ?  "default" : "secondary",
                                tab: 4
                            },
                            {
                                title: "Junk",
                                label: "23",
                                icon: ArchiveX,
                                variant: tab === 5 ?  "default" : "secondary",
                                tab: 5
                            },
                            {
                                title: "Trash",
                                label: "",
                                icon: Trash2,
                                variant: tab === 6 ?  "default" : "secondary",
                                tab: 6
                            },
                            {
                                title: "Archive",
                                label: "",
                                icon: Archive,
                                variant: tab === 7 ?  "default" : "secondary",
                                tab: 7
                            },
                        ]}
                    />
                    <Separator />
                    <Nav
                        tabActive={tab}
                        handleChangeTab={handleChangeTab}
                        links={[
                            {
                                title: "Social",
                                label: "972",
                                icon: Users2,
                                variant: tab === 8 ?  "default" : "secondary",
                                tab: 8
                            },
                            {
                                title: "Updates",
                                label: "342",
                                icon: AlertCircle,
                                variant: tab === 9 ?  "default" : "secondary",
                                tab: 9
                            },
                            {
                                title: "Forums",
                                label: "128",
                                icon: MessagesSquare,
                                variant: tab === 10 ?  "default" : "secondary",
                                tab: 10
                            },
                            {
                                title: "Shopping",
                                label: "8",
                                icon: ShoppingCart,
                                variant: tab === 11 ?  "default" : "secondary",
                                tab: 11
                            },
                            {
                                title: "Promotions",
                                label: "21",
                                icon: Archive,
                                variant: tab === 12 ?  "default" : "secondary",
                                tab: 12
                            },
                        ]}
                    />
                </ResizablePanel>
                { children }
            </ResizablePanelGroup>
        </TooltipProvider>
    );
}