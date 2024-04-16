import ChatBox from '@/Components/Chat/ChatBox';
import ChatSidebar from '@/Components/Chat/ChatSidebar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function chatIndex({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Message Section" />
            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex h-screen antialiased text-gray-800">
                        <div className="flex flex-row h-full w-full overflow-x-hidden">

                            {/* Users part */}

                            <ChatSidebar/>

                            {/* messages part */}

                            <ChatBox />

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}