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
    <div className="flex justify-center ml-6 p-2 rounded-b-2xl bottom-0 max-w-7xl mx-auto bg-slate-600">
      <form onSubmit={submit} className="w-full max-w-2xl">
        <TextInput
          id="message"
          type="message"
          name="message"
          value={data.message}
          className="mt-1 block w-full p-2.5 outline-none"
          placeholder="Send a message..."
          isFocused={true}
          onChange={onHandleChange}
        />
      </form>
    </div>
  );
}