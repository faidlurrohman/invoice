<?php

namespace App\Models;

use CodeIgniter\Model;

class CustomerTypeModel extends Model
{   
    function getCustomerType(){
        $query = $this->db->query("SELECT * FROM public.customer_type_get()");
        return $query->getResult();
    }

    function addCustomerType($name){
        $query = $this->db->query("SELECT * FROM public.customer_type_save('','$name')");
        return $query->getResult();
    }

    function editCustomerType($id,$name){
        $query = $this->db->query("SELECT * FROM public.customer_type_save('$id','$name')");
        return $query->getResult();
    }

    function deleteCustomerType($id){
        $query = $this->db->query("SELECT * FROM public.customer_type_del('$id')");
        return $query->getResult();
    }
}
