<?php

namespace backend\modules\v1\src\service;

class ApiHelper
{
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