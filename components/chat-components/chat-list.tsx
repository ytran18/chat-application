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
                                <AvatarFallback className="text-white text-lg" style={{backgroundColor: `${bgColor}`}}>
                                    {item.email.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col w-full">
                                <div className="flex w-full flex-col gap-1">
                                    <div className="grid grid-cols-2 items-center">
                                        <div className="flex w-[120px] items-center">
                                            <div className="font-semibold truncate">{item.email}</div>
                                        </div>
                                        <div className="text-xs flex justify-end text-muted-foreground opacity-60">
                                            {gapTime(item.message?.[item.message.length - 1].created_at)}
                                        </div>
                                    </div>
                                </div>
                                <div className="line-clamp-2 text-xs text-muted-foreground">
                                    {item.user_last_message.substring(0, 300)}
                                </div>
                            </div>
                        </button>
                    )
                })}
            </div>
        </ScrollArea>
    )
}