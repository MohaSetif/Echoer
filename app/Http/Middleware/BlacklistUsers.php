<?php

namespace App\Http\Middleware;

use App\Models\Black_user;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;

class BlacklistUsers
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    private $maxAttempts = 5;
    private $decayMinutes = 5;

    public function handle(Request $request, Closure $next)
    {
        $key = 'registration_attempts.' . $request->ip();
        $attempts = Cache::get($key, 0);

        if ($attempts >= $this->maxAttempts) {
            $remainingMinutes = Cache::get($key . '.decay', 0);

            if ($remainingMinutes > 0) {
                throw new HttpException(429, 'Too Many Attempts. Please try again in ' . $remainingMinutes . ' minutes.');
            } else {
                Cache::put($key . '.decay', $this->decayMinutes, now()->addMinutes($this->decayMinutes));
            }
        } else {
            Cache::forget($key . '.decay');
        }

        try {
            $response = $next($request);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Cache::increment($key);
            throw $e;
        }

        return $response;
    }
}