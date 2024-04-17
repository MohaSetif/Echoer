import React, { Fragment } from 'react'
import MessageInput from './MessageInput';
import FriendMessage from './FriendMessage';
import Message from './Message';

function ChatBox({messages, auth_id}) {

  const isReceivedMessage = (message) => {
    if(message.receiver_id == auth_id){
        return true;
    }
    else{
        return false;
    }
  }

  messages.forEach(message => {
    console.log(isReceivedMessage(message))
  });

  return (
    <div className="flex flex-col flex-auto h-5/6 pl-6">
        <div
        className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
        >
        <div className="flex flex-col h-full overflow-x-auto mb-4">
            <div className="flex flex-col h-full">
            <div className="grid grid-cols-12 gap-y-2">
            {
                (messages || []).map((message, index) => (
                    <Fragment key={index}>
                        {
                            isReceivedMessage(message) ? (
                                <Message message={message}/>
                            ) : (
                                <FriendMessage message={message} />
                            )
                        }
                    </Fragment>
                ))
            }

            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default ChatBox