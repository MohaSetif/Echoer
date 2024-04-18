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
                    <div className="flex h-screen antialiased text-gray-800">
                        <div className="flex flex-row h-full w-full overflow-x-hidden">
                            <ChatSidebar recentMessages={props.recentMessages} />
                            <div className="flex-grow">
                                {props.receiver?.id ? (
                                    <>
                                        <p className="text-lg bg-white text-black font-semibold">{props.receiver.name}</p>
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
