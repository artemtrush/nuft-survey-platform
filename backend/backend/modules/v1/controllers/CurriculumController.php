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
        $behaviors = parent::behaviors();
        $behaviors['verbs'] = [
            'class' => VerbFilter::className(),
            'actions' => [
                'index' => ['GET'],
                'create' => ['POST'],
            ],
        ];
        $behaviors['authenticator'] = [
            'class' => \sizeg\jwt\JwtHttpBearerAuth::class,
        ];

        return $behaviors;
    }

    public function actionIndex()
    {
        $curriculums = Curriculum::find();
        if (Yii::$app->request->get('name')) {
            $curriculums = $curriculums->where(['like', 'name', Yii::$app->request->get('name')]);
        }
        if (Yii::$app->request->get('period')) {
            $curriculums = $curriculums->andWhere(['period' => Yii::$app->request->get('period')]);
        }
        if ($curriculums->exists()) {
            return ApiHelper::successResponse([
                'curriculums' => $curriculums->orderBy(['name' => SORT_ASC])->limit(10)->asArray()->all()
            ]);
        } else {
            return ApiHelper::successResponse();
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
                    return ApiHelper::successResponse([
                        'curriculum' => [
                            'id' => $curriculum->id,
                            'name' => $curriculum->name,
                            'period' => $curriculum->period
                        ]
                    ]);
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