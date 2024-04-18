import React, { Fragment, useRef, useEffect } from 'react'
import MessageInput from './MessageInput';
import UserMessage from './UserMessage';
import FriendMessage from './FriendMessage';

function ChatBox({ messages, auth_id }) {
  const isReceivedMessage = (message) => {
    if (message.receiver_id == auth_id) {
      return true;
    } else {
      return false;
    }
  }

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [messages]);

  return (
    <div className="flex flex-col flex-auto h-5/6 pl-6">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-700 h-full p-4 overflow-y-auto">
        <div className="flex flex-col h-full">
          <div className="grid grid-cols-12 gap-x-4">
            {(messages || []).map((message, index) => (
              <Fragment key={index}>
                {isReceivedMessage(message) ? (
                  <div className="col-start-1 col-end-9">
                    <FriendMessage message={message} />
                  </div>
                ) : (
                  <div className="col-start-4 col-end-13">
                    <UserMessage message={message} />
                  </div>
                )}
              </Fragment>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatBox