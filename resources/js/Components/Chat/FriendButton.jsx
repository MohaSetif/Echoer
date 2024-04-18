import { Link } from '@inertiajs/react';
import React from 'react';

function FriendButton({ friend }) {
    const max_length = 20

    const trucateMessage = (message) => message.length > max_length ? `${message.substring(0, 20)}...` : message

    return (
        <Link href={`/chat/${friend.user_id}`} className="flex flex-row items-start justify-start hover:bg-gray-600 p-2 [&:not(:last-child)]:border-b border-gray-500">
            <div className="flex items-center justify-center h-11 w-11 bg-indigo-200 rounded-full">
                U
            </div>
            <div className="flex flex-col ml-2">
                <div className="text-left text-m text-white font-semibold">{friend.name}</div>
                <p className="text-left text-xs text-white">
                    {trucateMessage(friend.message)}
                </p>
            </div>
        </Link>
    );
}

export default FriendButton;
