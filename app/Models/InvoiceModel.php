<?php

namespace App\Models;

use CodeIgniter\Model;

class InvoiceModel extends Model
{   
    function getInvoice(){
        $query = $this->db->query("SELECT * FROM public.invoice_get()");
        return $query->getResult();
    }

    function addInvoice($job_id, $bank_id, $payment){
        $query = $this->db->query("SELECT * FROM public.invoice_save('','$job_id', '$bank_id', '$payment')");
        return $query->getResult();
    }

    function editInvoice($id, $job_id, $bank_id, $payment){
        $query = $this->db->query("SELECT * FROM public.invoice_save('$id','$job_id', '$bank_id', '$payment')");
        return $query->getResult();
    }

    function deleteInvoice($id){
        $query = $this->db->query("SELECT * FROM public.invoice_del('$id')");
        return $query->getResult();
    }
}
