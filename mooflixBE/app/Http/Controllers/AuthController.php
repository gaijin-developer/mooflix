<?php

namespace App\Http\Controllers;

use App\Http\Services\AuthServices;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

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

    public function sendPasswordRecoveryCode(Request $request){
        try {
            $email = $request['email'];
            $this->authServices->sendPasswordRecoveryEmail($email);
            return response()->json("Token created and is valid for 30 mins",200);
        } catch (ValidationException $e) {
            return response()->json("Validation keys do not match",422);
        }catch(Exception $e){
            return response()->json("Failed to verify token",500);
        }
    }

    public function confirmRecoveryCode(Request $request){
        try{
            $code = $request["code"];
            $email = $request["email"];
            $token = $this->authServices->confirmRecoveryCode($code,$email);
            return response()->json(["reset_token"=>$token],200);
        }catch(Exception $e){
            return response()->json("failed",500);
        }
    }

    public function setNewPassword(Request $request): JsonResponse{
        try {
            $email = $request["email"];
        $password = $request["password"];
        $token = $request["resetToken"];
        $this->authServices->setNewPassword($email,$password,$token);
        return response()->json("Password Reset successfully",200);
        } catch (Exception $e) {
            return response()->json("failed to set new password",500);
        }
    }

}
