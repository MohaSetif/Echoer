<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Events\messageSent;
use App\Models\Message;

class SendMessage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:message';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'send a test message';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $message =  Message::create([
            "message" => "somthing", 
            "sender_id" => 2,
            "receiver_id" => 3
        ]);
        messageSent::dispatch($message);
    }
}
