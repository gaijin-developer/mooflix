<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    //
    public $fillable = [ 'Title',
    'Year',
    'imdbID',
    'Type' ,
    'Poster'];
}
