<?php
use yii\bootstrap4\ActiveForm;
use yii\helpers\Html;
?>
<?php $form = ActiveForm::begin(); ?>
    <div class="row">
        <div class="col-md-12">
            <div class="bg-element">
                <?php if(Yii::$app->user->can('admin')) { ?>
                    <?= $form->field($model, 'role')->checkboxList(\backend\modules\admin\models\AuthItem::getRoles()); ?>
                <?php } ?>
                <?= $form->field($model, 'surname')->textInput(['maxlength' => true]) ?>
                <?= $form->field($model, 'name')->textInput(['maxlength' => true]) ?>
                <?= $form->field($model, 'email')->textInput(['maxlength' => true]) ?>
                <?php if ($model->isNewRecord): ?>
                    <?= $form->field($model, 'password')->passwordInput() ?>
                <?php endif; ?>

                <div class="d-flex flex-sm-row flex-column justify-content-end">
                    <?= Html::submitButton('Сохранить', ['class' => 'btn btn-primary glow']) ?>
                </div>

                <?php if (!$model->isNewRecord): ?>
                    <p>Дата создания аккаунта: <?= Yii::$app->formatter->asDatetime($model->created_at); ?></p>
                <?php endif; ?>
            </div>
        </div>
    </div>
<?php ActiveForm::end(); ?>