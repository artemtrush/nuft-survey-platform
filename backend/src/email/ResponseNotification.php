<?php

namespace src\email;

use Yii;

class ResponseNotification
{

    public function __construct()
    {
        if ($this->send() == false) {
            throw new \Exception('Problem send email');
        }
    }

    private function url()
    {
        return Yii::$app->params['homeUrl'] . '/cabinet/response/' . Yii::$app->cart->query->category->slug . '?query_id=' . Yii::$app->cart->query_id;
    }

    public function send()
    {
        return Yii::$app->mailer->compose('response_notification', ['url' => $this->url()])
            ->setFrom([Yii::$app->params['adminEmail'] => Yii::$app->name])
            ->setTo(Yii::$app->cart->query->admin->email)
            ->setSubject('Ваш запит оброблений.')
            ->send();
    }
}