<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\CustomerModel;

class Customer extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    use ResponseTrait;
    public function index()
    {
        $model = new CustomerModel();
        $data = $model->getCustomer();
        return $this->respond($data);
    }

    public function add()
    {
        $name = $this->request->getVar('name');
        $model = new CustomerModel();
        $model->addCustomer($name); 
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Customer Created'
            ]
        ];
        return $this->respondCreated($response);
    }

    public function edit($id=null)
    {
        $id = $this->request->getVar('id');
        $name = $this->request->getVar('name');
        $model = new CustomerModel();
        $model->editCustomer($id,$name); 
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Customer Updated'
            ]
        ];
        return $this->respondCreated($response);
    }

    public function remove()
    {
        $id = $this->request->getVar('id');
        $model = new CustomerModel();
        $model->deleteCustomer($id);
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Customer Deleted'
            ]
        ];
        return $this->respond($response);
    }
}
