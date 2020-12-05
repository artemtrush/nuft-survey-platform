import Base from "../Base";

export default class NotLoggedInContainer extends Base {
    content() {
        if ($('body').hasClass('only-no-auth')) {
            return;
        }

        $('#content').empty();
        $('body').attr('class', 'hold-transition login-page only-no-auth');

        return `
            <div class="login-box">
              <div class="login-logo"><b>SI</b> Admin</div>
              <div class="login-box-body">
                <div class="main-content"></div>
              </div>
            </div>
        `;
    }
}
