<?php

namespace backend\modules\v1\controllers;

use backend\modules\v1\src\service\ApiHelper;
use yii\rest\Controller;
use yii\filters\VerbFilter;
use Yii;

class ServiceController extends Controller
{
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'session' => ['POST'],
                    'password-recovery' => ['POST'],
                    'confirmation' => ['POST'],
                ],
            ],
        ];
    }

    public function actionSession()
    {
        if (!Yii::$app->request->post('email')) {
            return ApiHelper::errorFields([
                'email' => ['Не вказано email']
            ]);
        }
        if (!Yii::$app->request->post('password')) {
            return ApiHelper::errorFields([
                'password' => ['Не вказано password']
            ]);
        }
    }

    public function actionPasswordRecovery()
    {
        return ['status' => 2];
    }

    public function actionConfirmation()
    {
        return ['status' => 3];
    }
}