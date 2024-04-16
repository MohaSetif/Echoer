import React from 'react'

function Message({user}) {
  return (
    <div className="flex flex-row items-center">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
            {user.picture}
        </div>
        <div className="relative ml-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
            <div>{user.message}</div>
        </div>
    </div>
  )
}

export default Message