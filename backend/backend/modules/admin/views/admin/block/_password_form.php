<?php
use yii\bootstrap4\ActiveForm;
use yii\helpers\Html;
?>

<?php $form = ActiveForm::begin([
    'action' => ['/admin/admin/change-password', 'id' => Yii::$app->user->getId()],
    'enableAjaxValidation' => true,
    'validationUrl' => ['/validate/password'],
]);
?>

<?= $form->field($model, 'password')->passwordInput() ?>
<?= $form->field($model, 're_password')->passwordInput() ?>

<div class="d-flex flex-sm-row flex-column justify-content-end">
    <?= Html::submitButton('Сохранить', ['class' => 'btn btn-primary glow']) ?>
</div>

<?php ActiveForm::end(); ?>