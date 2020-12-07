<?php

namespace backend\modules\v1\src\behavior;

use yii\base\Behavior;
use yii\db\ActiveRecord;

class AdminNotification extends Behavior
{
    public function events()
    {
        return [
            ActiveRecord::EVENT_AFTER_INSERT => 'sendEmail'
        ];
    }

    public function sendEmail()
    {
        $email    = $this->owner->email;
        $password = $this->owner->_password;

        \Yii::$app->mailer->compose()
            ->setFrom('admin@w8.com')
            ->setTo($email)
            ->setSubject('Новый пользователь')
            ->setTextBody("Доступы в систему " . $_SERVER['HTTP_HOST'] . "\n Почта: " . $email . "\nПароль: " . $password)
            ->setHtmlBody("<p>Доступы в систему " . $_SERVER['HTTP_HOST'] . "\n Почта: " . $email . "\nПароль: " . $password . "</p>")
            ->send();
    }

}
