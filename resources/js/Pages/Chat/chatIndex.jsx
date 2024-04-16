import ChatBox from '@/Components/Chat/ChatBox';
import ChatSidebar from '@/Components/Chat/ChatSidebar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function chatIndex(props) {
    const { auth, errors, recentMessages, receiver, messages } = props;
    console.log(props);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Message Section" />
            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex h-screen antialiased text-gray-800">
                        <div className="flex flex-row h-full w-full overflow-x-hidden">
                            <ChatSidebar recentMessages={props.recentMessages} />
                            <div className="flex-grow flex justify-center items-center">
                                <p className="text-gray-600 mb-20 text-2xl">
                                    select the user you want to chat with!
                                </p>
                            </div>
                            {/*
                            <ChatBox /> 
                            */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}