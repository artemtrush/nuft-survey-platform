<?php

namespace backend\modules\v1\src\behavior;

use yii\base\Behavior;
use yii\db\ActiveRecord;
use yii\helpers\Json;

class SurveyGoogle extends Behavior
{
    public function events()
    {
        return [
            ActiveRecord::EVENT_BEFORE_INSERT => 'setLinks',
        ];
    }

    public function setLinks()
    {
        $data = [
            'teacher' => $this->owner->admin ? $this->owner->admin->fullName : '',
            'curriculum' => $this->owner->curriculum ? ($this->owner->curriculum->name . ' (' . $this->owner->curriculum->period . ')') : '',
            'group' => $this->owner->group ? $this->owner->group->name : '',
            'discipline' => $this->owner->discipline ? $this->owner->discipline->name : ''
        ];
        $url = "https://script.google.com/macros/s/AKfycbyG-NWDX3stchmW4bitdItIKNo-P-uR-sVlQBNNasv1BYvyF8w9/exec?" . http_build_query($data);
        $response = Json::decode(file_get_contents($url));

        if (isset($response['published_url']) && isset($response['result_url'])) {
            $this->owner->linkForm = $response['published_url'];
            $this->owner->linkResult = $response['result_url'];
        }
    }
}