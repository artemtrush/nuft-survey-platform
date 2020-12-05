import Base from "./Base";
import LoggedInContainer from "./Container/LoggedInContainer";
import Session from "../Module/Session";

export default class Login extends Base {
    async bindEvents() {
        $('#submit_login').on('click', e => {
            e.preventDefault();

            this.login();
        });
    }

    content() {
        return `
            <form id="login_form">
              <div id="form_error" class="form-group">
                <span class="help-block"></span>
              </div>
              <div class="form-group has-feedback" id="helper_email">
                <input type="text" class="form-control" name="Email" placeholder="E-mail" id="email">
                <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                <span class="help-block"></span>
              </div>
              <div class="form-group has-feedback" id="helper_password">
                <input type="password" class="form-control" name="Password" placeholder="Пароль" id="password">
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                <span class="help-block"></span>
              </div>
              <button type="submit" id="submit_login" class="btn btn-primary btn-block btn-flat">Войти</button>
            </form>
        `;
    }

    async login() {
        const formSelector = '#login_form';
        const errorsFields = {
            Email    : 'email',
            Password : 'password'
        };
        const params = {
            Email    : $('#email').val(),
            Password : $('#password').val()
        };

        $(`#submit_login`).prop('disabled', 1);

        const response = await this.api.session.create(params);

        $(`#submit_login`).prop('disabled', 0);

        if (response.Status) {
            Session.setUserId(response.User.Id);

            await this.page.loadStates();
            this.page.displayPage(new LoggedInContainer());
            this.redirect(this.pathFor('index'));
        } else {
            this.validator.showFormError(formSelector, response, errorsFields);
        }
    }
}
