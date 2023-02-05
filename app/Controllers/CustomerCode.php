<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\CustomerCodeModel;

class CustomerCode extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    use ResponseTrait;
    public function index()
    {
        $model = new CustomerCodeModel();
        $data = $model->getCustomerCode();
        return $this->respond($data);
    }

    public function add()
    {
        $name = $this->request->getVar('name');
        $model = new CustomerCodeModel();
        $model->addCustomerCode($name); 
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Customer Code Created'
            ]
        ];
        return $this->respondCreated($response);
    }

    public function edit($id=null)
    {
        $id = $this->request->getVar('id');
        $name = $this->request->getVar('name');
        $model = new CustomerCodeModel();
        $model->editCustomerCode($id,$name); 
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Customer Code Updated'
            ]
        ];
        return $this->respondCreated($response);
    }

    public function remove()
    {
        $id = $this->request->getVar('id');
        $model = new CustomerCodeModel();
        $model->deleteCustomerCode($id);
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Customer Code Deleted'
            ]
        ];
        return $this->respond($response);
    }
}
