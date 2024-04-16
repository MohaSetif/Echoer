import React from 'react';
import FriendButton from './FriendButton';

function ChatSidebar({recentMessages}) {
  return (
    <div className="flex flex-col rounded-2xl py-8 pl-6 h-5/6 pr-2 w-64 bg-white flex-shrink-0">
      <div className="flex flex-col mt-8">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold">Active Conversations</span>
        </div>
        <div className="flex flex-col space-y-1 mt-4 mx-2 h-full overflow-y-auto">
            {recentMessages.map((friend, index) => (
                <FriendButton key={index} friend={friend} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default ChatSidebar;