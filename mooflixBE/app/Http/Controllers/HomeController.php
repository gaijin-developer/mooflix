<?php

namespace App\Http\Controllers;

use App\Http\Services\HomeServices;
use App\Http\Services\LogServices;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpKernel\Exception\HttpException;
use function Pest\Laravel\json;

class HomeController extends Controller
{
    public $logger;
    public $homeService;

    public function __construct(LogServices $logServies,HomeServices $homeServices) {
        $this->logger = $logServies;
        $this->homeService=$homeServices;
    }
    //
    public function home(){
        try {
            $movies=$this->homeService->getHomeDetails();
            return response()->json($movies,200);
        }catch(HttpException $e){
            response()->json();
        }
        catch (Exception $e) {
            $this->logger->logError($e->getMessage());
            response()->json();
        }

    }
    public function getSearchResults(Request $request){
        try {
            $searchWord = $request->s;
            $movies = $this->homeService->getSearchResults($searchWord);
            return response()->json($movies,200);
        } catch (Exception $e) {
            return response()->json(null,500);
        }
    }

    public function getMovieDetails(Request $request){
        try {
            $movieId = $request->movieId;

            $movieDetails = $this->homeService->getMovieDetails($movieId);

        return response()->json($movieDetails,200);
        } catch (Exception $e) {
            //throw $th;
        }
    }

}
