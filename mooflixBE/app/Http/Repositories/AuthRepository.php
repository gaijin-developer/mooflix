<?php

namespace App\Http\Repositories;


use App\Models\User;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


class AuthRepository extends BaseRepository {
    public function __construct(User $user) {
        parent::__construct($user);
    }


    public function createNew(array $registrationData){
        $this->model->create([
            'first_name' => $registrationData['firstName'],
            'last_name' => $registrationData['lastName'],
            'email' => $registrationData['email'],
            'phone' => $registrationData['phone'],
            'password' =>$registrationData['password']
        ]);
    }

    public function setPassRecoveryKey(string $email,string $token){
        return DB::table('password_reset_tokens')->insert([
            'email'=>trim(strtolower($email)),
            'token'=>$token,
            'created_at'=>Date::now()
        ]);
    }



    public function getTokenByEmail($email){
        $email = trim(strtolower($email));
        return DB::table('password_reset_tokens')
            ->where("email",$email)
            ->first();
    }

    public function deleteTokenByEmail($email){
        $email = trim(strtolower($email));
        $token = DB::table('password_reset_tokens')
            ->where("email",$email)
            ->first();
        return $token->delete();
    }

    public function setNewUserPasswordWithEmail($email,$password){
        $user = User::where("email",$email)->first();
        $user->password = $password;
        Log::info($user);
        return $user->save();
    }
}
