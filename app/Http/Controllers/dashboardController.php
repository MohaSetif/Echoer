<?php

namespace App\Http\Controllers;

use App\Models\FriendRequest;
use App\Models\User;
use Inertia\Inertia;

class dashboardController extends Controller
{
    public function index()
    {
        $users = User::where('id', '!=', auth()->id())->get();

        $requested_users = collect([]);
        foreach ($users as $user) {
            $received_request = FriendRequest::where('receiver_id', $user->id)->where('status', 'accepted')->first();
            if ($received_request) {
                $requested_users->push($user);
            }
        }

        $request_senders = collect([]);
        foreach ($users as $user) {
            $sent_request = FriendRequest::where('sender_id', $user->id)->where('receiver_id', auth()->id())->where('status', 'pending')->first();
            if ($sent_request) {
                $request_senders->push($user);
            }
        }

        $users = $users->diff($requested_users)->diff($request_senders);

        return Inertia::render('Dashboard', [
            'users' => $users,
        ]);
    }
}
