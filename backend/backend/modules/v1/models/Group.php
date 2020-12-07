<?php

namespace backend\modules\v1\models;

use Yii;

/**
 * This is the model class for table "group".
 *
 * @property int $id
 * @property string|null $name
 * @property int|null $curriculum_id
 * @property int|null $updated_at
 * @property int|null $created_at
 *
 * @property Curriculum $curriculum
 * @property Survey[] $surveys
 */
class Group extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'group';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['curriculum_id', 'updated_at', 'created_at'], 'integer'],
            [['name'], 'string', 'max' => 255],
            [['curriculum_id'], 'exist', 'skipOnError' => true, 'targetClass' => Curriculum::className(), 'targetAttribute' => ['curriculum_id' => 'id']],
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
            'curriculum_id' => 'Curriculum ID',
            'updated_at' => 'Updated At',
            'created_at' => 'Created At',
        ];
    }

    /**
     * Gets query for [[Curriculum]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCurriculum()
    {
        return $this->hasOne(Curriculum::className(), ['id' => 'curriculum_id']);
    }

    /**
     * Gets query for [[Surveys]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getSurveys()
    {
        return $this->hasMany(Survey::className(), ['group_id' => 'id']);
    }
}
