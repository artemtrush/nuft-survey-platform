<?php

use console\models\Migration;

/**
 * Class m201206_234621_create_table_curriculum
 */
class m201206_234621_create_table_curriculum extends Migration
{
    public function safeUp()
    {
        $this->createTable('{{%curriculum}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(),
            'period' => $this->string(),
            'updated_at' => $this->integer(),
            'created_at' => $this->integer()
        ], $this->tableOptions);
    }

    public function safeDown()
    {
        $this->dropTable('{{%curriculum}}');
    }
}