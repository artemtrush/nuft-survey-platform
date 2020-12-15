<?php

namespace backend\modules\v1\src\service;

class ApiHelper
{
    public static function successResponse($data = [])
    {
        $response = ['status' => 1];
        if (!empty($data)) {
            $response = array_merge($response, $data);
        }
        return $response;
    }

    public static function errorMessage($code, $message)
    {
        return [
            'status' => 0,
            'error' => [
                'code' => $code,
                'message' => $message
            ]
        ];
    }

    public static function errorFields($fields)
    {
        return [
            'status' => 0,
            'error' => [
                'fields' => $fields
            ]
        ];
    }

    public static function generateJWTToken($uid, $role)
    {
        $time = time();
        $token = \Yii::$app->jwt->getBuilder()
            ->issuedAt($time)
            ->expiresAt($time + 60 * 60 * 24)
            ->withClaim('uid', $uid)
            ->withClaim('role', $role)
            ->getToken(\Yii::$app->jwt->getSigner('HS256'), \Yii::$app->jwt->getKey());
        return 'Bearer ' . $token->__toString();
    }
}