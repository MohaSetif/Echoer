<?php

namespace App\Http\Controllers;

use App\Models\FriendRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

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
            'sender_pub_key' => $sender->public_key,
            'status' => 'pending'
        ]);
    }

    public function cancelRequest(Request $request){
        $requestedUser = FriendRequest::where('receiver_id', $request->user_id)->where('sender_id', auth()->user()->id)->first();
        $requestedUser->delete();
    }

    public function acceptRequest(Request $request){
        $friendRequest = FriendRequest::where('receiver_id', $request->receiver_id)->first();
    
        if (!$friendRequest) {
            return response()->json(['error' => 'Friend request not found.'], 404);
        }
    
        $receiver = User::find($friendRequest->receiver_id);
        $sender = User::find(Auth::user());

        $senderPublicKey = $sender->public_key;
        $receiverPublicKey = $receiver->public_key;
    
        // Swap public keys
        $temp = $senderPublicKey;
        $senderPublicKey = $receiverPublicKey;
        $receiverPublicKey = $temp;
    
        $sender->update([
            'public_key' => $receiverPublicKey
        ]);
    
        $receiver->update([
            'public_key' => $senderPublicKey
        ]);
    
        $friendRequest->update([
            'receiver_pub_key' => $receiverPublicKey,
            'status' => 'accepted',
        ]);
    
        return response()->json(['message' => 'Friend request accepted successfully.'], 200);
    }
    
}
