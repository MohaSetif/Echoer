import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ChatRequests({ auth, friends }) {
    const { data, setData, post } = useForm({
        sender_id: ''
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
        //console.log(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault()
        post(route('accept_friend_request'))
    };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Chat Requests</h2>}
    >
      <Head title="Chat Requests" />
      <div className="py-12">
        <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h2 className="text-xl font-bold mb-4">Friend Requests List</h2>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
              <ul>
                {friends.map((friend, index) => (
                  <li
                    key={index}
                    className="mb-2 mt-4 flow-root [&:not(:last-child)]:border-b-2 border-gray-400 pb-3"
                  >
                    <div className="float-left">
                      <span className="font-bold">Friend request from: </span> {friend.name}
                    </div>
                    <div className="float-right">
                      <form onSubmit={submit}>
                          <button 
                              type='submit'
                              name="sender_id"
                              value={friend.id}
                              onClick={onHandleChange}
                              className="bg-gray-700 border-solid border-2 border-gray-500 p-2 rounded-xl hover:bg-gray-600">
                              Accept
                          </button>
                      </form>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
