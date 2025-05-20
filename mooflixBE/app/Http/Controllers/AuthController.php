<?php

namespace App\Http\Controllers;

use App\Http\Services\AuthServices;
use Exception;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(protected AuthServices $authServices) {
    }
    //
    public function register(Request $request){
        try {
            $result = $this->authServices->register($request->all());
            return response()->json(["route"=>"registering"],200);
        } catch (Exception $e) {
            return response()->json(["status"=>false,"message"=>"Failed to register new user"],500);
        }
    }

    public function login(){
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }
    public function logout(){
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me(){
        return response()->json(auth()->user());
    }



    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
