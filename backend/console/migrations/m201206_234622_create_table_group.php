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
            'curriculumId' => $this->integer(),
            'updatedAt' => $this->integer(),
            'createdAt' => $this->integer()
        ], $this->tableOptions);

        $this->addForeignKey(
            'fk-group-curriculumId-id',
            'group',
            'curriculumId',
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