import { useEffect } from "react";

import { MoreVertical, Mail as MailIcon, MonitorSmartphone, MapPinned, GitBranch, MapPin, ArrowLeft, MapIcon, Compass, Chrome, Link, SwatchBook } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Inbox, convertTime } from "@/lib/data";

interface ChatDisplayProps {
    inbox: Inbox | null,
    width: number,
    isShowProfile: boolean,
    handleSelectChat: () => void,
    handleShowProfile: (type: string) => void,
    avtBgColor: {id: string, bgColor: string}[],
}

export function ChatDisplay({ inbox, width, isShowProfile, handleSelectChat, handleShowProfile, avtBgColor }: ChatDisplayProps) {

    useEffect(() => {
        const container = document.getElementById('message-container');

        if (container) {
            container.scrollTop = container.scrollHeight;
        };
    }, [inbox]);

    const condition = width > 1024 ? (isShowProfile ? 'w-[65%] border-r border-rgb(226,232,241)' : 'w-full') : (isShowProfile ? 'hidden' : 'w-full');

    const info = [
        { label: 'IP', value: inbox?.ip, icon: MapPin },
        { label: 'Country', value: inbox?.country, icon: MapIcon },
        { label: 'City', value: inbox?.city, icon: MapPinned },
        { label: 'Device type', value: inbox?.device_type, icon: MonitorSmartphone },
        { label: 'OS', value: inbox?.os, icon: Compass },
        { label: 'OS version', value: inbox?.os_version, icon: GitBranch },
        { label: 'Browser', value: inbox?.browser, icon: Chrome },
        { label: 'Browser version', value: inbox?.browser_version, icon: GitBranch },
        { label: 'Device model', value: inbox?.device_model, icon: MonitorSmartphone },
        { label: 'Device vendor', value: inbox?.device_vendor, icon: SwatchBook },
    ];

    const userAvatarColorBg = avtBgColor.find(item => item.id === inbox?.id)?.bgColor;
    console.log(userAvatarColorBg);
    

    return (
        <div className="flex h-full flex-col">
            <div className="flex w-full">
                <div className={`flex flex-col ${condition}`}>
                    <div className="flex items-center justify-between px-4 py-[8px]">
                        <div className="flex items-center gap-2">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button onClick={handleSelectChat} className="flex md:hidden" variant="ghost" size="icon" disabled={!inbox}>
                                        <ArrowLeft className="h-4 w-4" />
                                        <span className="sr-only">back</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Back</TooltipContent>
                            </Tooltip>
                            <div>{inbox?.email}</div>
                        </div>
                        <Button onClick={() => handleShowProfile('prev')} variant="ghost" size="icon" disabled={!inbox}>
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">More</span>
                        </Button>
                    </div>
                    <Separator />
                    {inbox ? (
                        <div className="flex flex-col">
                            <div id="message-container" className="flex flex-col sticky bottom-0 gap-2 items-start p-4 overflow-y-auto" style={{height: 'calc(100vh - 210px)'}}>
                                {inbox.message?.map((item, index) => {
                                    return (
                                        <div key={`mail-mess-${index}`} className={`flex w-full items-center gap-2 text-sm ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            {item.role === 'user' && (
                                                <>
                                                    <div className="text-xs">{convertTime(item.created_at)}</div>
                                                    <div className="p-2 bg-[rgb(43,97,255)] text-white rounded-xl max-w-52 md:max-w-60">{item.content?.[0].text.value}</div>
                                                </>
                                            )}
                                            <Avatar>
                                                <AvatarFallback className="text-white" style={{backgroundColor: item.role === 'user' ? userAvatarColorBg : ''}}>
                                                    {item.role === 'user' ? inbox.email.split(" ").map((chunk) => chunk[0]).join("").toUpperCase() : 'A'}
                                                </AvatarFallback>
                                            </Avatar>
                                            {item.role === 'assistant' && (
                                                <>
                                                    <div className="p-2 bg-[rgb(63,64,65)] text-white rounded-xl max-w-52 md:max-w-60">{item.content?.[0].text.value}</div>
                                                    <div className="text-xs">{convertTime(item.created_at)}</div>
                                                </>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                            <Separator className="mt-auto" />
                            <div className="p-4">
                                <form>
                                    <div className="grid gap-4">
                                        <Textarea
                                            className="p-4"
                                        />
                                        <div className="flex items-center">
                                            <Label
                                                htmlFor="mute"
                                                className="flex items-center gap-2 text-xs font-normal"
                                            >
                                                <Switch id="mute" aria-label="Mute thread" /> Mute this thread
                                            </Label>
                                            <Button
                                                onClick={(e) => e.preventDefault()}
                                                size="sm"
                                                className="ml-auto"
                                            >
                                                Send
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 text-center text-muted-foreground">
                            No message selected
                        </div>
                    )}
                </div>
                {isShowProfile && (
                    <div className="w-full lg:w-[35%] lg:block">
                        {inbox && (
                            <div className="flex flex-col w-full">
                                <div className="flex items-center border-b border-[rgb(226,232,241)]">
                                    <Button className="flex lg:hidden" onClick={() => handleShowProfile('false')} variant="ghost" size="icon" disabled={!inbox}>
                                        <ArrowLeft className="h-4 w-4" />
                                        <span className="sr-only">Archive</span>
                                    </Button>
                                    <h1 className="text-xl font-bold h-[52px] flex items-center px-4">Profile</h1>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-2 border-b border-[rgb(226,232,241)]">
                                    <Avatar className="w-[180px] h-[180px] text-2xl">
                                        <AvatarFallback className="text-white text-3xl" style={{backgroundColor: userAvatarColorBg}}>
                                            {inbox.email.split(" ").map((chunk) => chunk[0]).join("").toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="text-xl truncate w-full text-center font-bold tracking-wider">{inbox.email}</div>
                                </div>
                                <div className="p-6 w-full overflow-y-auto" style={{height: 'calc(100vh - 305px)'}}>
                                    <div className="text-sm font-semibold mb-5">User information</div>
                                    {info.map((item, index) => {
                                        return (
                                            <div key={`info-${index}`} className="flex w-full items-center text-xs gap-3 mb-3">
                                                <item.icon className="w-[18px]"/>
                                                <div className="flex flex-col">
                                                    <div className="font-medium">{item.label}</div>
                                                    <div className="text-blue-400 truncate w-full">{item.value}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
};
