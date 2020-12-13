<?php

namespace backend\modules\v1\models;

use Yii;
use yii\behaviors\TimestampBehavior;
use yii\db\Expression;

/**
 * This is the model class for table "survey".
 *
 * @property int $id
 * @property int|null $adminId
 * @property int|null $curriculumId
 * @property int|null $groupId
 * @property int|null $disciplineId
 * @property string|null $linkForm
 * @property string|null $linkResult
 * @property int $status
 * @property int|null $updatedAt
 * @property int|null $createdAt
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
            [['adminId', 'curriculumId', 'groupId', 'disciplineId', 'status', 'updatedAt', 'createdAt'], 'integer'],
            [['linkForm', 'linkResult'], 'string'],
            [['curriculumId', 'groupId', 'disciplineId'], 'required'],
            [['adminId'], 'exist', 'skipOnError' => true, 'targetClass' => AuthAdmin::className(), 'targetAttribute' => ['adminId' => 'id']],
            [['curriculumId'], 'exist', 'skipOnError' => true, 'targetClass' => Curriculum::className(), 'targetAttribute' => ['curriculumId' => 'id']],
            [['disciplineId'], 'exist', 'skipOnError' => true, 'targetClass' => Discipline::className(), 'targetAttribute' => ['disciplineId' => 'id']],
            [['groupId'], 'exist', 'skipOnError' => true, 'targetClass' => Group::className(), 'targetAttribute' => ['groupId' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'adminId' => 'ID викладача',
            'curriculumId' => 'Навчальна програма',
            'groupId' => 'Група',
            'disciplineId' => 'Дисциплына',
            'linkForm' => 'Посилання на форму',
            'linkResult' => 'Посилання на результати',
            'status' => 'Статус',
            'updatedAt' => 'Дата редагування',
            'createdAat' => 'Дата створення',
        ];
    }

    /**
     * Gets query for [[Admin]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getAdmin()
    {
        return $this->hasOne(AuthAdmin::className(), ['id' => 'adminId']);
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
     * Gets query for [[Discipline]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getDiscipline()
    {
        return $this->hasOne(Discipline::className(), ['id' => 'disciplineId']);
    }

    /**
     * Gets query for [[Group]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getGroup()
    {
        return $this->hasOne(Group::className(), ['id' => 'groupId']);
    }

    public static function checkIsset($curriculum_id, $group_id, $discipline_id)
    {
        if ($curriculum_id && $group_id && $discipline_id) {
            if (self::findOne(['curriculumId' => $curriculum_id, 'groupId' => $group_id, 'disciplineId' => $discipline_id])) {
                return true;
            }
        }
        return false;
    }

    public function getStatusLabel()
    {
        switch ($this->status) {
            case self::STATUS_OPEN:
                return 'OPENED';
                break;
            case self::STATUS_CLOSE:
                return 'CLOSED';
                break;
        }
        return '';
    }

    public function surveyTeacherData()
    {
        return [
            'id' => $this->id,
            'curriculumId' => $this->curriculumId,
            'groupId' => $this->groupId,
            'disciplineId' => $this->disciplineId,
            'linkForm' => $this->linkForm,
            'status' => $this->getStatusLabel()
        ];
    }

    public function surveyAdminData()
    {
        return [
            'id' => $this->id,
            'curriculumId' => $this->curriculumId,
            'groupId' => $this->groupId,
            'disciplineId' => $this->disciplineId,
            'linkForm' => $this->linkForm,
            'linkResult' => $this->linkResult,
            'status' => $this->getStatusLabel()
        ];
    }
}
