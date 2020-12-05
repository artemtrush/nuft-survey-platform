<?php
$this->title = 'Вход в систему';

use yii\bootstrap4\ActiveForm;
use yii\bootstrap4\Html;
use yii\helpers\Url;
?>

<p class="login-box-msg">Добро пожаловать</p>

<?php $form = ActiveForm::begin([
    'id' => 'login-form',
    'fieldConfig' => [
        'template' => '{input}',
        'options' => ['tag' => false]
    ],
]); ?>

<div class="input-group mb-3">
    <?= $form->field($model, 'email')
        ->textInput(['autofocus' => true, 'class' => 'form-control', 'placeholder' => 'Email'])
        ->label(false); ?>
    <div class="input-group-append">
        <div class="input-group-text">
            <span class="fas fa-envelope"></span>
        </div>
    </div>
</div>
<div class="input-group mb-3">
    <?= $form->field($model, 'password')
        ->passwordInput(['placeholder' => 'Пароль'])
        ->label(false); ?>
    <div class="input-group-append">
        <div class="input-group-text">
            <span class="fas fa-lock"></span>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-8">
        <div class="icheck-primary">
            <?= $form->field($model, 'rememberMe')
                ->checkbox()
                ->label('Запомнить меня'); ?>
        </div>
    </div>
    <!-- /.col -->
    <div class="col-4">
        <?= Html::submitButton('Войти <i id="icon-arrow" class="bx bx-right-arrow-alt"></i>',
            ['class' => 'btn btn-primary btn-block', 'name' => 'login-button']); ?>
    </div>
    <!-- /.col -->
</div>
<?php ActiveForm::end(); ?>

<p class="mt-4 mb-1">
    <a href="<?= \yii\helpers\Url::to(['/admin/login/request-password-reset']) ?>">Забыли пароль?</a>
</p>