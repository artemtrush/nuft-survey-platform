<?php

namespace backend\modules\v1\controllers;

use yii\rest\Controller;
use yii\filters\VerbFilter;

class SurveyController extends Controller
{
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'index' => ['GET'],
                    'create' => ['POST'],
                    'status' => ['POST'],
                ],
            ],
        ];
    }

    public function actionIndex()
    {
        return ['status' => 1];
    }

    public function actionCreate()
    {
        return ['status' => 2];
    }

    public function actionStatus($id)
    {
        return ['status' => 3];
    }

}