<?php

namespace backend\modules\v1\controllers;

use backend\modules\v1\models\Discipline;
use backend\modules\v1\src\service\ApiHelper;
use yii\rest\Controller;
use yii\filters\VerbFilter;
use Yii;

class DisciplineController extends Controller
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['verbs'] = [
            'class' => VerbFilter::className(),
            'actions' => [
                'index' => ['GET'],
                'create' => ['POST'],
            ],
        ];
        $behaviors['authenticator'] = [
            'class' => \sizeg\jwt\JwtHttpBearerAuth::class
        ];
        return $behaviors;
    }

    public function actionIndex()
    {
        $disciplines = Discipline::find();
        if (Yii::$app->request->get('name')) {
            $disciplines = $disciplines->where(['like', 'name', Yii::$app->request->get('name')]);
        }
        if (Yii::$app->request->get('curriculumId')) {
            $disciplines = $disciplines->andWhere(['curriculumId' => Yii::$app->request->get('curriculumId')]);
        }
        if ($disciplines->exists()) {
            return ApiHelper::successResponse([
                'disciplines' => $disciplines->orderBy(['name' => SORT_ASC])->limit(10)->asArray()->all()
            ]);
        } else {
            return ApiHelper::successResponse();
        }
    }

    public function actionCreate()
    {
        try {
            if (!Discipline::checkIsset(Yii::$app->request->post('name'), Yii::$app->request->post('curriculumId'))) {
                $discipline = new Discipline();
                $discipline->name = Yii::$app->request->post('name');
                $discipline->curriculumId = Yii::$app->request->post('curriculumId');
                if ($discipline->save()) {
                    return ApiHelper::successResponse([
                        'discipline' => [
                            'id' => $discipline->id,
                            'name' => $discipline->name,
                            'curriculumId' => $discipline->curriculumId
                        ]
                    ]);
                } else {
                    return ApiHelper::errorFields($discipline->getErrors());
                }
            } else {
                return ApiHelper::errorFields([
                    'name' => ['Дисципліна існує']
                ]);
            }
        } catch (\Exception $exception) {
            return ApiHelper::errorMessage(400, $exception->getMessage());
        }
    }
}