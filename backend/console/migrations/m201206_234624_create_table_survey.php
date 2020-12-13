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
            'adminId' => $this->integer()->unsigned(),
            'curriculumId' => $this->integer(),
            'groupId' => $this->integer(),
            'disciplineId' => $this->integer(),
            'linkForm' => $this->text(),
            'linkResult' => $this->text(),
            'status' => $this->tinyInteger()->notNull()->defaultValue(Survey::STATUS_OPEN),
            'updatedAt' => $this->integer(),
            'createdAt' => $this->integer()
        ], $this->tableOptions);

        $this->addForeignKey(
            'fk-survey-adminId-id',
            'survey',
            'adminId',
            'auth_admin',
            'id',
            'CASCADE',
            'CASCADE'
        );

        $this->addForeignKey(
            'fk-survey-curriculumId-id',
            'survey',
            'curriculumId',
            'curriculum',
            'id',
            'CASCADE',
            'CASCADE'
        );

        $this->addForeignKey(
            'fk-survey-groupId-id',
            'survey',
            'groupId',
            'group',
            'id',
            'CASCADE',
            'CASCADE'
        );

        $this->addForeignKey(
            'fk-survey-disciplineId-id',
            'survey',
            'disciplineId',
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