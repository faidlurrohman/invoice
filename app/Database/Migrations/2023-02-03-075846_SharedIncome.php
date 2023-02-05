<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class SharedIncome extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'unsigned' => TRUE,
                'auto_increment' => TRUE
            ],
            'name' => [
                'type' => 'VARCHAR',
                'constraint' => 128,
                'null' => FALSE,
            ],
            'value' => [
                'type' => 'VARCHAR',
                'constraint' => 128,
                'null' => FALSE,
            ],
            'created_at' => [
                'type' => 'TIMESTAMP',
                'null' => TRUE
            ],
            'updated_at' => [
                'type' => 'TIMESTAMP',
                'null' => TRUE
            ]
        ]);

        $this->forge->addKey('id', TRUE);
        $this->forge->createTable('shared_income');
    }

    public function down()
    {
        $this->forge->dropTable('shared_income');
    }
}
