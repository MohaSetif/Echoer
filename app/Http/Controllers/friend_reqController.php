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
    public function sendRequest(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id|not_in:' . Auth::id(),
        ]);

        $sender = Auth::user();
        $receiver = User::findOrFail($request->user_id);

        $friendRequest = FriendRequest::create([
            'sender_id' => $sender->id,
            'receiver_id' => $receiver->id,
            'sender_pub_key' => $sender->public_key,
        ]);

        return response(200);
    }

    public function acceptRequest($id){
        $friendRequest = FriendRequest::query()->where('id', $id);

        if ($friendRequest->receiver_id !== Auth::user()->id) {
            return Inertia::render('Dashboard', [
                'message' => 'You are not authorized to accept this friend request.',
            ]);
        }

        $receiverPublicKey = Auth::user()->public_key;

        $friendRequest->update([
            'receiver_pub_key' => $receiverPublicKey,
            'accepted_at' => now(),
        ]);

        return Inertia::render('Dashboard', [
            'friendrequest' => $friendRequest,
        ]);
    }
}
