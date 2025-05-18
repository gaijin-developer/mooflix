<?php
namespace App\Http\Services;

use Illuminate\Support\Facades\Log;

class LogServices {
    public function logError(string $errorMessage){
        Log::error($errorMessage);
    }
}
