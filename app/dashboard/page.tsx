"use client"; 

import * as React from 'react';

import { ResizablePanel } from '@/components/ui/resizable';
import { Separator } from '@/components/ui/separator';

import DefaultLayout from '@/components/chat-components/default-layout';

export default function Home() {
    return (
        <DefaultLayout>
            <ResizablePanel defaultSize={910}>
                    <div className="flex items-center px-4 h-[52px] py-2">
                        <h1 className="text-xl font-bold">Home</h1>
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