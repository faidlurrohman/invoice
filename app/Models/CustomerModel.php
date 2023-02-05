<?php

namespace App\Models;

use CodeIgniter\Model;

class CustomerModel extends Model
{   
    function getCustomer(){
        $query = $this->db->query("SELECT * FROM public.customer_ship_get()");
        return $query->getResult();
    }

    function addCustomer($name){
        $query = $this->db->query("SELECT * FROM public.customer_ship_save('','$name')");
        return $query->getResult();
    }

    function editCustomer($id,$name){
        $query = $this->db->query("SELECT * FROM public.customer_ship_save('$id','$name')");
        return $query->getResult();
    }

    function deleteCustomer($id){
        $query = $this->db->query("SELECT * FROM public.customer_ship_del('$id')");
        return $query->getResult();
    }
}
