<?php
namespace App\Http\Services;

use App\Http\Repositories\HomeRepository;

use Exception;
use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpKernel\Exception\HttpException;

class HomeServices {
    public function __construct(protected HomeRepository $homeRepository,protected LogServices $logServices){

    }
    public function getHomeDetails():array{
        try {
            return $this->homeRepository->getMovies();
        } catch (Exception $e) {
            throw new HttpException($e->getMessage()."failed to fetch details");
        }
    }

    public function getSearchResults($searchWord){
        try {
            return $this->homeRepository->getSearchedMovie($searchWord);
        } catch (Exception $e) {
            $this->logServices->logError($e->getMessage());

            throw new HttpException(500);
        }
    }
}
