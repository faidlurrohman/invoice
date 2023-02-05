<?php

namespace App\Models;

use CodeIgniter\Model;

class JobTypeModel extends Model
{   
    function getJobType(){
        $query = $this->db->query("SELECT * FROM public.job_type_get()");
        return $query->getResult();
    }

    function addJobType($name){
        $query = $this->db->query("SELECT * FROM public.job_type_save('','$name')");
        return $query->getResult();
    }

    function editJobType($id,$name){
        $query = $this->db->query("SELECT * FROM public.job_type_save('$id','$name')");
        return $query->getResult();
    }

    function deleteJobType($id){
        $query = $this->db->query("SELECT * FROM public.job_type_del('$id')");
        return $query->getResult();
    }
}
