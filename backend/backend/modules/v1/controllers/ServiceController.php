<?php

namespace backend\modules\v1\controllers;

use yii\rest\Controller;
use yii\filters\VerbFilter;

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
        return ['status' => 1];
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