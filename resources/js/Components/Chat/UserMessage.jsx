import React from 'react'

function FriendMessage({ message }) {
  return (
    <div className="col-start-1 col-end-8 p-1 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="relative ml-3 text-sm text-white bg-slate-500 max-w-md py-2 px-4 shadow rounded-xl break-words">
          <div>{message.message}</div>
        </div>
      </div>
    </div>
  )
}

export default FriendMessage