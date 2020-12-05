<?php

namespace backend\modules\admin\models;

use backend\modules\bot\models\Bot;
use src\behavior\CapitalLetters;
use src\behavior\Timestamp;
use Yii;
use yii\base\NotSupportedException;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;

/**
 * @property integer $id
 * @property string $email
 * @property string $name
 * @property string $surname
 *
 * Class Admin
 * @package backend\modules\admin\models
 */
class Admin extends ActiveRecord implements IdentityInterface
{
    const STATUS_NOT_ACTIVE = 1;
    const STATUS_ACTIVE = 3;

    public static function tableName()
    {
        return 'auth_admin';
    }

    public function behaviors()
    {
        return [
            [
                'class' => Timestamp::className(),
            ],
            [
                'class' => CapitalLetters::className(),
                'fields' => ['surname', 'name'],
            ],
        ];
    }

    public function rules()
    {
        return [
            ['status', 'default', 'value' => self::STATUS_ACTIVE],
            ['status', 'in', 'range' => [self::STATUS_ACTIVE, self::STATUS_NOT_ACTIVE]],
        ];
    }

    public static function findIdentity($id)
    {
        return static::find()
            ->where(['id' => $id])
            ->andWhere(['status' => self::STATUS_ACTIVE])
            ->limit(1)
            ->one();
    }

    public function getRoles()
    {
        return $this->hasMany(AuthAssignment::className(), ['user_id' => 'id']);
    }

    public static function findIdentityByAccessToken($token, $type = null)
    {
        throw new NotSupportedException('"findIdentityByAccessToken" is not implemented.');
    }

    public static function findByUsername($email)
    {
        return static::find()
            ->where(['email' => $email])
            ->andWhere(['status' => self::STATUS_ACTIVE])
            ->with(['roles'])
            ->limit(1)
            ->one();
    }

    public function getId()
    {
        return $this->getPrimaryKey();
    }

    public function getAuthKey()
    {
        return $this->auth_key;
    }

    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }

    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password);
    }

    public function setPassword($password)
    {
        $this->password = Yii::$app->security->generatePasswordHash($password);
    }

    public function generateAuthKey()
    {
        $this->auth_key = Yii::$app->security->generateRandomString();
    }

    public function generatePasswordResetToken()
    {
        $this->password_reset_token = Yii::$app->security->generateRandomString() . '_' . time();
    }

    public static function findByPasswordResetToken($token)
    {
        if (!static::isPasswordResetTokenValid($token)) {
            return null;
        }

        return static::findOne([
            'password_reset_token' => $token,
            'status' => self::STATUS_ACTIVE,
        ]);
    }

    public static function isPasswordResetTokenValid($token)
    {
        if (empty($token)) {
            return false;
        }

        $timestamp = (int)substr($token, strrpos($token, '_') + 1);
        $expire = Yii::$app->params['user.passwordResetTokenExpire'];
        return $timestamp + $expire >= time();
    }

    public function removePasswordResetToken()
    {
        $this->password_reset_token = null;
    }

    public function getFullName()
    {
        return $this->name . ' ' . $this->surname;
    }

    public function getMyBot()
    {
        return Bot::findOne(['admin_id' => $this->id]);
    }
}
