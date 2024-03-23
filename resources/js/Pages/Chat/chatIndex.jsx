import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function chatIndex({ auth }) {
    const [message, setMessage] = useState('');

    useEffect(() => {
        Echo.channel(`messanger`)
            .listen('messageSent', (e) => {
                console.log(e);
                setMessage(e.message);
            });
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Messages</h2>}
        >
            <Head title="Message Section" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">Chat</div>
                        <p className='text-white'>{message}</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}