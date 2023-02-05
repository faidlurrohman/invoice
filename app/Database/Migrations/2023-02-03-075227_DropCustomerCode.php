<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class DropCustomerCode extends Migration
{
    public function up()
    {
        $this->forge->dropTable('customer_code');
    }

    public function down()
    {
        $this->forge->dropTable('customer_code');
    }
}
