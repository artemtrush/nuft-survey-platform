<?php

namespace backend\modules\v1\controllers;

use yii\rest\Controller;
use yii\filters\VerbFilter;

class AdminController extends Controller
{
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'survey-list' => ['GET'],
                    'teacher-list' => ['GET'],
                    'teacher-item' => ['GET'],
                    'teacher-change-status' => ['POST'],
                ],
            ],
        ];
    }

    public function actionSurveyList()
    {
        return ['status' => 122];
    }

    public function actionTeacherList()
    {
        return ['status' => 13];
    }

    public function actionTeacherItem($id)
    {
        return ['status' => $id];
    }

    public function actionTeacherChangeStatus($id)
    {
        return ['status' => $id, 'msg' => 'success'];
    }
}