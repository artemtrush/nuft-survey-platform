<?php

namespace backend\modules\v1\models;

use backend\models\Admin;
use backend\models\AuthAssignment;
use backend\modules\v1\src\behavior\AuthRole;
use yii\behaviors\TimestampBehavior;
use yii\helpers\ArrayHelper;

/**
 * Class AuthAdmin
 * @package backend\modules\admin\models
 *
 * @property int $id
 * @property string $lastName
 * @property string $firstName
 * @property string $middleName
 * @property string $phone
 * @property string $email
 * @property string $status
 * @property string $passwordToken
 * @property string $passwordResetToken
 * @property string $confirmationCode
 * @property string $createdAt
 * @property string $updatedAt
 */
class AuthAdmin extends \yii\db\ActiveRecord
{
    public $role;
    public $password;
    public $passwordRepeat;
    public $newPassword;
    public $newPasswordRepeat;

    const SCENARIO_CREATE = 'create';
    const SCENARIO_UPDATE = 'update';

    public static function tableName()
    {
        return 'auth_admin';
    }

    public function behaviors()
    {
        return [
            [
                'class' => AuthRole::className(),
            ],
            [
                'class' => TimestampBehavior::className(),
                'createdAtAttribute' => 'createdAt',
                'updatedAtAttribute' => 'updatedAt',
                'value' => time(),
            ],
        ];
    }

    public function scenarios()
    {
        $scenarios = parent::scenarios();
        $scenarios[self::SCENARIO_CREATE] = ['email', 'password', 'passwordRepeat', 'role', 'status', 'authKey', 'createdAt', 'updatedAt', 'confirmationCode'];
        $scenarios[self::SCENARIO_UPDATE] = ['firstName', 'lastName', 'middleName', 'role', 'email', 'newPassword', 'newPasswordRepeat', 'updatedAt'];
        return $scenarios;
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['password', 'passwordRepeat', 'role', 'passwordToken'], 'required', 'on' => self::SCENARIO_CREATE],
            [['lastName', 'firstName', 'middleName'], 'required', 'on' => self::SCENARIO_UPDATE],
            [['email', 'authKey'], 'required'],
            [['lastName', 'firstName', 'middleName', 'email'], 'trim'],
            [['status'], 'integer'],
            [['createdAt', 'updatedAt'], 'safe'],
            [['lastName', 'firstName', 'middleName'], 'string', 'max' => 50],
            [['phone'], 'string', 'max' => 20],
            [['email', 'password', 'passwordResetToken', 'newPassword', 'newPasswordRepeat', 'password', 'confirmationCode'], 'string', 'max' => 255],
            [['authKey'], 'string', 'max' => 32],
            [['email'], 'unique'],
            ['passwordRepeat', 'compare', 'compareAttribute' => 'password', 'message' => 'Паролі не збігаються'],
            ['newPasswordRepeat', 'compare', 'compareAttribute' => 'newPassword', 'message' => 'Паролі не збігаються'],
            [['passwordResetToken', 'confirmationCode'], 'unique'],
            ['status', 'in', 'range' => [Admin::STATUS_ACTIVE, Admin::STATUS_NOT_ACTIVE]],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'lastName' => 'Прізвище',
            'firstName' => 'Ім\я',
            'middleName' => 'По-батькові',
            'phone' => 'Телефон',
            'email' => 'Електронна пошта',
            'auth_key' => 'Auth Key',
            'passwordToken' => 'Пароль',
            'password' => 'Пароль',
            'passwordRepeat' => 'Повторення паролю',
            'newPassword' => 'Новий пароль',
            'newPasswordRepeat' => 'Повторення нового паролю',
            'status' => 'Статус',
            'createdAt' => 'Дата створення',
            'updatedAt' => 'Дата редагування',
            'role' => 'Роль'
        ];
    }

    public function getAssignmentAdmin()
    {
        return $this->hasOne(AuthAssignment::className(), ['user_id' => 'id']);
    }

    public static function idNameAll()
    {
        return ArrayHelper::map(self::find()->all(), 'id', 'surname');
    }

    public static function statusesAll()
    {
        return [
            Admin::STATUS_ACTIVE => 'Активний',
            Admin::STATUS_NOT_ACTIVE => 'Не активний',
        ];
    }

    public function getFullName()
    {
        return $this->lastName . ' ' . $this->firstName . ' ' . $this->middleName;
    }

    public static function status($status)
    {
        switch ($status) {
            case Admin::STATUS_ACTIVE:
                $s = 'Активний';
                break;
            case Admin::STATUS_NOT_ACTIVE:
                $s = 'Не активний';
                break;
        }
        return $s;
    }

    public function teacherData()
    {
        return [
            'id' => $this->id,
            'lastName' => $this->lastName,
            'firstName' => $this->firstName,
            'middleName' => $this->middleName,
            'email' => $this->email,
            'status' => [
                'id' => $this->status,
                'name' => AuthAdmin::status($this->status)
            ],
        ];
    }
}
