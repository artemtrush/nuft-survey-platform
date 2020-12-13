<?php

namespace backend\modules\v1\controllers;

use backend\modules\v1\models\Discipline;
use backend\modules\v1\models\Group;
use backend\modules\v1\src\service\ApiHelper;
use yii\rest\Controller;
use yii\filters\VerbFilter;
use Yii;

class DisciplineController extends Controller
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
        $disciplines = Discipline::find();
        if ($disciplines->exists()) {
            return $disciplines->orderBy(['name' => SORT_ASC])->asArray()->all();
        } else {
            return ApiHelper::errorMessage(404, 'Дисциплін не знайдено');
        }
    }

    public function actionCreate()
    {
        try {
            if (!Discipline::checkIsset(Yii::$app->request->post('name'), Yii::$app->request->post('curriculumId'))) {
                $discipline = new Discipline();
                $discipline->name = Yii::$app->request->post('name');
                $discipline->curriculum_id = Yii::$app->request->post('curriculumId');
                if ($discipline->save()) {
                    return [
                        'status' => 1,
                        'discipline' => [
                            'id' => $discipline->id
                        ]
                    ];
                } else {
                    return ApiHelper::errorFields($discipline->getErrors());
                }
            } else {
                return ApiHelper::errorFields([
                    'name' => 'Дисципліна існує'
                ]);
            }
        } catch (\Exception $exception) {
            return ApiHelper::errorMessage(400, $exception->getMessage());
        }
    }
}