<?php

namespace backend\modules\v1\models;

use backend\models\Admin;
use backend\models\AuthAssignment;
use backend\modules\v1\src\behavior\AdminNotification;
use backend\modules\v1\src\behavior\AuthRole;
use src\behavior\CapitalLetters;
use yii\behaviors\TimestampBehavior;
use yii\helpers\ArrayHelper;

/**
 * Class AuthAdmin
 * @package backend\modules\admin\models
 *
 * @property int $id
 * @property string $surname
 * @property string $name
 * @property string $phone
 * @property string $email
 * @property string $status
 * @property string $password
 * @property string $created_at
 * @property string $updated_at
 */
class AuthAdmin extends \yii\db\ActiveRecord
{
    public $role;
    public $_password;
    public $passwordRepeat;

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
                'class' => TimestampBehavior::className()
            ],
//            [
//                'class' => AdminNotification::className(),
//            ],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['email', 'auth_key', 'password', '_password', 'passwordRepeat', 'role'], 'required'],
            [['surname', 'name', 'email'], 'trim'],
            [['status'], 'integer'],
            [['created_at', 'updated_at'], 'safe'],
            [['surname', 'name'], 'string', 'max' => 50],
            [['phone'], 'string', 'max' => 20],
            [['email', 'password', 'password_reset_token', '_password'], 'string', 'max' => 255],
            [['auth_key'], 'string', 'max' => 32],
            [['email'], 'unique'],
            ['passwordRepeat', 'compare', 'compareAttribute' => '_password', 'message' => 'Паролі не збігаються'],
            [['password_reset_token'], 'unique'],
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
            'surname' => 'Прізвище',
            'name' => 'І\'мя',
            'phone' => 'Телефон',
            'email' => 'Email',
            'auth_key' => 'Auth Key',
            'password' => 'Пароль',
            'passwordRepeat' => 'Повтор паролю',
            'status' => 'Статус',
            'created_at' => 'Дата создания',
            'updated_at' => 'Дата изменения',
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
        return $this->name . ' ' . $this->surname;
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
}
