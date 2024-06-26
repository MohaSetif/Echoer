<?php

use App\Http\Controllers\dashboardController;
use App\Http\Controllers\friend_reqController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MessageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware('blacklist');

Route::get('/dashboard', [dashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('chat', [MessageController::class, 'index'])->name('chat.index');
    Route::get('requests', [friend_reqController::class, 'index'])->name('chat.requests');

    Route::post('/send_friend_request', [friend_reqController::class, 'sendRequest'])->name('send_friend_request');
    Route::post('/accept_friend_request', [friend_reqController::class, 'acceptRequest'])->name('accept_friend_request');
    Route::post('/cancel_friend_request', [friend_reqController::class, 'cancelRequest'])->name('cancel_friend_request');

    Route::group(['prefix' => 'chat', 'as' => 'chat.'], function() {
        Route::get('/{receiverId?}', [MessageController::class, 'index'])->name('index');
        Route::post('/{receiverId?}', [MessageController::class, 'store'])->name('store');
    });
});

require __DIR__.'/auth.php';
