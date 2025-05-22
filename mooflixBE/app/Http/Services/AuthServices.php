<?php
namespace App\Http\Services;

use App\Http\Repositories\AuthRepository;
use App\Mail\TokenSent;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;

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

    public function sendPasswordRecoveryEmail(string $email){
        try {
            $tokenString = $this->generatePasswordToken();
            $this->authRepository->setPassRecoveryKey($email,$tokenString);
            $this->sendTokenMail($email,$tokenString);
        } catch (Exception $e) {
            $this->logServices->logError($e->getMessage());
            throw new Exception("Failed to create new Password");
        }
    }

    public function confirmRecoveryCode($code,$email){
        try {
            $dbCode = $this->authRepository->getTokenByEmail($email);

            $codeMatchses = $this->codeMatches($code,$dbCode->token);
            if($codeMatchses){
                return $code;
            }
            throw ValidationException::withMessages([
                'code' => ['The confirmation code is incorrect.'],
            ]);
        } catch(ValidationException $e){
            $this->logServices->logError($e->getMessage());
            throw ValidationException::withMessages([
                'code' => ['The confirmation code is incorrect.'],
            ]);
        }catch (Exception $e) {
            $this->logServices->logError($e->getMessage());
            throw new Exception("verification failed");
        }
    }

    private function generatePasswordToken():int{
        return random_int(100000, 999999);
    }
    private function codeMatches(string $receivedCode,$dbCode):bool{
        $receivedCode = (int)$receivedCode;
        $dbCode = (int)$dbCode;

        return $receivedCode == $dbCode;
    }
    public function setNewPassword($email,$password,$token){
      try {
        $dbCode = $this->authRepository->getTokenByEmail($email);
        $codeMatchses = $this->codeMatches($token,$dbCode->token);
            if($codeMatchses){
                 $this->authRepository->setNewUserPasswordWithEmail($email,$password);
                 return $this->authRepository->deleteTokenByEmail($email);
            }
        throw ValidationException::withMessages([
            'code' => ['The confirmation code is incorrect.'],
        ]);
      } catch (Exception $e) {
        throw new HttpException(500);
      }
    }

    public function sendTokenMail(string $email, string $token){
        return Mail::to($email)->send(new TokenSent($email,$token));
    }

}
