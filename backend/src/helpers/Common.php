<?php

namespace src\helpers;

use Yii;
use yii\bootstrap4\Alert;
use yii\web\Cookie;

class Common
{
    public static function cookieAdd($name, $value)
    {
        Yii::$app->response->cookies->add(new Cookie([
            'name' => $name,
            'value' => $value,
            'expire' => time() + 2592000,
        ]));
    }


    public static function active_search_category($id)
    {
        if ($id == Yii::$app->request->get('id')) {
            return 'bg_search_category';
        }

        return null;
    }

    public static function capitalLetters($str)
    {
        $s = mb_strtolower($str, "UTF-8");
        return mb_convert_case($s, MB_CASE_TITLE, "UTF-8");
    }

    public static function price($price)
    {
        return number_format($price, 0, " ", " ") . ' гр.';
    }

    public static function str($text, $start = 0, $end = 50)
    {
        if (iconv_strlen($text, 'UTF-8') > $end) {
            return mb_substr($text, $start, $end) . '..';
        } else {
            return $text;
        }
    }

    public static function getStatusesAll()
    {
        return [
            STATUS_ACTIVE => 'Активен',
            STATUS_NOT_ACTIVE => 'Не активен',
        ];
    }

    public static function getStatus($status)
    {
        $s  = '';
        switch ($status) {
            case STATUS_ACTIVE:
                $s = 'Активен';
                break;
            case STATUS_NOT_ACTIVE:
                $s = 'Не активен';
                break;
        }
        return $s;
    }

    public static function status($status)
    {
        switch ($status) {
            case STATUS_ACTIVE:
                $s = '<span class="text-success fas fa-check"></span>';
                break;
            case STATUS_NOT_ACTIVE:
                $s = '<span class="text-danger fas fa-times"></span>';
                break;
        }
        return $s;
    }

    public static function statusAll()
    {
        return [
            STATUS_ACTIVE => 'Активний',
            STATUS_NOT_ACTIVE => 'Не активний',
        ];
    }

    public static function openSide($controller, $action = null)
    {
        if($action) {
            if (Yii::$app->controller->action->id == $action && Yii::$app->controller->id == $controller) {
                return 'menu-open';
            }
            return null;
        }

        if(Yii::$app->controller->id == $controller) {
            return 'menu-open';
        }

        return null;
    }

    public static function activeSide($controller, $action = null)
    {
        if($action) {
            if (Yii::$app->controller->action->id == $action && Yii::$app->controller->id == $controller) {
                return 'active';
            }
            return null;
        }

        if(Yii::$app->controller->id == $controller) {
            return 'active';
        }

        return null;
    }

    public static function showClass($controller)
    {
        if(!is_array($controller)) {
            $controller = [$controller];
        }
        if(in_array(Yii::$app->controller->id, $controller)) {
            return 'show-dropdown';
        }

        return null;
    }
    public static function activeClass($controller)
    {
        if(!is_array($controller)) {
            $controller = [$controller];
        }
        if(in_array(Yii::$app->controller->id, $controller)) {
            return 'active-side';
        }

        return null;
    }
    public static function alert4()
    {
        $alertTypes = [
            'error' => 'alert-danger',
            'danger' => 'alert-danger',
            'success' => 'alert-success',
            'info' => 'alert-info',
            'warning' => 'alert-warning'
        ];
        foreach ($alertTypes as $k => $v) {
            if (Yii::$app->session->getFlash($k)) {
                return Alert::widget([
                    'options' => [
                        'class' => $v,
                    ],
                    'body' => Yii::$app->session->getFlash($k),
                ]);
            }
        }

        return null;
    }

    public static function pager4($maxButtonCount = 20)
    {
        return [
            'pageCssClass' => ['class' => 'page-item'],
            'linkOptions' => ['class' => 'page-link'],
            'firstPageLabel' => '««',
            'lastPageLabel' => '»»',
            'firstPageCssClass' => 'page-item',
            'lastPageCssClass' => 'page-item',
            'prevPageCssClass' => 'page-item',
            'nextPageCssClass' => 'page-item',
            'disabledListItemSubTagOptions' => ['tag' => 'a', 'class' => 'page-link'],
            'maxButtonCount' => $maxButtonCount,
        ];
    }
}
