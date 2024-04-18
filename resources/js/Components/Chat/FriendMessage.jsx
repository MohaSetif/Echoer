import React from 'react'

function Message({message}) {
  return (
    <div className="col-start-6 col-end-13 p-1 rounded-lg">
      <div className="flex flex-row items-center">
          <div className="relative ml-3 text-sm text-white bg-slate-600 py-2 px-4 shadow rounded-xl">
              <div>{message.message}</div>
          </div>
      </div>
    </div>
  )
}

export default Message