<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\JobModel;

class Job extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    use ResponseTrait;
    public function index()
    {
        $model = new JobModel();
        $data = $model->getJob();
        return $this->respond($data);
    }

    public function add()
    {
        $customer_ship_id = $this->request->getVar('customer_ship_id');
        $customer_type_id = $this->request->getVar('customer_type_id');
        $customer_code_id = $this->request->getVar('customer_code_id');
        $job_orders = $this->request->getVar('job_orders');
        $model = new JobModel();
        $model->addJob($customer_ship_id, $customer_type_id, $customer_code_id, $job_orders); 
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Job Created'
            ]
        ];
        return $this->respondCreated($response);
    }

    public function edit($id=null)
    {
        $id = $this->request->getVar('id');
        $customer_ship_id = $this->request->getVar('customer_ship_id');
        $customer_type_id = $this->request->getVar('customer_type_id');
        $customer_code_id = $this->request->getVar('customer_code_id');
        $job_orders = $this->request->getVar('job_orders');
        $model = new JobModel();
        $model->editJob($id, $customer_ship_id, $customer_type_id, $customer_code_id, $job_orders); 
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Job Updated'
            ]
        ];
        return $this->respondCreated($response);
    }

    public function remove()
    {
        $id = $this->request->getVar('id');
        $model = new JobModel();
        $model->deleteJob($id);
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Job Deleted'
            ]
        ];
        return $this->respond($response);
    }
}
