<?php

namespace backend\modules\v1\controllers;

use backend\modules\v1\models\Survey;
use backend\modules\v1\src\service\ApiHelper;
use yii\rest\Controller;
use yii\filters\VerbFilter;
use Yii;

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
        $surveys = Survey::find();
        if ($surveys->exists()) {
            return $surveys->orderBy(['name' => SORT_ASC])->asArray()->all();
        } else {
            return ApiHelper::errorMessage(404, 'Опитувань не знайдено');
        }
    }

    public function actionCreate()
    {
        try {
            if (!Survey::checkIsset(Yii::$app->request->post('curriculumId'), Yii::$app->request->post('groupId'), Yii::$app->request->post('disciplineId'))) {
                $survey = new Survey();
                $survey->curriculum_id = Yii::$app->request->post('curriculumId');
                $survey->group_id = Yii::$app->request->post('groupId');
                $survey->discipline_id = Yii::$app->request->post('disciplineId');
                if ($survey->save()) {
                    return [
                        'status' => 1,
                        'survey' => [
                            'id' => $survey->id
                        ]
                    ];
                } else {
                    return ApiHelper::errorFields($survey->getErrors());
                }
            } else {
                return ApiHelper::errorFields([
                    'name' => 'Опитування існує'
                ]);
            }
        } catch (\Exception $exception) {
            return ApiHelper::errorMessage(400, $exception->getMessage());
        }
    }

    public function actionStatus($id)
    {
        return ['status' => 3];
    }
}