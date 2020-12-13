<?php

namespace backend\controllers;

use yii\rest\Controller;
use yii\web\Response;

class ErrorController extends Controller
{
    public function actionError()
    {
        \Yii::$app->response->format = Response::FORMAT_JSON;
        return [
            'status' => 0,
            'error' => [
                'code' => 404,
                'message' => 'Page not found'
            ]
        ];
    }
}
