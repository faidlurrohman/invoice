<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\BankModel;

class Bank extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    use ResponseTrait;
    public function index()
    {
        $model = new BankModel();
        $data = $model->getBank();
        return $this->respond($data);
    }

    public function add()
    {
        $name = $this->request->getVar('name');
        $unique_no = $this->request->getVar('unique_no');
        $model = new BankModel();
        $model->addBank($name,$unique_no); 
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Bank Created'
            ]
        ];
        return $this->respondCreated($response);
    }

    public function edit($id=null)
    {
        $id = $this->request->getVar('id');
        $name = $this->request->getVar('name');
        $unique_no = $this->request->getVar('unique_no');
        $model = new BankModel();
        $model->editBank($id,$name,$unique_no); 
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Bank Updated'
            ]
        ];
        return $this->respondCreated($response);
    }

    public function remove()
    {
        $id = $this->request->getVar('id');
        $model = new BankModel();
        $model->deleteBank($id);
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Bank Deleted'
            ]
        ];
        return $this->respond($response);
    }
}
