import { Link } from '@inertiajs/react';
import React from 'react';

function FriendButton({ friend }) {
    return (
        <Link href={`/chat/${friend.user_id}`} className="flex flex-row items-start justify-start hover:bg-gray-100 rounded-xl p-2">
            <div className="flex items-center justify-center h-9 w-9 bg-indigo-200 rounded-full">
                U
            </div>
            <div className="flex flex-col ml-2">
                <div className="text-left text-sm font-semibold">{friend.name}</div>
                <p className="text-left text-xs text-black">
                    {friend.message}
                </p>
            </div>
        </Link>
    );
}

export default FriendButton;
