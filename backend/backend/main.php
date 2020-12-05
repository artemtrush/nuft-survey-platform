<?php
return [
    'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',
    'components' => [
        'db' => require(dirname(__DIR__)."/config/db.php"),
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'assetManager' => [
            'appendTimestamp' => true,
        ],
    ],
'controllerMap' => [
        'elfinder' => [
            'class' => 'mihaildev\elfinder\Controller',
            'access' => ['@'],
            'roots' => [
                [
                    'baseUrl'=>'http://devsystem.space',
                    'basePath'=>'@frontend/web',
                    'path' => '/uploads',
                    'name' => 'Uploads'
                ],
            ],
        ]
    ],
];
