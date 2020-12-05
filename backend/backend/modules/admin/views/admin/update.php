<?php
/**
 * @var $model \backend\modules\admin\models\AuthAdmin
 * @var $password \backend\modules\admin\models\Password
 */

$this->title = 'Редактирование профиля';
$this->params['breadcrumbs'][] = ['label' => 'Профиль'];
?>

<section id="page-account-settings">
    <div class="row">
        <div class="col-12">
            <div class="row">
                <!-- left menu section -->
                <div class="col-md-3 mb-2 mb-md-0 pills-stacked">
                    <ul class="nav nav-pills flex-column">
                        <li class="nav-item">
                            <a class="nav-link d-flex align-items-center active" id="account-pill-general" data-toggle="pill"
                               href="#account-vertical-general" aria-expanded="true">
                                <i class="bx bx-cog"></i>
                                <span>Главное</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link d-flex align-items-center" id="account-pill-password" data-toggle="pill"
                               href="#account-vertical-password" aria-expanded="false">
                                <i class="bx bx-lock"></i>
                                <span>Изменение пароля</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- right content section -->
                <div class="col-md-9">
                    <div class="card">
                        <div class="card-content">
                            <div class="card-body">
                                <div class="tab-content">
                                    <div role="tabpanel" class="tab-pane active" id="account-vertical-general" aria-labelledby="account-pill-general" aria-expanded="true">
                                        <?= $this->render('block/_general_form', [
                                            'model' => $model,
                                        ]) ?>
                                    </div>
                                    <div class="tab-pane fade " id="account-vertical-password" role="tabpanel"
                                         aria-labelledby="account-pill-password" aria-expanded="false">
                                        <?= $this->render('block/_password_form', [
                                            'model' => $password,
                                        ]) ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
