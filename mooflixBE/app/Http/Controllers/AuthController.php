<?php

namespace App\Http\Controllers;

use App\Http\Services\AuthServices;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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

        /** @var \Tymon\JWTAuth\JWTGuard $guard */
        $guard = auth();
        if (! $token = $guard->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }
    public function logout(){
        /** @var \Tymon\JWTAuth\JWTGuard $guard */
        $guard = auth();
        $guard->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        /** @var \Tymon\JWTAuth\JWTGuard $guard */
        $guard = auth();
        return $this->respondWithToken($guard->refresh());
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */



    protected function respondWithToken($token)
    {
        /** @var \Tymon\JWTAuth\JWTGuard $guard */
            $guard = auth();
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $guard->factory()->getTTL() * 60
        ]);
    }
}
