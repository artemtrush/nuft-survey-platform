<?php

/* @var $this yii\web\View */
/* @var $form yii\bootstrap\ActiveForm */
/* @var $model \frontend\models\ResetPasswordForm */

use yii\bootstrap4\ActiveForm;
use yii\bootstrap4\Html;
use yii\helpers\Url;

$this->title = 'Сброс пароля';
$this->params['breadcrumbs'][] = $this->title;
?>

<p class="login-box-msg">>Пожалуйста, введите новый пароль:</p>
<?php $form = ActiveForm::begin([
    'id' => 'reset-password-form',
    'fieldConfig' => [
        'template' => '{input}',
        'options' => ['tag' => false]
    ],
]); ?>
<div class="input-group mb-3">
    <?= $form->field($model, 'password')->passwordInput(['autofocus' => true]) ?>
    <div class="input-group-append">
        <div class="input-group-text">
            <span class="fas fa-lock"></span>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-12">
        <?= Html::submitButton('Сохранить', ['class' => 'btn btn-primary btn-block']) ?>
    </div>
    <!-- /.col -->
</div>
<?php ActiveForm::end(); ?>

<p class="mt-3 mb-1">
    <a href="<?= Url::to(['login/login']); ?>">Войти</a>
</p>