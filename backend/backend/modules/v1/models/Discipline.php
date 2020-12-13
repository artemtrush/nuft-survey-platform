<?php

namespace backend\modules\v1\models;

use Yii;
use yii\behaviors\TimestampBehavior;
use yii\db\Expression;

/**
 * This is the model class for table "discipline".
 *
 * @property int $id
 * @property string|null $name
 * @property int|null $curriculumId
 * @property int|null $updatedAt
 * @property int|null $createdAt
 *
 * @property Curriculum $curriculum
 * @property Survey[] $surveys
 */
class Discipline extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'discipline';
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
            [['curriculumId', 'updatedAt', 'createdAt'], 'integer'],
            [['curriculumId', 'name'], 'required'],
            [['name'], 'string', 'max' => 255],
            [['curriculumId'], 'exist', 'skipOnError' => true, 'targetClass' => Curriculum::className(), 'targetAttribute' => ['curriculumId' => 'id']],
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
            'curriculumId' => 'Навчальна програма',
            'updatedAt' => 'Дата редагування',
            'createdAt' => 'Дата створення',
        ];
    }

    /**
     * Gets query for [[Curriculum]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCurriculum()
    {
        return $this->hasOne(Curriculum::className(), ['id' => 'curriculumId']);
    }

    /**
     * Gets query for [[Surveys]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getSurveys()
    {
        return $this->hasMany(Survey::className(), ['disciplineId' => 'id']);
    }

    public static function checkIsset($name, $curriculum_id)
    {
        if ($name && $curriculum_id) {
            if (self::findOne(['name' => $name, 'curriculumId' => $curriculum_id])) {
                return true;
            }
        }
        return false;
    }
}
