<?php
namespace App\Http\Services;

use App\Http\Repositories\AuthRepository;
use Exception;
use Illuminate\Support\Facades\Log;

class AuthServices {
    public function __construct(protected AuthRepository $authRepository,protected LogServices $logServices) {

    }
    public function register(array $registerationData){
        try {
            return $this->authRepository->createNew($registerationData);
        } catch (Exception $e) {
            $this->logServices->logError($e->getMessage());
            throw new Exception();
        }
    }
}
