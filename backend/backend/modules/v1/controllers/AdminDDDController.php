<?php

namespace backend\modules\v1\controllers;

use backend\models\Password;
use Yii;
use backend\modules\v1\models\AuthAdmin;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

class AdminDDDController extends Controller
{
    public $layout = 'base';

    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'delete' => ['POST'],
                ],
            ],
        ];
    }

//    public function actionIndex()
//    {
//        $searchModel = new AuthAdminSearch();
//        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);
//        $dataProvider->setPagination(['pageSize' => Yii::$app->request->cookies->getValue('pagination')]);
//
//        $model_setting = new SettingForm();
//
//        if ($model_setting->load(Yii::$app->request->post()) && $model_setting->add()) {
//            Yii::$app->session->setFlash('success', 'Настройки успешно сохранены');
//
//            return $this->redirect(['index']);
//        }
//
//        return $this->render('index', [
//            'searchModel' => $searchModel,
//            'dataProvider' => $dataProvider,
//            'model_setting' => $model_setting
//        ]);
//    }

//    public function actionCreate()
//    {
//        $model = new AuthAdmin();
//        if ($model->load(Yii::$app->request->post())) {
//            $transaction = Yii::$app->db->beginTransaction();
//            try {
//                $model->auth_key = Yii::$app->security->generateRandomString();
//                $model->_password = $model->password;
//                $model->password = Yii::$app->security->generatePasswordHash($model->password);
//                if ($model->save()) {
//                    $transaction->commit();
//                    Yii::$app->session->setFlash('success', 'Админ добавлен');
//                    return $this->redirect(['index', 'id' => $model->id]);
//                }
//            } catch (\Exception $e) {
//                Yii::$app->errorHandler->logException($e);
//                Yii::$app->session->setFlash('error', $e->getMessage());
//                $transaction->rollback();
//                return $this->render('create', [
//                    'model' => $model,
//                ]);
//            }
//        }
//        return $this->render('create', [
//            'model' => $model,
//        ]);
//    }
    /**
     * @param $id
     * @return string|\yii\web\Response
     * @throws NotFoundHttpException
     * @throws \Exception
     * @throws \Throwable
     * @throws \yii\db\StaleObjectException\
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);
        $password = new Password();
        if ($model->load(Yii::$app->request->post()) && $model->update()) {
            Yii::$app->session->setFlash('success', 'Изменения сохранены');
            return $this->redirect(['update', 'id' => $id]);
        }
        return $this->render('update', [
            'model' => $model,
            'password' => $password
        ]);
    }

    /**
     * @param $id
     * @return \yii\web\Response
     */
    public function actionChangePassword($id)
    {
        $model = new Password();
        if ($model->load(Yii::$app->request->post()) && $model->changePassword($id)) {
            Yii::$app->session->setFlash('success', 'Пароль успешно изменен');
        }
        return $this->redirect(['update', 'id' => $id]);
    }

    /**
     * @param $id
     * @return \yii\web\Response
     * @throws NotFoundHttpException
     * @throws \Exception
     * @throws \Throwable
     * @throws \yii\db\StaleObjectException
     */
    public function actionDelete($id)
    {
        $model = $this->findModel($id);
        $model->delete();
        return $this->redirect(Yii::$app->request->referrer);
    }

    /**
     * @param $id
     * @return null|static
     * @throws NotFoundHttpException
     */
    protected function findModel($id)
    {
        if (($model = AuthAdmin::findOne($id)) !== null) {
            return $model;
        }
        throw new NotFoundHttpException('Запрошенная страница не существует.');
    }

}
