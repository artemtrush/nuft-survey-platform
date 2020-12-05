<?php

namespace src\email;

use backend\modules\admin\models\AuthAdmin;
use backend\modules\admin\models\AuthAdminServiceRelations;
use backend\modules\service\models\ServiceCategory;
use Yii;

class OrderNotification
{
    public $query;
    public $admins;
    public $category;

    public function __construct($query)
    {
        $this->query = $query;
        $this->admins = AuthAdmin::find()
            ->where(['id' => AuthAdminServiceRelations::getAdminIdByCategory($this->query->category_id)])
            ->andWhere(['status' => STATUS_ACTIVE])
            ->all();
        $this->category = ServiceCategory::findOne($this->query->category_id);
        $this->send();
    }

    public function send()
    {
        foreach ($this->admins as $admin) {

            Yii::$app->mailer->compose('order_notification', ['url' => $this->url()])
                ->setFrom([Yii::$app->params['adminEmail'] => Yii::$app->name])
                ->setTo($admin->email)
                ->setSubject('Замовлення: ' . $this->category->name)
                ->send();
        }
    }

    private function url()
    {
        return Yii::$app->params['backUrl'] . '/order/query/processing/?query_id=' . $this->query->query_id;
    }
}
