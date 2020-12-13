<?php
return [
    [
        'class' => '\yii\rest\UrlRule',
        'controller' => ['v1/service'],
        'extraPatterns' => [
            'POST session' => 'session',
            'POST password-recovery' => 'password-recovery',
            'POST confirmation' => 'confirmation',
        ],
    ],
    [
        'class' => '\yii\rest\UrlRule',
        'controller' => ['v1/admin'],
        'extraPatterns' => [
            'GET surveys' => 'survey-list',
            'GET teachers' => 'teacher-list',
            'GET teachers/{id}' => 'teacher-item',
            'POST teachers/{id}/status' => 'teacher-change-status',
        ],
    ],
    [
        'class' => '\yii\rest\UrlRule',
        'controller' => ['v1/teacher'],
        'extraPatterns' => [
            'POST /' => 'create',
            'POST {id}' => 'update',
            'GET {id}' => 'view',
        ],
    ],
    [
        'class' => '\yii\rest\UrlRule',
        'controller' => ['v1/survey'],
        'extraPatterns' => [
            'POST /' => 'create',
            'GET /' => 'index',
            'GET {id}' => 'view',
            'POST {id}/status' => 'status',
        ],
    ],
    [
        'class' => '\yii\rest\UrlRule',
        'controller' => ['v1/discipline'],
        'extraPatterns' => [
            'POST /' => 'create',
            'GET /' => 'index',
        ],
    ],
    [
        'class' => '\yii\rest\UrlRule',
        'controller' => ['v1/group'],
        'extraPatterns' => [
            'POST /' => 'create',
            'GET /' => 'index',
        ],
    ],
    [
        'class' => '\yii\rest\UrlRule',
        'controller' => ['v1/curriculum'],
        'extraPatterns' => [
            'POST /' => 'create',
            'GET /' => 'index',
        ],
    ]
];