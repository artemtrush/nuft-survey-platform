<?php
return [
    [
        'class' => '\yii\rest\UrlRule',
        'controller' => ['v1/admin'],
        'extraPatterns' => [
            'GET surveys' => 'survey-list',
            'GET teachers' => 'teacher-list',
            'GET teachers/{id}' => 'teacher-item',
            'POST teachers/{id}/status' => 'teacher-change-status',
        ],
    ]
];