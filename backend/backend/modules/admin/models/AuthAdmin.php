<?php

namespace backend\modules\admin\models;

use backend\modules\admin\src\behavior\AdminNotification;
use backend\modules\admin\src\behavior\AuthRole;
use backend\modules\bot\models\BotSetting;
use src\behavior\CapitalLetters;
use src\behavior\Timestamp;
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
 * @property string $created_at
 * @property string $updated_at
 *
 * @property AdminSetting $settings[]
 */
class AuthAdmin extends \yii\db\ActiveRecord
{
    public $role;
    public $_password;

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
                'class' => Timestamp::className(),
            ],
            [
                'class' => CapitalLetters::className(),
                'fields' => ['surname', 'name'],
            ],
            [
                'class' => AdminNotification::className(),
            ],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'email', 'auth_key', 'password', 'role'], 'required'],
            [['surname', 'name', 'email'], 'trim'],
            [['status'], 'integer'],
            [['created_at', 'updated_at'], 'safe'],
            [['surname', 'name'], 'string', 'max' => 50],
            [['phone'], 'string', 'max' => 20],
            [['email', 'password', 'password_reset_token', '_password'], 'string', 'max' => 255],
            [['auth_key'], 'string', 'max' => 32],
            [['email'], 'unique'],
            [['phone'], 'unique'],
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
            'id' =>'ID',
            'surname' => 'Фамилия',
            'name' => 'Имя',
            'phone' => 'Телефон',
            'email' => 'Email',
            'auth_key' => 'Auth Key',
            'password' => 'Пароль',
            'status' => 'Статус',
            'created_at' => 'Дата создания',
            'updated_at' => 'Дата изменения',
            'role' => 'Роль'
        ];
    }

    public function getCustomer()
    {
        return $this->hasOne(AuthAdminCustomer::className(), ['id' => 'id']);
    }

    public function getAssignmentAdmin()
    {
        return $this->hasOne(AuthAssignment::className(), ['user_id' => 'id']);
    }

    public function getSettings()
    {
        return $this->hasMany(AdminSetting::className(), ['admin_id' => 'id'])->indexBy('key');
    }

    public function getSetting($key)
    {
        if (isset($this->settings[$key]->value)) {
            return $this->settings[$key]->value;
        }

        return 'Текст не установлен!';
    }

    public static function idNameAll()
    {
        return ArrayHelper::map(self::find()->all(), 'id', 'surname');
    }

    public static function statusesAll()
    {
        return [
            Admin::STATUS_ACTIVE => 'Активен',
            Admin::STATUS_NOT_ACTIVE => 'Не активен',
        ];
    }

    public function getFullName()
    {
        return $this->name . ' ' . $this->surname;
    }

    public function getDirectory()
    {
        return 'streamer' . $this->id;
    }

    public static function status($status)
    {
        switch ($status) {
            case Admin::STATUS_ACTIVE:
                $s = 'Активен';
                break;
            case Admin::STATUS_NOT_ACTIVE:
                $s = 'Не активен';
                break;
        }
        return $s;
    }
}
