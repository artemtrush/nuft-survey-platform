<?php

namespace backend\controllers;

use Yii;

class HomeController extends BaseController
{
    public $layout = 'base';

    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionDashboard()
    {
        return $this->render('dashboard');
    }
}