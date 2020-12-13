<?php

namespace backend\modules\v1\controllers;

use backend\models\Admin;
use backend\models\AuthItem;
use backend\modules\v1\src\service\ApiHelper;
use backend\modules\v1\models\AuthAdmin;
use yii\rest\Controller;
use yii\filters\VerbFilter;
use Yii;

class TeacherController extends Controller
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['verbs'] = [
            'class' => VerbFilter::className(),
            'actions' => [
                'view' => ['GET'],
                'create' => ['POST'],
                'update' => ['POST'],
            ],
        ];
        $behaviors['authenticator'] = [
            'class' => \sizeg\jwt\JwtHttpBearerAuth::class,
            'except' => ['create']
        ];
        return $behaviors;
    }

    public function actionView($id)
    {
        try {
            $teacher = AuthAdmin::findOne($id);
            if ($teacher && in_array(AuthItem::TEACHER, $teacher->role)) {
                return ApiHelper::successResponse([
                    'teacher' => $teacher->teacherData()
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
        try {
            $teacher = new AuthAdmin();
            $teacher->scenario = AuthAdmin::SCENARIO_CREATE;
            $teacher->email = Yii::$app->request->post('email');
            $teacher->password = Yii::$app->request->post('password');
            $teacher->passwordRepeat = Yii::$app->request->post('passwordRepeat');
            $teacher->passwordToken = Yii::$app->security->generatePasswordHash(Yii::$app->request->post('password'));
            $teacher->authKey = Yii::$app->security->generateRandomString();
            $teacher->confirmationCode = null;
            $teacher->role = [AuthItem::TEACHER];
            $teacher->status = Admin::STATUS_NOT_ACTIVE;
            if ($teacher->save()) {
                $token = ApiHelper::generateJWTToken($teacher->id, 'teacher');
                return ApiHelper::successResponse([
                    'token' => $token,
                    'teacher' => $teacher->teacherData()
                ]);
            } else {
                return ApiHelper::errorFields($teacher->getErrors());
            }
        } catch (\Exception $exception) {
            return ApiHelper::errorMessage(400, $exception->getMessage());
        }
    }

    public function actionUpdate($id)
    {
        try {
            $teacher = AuthAdmin::findOne($id);
            if ($teacher && in_array(AuthItem::TEACHER, $teacher->role)) {
                $teacher->scenario = AuthAdmin::SCENARIO_UPDATE;
                if (!Yii::$app->request->post('password') || !Yii::$app->security->validatePassword(Yii::$app->request->post('password'), $teacher->passwordToken)) {
                    return ApiHelper::errorFields([
                        'password' => ['Невірний пароль']
                    ]);
                }
                $teacher->firstName = Yii::$app->request->post('firstName');
                $teacher->middleName = Yii::$app->request->post('middleName');
                $teacher->lastName = Yii::$app->request->post('lastName');
                $teacher->email = Yii::$app->request->post('email');
                if (Yii::$app->request->post('newPassword') && Yii::$app->request->post('newPasswordRepeat')) {
                    $teacher->newPassword = Yii::$app->request->post('newPassword');
                    $teacher->newPasswordRepeat = Yii::$app->request->post('newPasswordRepeat');
                    $teacher->passwordToken = Yii::$app->security->generatePasswordHash(Yii::$app->request->post('newPassword'));
                }
                if ($teacher->save()) {
                    return ApiHelper::successResponse([
                        'teacher' => $teacher->teacherData()
                    ]);
                } else {
                    return ApiHelper::errorFields($teacher->getErrors());
                }
            } else {
                return ApiHelper::successResponse();
            }
        } catch (\Exception $exception) {
            return ApiHelper::errorMessage(400, $exception->getMessage());
        }
    }
}