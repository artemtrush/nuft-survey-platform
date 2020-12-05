<?php

/* @var $this yii\web\View */
/* @var $form yii\bootstrap\ActiveForm */
/* @var $model \frontend\models\PasswordResetRequestForm */

use yii\bootstrap4\ActiveForm;
use yii\bootstrap4\Html;
use yii\helpers\Url;

$this->title = 'Запросить сброс пароля';
?>

<p class="login-box-msg">Забыли пароль?</p>
<?php $form = ActiveForm::begin([
    'id' => 'request-password-reset-form',
    'fieldConfig' => [
        'template' => '{input}',
        'options' => ['tag' => false]
    ],
]); ?>
<div class="input-group mb-3">
    <?= $form->field($model, 'email')
        ->textInput(['autofocus' => true ,'class' => 'form-control' , 'placeholder' => 'Email'])
        ->label(false); ?>
    <div class="input-group-append">
        <div class="input-group-text">
            <span class="fas fa-envelope"></span>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-12">
        <?= Html::submitButton('Отправить <i id="icon-arrow" class="bx bx-right-arrow-alt"></i>',
            ['class' => 'btn btn-primary btn-block']); ?>
    </div>
</div>
<?php ActiveForm::end(); ?>
<p class="mt-3 mb-1">
    <a href="<?= Url::to(['login/login']); ?>">Войти</a>
</p>