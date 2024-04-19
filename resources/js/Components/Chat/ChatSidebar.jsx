import React from 'react';
import FriendButton from './FriendButton';

function ChatSidebar({ recentMessages }) {
  return (
    <div className="flex flex-col border border-gray-100/50 rounded-2xl p-2 h-5/6 max-h-screen w-64 bg-gray-700 flex-shrink-0">
      <span className="font-bold text-white">Active Conversations</span>
      <div className="flex flex-col mt-8 h-full overflow-y-auto">
        <div className="flex flex-row items-center justify-between text-xs">
        </div>
        <div className="flex flex-col mt-4 mx-2">
          {recentMessages.map((friend, index) => (
            <FriendButton key={index} friend={friend} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatSidebar;