<?php

namespace src\helpers;

use Yii;
use yii\bootstrap4\Html;

class Buttons
{
    public static function create($text = null)
    {
        return Html::a( '<i class="bx bx-plus"></i><span>' . $text . '</span>',
            ['create'],
            ['class' => 'btn btn-primary glow', 'role' => 'button',]);
    }

    public static function createPopup($text = null, $target = null)
    {
        return '<button type="button"
                        class="btn btn-info btn-block"
                        title="' . $text . '"
                        data-toggle="modal"
                        data-target="' . $target . '">' . $text . ' <i class="fas fa-plus"></i>
                </button>';
    }

    public static function reset_filters($url = [])
    {
        return Html::a('<i class="fas fa-broom"></i>', $url, [
            'class' => 'btn btn-danger',
            'role' => 'button',
            'title' => 'Сбросить фильтры',
        ]);
    }

    public static function eventStatusManual()
    {
        return Html::button('<i class="fas fa-book-open"></i>',
            [
                'class' => 'btn btn-outline-info event_status_manual',
                'title' => 'Статус',
                'data-toggle' => 'modal',
                'data-target' => '#event_status_manual',
            ]);
    }

    public static function artistStatusManual()
    {
        return Html::button('<i class="fas fa-book-open"></i>',
            [
                'class' => 'btn btn-outline-info artist_status_manual',
                'title' => 'Статус',
                'data-toggle' => 'modal',
                'data-target' => '#artist_status_manual',
            ]);
    }
}
