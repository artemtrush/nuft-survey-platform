<?php

/* @var $this yii\web\View */
/* @var $user common\models\User */

$resetLink = Yii::$app->urlManager->createAbsoluteUrl(['/admin/login/reset-password', 'token' => $user->password_reset_token]);
?>
Hello <?= $user->name ?>,

Follow the link below to reset your password:

<?= $resetLink ?>
