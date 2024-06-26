import React from 'react';
import FriendButton from './FriendButton';
import '../../../css/no_scrollbar.css';
import '../../../css/chat_height.css';

function ChatSidebar({ recentMessages }) {
    const isReceivedMessage = (recentMessages) => {
        return recentMessages.length > 0;
    };

    return (
        <div className="flex flex-col border border-slate-100/25 rounded-2xl p-2 side_height max-h-screen w-64 bg-gray-700 flex-shrink-0">
            <span className="font-bold p-2 text-lg text-white">Active Conversations</span>
            <div className="flex flex-col mt-8 h-full overflow-y-auto no_scrollbar">
                <div className="flex flex-row items-center justify-between text-xs"></div>
                <div className="flex flex-col mt-4 mx-2">
                    {isReceivedMessage(recentMessages) ? (
                        recentMessages.map((friend, index) => (
                            <FriendButton key={index} friend={friend} />
                        ))
                    ) : (
                        <div>
                            <h2 className='text-white'>There is no one to chat with.</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChatSidebar;