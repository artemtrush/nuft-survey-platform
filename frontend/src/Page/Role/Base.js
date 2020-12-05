import PageBase from "../Base";

export default class Base extends PageBase {
    async getConfigPermissions() {
        return await this.page.getServerConfigValue('permissions');
    }

    async initPermissionsList(selectedPermissions = null) {
        const permissions = await this.getConfigPermissions();

        const items = [];
        $.each(permissions, (id, name) => {
            items.push({
                Id: id,
                Name: name
            });
        });

        this.component.CheckboxList.setListItems({
            Id: 'permissions',
            Items: items,
            CheckedIds: selectedPermissions
        });
    }

    async initPermittedCompaniesList(selectedPermittedCompanies = null) {
        const response = await this.api.company.index();
        const companies = response.Companies;

        const items = [];
        $.each(companies, (idx, company) => {
            items.push({
                Id: company.Id,
                Name: company.Name
            });
        });

        this.component.CheckboxList.setListItems({
            Id: 'permitted_companies',
            Items: items,
            CheckedIds: selectedPermittedCompanies
        });
    }

    getRoleForm(role = null)    {
        if (!role) {
            role = {
                Name: ''
            };
        }

        return `
            ${this.component.FormErrorBlock()}
            ${this.component.Input({
                Id: 'name',
                Text: 'Роль',
                Value: role.Name
            })}
            ${this.component.CheckboxList.getContainer({
                Id: 'permissions',
                Text: 'Права'
            })}
            ${this.component.CheckboxList.getContainer({
                Id: 'permitted_companies',
                Text: 'Перечень доступных МФО (по умолчанию доступны все)',
                SelectAllButton: false
            })}
            ${this.component.FormSubmitBlock()}
        `;
    }

    getRoleFormParams()    {
        const params = {
            Name: $('#name').val(),
            Permissions: this.component.CheckboxList.getItemsIds('permissions'),
            PermittedCompanies: this.component.CheckboxList.getItemsIds('permitted_companies')
        };

        return params;
    }

    getRoleFormErrorFields()    {
        const errorsFields = {
            Name: 'name',
            Permissions: 'permissions',
            PermittedCompanies: 'permitted_companies'
        };

        return errorsFields;
    }
}
