<?php

namespace App\Http\Controllers;

use App\Models\FriendRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\Message;
use App\Events\messageSent;

class friend_reqController extends Controller
{
    public function index(){
        $friend_requests = FriendRequest::where('receiver_id', auth()->user()->id)->where('status', 'pending')->get();
        $friends = collect([]);
        foreach($friend_requests as $request){
            $friend = User::where('id', $request->sender_id)->first();
            if($friend) {
                $friends->push($friend);
            }
        }
        return Inertia::render('Chat/ChatRequests', [
            'friends' => $friends
        ]);
    }

    public function sendRequest(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id|not_in:' . Auth::id(),
        ]);

        $sender = Auth::user();
        $receiver = User::findOrFail($request->user_id);

        FriendRequest::create([
            'sender_id' => $sender->id,
            'receiver_id' => $receiver->id,
            'status' => 'pending'
        ]);
    }

    public function cancelRequest(Request $request){
        $requestedUser = FriendRequest::where('receiver_id', $request->user_id)->where('sender_id', auth()->user()->id)->first();
        $requestedUser->delete();
    }

    public function acceptRequest(Request $request){
        $friendRequest = FriendRequest::where('sender_id', $request->sender_id)->where('receiver_id', auth()->id())->first();
        if (!$friendRequest) {
            return response()->json(['error' => 'Friend request not found.'], 404);
        }
    
        $receiver = User::where('id', auth()->user()->id)->first();
        $sender = User::where('id', $request->sender_id)->first();
    
        $friendRequest->update([
            'status' => 'accepted'
        ]);
        $message =  Message::create([
            "message" => "", 
            "sender_id" => $sender->id,
            "receiver_id" => $receiver->id,
            'shared_key' => $request->shared_key
        ]);
        messageSent::dispatch($message);
    }
    
}
