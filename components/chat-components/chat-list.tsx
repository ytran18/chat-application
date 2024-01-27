import { cn } from "@/lib/utils"
import { ScrollArea } from "../ui/scroll-area";
import { Inbox, gapTime } from "@/lib/data";
import { useMail } from "@/lib/use-mail";

import { Avatar, AvatarFallback } from "../ui/avatar";

interface ChatListProps {
    items: Inbox[],
    handleSelectChat: () => void,
    avtBgColor: {id: string, bgColor: string}[],
}

export function ChatList({ items, handleSelectChat, avtBgColor }: ChatListProps) {

    const [mail, setMail] = useMail();

    const handleClick = (item: {id: string}) => {
        setMail({
            ...mail,
            selected: item.id,
        });
        
        handleSelectChat();
    }

    return (
        <ScrollArea style={{height: 'calc(100vh - 120px)'}}>
            <div className="flex flex-col gap-2 p-4 pt-0">
                {items.map((item) => {
                    const bgColor = avtBgColor?.find(bg => bg.id === item.id)?.bgColor;
                    
                    return (
                        <button
                            key={item.id}
                            className={cn(
                                "flex items-center gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                                mail.selected === item.id && "bg-muted"
                            )}
                            onClick={() => handleClick(item)}
                        >

                            <Avatar className="w-12 h-12 ">
                                <AvatarFallback style={{backgroundColor: `${bgColor}`}} className={`text-white text-lg`}>
                                {item.email.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col w-full">
                                <div className="flex w-full flex-1 items-center justify-between">
                                    <div className="flex items-center gap-2 mr-2 w-full sm:w-auto">
                                        <div className="font-semibold w-full sm:w-auto">{item.email}</div>
                                    </div>
                                    <div className="text-xs hidden sm:flex w-[84px] opacity-60 truncate">{gapTime(item.message?.[item.message.length - 1].created_at)}</div>
                                </div>

                                <div className="line-clamp-2 w-[60%] sm:w-full mb-3 text-xs text-muted-foreground">
                                    {item.user_last_message.substring(0, 300)}
                                </div>

                                <div className="text-xs flex sm:hidden w-[84px] opacity-60 truncate">{gapTime(item.message?.[item.message.length - 1].created_at)}</div>
                            </div>
                        </button>
                    )
                })}
            </div>
        </ScrollArea>
    )
}