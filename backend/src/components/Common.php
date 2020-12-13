<?php

namespace src\components;

use yii\base\BaseObject;

class Common extends BaseObject
{
    public $eventCheck = [];
    public $artistCheck = [];
    public $artistInWork = [];
    public $eventCountCheck;
    public $eventCountInWork;
    public $artistCountCheck;

    public function __construct($config = [])
    {
        parent::__construct($config);
    }

    public function count($c)
    {
        $q = count($c);
        return $q == 0 ? '' : $q;
    }

    public function activeNew($check)
    {
        if ($check >= 1) {
            return 'active-check';
        }
    }
}
