<?php
namespace App\Http\Services;

use App\Http\Repositories\MovieRepository;
use App\Models\Movie;
use Exception;
use Symfony\Component\HttpKernel\Exception\HttpException;


class MovieServices {

    public function __construct(protected MovieRepository $movieRepository,protected LogServices $logServices){
    }

    public function createNew(array $submittedData):Movie{
        try {
            return $this->movieRepository->createNew($submittedData);
        } catch (Exception $e) {
            $this->logServices->logError($e->getMessage());
            throw new HttpException(500,"Failed to create new movie");
        }
    }

}
