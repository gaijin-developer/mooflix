<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FavoritesController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route

Route::get('/movies', [HomeController::class,"home"]);
Route::post('/favourites', [FavoritesController::class,"createNew"]);
Route::delete('/favourites/{favId}', [FavoritesController::class,"deleteFavourite"]);

Route::post('/register', [AuthController::class,"register"]);
Route::post('/likemovie/{imdbID}', [UsersController::class,"likeMovie"])->middleware('auth:api');


///jwt
Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('/login', [AuthController::class,'login']);
    Route::post('/logout', [AuthController::class,'logout']);
    Route::post('/refresh', [AuthController::class,'refresh']);
});


///



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
