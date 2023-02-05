<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\InvoiceModel;

class Invoice extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    use ResponseTrait;
    public function index()
    {
        $model = new InvoiceModel();
        $data = $model->getInvoice();
        return $this->respond($data);
    }

    public function add()
    {
        $job_id = $this->request->getVar('job_id');
        $bank_id = $this->request->getVar('bank_id');
        $payment = $this->request->getVar('payment');
        $model = new InvoiceModel();
        $model->addInvoice($job_id, $bank_id, $payment); 
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Invoice Created'
            ]
        ];
        return $this->respondCreated($response);
    }

    public function edit($id=null)
    {
        $id = $this->request->getVar('id');
        $job_id = $this->request->getVar('job_id');
        $bank_id = $this->request->getVar('bank_id');
        $payment = $this->request->getVar('payment');
        $model = new InvoiceModel();
        $model->editInvoice($id, $job_id, $bank_id, $payment); 
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Invoice Updated'
            ]
        ];
        return $this->respondCreated($response);
    }

    public function remove()
    {
        $id = $this->request->getVar('id');
        $model = new InvoiceModel();
        $model->deleteInvoice($id);
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Invoice Deleted'
            ]
        ];
        return $this->respond($response);
    }
}
