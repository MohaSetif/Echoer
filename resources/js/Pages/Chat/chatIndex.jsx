import ChatBox from '@/Components/Chat/ChatBox';
import ChatSidebar from '@/Components/Chat/ChatSidebar';
import MessageInput from '@/Components/Chat/MessageInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function chatIndex(props) {
    const { auth } = props;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Message Section" />
            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex h-screen antialiased text-gray-800 border border-gray-100/50">
                        <div className="flex flex-row h-full w-full overflow-x-hidden border border-gray-100/50">
                            <ChatSidebar recentMessages={props.recentMessages} />
                            <div className="flex-grow max-w-7xl mx-auto">
                                {props.receiver?.id ? (
                                    <>
                                        <p className="ml-6 p-2 rounded-t-2xl text-md bg-slate-600 text-white font-semibold">{props.receiver.name}</p>
                                        <ChatBox messages={props.messages} auth_id={props.auth?.user?.id}/> 
                                        <MessageInput receiver={props.receiver}/>
                                    </>
                                ) : (
                                    <div className="flex justify-center items-center h-full">
                                        <p className="text-gray-600 text-2xl">
                                            Select the user you want to chat with!
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
