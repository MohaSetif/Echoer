import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth, users }) {

    const [sentReq, setSentReq] = useState(false);

    const { data, setData, post } = useForm({
        user_id: ''
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault()
        post(route('send_friend_request'))
        setSentReq(prevState => ({ ...prevState, [data.user_id]: true }));
    };

    const submitCancel = (e) => {
        e.preventDefault()
        post(route('cancel_friend_request'))
        setSentReq(prevState => ({ ...prevState, [data.user_id]: false }));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
                    </div>
                </div>
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-xl font-bold mb-4">User List</h2>
                            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                            <ul>
                                {users.map((user) => (
                                    <li
                                        key={user.id}
                                        className="mb-2 mt-4 pb-2 flow-root [&:not(:last-child)]:border-b border-gray-500/50"
                                    >
                                        <div className="float-left">
                                            <span className="font-bold">Name:</span> {user.name}
                                            <br />
                                            <span className="font-bold">Email:</span> {user.email}
                                        </div>
                                        <div>
                                            {sentReq[user.id] ? (
                                                <form onSubmit={submitCancel}>
                                                    <button
                                                    type='submit'
                                                    name="user_id"
                                                    value={user.id}
                                                    onClick={onHandleChange}
                                                    className="float-right bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full align-left"
                                                    >
                                                        waiting
                                                    </button>
                                                </form>
                                                ) : (
                                                    <form onSubmit={submit}>
                                                        <button
                                                        type='submit'
                                                        name="user_id"
                                                        value={user.id}
                                                        onClick={onHandleChange}
                                                        className="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full align-left"
                                                        >
                                                            Send friend request
                                                        </button>
                                                    </form>
                                                )
                                            }
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