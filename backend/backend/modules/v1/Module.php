<?php

namespace backend\modules\v1;

use yii\web\Response;

class Module extends \yii\base\Module
{
    public $controllerNamespace = 'backend\modules\v1\controllers';

    public function init()
    {
        parent::init();
        \Yii::$app->response->format = Response::FORMAT_JSON;
    }
}