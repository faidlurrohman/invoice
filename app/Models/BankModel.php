<?php

namespace App\Models;

use CodeIgniter\Model;

class BankModel extends Model
{   
    function getBank(){
        $query = $this->db->query("SELECT * FROM public.bank_get()");
        return $query->getResult();
    }

    function addBank($name,$unique_no){
        $query = $this->db->query("SELECT * FROM public.bank_save('','$name','$unique_no')");
        return $query->getResult();
    }

    function editBank($id,$name,$unique_no){
        $query = $this->db->query("SELECT * FROM public.bank_save('$id','$name','$unique_no')");
        return $query->getResult();
    }

    function deleteBank($id){
        $query = $this->db->query("SELECT * FROM public.bank_del('$id')");
        return $query->getResult();
    }
}
