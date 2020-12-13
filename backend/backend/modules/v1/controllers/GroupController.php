<?php

namespace backend\modules\v1\controllers;

use backend\modules\v1\models\Curriculum;
use backend\modules\v1\models\Group;
use backend\modules\v1\src\service\ApiHelper;
use yii\rest\Controller;
use yii\filters\VerbFilter;
use Yii;

class GroupController extends Controller
{
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'index' => ['GET'],
                    'create' => ['POST']
                ],
            ],
        ];
    }

    public function actionIndex()
    {
        $groups = Group::find();
        if ($groups->exists()) {
            return $groups->orderBy(['name' => SORT_ASC])->asArray()->all();
        } else {
            return ApiHelper::errorMessage(404, 'Груп не знайдено');
        }
    }

    public function actionCreate()
    {
        try {
            if (!Group::checkIsset(Yii::$app->request->post('name'), Yii::$app->request->post('curriculumId'))) {
                $group = new Group();
                $group->name = Yii::$app->request->post('name');
                $group->curriculum_id = Yii::$app->request->post('curriculumId');
                if ($group->save()) {
                    return [
                        'status' => 1,
                        'group' => [
                            'id' => $group->id
                        ]
                    ];
                } else {
                    return ApiHelper::errorFields($group->getErrors());
                }
            } else {
                return ApiHelper::errorFields([
                    'name' => 'Група існує'
                ]);
            }
        } catch (\Exception $exception) {
            return ApiHelper::errorMessage(400, $exception->getMessage());
        }
    }
}