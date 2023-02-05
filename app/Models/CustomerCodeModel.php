<?php

namespace App\Models;

use CodeIgniter\Model;

class CustomerCodeModel extends Model
{   
    function getCustomerCode(){
        $query = $this->db->query("SELECT * FROM public.customer_code_get()");
        return $query->getResult();
    }

    function addCustomerCode($name){
        $query = $this->db->query("SELECT * FROM public.customer_code_save('','$name')");
        return $query->getResult();
    }

    function editCustomerCode($id,$name){
        $query = $this->db->query("SELECT * FROM public.customer_code_save('$id','$name')");
        return $query->getResult();
    }

    function deleteCustomerCode($id){
        $query = $this->db->query("SELECT * FROM public.customer_code_del('$id')");
        return $query->getResult();
    }
}
