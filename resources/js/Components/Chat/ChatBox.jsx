import React from 'react'
import MessageInput from './MessageInput';

function ChatBox() {
    
    const users = [
        { message: "Lorem ipsum dolor sit amet consectetur doloribus, doloremque similique.", picture: "B" },
        { message: "Hello there, how're you!", picture: "M" },
        { message: "lol", picture: "M" },
        { message: "what", picture: "B" }
    ];

  return (
    <div className="flex flex-col flex-auto h-5/6 pl-6">
        <div
        className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
        >
        <div className="flex flex-col h-full overflow-x-auto mb-4">
            <div className="flex flex-col h-full">
            <div className="grid grid-cols-12 gap-y-2">
                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                <div className="flex flex-row items-center">
                    <div
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                    A
                    </div>
                    <div
                    className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                    >
                    <div>Hey How are you today?</div>
                    </div>
                </div>
                </div>
                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                <div className="flex flex-row items-center">
                    <div
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                    A
                    </div>
                    <div
                    className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                    >
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Vel ipsa commodi illum saepe numquam maxime
                        asperiores voluptate sit, minima perspiciatis.
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-start-6 col-end-13 p-3 rounded-lg">
                <div className="flex items-center justify-start flex-row-reverse">
                    <div
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                    A
                    </div>
                    <div
                    className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                    >
                    <div>I'm ok what about you?</div>
                    </div>
                </div>
                </div>
                <div className="col-start-6 col-end-13 p-3 rounded-lg">
                <div className="flex items-center justify-start flex-row-reverse">
                    <div
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                    A
                    </div>
                    <div
                    className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                    >
                    <div>
                        Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                <div className="flex flex-row items-center">
                    <div
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                    A
                    </div>
                    <div
                    className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                    >
                    <div>Lorem ipsum dolor sit amet !</div>
                    </div>
                </div>
                </div>
                <div className="col-start-6 col-end-13 p-3 rounded-lg">
                <div className="flex items-center justify-start flex-row-reverse">
                    <div
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                    A
                    </div>
                    <div
                    className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                    >
                    <div>
                        Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                    </div>
                    <div
                        className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500"
                    >
                        Seen
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                <div className="flex flex-row items-center">
                    <div
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                    A
                    </div>
                    <div
                    className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                    >
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Perspiciatis, in.
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
            <MessageInput/>
        </div>
    </div>
  )
}

export default ChatBox