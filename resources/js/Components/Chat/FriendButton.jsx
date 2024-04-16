import React from 'react';

function FriendButton({ friend }) {
    return (
        <button className="flex flex-row items-start justify-start hover:bg-gray-100 rounded-xl p-2">
            <div className="flex items-center justify-center h-9 w-9 bg-indigo-200 rounded-full">
                U
            </div>
            <div className="flex flex-col">
                <div className="mr-6 text-sm font-semibold">{friend.name}</div>
                <p className="ml-2 text-xs text-black">
                    {friend.message}
                </p>
            </div>
        </button>
    );
}

export default FriendButton;