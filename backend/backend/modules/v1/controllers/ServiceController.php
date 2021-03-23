<?php

namespace backend\modules\v1\controllers;

use backend\modules\v1\models\AuthAdmin;
use backend\modules\v1\src\service\ApiHelper;
use yii\rest\Controller;
use yii\filters\VerbFilter;
use Yii;

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
        if (!Yii::$app->request->post('email')) {
            return ApiHelper::errorFields([
                'email' => ['Не вказано email']
            ]);
        }
        if (!Yii::$app->request->post('password')) {
            return ApiHelper::errorFields([
                'password' => ['Не вказано password']
            ]);
        }
        if ($admin = AuthAdmin::findOne(['email' => Yii::$app->request->post('email')])) {
            if (Yii::$app->security->validatePassword(Yii::$app->request->post('password'), $admin->passwordToken)) {
                $role = ($admin->id == 1) ? 'admin' : 'teacher';
                $token = ApiHelper::generateJWTToken($admin->id, $role);
                return ApiHelper::successResponse([
                    'token' => $token,
                    'teacher' => $admin->teacherData()
                ]);
            } else {
                return ApiHelper::errorFields([
                    'password' => ['Невірний пароль']
                ]);
            }
        } else {
            return ApiHelper::errorMessage(404, 'Не знайдено');
        }
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