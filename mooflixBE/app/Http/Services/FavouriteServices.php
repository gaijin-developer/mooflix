<?php
namespace App\Http\Services;

use App\Http\Controllers\MoviesController;
use App\Http\Repositories\FavouriteRepository;
use App\Models\User;
use Exception;
use Symfony\Component\HttpKernel\Exception\HttpException;

class FavouriteServices {
    public $favoriteRepo;
    public $movieService;

    public function __construct(FavouriteRepository $favoriteRepo,MovieRep){
        $this->favoriteRepo = $favoriteRepo;
    }

    public function createNew(Movie $movie,array $sumbittedData,User $user){
        try {
            $this->favoriteRepo->createNew($sumbittedData);
        } catch (Exception $e) {
            throw new HttpException(500,"Failed to create new movie");
        }
    }

}
