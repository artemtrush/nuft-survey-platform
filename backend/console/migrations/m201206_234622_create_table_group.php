<?php

use console\models\Migration;

/**
 * Class m201206_234622_create_table_group
 */
class m201206_234622_create_table_group extends Migration
{
    public function safeUp()
    {
        $this->createTable('{{%group}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(),
            'curriculum_id' => $this->integer(),
            'updated_at' => $this->integer(),
            'created_at' => $this->integer()
        ], $this->tableOptions);

        $this->addForeignKey(
            'fk-group-curriculum_id-id',
            'group',
            'curriculum_id',
            'curriculum',
            'id',
            'CASCADE',
            'CASCADE'
        );
    }

    public function safeDown()
    {
        $this->dropTable('{{%group}}');
    }
}