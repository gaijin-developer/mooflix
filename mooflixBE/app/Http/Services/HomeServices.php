<?php
namespace App\Http\Services;

use App\Http\Repositories\HomeRepository;
use ErrorException;
use Exception;
use Illuminate\Database\Eloquent\Casts\Json;
use Symfony\Component\HttpKernel\Exception\HttpException;

class HomeServices {
    public $homeRepository;
    public function __construct(HomeRepository $homeRepository){
        $this->homeRepository = $homeRepository;
    }
    public function getHomeDetails():array{
        try {
            return $this->homeRepository->getMovies();
        } catch (Exception $e) {
            throw new HttpException($e->getMessage()."failed to fetch details");
        }
    }
}
