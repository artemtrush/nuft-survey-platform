<?php

use console\models\Migration;
use backend\modules\v1\models\Survey;

/**
 * Class m201206_234624_create_table_survey
 */
class m201206_234624_create_table_survey extends Migration
{
    public function safeUp()
    {
        $this->createTable('{{%survey}}', [
            'id' => $this->primaryKey(),
            'admin_id' => $this->integer()->unsigned(),
            'curriculum_id' => $this->integer(),
            'group_id' => $this->integer(),
            'discipline_id' => $this->integer(),
            'form_href' => $this->text(),
            'status' => $this->tinyInteger()->notNull()->defaultValue(Survey::STATUS_OPEN),
            'updated_at' => $this->integer(),
            'created_at' => $this->integer()
        ], $this->tableOptions);

        $this->addForeignKey(
            'fk-survey-admin_id-id',
            'survey',
            'admin_id',
            'auth_admin',
            'id',
            'CASCADE',
            'CASCADE'
        );

        $this->addForeignKey(
            'fk-survey-curriculum_id-id',
            'survey',
            'curriculum_id',
            'curriculum',
            'id',
            'CASCADE',
            'CASCADE'
        );

        $this->addForeignKey(
            'fk-survey-group_id-id',
            'survey',
            'group_id',
            'group',
            'id',
            'CASCADE',
            'CASCADE'
        );

        $this->addForeignKey(
            'fk-survey-discipline_id-id',
            'survey',
            'discipline_id',
            'discipline',
            'id',
            'CASCADE',
            'CASCADE'
        );
    }

    public function safeDown()
    {
        $this->dropTable('{{%survey}}');
    }
}