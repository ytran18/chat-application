"use client"; 

import * as React from 'react';

import { ResizableHandle, ResizablePanel } from '@/components/ui/resizable';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ChatList } from '@/components/chat-components/chat-list';
import { ChatDisplay } from '@/components/chat-components/chat-display';
import { useMail } from '@/lib/use-mail';

import DefaultLayout from '@/components/chat-components/default-layout';

import { inbox, randomBgColor } from '@/lib/data';
import useWindowWidth from '@/lib/get-width';

import { Search } from 'lucide-react';

type AvatarBackgroundColor = {
    id: string;
    bgColor: string;
}

export default function page() {

    const width = useWindowWidth();

    const [isSelectChat, setIsSelectChat] = React.useState(false);
    const [avtBgColor, setAvtBgColor] = React.useState<AvatarBackgroundColor[]>([]);
    const [isShowProfile, setShowProfile] = React.useState(width > 1024 ? true : false);
    const [mail] = useMail();


    const handleSelectChat = () => {
        if (width >= 768) return;
        setIsSelectChat(prev => !prev);
    };

    React.useEffect(() => {
        console.log("Call API here!");
    },[]);

    React.useEffect(() => {
        if (width > 1024) setShowProfile(true);
        if (width <= 1024) setShowProfile(false);
    }, [width]);

    React.useEffect(() => {
        const colorArr: { id: string; bgColor: string }[] = inbox.map(item => {
            return {
                id: item.id,
                bgColor: randomBgColor()
            }
        });

        setAvtBgColor(colorArr);
    },[]);

    const handleShowProfile = (type: string) => {
        if (type === 'prev') {
            setShowProfile(prev => !prev);
        };
        if (type === 'false') {
            setShowProfile(false);
        };
    };

    return (
        <DefaultLayout>
            <ResizablePanel className={`h-full ${isSelectChat ? 'hidden' : 'block'} md:block min-w-[400px]`} defaultSize={270} maxSize={50} minSize={30}>
                <Tabs defaultValue='all'>
                    <div className="flex items-center px-4 py-2">
                        <h1 className="text-xl font-bold">Inbox</h1>
                        <TabsList className="ml-auto">
                            <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">All messages</TabsTrigger>
                            <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">Unread</TabsTrigger>
                        </TabsList>
                    </div>
                    <Separator />
                    <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search" className="pl-8" />
                            </div>
                        </form>
                    </div>
                    <TabsContent value='all' className='m-0'>
                        <ChatList avtBgColor={avtBgColor} items={inbox} handleSelectChat={handleSelectChat}/>
                    </TabsContent>
                    {/* <TabsContent value="unread" className="m-0"> */}
                        {/* <ChatList items={inbox.filter((item) => !item.read)} handleSelectChat={handleSelectChat} /> */}
                    {/* </TabsContent> */}
                </Tabs>
            </ResizablePanel>
            <ResizableHandle withHandle className='hidden md:flex'/>
            <ResizablePanel defaultSize={910} className={`${isSelectChat ? 'block' : 'hidden'} md:block`}>
                <ChatDisplay
                    inbox={inbox.find((item) => item.id === mail.selected) || null}
                    width={width}
                    isShowProfile={isShowProfile}
                    handleSelectChat={handleSelectChat}
                    handleShowProfile={handleShowProfile}
                />
            </ResizablePanel>
        </DefaultLayout>
    );
}