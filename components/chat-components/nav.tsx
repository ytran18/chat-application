import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface NavProps {
    links: {
        title: string
        label?: string
        icon: LucideIcon
        variant: "default" | "ghost",
        tab: number,
    }[],
    handleChangeTab: (tab: number) => void,
    tabActive: number
}

export function Nav({ links, handleChangeTab, tabActive }: NavProps) {
    return (
        <div
            data-collapsed={true}
            className="group cursor-pointer flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
        >
            <nav className="">
                {links.map((link, index) => {
                    return (
                        <div 
                            className="grid gap-1 my-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2" 
                            onClick={() => handleChangeTab(link.tab)}
                            key={`nav-menu-${index}`}
                        >
                            <Tooltip key={index} delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <div
                                        className={cn(
                                            buttonVariants({ variant: link.variant, size: "icon" }),
                                            "h-9 w-9",
                                            link.tab === tabActive &&
                                            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                                        )}
                                    >
                                        <link.icon className="h-4 w-4" />
                                        <span className="sr-only">{link.title}</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="flex items-center gap-4">
                                    {link.title}
                                    {link.label && (
                                        <span className="ml-auto text-muted-foreground">
                                            {link.label}
                                        </span>
                                    )}
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    )
                })}
            </nav>
        </div>
    )
};
