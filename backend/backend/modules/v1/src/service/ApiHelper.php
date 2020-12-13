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
}