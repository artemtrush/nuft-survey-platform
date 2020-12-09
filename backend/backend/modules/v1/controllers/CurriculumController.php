<?php

namespace backend\modules\v1\controllers;

use backend\modules\v1\models\Curriculum;
use backend\modules\v1\src\service\ApiHelper;
use yii\rest\Controller;
use yii\filters\VerbFilter;
use Yii;

class CurriculumController extends Controller
{
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'index' => ['GET'],
                    'create' => ['POST'],
                ],
            ],
        ];
    }

    public function actionIndex()
    {
        $curriculum = Curriculum::find();
        if ($curriculum->exists()) {
            return $curriculum->orderBy(['name' => SORT_ASC])->asArray()->all();
        } else {
            return ApiHelper::errorMessage(404, 'Програм не знайдено');
        }
    }

    public function actionCreate()
    {
        try {
            if (!Curriculum::checkIsset(Yii::$app->request->post('name'), Yii::$app->request->post('period'))) {
                $curriculum = new Curriculum();
                $curriculum->name = Yii::$app->request->post('name');
                $curriculum->period = Yii::$app->request->post('period');
                if ($curriculum->save()) {
                    return [
                        'status' => 1,
                        'teacher' => [
                            'id' => $curriculum->id
                        ]
                    ];
                } else {
                    return ApiHelper::errorFields($curriculum->getErrors());
                }
            } else {
                return ApiHelper::errorFields([
                    'name' => 'Програма існує'
                ]);
            }
        } catch (\Exception $exception) {
            return ApiHelper::errorMessage(400, $exception->getMessage());
        }
    }
}