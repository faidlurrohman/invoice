<?php

namespace App\Models;

use CodeIgniter\Model;

class JobModel extends Model
{
    function getJob(){
        $query = $this->db->query("SELECT * FROM public.job_get()");
        return $query->getResult();
    }

    function addJob($customer_ship_id, $customer_type_id, $customer_code_id, $job_orders){
        $query = $this->db->query("SELECT * FROM public.job_save('','$customer_ship_id','$customer_type_id','$customer_code_id','$job_orders')");
        return $query->getResult();
    }

    function editJob($id, $customer_ship_id, $customer_type_id, $customer_code_id, $job_orders){
        $query = $this->db->query("SELECT * FROM public.job_save('$id','$customer_ship_id','$customer_type_id','$customer_code_id','$job_orders')");
        return $query->getResult();
    }

    function deleteJob($id){
        $query = $this->db->query("SELECT * FROM public.job_del('$id')");
        return $query->getResult();
    }
}
