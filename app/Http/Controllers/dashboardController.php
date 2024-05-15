<?php

namespace App\Http\Controllers;

use App\Models\FriendRequest;
use App\Models\User;
use Inertia\Inertia;

class dashboardController extends Controller
{
    public function index()
    {
        $users = User::where('id', '!=', auth()->user()->id)->get();
        return Inertia::render('Dashboard', [
            'users' => $users,
        ]);
    }
}
