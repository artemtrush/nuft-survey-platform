<?php

namespace backend\modules\admin\src\behavior;

use backend\modules\admin\models\AuthAssignment;
use yii\base\Behavior;
use yii\db\ActiveRecord;

class AuthRole extends Behavior
{
    public function events()
    {
        return [
            ActiveRecord::EVENT_AFTER_UPDATE => 'assignRole',
            ActiveRecord::EVENT_AFTER_INSERT => 'assignRole',
            ActiveRecord::EVENT_AFTER_DELETE => 'deleteRole',
            ActiveRecord::EVENT_AFTER_FIND   => 'setRole',
        ];
    }

    public function setRole()
    {
        $role = [];
        $assignment = AuthAssignment::find()->where(['user_id' => $this->owner->id])->all();
        foreach ($assignment as $item) {
            $role[] = $item->item_name;
        }
        $this->owner->role = $role;
    }

    public function assignRole()
    {
        self::deleteRole();
        if(!in_array('admin', $this->owner->role) && \Yii::$app->user->getId() == $this->owner->id) {
            $this->owner->role[] = 'admin';
        }
        foreach ($this->owner->role as $item) {
            $auth = new AuthAssignment();
            $auth->item_name = $item;
            $auth->user_id = (string)$this->owner->id;
            $auth->save();
        }
    }

    public function deleteRole()
    {
        AuthAssignment::deleteAll(['user_id' => $this->owner->id]);
    }
}
