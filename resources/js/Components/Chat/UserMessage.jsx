import React from 'react'

function FriendMessage({ message }) {

  const createdAt = new Date(message.created_at);
  const year = createdAt.getFullYear();
  const month = ('0' + (createdAt.getMonth() + 1)).slice(-2);
  const day = ('0' + createdAt.getDate()).slice(-2);
  const hours = ('0' + createdAt.getHours()).slice(-2);
  const minutes = ('0' + createdAt.getMinutes()).slice(-2);
  
  const chatHour = `${hours}:${minutes}`;
  const chatDay = `${day}/${month}/${year}`;

  return (
    <div className="col-start-1 col-end-8 p-1 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="relative ml-3 text-sm text-white bg-slate-500 max-w-md py-2 px-4 shadow rounded-xl break-words">
        <div className='text-base'>{message.message}</div>
          <div className='text-xs text-white/50 flex items-center justify-start flex-row-reverse'>{chatHour}</div>
        </div>
      </div>
    </div>
  )
}

export default FriendMessage