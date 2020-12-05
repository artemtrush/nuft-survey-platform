<?php

namespace backend\assets;

use yii\web\AssetBundle;

/**
 * Main backend application asset bundle.
 */
class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        // theme
        'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback',
        'app-assets/plugins/fontawesome-free/css/all.min.css',
        'app-assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css',
        'app-assets/css/adminlte.min.css',
        // custom
        'css/changes.css'
    ];
    public $js = [
        // theme
        'app-assets/plugins/bootstrap/js/bootstrap.bundle.min.js',
        'app-assets/js/adminlte.min.js',
        // custom
        'js/main.js',
    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap4\BootstrapPluginAsset',
    ];
}
