<?php

use App\Http\Controllers\FavoritesController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route

Route::get('/', [HomeController::class,"home"]);
Route::post('/favourites', [FavoritesController::class,"createNew"]);
Route::delete('/favourites/{favId}', [FavoritesController::class,"deleteFavourite"]);

Route::post('/register', [UsersController::class,"register"]);



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
