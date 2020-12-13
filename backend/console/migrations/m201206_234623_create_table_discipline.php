<?php

use console\models\Migration;

/**
 * Class m201206_234623_create_table_discipline
 */
class m201206_234623_create_table_discipline extends Migration
{
    public function safeUp()
    {
        $this->createTable('{{%discipline}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(),
            'curriculumId' => $this->integer(),
            'updatedAt' => $this->integer(),
            'createdAt' => $this->integer()
        ], $this->tableOptions);

        $this->addForeignKey(
            'fk-discipline-curriculumId-id',
            'discipline',
            'curriculumId',
            'curriculum',
            'id',
            'CASCADE',
            'CASCADE'
        );
    }

    public function safeDown()
    {
        $this->dropTable('{{%discipline}}');
    }
}