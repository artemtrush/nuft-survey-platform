<?php

namespace backend\modules\v1\models;

use Yii;
use yii\behaviors\TimestampBehavior;
use yii\db\Expression;

/**
 * This is the model class for table "curriculum".
 *
 * @property int $id
 * @property string|null $name
 * @property string|null $period
 * @property int|null $updatedAt
 * @property int|null $createdAt
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

    public function behaviors()
    {
        return [
            [
                'class' => TimestampBehavior::className(),
                'createdAtAttribute' => 'createdAt',
                'updatedAtAttribute' => 'updatedAt',
                'value' => time(),
            ],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['updatedAt', 'createdAt'], 'integer'],
            [['name', 'period'], 'required'],
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
            'name' => 'Назва',
            'period' => 'Період',
            'updatedAt' => 'Дата редагування',
            'createdAt' => 'Дата створення',
        ];
    }

    /**
     * Gets query for [[Disciplines]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getDisciplines()
    {
        return $this->hasMany(Discipline::className(), ['curriculumId' => 'id']);
    }

    /**
     * Gets query for [[Groups]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getGroups()
    {
        return $this->hasMany(Group::className(), ['curriculumId' => 'id']);
    }

    /**
     * Gets query for [[Surveys]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getSurveys()
    {
        return $this->hasMany(Survey::className(), ['curriculumId' => 'id']);
    }

    public static function checkIsset($name, $period)
    {
        if ($name && $period) {
            if (self::findOne(['name' => $name, 'period' => $period])) {
                return true;
            }
        }
        return false;
    }
}
