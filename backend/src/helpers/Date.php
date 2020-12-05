<?php

namespace src\helpers;

use Yii;

class Date
{
    public static function days($start, $end, $returned = null)
    {
        $date_start = new \DateTime($start);
        $date_end = new \DateTime($end);
        $date_returned = new \DateTime($returned);
        if ($returned == null) {
            $interval = $date_start->diff($date_end);
        } else {
            $interval = $date_start->diff($date_returned);
        }
        return $interval->format('%d');
    }

    public static function interval($attribute, $start, $end = null)
    {
        $e = ($end === null) ? self::date_now() : $end;
        $d1 = new \DateTime($start);
        $d2 = new \DateTime($e);
        $diff = $d2->diff($d1);
        return $diff->{$attribute};
    }

    public static function interval_year($y)
    {
//        $d1 = new \DateTime($y.'-01-01');
//        $d2 = new \DateTime();
//        $diff = $d2->diff($d1);
//        return $diff->y;
        return self::year_now() - $y;
    }

    public static function subtract_year($y)
    {
        $date = new \DateTime();
        $date->modify('-' . (int)$y . ' year');
        return $date->format('Y');
    }

    public static function date_converter($date)
    {
        $d = explode('-', $date);
        if (isset($d[0]) && isset($d[1]) && isset($d[2])) {
            return $d[2] . '-' . $d[1] . '-' . $d[0];
        }
    }

    public static function datetime_converter($date)
    {
        return ($date) ? Yii::$app->formatter->asDatetime($date, 'php:Y-m-d H:i:s') : '';
    }

    public static function format_date($date)
    {
        return ($date) ? Yii::$app->formatter->asDate($date, 'php:d-m-Y') : '';
    }

    public static function format_datetime($date)
    {
        return ($date) ? Yii::$app->formatter->asDatetime($date, 'php:d-m-Y H:i') : '';
    }

    public static function format_datetime_all($date)
    {
        return ($date) ? Yii::$app->formatter->asDatetime($date, 'php:d-m-Y H:i:s') : '';
    }

    public static function year_now()
    {
        return date('Y');
    }

    public static function date_now()
    {
        return date('Y-m-d');
    }

    public static function datetime_now()
    {
        return date('Y-m-d H:i:s');
    }

    public static function TrueIfStartLessThanEnd($start, $end)
    {
        return new \DateTime($start) < new \DateTime($end);
    }
}

