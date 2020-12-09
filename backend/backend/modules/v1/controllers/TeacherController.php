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
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'view' => ['GET'],
                    'create' => ['POST'],
                    'update' => ['POST'],
                ],
            ],
        ];
    }

    public function actionView($id)
    {
        try {
            $teacher = AuthAdmin::findOne($id);
            if ($teacher && in_array(AuthItem::TEACHER, $teacher->role)) {
                return [
                    'id' => $teacher->id,
                    'email' => $teacher->email,
                    'status' => [
                        'id' => $teacher->status,
                        'name' => AuthAdmin::status($teacher->status)
                    ]
                ];
            } else {
                return ApiHelper::errorMessage(404, 'Викладача не знайдено');
            }
        } catch (\Exception $exception) {
            return ApiHelper::errorMessage(400, $exception->getMessage());
        }
    }

    public function actionCreate()
    {
        try {
            $teacher = new AuthAdmin();
            $teacher->name = Yii::$app->request->post('email');
            $teacher->email = Yii::$app->request->post('email');
            $teacher->_password = Yii::$app->request->post('password');
            $teacher->passwordRepeat = Yii::$app->request->post('passwordRepeat');
            $teacher->password = Yii::$app->security->generatePasswordHash(Yii::$app->request->post('password'));
            $teacher->auth_key = Yii::$app->security->generateRandomString();
            $teacher->role = [AuthItem::TEACHER];
            $teacher->status = Admin::STATUS_NOT_ACTIVE;
            if ($teacher->save()) {
                return [
                    'status' => 1,
                    'teacher' => [
                        'id' => $teacher->id
                    ]
                ];
            } else {
                return ApiHelper::errorFields($teacher->getErrors());
            }
        } catch (\Exception $exception) {
            return ApiHelper::errorMessage(400, $exception->getMessage());
        }
    }

    public function actionUpdate($id)
    {
        $post = Yii::$app->request->post();
        try {
            $teacher = AuthAdmin::findOne($id);
            if ($teacher && in_array(AuthItem::TEACHER, $teacher->role)) {
                $teacher->name = $post['firstName'] . ' ' . $post['middleName'];
                $teacher->surname = $post['lastName'];
                $teacher->email = $post['email'];
                $teacher->password = Yii::$app->security->generatePasswordHash($post['password']);
                if (isset($post['newPassword']) && isset($post['newPasswordRepeat'])) {
                    $teacher->_password = $post['newPassword'];
                    $teacher->passwordRepeat = $post['newPasswordRepeat'];
                    $teacher->password = Yii::$app->security->generatePasswordHash($post['newPassword']);
                } else {
                    $teacher->_password = $post['password'];
                    $teacher->passwordRepeat = $post['password'];
                }
                if ($teacher->save()) {
                    return [
                        'status' => 1,
                        'teacher' => [
                            'id' => $teacher->id
                        ]
                    ];
                } else {
                    return ApiHelper::errorFields($teacher->getErrors());
                }
            } else {
                return ApiHelper::errorMessage(404, 'Викладача не знайдено');
            }
        } catch (\Exception $exception) {
            return ApiHelper::errorMessage(400, $exception->getMessage());
        }
    }
}