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
                    'view' => ['GET'],
                    'create' => ['POST'],
                    'status' => ['POST'],
                ],
            ],
        ];
    }

    public function actionIndex()
    {
        $surveys = Survey::find();
        if (Yii::$app->request->get('disciplineId')) {
            $surveys = $surveys->where(['disciplineId' => Yii::$app->request->get('disciplineId')]);
        }
        if (Yii::$app->request->get('curriculumId')) {
            $surveys = $surveys->andWhere(['curriculumId' => Yii::$app->request->get('curriculumId')]);
        }
        if (Yii::$app->request->get('groupId')) {
            $surveys = $surveys->andWhere(['groupId' => Yii::$app->request->get('groupId')]);
        }
        if (Yii::$app->request->get('page') && Yii::$app->request->get('pageSize')) {
            $surveys = $surveys->limit((int)Yii::$app->request->get('pageSize'))->offset((int)Yii::$app->request->get('pageSize') * (int)Yii::$app->request->get('page'));
        }
        if ($surveys->exists()) {
            return ApiHelper::successResponse([
                'surveys' => $surveys->asArray()->all()
            ]);
        } else {
            return ApiHelper::successResponse();
        }
    }

    public function actionView($id)
    {
        try {
            $survey = Survey::findOne($id);
            if ($survey) {
                return ApiHelper::successResponse([
                    'survey' => $survey->surveyTeacherData()
                ]);
            } else {
                return ApiHelper::successResponse();
            }
        } catch (\Exception $exception) {
            return ApiHelper::errorMessage(400, $exception->getMessage());
        }
    }

    public function actionCreate()
    {
        set_time_limit(240);
        try {
            if (!Survey::checkIsset(Yii::$app->request->post('curriculumId'), Yii::$app->request->post('groupId'), Yii::$app->request->post('disciplineId'))) {
                $survey = new Survey();
                //$survey->adminId = '';
                $survey->curriculumId = Yii::$app->request->post('curriculumId');
                $survey->groupId = Yii::$app->request->post('groupId');
                $survey->disciplineId = Yii::$app->request->post('disciplineId');
                if ($survey->save()) {
                    return ApiHelper::successResponse([
                        'survey' => [
                            'id' => $survey->id,
                            'groupId' => $survey->groupId,
                            'disciplineId' => $survey->disciplineId,
                            'curriculumId' => $survey->curriculumId
                        ]
                    ]);
                } else {
                    return ApiHelper::errorFields($survey->getErrors());
                }
            } else {
                return ApiHelper::errorFields([
                    'name' => ['Опитування існує']
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