<?php

use App\Http\Controllers\FavoritesController;
use App\Http\Controllers\HomeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class,"home"]);
Route::post('/favourites', [FavoritesController::class,"createNew"]);
Route::delete('/favourites/{favId}', [FavoritesController::class,"deleteFavourite"]);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
