import React from 'react';
import FriendButton from './FriendButton';

function ChatSidebar({recentMessages}) {
  return (
    <div className="flex flex-col rounded-2xl p-2 h-5/6 w-64 bg-gray-700 flex-shrink-0">
      <div className="flex flex-col mt-8">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold text-white">Active Conversations</span>
        </div>
        <div className="flex flex-col mt-4 mx-2 h-full overflow-y-auto">
            {recentMessages.map((friend, index) => (
                <FriendButton key={index} friend={friend} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default ChatSidebar;