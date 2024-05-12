import React from 'react';

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
    <div className="col-start-6 col-end-13 p-1 rounded-lg">
      <div className="flex flex-row items-center">
        <div className="relative ml-3 text-sm text-white bg-slate-600 py-2 px-4 w-48 shadow rounded-xl break-words">
          <div className='text-base'>{message.message}</div>
          <div className='text-xs text-white/50'>{chatHour}</div>
        </div>
      </div>
    </div>
  );
}

export default FriendMessage;
