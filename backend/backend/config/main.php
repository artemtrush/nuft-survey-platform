<?php
$params = array_merge(
    require __DIR__ . '/../../common/config/params.php',
    require __DIR__ . '/../../common/config/params-local.php',
    require __DIR__ . '/params.php',
    require __DIR__ . '/params-local.php'
);

return [
    'id' => 'inteos',
    'language' => 'ru',
    'name' => 'Inteos',
    'basePath' => dirname(__DIR__),
    'controllerNamespace' => 'backend\controllers',
    'defaultRoute' => 'customer/customer/index',
    'bootstrap' => ['log'],
    'components' => [
        'tm' => [
            'class' => 'backend\modules\messenger\telegram\TelegramInit',
        ],
        'common' => [
            'class' => 'src\components\Common',
        ],
        'request' => [
            'csrfParam' => '_csrf-backend',
        ],
        'i18n' => [
            'translations' => [
                'vendor*' => [
                    'class' => 'yii\i18n\PhpMessageSource',
                    'sourceLanguage' => 'ru',
                    'basePath' => '@language'
                ],
            ],
        ],
        'user' => [
            'identityClass' => 'backend\modules\admin\models\Admin',
            'enableAutoLogin' => true,
            'identityCookie' => ['name' => '_identity-backend', 'httpOnly' => true],
            'loginUrl' => ['admin/login/login'],
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
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'errorHandler' => [
            'errorAction' => 'error/error',
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
                'messenger/hook/telegram/<i>' => 'messenger/hook/telegram',
                '/' => 'home/dashboard',
                'login' => 'admin/login/login',
                'admin' => 'admin/admin/index',
                'customer/edit/<id:[\w\-]+>' => 'customer/customer/update',
                'customer' => 'customer/customer/index',
                'bot' => 'bot/bot/view',
                'bot/var' => 'bot/bot/var',
                'bot/about' => 'bot/about/index',
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'bot/telegram',
                    'pluralize' => false
                ],
            ],
        ],
        'assetManager' => [
            'class' => 'yii\web\AssetManager',
            'bundles' => [
                'yii\bootstrap4\BootstrapAsset' => [
                    'basePath' => '@webroot',
                    'baseUrl' => '@web',
                    'css' => [
                        'css/bootstrap.min.css',
                    ],
                ],
            ],
        ],
    ],
    'modules' => [
        'jodit' => 'yii2jodit\JoditModule',
        'admin' => [
            'class' => 'backend\modules\admin\Module',
        ],
        'customer' => [
            'class' => 'backend\modules\customer\Module',
        ],
        'media' => [
            'class' => 'backend\modules\media\Module',
        ],
        'bot' => [
            'class' => 'backend\modules\bot\Module',
        ],
        'system' => [
            'class' => 'backend\modules\system\Module',
        ],
        'messenger' => [
            'class' => 'backend\modules\messenger\Module',
        ],
    ],
    'as access' => [
        'class' => 'yii\filters\AccessControl',
        'except' => [
            'admin/login/reset-password',
            'admin/login/login',
            'admin/login/signup',
            'admin/login/logout',
            'admin/login/request-password-reset',
            'error/check-relevance',
            'admin/login/error',
            'messenger/hook/telegram',

            'ajax/pagination',
        ],
        'rules' => [
            [
                'allow' => true,
                'roles' => ['dev', 'admin', 'user'],
            ],
        ],
    ],
    'params' => $params,
];
