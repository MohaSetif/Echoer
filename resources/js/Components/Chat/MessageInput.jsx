import { useForm } from '@inertiajs/react';
import TextInput from '../TextInput';

export default function MessageInput({ receiver }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        message: "",
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("chat.store", { receiverId: receiver?.id }));
        reset("message");
    };

    return (
        <div className="fixed bottom-0 w-full bg-white pl-4">
            <form onSubmit={submit}>
                 <TextInput
                        id="message"
                        type="message"
                        name="message"
                        value={data.message}
                        className="mt-1 block w-full"
                        placeholder="Send a message..."
                        isFocused={true}
                        onChange={onHandleChange}
                    />
            </form>
        </div>
    );
}
