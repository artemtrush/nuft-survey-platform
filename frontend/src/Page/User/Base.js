import PageBase from "../Base";

export default class Base extends PageBase {

    async initRolesList(selectedRoles = null) {
        const data = await this.api.role.index();
        const roles = data.Roles ? data.Roles : [];
        selectedRoles = selectedRoles ? Object.values(selectedRoles).map(role => this.math.toInt(role.Id)) : [];

        const items = [];
        $.each(roles, (id, role) => {
            items.push({
                Id: this.math.toInt(role.Id),
                Name: role.Name
            });
        });

        this.component.CheckboxList.setListItems({
            Id: 'roles',
            Items: items,
            CheckedIds: selectedRoles
        });
    }

    getUserForm(user = null)    {
        let passwordInput = '';
        let confirmPasswordInput = '';
        let passwordFieldTitle = '';

        if (!user) {
            user = {
                SecondName: '',
                FirstName: '',
                MiddleName: '',
                Email: '',
                Phone: ''
            };

            passwordFieldTitle = 'Пароль';
        } else {
            passwordFieldTitle = 'Новый пароль';
        }

        passwordInput = `
        ${this.component.Input({
            Id: 'password',
            Text: passwordFieldTitle,
            Type: 'password'
        })}
        `;
        confirmPasswordInput = `
            ${this.component.Input({
                Id: 'confirm_password',
                Text: 'Подтвердить пароль',
                Type: 'password'
            })}
        `;

        return `
            ${this.component.FormErrorBlock()}
            ${this.component.Input({
                Id: 'second_name',
                Text: 'Фамилия',
                Value: user.SecondName
            })}
            ${this.component.Input({
                Id: 'first_name',
                Text: 'Имя',
                Value: user.FirstName
            })}
            ${this.component.Input({
                Id: 'middle_name',
                Text: 'Отчество',
                Value: user.MiddleName
            })}
            ${this.component.Input({
                Id: 'email',
                Text: 'E-mail',
                Type: 'email',
                Value: user.Email
            })}
            ${passwordInput}
            ${confirmPasswordInput}
            ${this.component.Input({
                Id: 'phone',
                Text: 'Телефон',
                Type: 'phone',
                Value: user.Phone
            })}
            ${this.component.CheckboxList.getContainer({
                Id: 'roles',
                Text: 'Роли'
            })}
            ${this.component.FormSubmitBlock()}
        `;
    }

    getUserFormParams()    {
        const params = {
            SecondName: $('#second_name').val(),
            FirstName: $('#first_name').val(),
            MiddleName: $('#middle_name').val(),
            Email: $('#email').val(),
            Phone: $('#phone').val(),
            Roles: this.component.CheckboxList.getItemsIds('roles'),
            Password: $('#password').val(),
            ConfirmPassword: $('#confirm_password').val()
        };

        return params;
    }

    getUserFormErrorFields()    {
        const errorsFields = {
            SecondName: 'second_name',
            FirstName: 'first_name',
            MiddleName: 'middle_name',
            Email: 'email',
            Phone: 'phone',
            Password: 'password',
            ConfirmPassword: 'confirm_password',
            Roles: 'roles'
        };

        return errorsFields;
    }
}
