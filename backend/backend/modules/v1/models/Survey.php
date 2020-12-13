<?php

namespace backend\modules\v1\models;

use Yii;
use yii\behaviors\TimestampBehavior;

/**
 * This is the model class for table "survey".
 *
 * @property int $id
 * @property int|null $admin_id
 * @property int|null $curriculum_id
 * @property int|null $group_id
 * @property int|null $discipline_id
 * @property string|null $form_href
 * @property int $status
 * @property int|null $updated_at
 * @property int|null $created_at
 *
 * @property AuthAdmin $admin
 * @property Curriculum $curriculum
 * @property Discipline $discipline
 * @property Group $group
 */
class Survey extends \yii\db\ActiveRecord
{
    const STATUS_OPEN = 1;
    const STATUS_CLOSE = 3;

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'survey';
    }

    public function behaviors()
    {
        return [
            [
                'class' => TimestampBehavior::className()
            ],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['admin_id', 'curriculum_id', 'group_id', 'discipline_id', 'status', 'updated_at', 'created_at'], 'integer'],
            [['form_href'], 'string'],
            [['curriculum_id', 'group_id', 'discipline_id'], 'required'],
            [['admin_id'], 'exist', 'skipOnError' => true, 'targetClass' => AuthAdmin::className(), 'targetAttribute' => ['admin_id' => 'id']],
            [['curriculum_id'], 'exist', 'skipOnError' => true, 'targetClass' => Curriculum::className(), 'targetAttribute' => ['curriculum_id' => 'id']],
            [['discipline_id'], 'exist', 'skipOnError' => true, 'targetClass' => Discipline::className(), 'targetAttribute' => ['discipline_id' => 'id']],
            [['group_id'], 'exist', 'skipOnError' => true, 'targetClass' => Group::className(), 'targetAttribute' => ['group_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'admin_id' => 'Admin ID',
            'curriculum_id' => 'Curriculum ID',
            'group_id' => 'Group ID',
            'discipline_id' => 'Discipline ID',
            'form_href' => 'Form Href',
            'status' => 'Status',
            'updated_at' => 'Updated At',
            'created_at' => 'Created At',
        ];
    }

    /**
     * Gets query for [[Admin]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getAdmin()
    {
        return $this->hasOne(AuthAdmin::className(), ['id' => 'admin_id']);
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
     * Gets query for [[Discipline]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getDiscipline()
    {
        return $this->hasOne(Discipline::className(), ['id' => 'discipline_id']);
    }

    /**
     * Gets query for [[Group]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getGroup()
    {
        return $this->hasOne(Group::className(), ['id' => 'group_id']);
    }

    public static function checkIsset($curriculum_id, $group_id, $discipline_id)
    {
        if ($curriculum_id && $group_id && $discipline_id) {
            if (self::findOne(['curriculum_id' => $curriculum_id, 'group_id' => $group_id, 'discipline_id' => $discipline_id])) {
                return true;
            }
        }
        return false;
    }
}
