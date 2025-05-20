<?php

namespace App\Http\Repositories;

use App\Models\User;

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
}
