<?php

namespace App\Http\Controllers;

use App\Http\Services\HomeServices;
use App\Http\Services\LogServices;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpKernel\Exception\HttpException;

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
}
