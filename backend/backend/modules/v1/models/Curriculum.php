<?php

namespace backend\modules\v1\models;

use Yii;

/**
 * This is the model class for table "curriculum".
 *
 * @property int $id
 * @property string|null $name
 * @property string|null $period
 * @property int|null $updated_at
 * @property int|null $created_at
 *
 * @property Discipline[] $disciplines
 * @property Group[] $groups
 * @property Survey[] $surveys
 */
class Curriculum extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'curriculum';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['updated_at', 'created_at'], 'integer'],
            [['name', 'period'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'period' => 'Period',
            'updated_at' => 'Updated At',
            'created_at' => 'Created At',
        ];
    }

    /**
     * Gets query for [[Disciplines]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getDisciplines()
    {
        return $this->hasMany(Discipline::className(), ['curriculum_id' => 'id']);
    }

    /**
     * Gets query for [[Groups]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getGroups()
    {
        return $this->hasMany(Group::className(), ['curriculum_id' => 'id']);
    }

    /**
     * Gets query for [[Surveys]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getSurveys()
    {
        return $this->hasMany(Survey::className(), ['curriculum_id' => 'id']);
    }
}
