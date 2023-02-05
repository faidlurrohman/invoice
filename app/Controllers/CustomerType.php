<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\CustomerTypeModel;

class CustomerType extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    use ResponseTrait;
    public function index()
    {
        $model = new CustomerTypeModel();
        $data = $model->getCustomerType();
        return $this->respond($data);
    }

    public function add()
    {
        $name = $this->request->getVar('name');
        $model = new CustomerTypeModel();
        $model->addCustomerType($name); 
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Customer Type Created'
            ]
        ];
        return $this->respondCreated($response);
    }

    public function edit($id=null)
    {
        $id = $this->request->getVar('id');
        $name = $this->request->getVar('name');
        $model = new CustomerTypeModel();
        $model->editCustomerType($id,$name); 
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Customer Type Updated'
            ]
        ];
        return $this->respondCreated($response);
    }

    public function remove()
    {
        $id = $this->request->getVar('id');
        $model = new CustomerTypeModel();
        $model->deleteCustomerType($id);
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Customer Type Deleted'
            ]
        ];
        return $this->respond($response);
    }
}
