<?php
namespace App\Http\Repositories;

use Illuminate\Database\Eloquent\Model;

class BaseRepository {
    public $model;
    public function __construct(Model $model) {
        $this->model=$model;
    }

    public function findById(int $id){
        $this->model->findById($id);
    }

    public function findAll(){

    }
}
