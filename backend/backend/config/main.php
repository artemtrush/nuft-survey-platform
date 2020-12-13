<?php
$params = array_merge(
    require __DIR__ . '/../../common/config/params.php',
    require __DIR__ . '/../../common/config/params-local.php',
    require __DIR__ . '/params.php',
    require __DIR__ . '/params-local.php'
);

$rules = require __DIR__ . '/rules.php';

return [
    'id' => 'university',
    'language' => 'uk',
    'name' => 'University',
    'basePath' => dirname(__DIR__),
    'controllerNamespace' => 'backend\controllers',
    'bootstrap' => ['log'],
    'components' => [
        'common' => [
            'class' => 'src\components\Common',
        ],
        'request' => [
            'baseUrl' => '/api',
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ]
        ],
        'user' => [
            'identityClass' => 'backend\models\Admin',
            'enableAutoLogin' => true,
            'identityCookie' => ['name' => '_identity-backend', 'httpOnly' => true],
        ],
        'session' => [
            'name' => 'advanced-backend',
            'timeout' => 86400 * 7,
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error'],
                ],
            ],
        ],
        'errorHandler' => [
            'errorAction' => 'error/error',
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'enableStrictParsing' => true,
            'showScriptName' => false,
            'rules' => $rules
        ],
        'jwt' => [
            'class' => \sizeg\jwt\Jwt::class,
            'key'   => 'AAAAB3NzaC1yc2EAAAABJQAAAQEAgN3VBjdJJm06LTV59trNXqW6Y5lYM5FeNJR2x15DGhzywZ3aWzXK0NAoYXNsdI2COEpH8xm2+p5uqauKsh01tcbf2YM9JdxRnYeQOnk40ikpS4E/tz6sdSrQdK7tYot8E6s6FdZJD1WZJ6ChBjZUtpDDce9BHh+WtRyvVvAV/9X+LOHbIGAqUc0CgA6KVijX7XAb8RU4ICMzSFpK6j15Y6STB+JkqMZpdYKRVAlMaABdi8C7tgnRYuge+TNElPMabSoFqb0mN0EStt2S5OBOB2NySq0I2qhFRERGBw0UbZCMTCjjFThuYyDD28ZRMYsCtE+Gp80NuFPdS/+s8ybtCw==',
        ],
    ],
    'modules' => [
        'v1' => [
            'class' => 'backend\modules\v1\Module',
        ],
    ],
    'params' => $params,
];
