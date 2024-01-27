"use client"; 

import * as React from 'react';

import { ResizablePanel } from '@/components/ui/resizable';
import { Separator } from '@/components/ui/separator';

import DefaultLayout from '@/components/chat-components/default-layout';

export default function page() {
    return (
        <DefaultLayout>
            <ResizablePanel className={`h-full`} defaultSize={910} minSize={30}>
                    <div className="flex h-[52px] items-center px-4 py-2">
                        <h1 className="text-xl font-bold">Forums</h1>
                    </div>
                    <Separator />
                    <div className='w-full h-full p-3'>
                        <div className='w-[300px] h-[160px] text-lg p-3 rounded-md shadow-md border border-[rgb(219,219,219)]'>
                            Demo Card
                        </div>
                    </div>
            </ResizablePanel>
        </DefaultLayout>
    );
}