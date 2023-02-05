<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\JobTypeModel;

class JobType extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    use ResponseTrait;
    public function index()
    {
        $model = new JobTypeModel();
        $data = $model->getJobType();
        return $this->respond($data);
    }

    public function add()
    {
        $name = $this->request->getVar('name');
        $model = new JobTypeModel();
        $model->addJobType($name); 
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Job Type Created'
            ]
        ];
        return $this->respondCreated($response);
    }

    public function edit($id=null)
    {
        $id = $this->request->getVar('id');
        $name = $this->request->getVar('name');
        $model = new JobTypeModel();
        $model->editJobType($id,$name); 
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Job Type Updated'
            ]
        ];
        return $this->respondCreated($response);
    }

    public function remove()
    {
        $id = $this->request->getVar('id');
        $model = new JobTypeModel();
        $model->deleteJobType($id);
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Job Type Deleted'
            ]
        ];
        return $this->respond($response);
    }
}
