<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Cache;
use App\Models\Black_user;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $ip = request()->ip();
        $blockedUntil = Cache::get('blocked_until_' . $ip);

        if ($blockedUntil && now()->lessThan($blockedUntil)) {
            $remainingTime = $blockedUntil->diffInSeconds(now());
            return Inertia::render('Auth/Register', [
                'blocked' => true,
                'remainingTime' => $remainingTime,
            ]);
        }

        return Inertia::render('Auth/Register', [
            'blocked' => false,
            'remainingTime' => 0,
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): Response
    {
        $ip = $request->ip();
        $key = 'registration_attempts_' . $ip;
        $blockedUntilKey = 'blocked_until_' . $ip;

        $blockedUntil = Cache::get($blockedUntilKey);

        if ($blockedUntil && now()->lessThan($blockedUntil)) {
            $remainingTime = $blockedUntil->diffInSeconds(now());
            return Inertia::render('Auth/Register', [
                'blocked' => true,
                'remainingTime' => $remainingTime,
            ]);
        }

        try {
            $request->validate([
                'name' => 'required|string|max:255|regex:/^[a-zA-Z]+$/',
                'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ], [
                'name.regex' => 'The name must contain only letters and no spaces.'
            ]);
        } catch (ValidationException $e) {
            $attempts = Cache::get($key, 0) + 1;
            Cache::put($key, $attempts, now()->addMinutes(2));

            if ($attempts >= 5) {
                $blockedUntil = now()->addMinutes(5);
                Cache::put($blockedUntilKey, $blockedUntil);
                Black_user::create([
                    'email' => $request->email,
                    'adr' => $ip,
                ]);
                Cache::forget($key);
                return Inertia::render('Auth/Register', [
                    'blocked' => true,
                    'remainingTime' => $blockedUntil->diffInSeconds(now()),
                ]);
            }

            throw $e;
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));
        Auth::login($user);
        Cache::forget($key);

        return Inertia::render('Auth/VerifyEmail');
    }
}
