<?php

namespace App\Http\Controllers;

use App\Models\FriendRequest;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Repositories\ChatRepository;
use Illuminate\Support\Facades\Redirect;

class MessageController extends Controller
{
    public function __construct(private ChatRepository $chat)
    {
        $this->chat = $chat;
    }

    public function index(Request $request, ?int $receiverId = null)
    {
        $messages = empty($receiverId) ? [] : $this->chat->getUserMessages((int) $request->user()->id, (int) $receiverId);
        
        $aes_key = FriendRequest::where(function($query) use ($receiverId) {
            $query->where('receiver_id', $receiverId)
                ->where('sender_id', auth()->user()->id);
        })
        ->orWhere(function($query) use ($receiverId) {
            $query->where('receiver_id', auth()->user()->id)
                ->where('sender_id', $receiverId);
        })
        ->first();

        return Inertia::render('Chat/chatIndex', [
            'messages' => $messages,
            'recentMessages' => $this->chat->getRecentUsersWithMessage($request->user()->id),
            'receiver' => User::find($receiverId),
            'shared_key' => $aes_key ? $aes_key->shared_key : null
        ]);
    }

    public function store(Request $request, ?int $receiverId = null)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        if (empty($receiverId)) {
            return;
        }

        try {
            $message = $this->chat->sendMessage([
                'sender_id' => (int) $request->user()->id,
                'receiver_id' => $receiverId,
                'message' => $request->message,
            ]);

            event(new \App\Events\messageSent($message));

            return Redirect::route('chat.index', $receiverId);
        } catch (\Throwable $th) {
            return Redirect::route('chat.index', $receiverId);
        }
    }
}
