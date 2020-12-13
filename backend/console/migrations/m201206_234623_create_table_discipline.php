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
            'curriculum_id' => $this->integer(),
            'updated_at' => $this->integer(),
            'created_at' => $this->integer()
        ], $this->tableOptions);

        $this->addForeignKey(
            'fk-discipline-curriculum_id-id',
            'discipline',
            'curriculum_id',
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