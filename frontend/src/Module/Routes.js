import Index                            from '../Controller/Index';
import User                             from '../Controller/User';
import UserProfile                      from '../Controller/User/Profile';
import Session                          from '../Controller/Session';
import Role                             from '../Controller/Role';
import Package                          from '../Controller/Package';
import Investor                         from '../Controller/Investor';
import InvestorBalanceOperation         from '../Controller/Investor/BalanceOperation';
import Company                          from '../Controller/Company';
import LoanContract                     from '../Controller/LoanContract';
import SaleContract                     from '../Controller/SaleContract';
import CommissionContract               from '../Controller/CommissionContract';
import Commissioner                     from '../Controller/Commissioner';
import CommissionerBalanceOperation     from '../Controller/Commissioner/BalanceOperation';
import Calendar                         from '../Controller/Calendar';
import RegistryReport                   from '../Controller/RegistryReport';

export default {
    'index': { controller: Index, method: 'show', name: 'index' },

    'session/create': { controller: Session, method: 'create', name: 'session_create' },
    'session/delete': { controller: Session, method: 'delete', name: 'session_delete' },

    'user/index': { controller: User, method: 'index', name: 'user_index' },
    'user/create': { controller: User, method: 'create', name: 'user_create' },
    'user/:Id/update': { controller: User, method: 'update', name: 'user_update' },
    'user/:Id/delete': { controller: User, method: 'delete', name: 'user_delete' },
    'user/profile/update': { controller: UserProfile, method: 'update', name: 'user_profile_update' },

    'role/index': { controller: Role, method: 'index', name: 'role_index' },
    'role/create': { controller: Role, method: 'create', name: 'role_create' },
    'role/:Id/update': { controller: Role, method: 'update', name: 'role_update' },
    'role/:Id/delete': { controller: Role, method: 'delete', name: 'role_delete' },

    'package/index': { controller: Package, method: 'index', name: 'package_index' },
    'package/create': { controller: Package, method: 'create', name: 'package_create' },
    'package/:Id/update': { controller: Package, method: 'update', name: 'package_update' },
    'package/:Id/delete': { controller: Package, method: 'delete', name: 'package_delete' },

    'investor/index': { controller: Investor, method: 'index', name: 'investor_index' },

    'investor/:InvestorId/balance_operation/index': {
        controller: InvestorBalanceOperation, method: 'index', name: 'investor_balance_operation_index' },
    'investor/:InvestorId/balance_operation/create': {
        controller: InvestorBalanceOperation, method: 'create', name: 'investor_balance_operation_create' },
    'investor/:InvestorId/balance_operation/:Id/update': {
        controller: InvestorBalanceOperation, method: 'update', name: 'investor_balance_operation_update' },

    'company/index': { controller: Company, method: 'index', name: 'company_index' },
    'company/create': { controller: Company, method: 'create', name: 'company_create' },
    'company/:Id/update': { controller: Company, method: 'update', name: 'company_update' },
    'company/:Id/delete': { controller: Company, method: 'delete', name: 'company_delete' },

    'loan_contract/index': { controller: LoanContract, method: 'index', name: 'loan_contract_index' },
    'loan_contract/:Id/show': { controller: LoanContract, method: 'show', name: 'loan_contract_show' },

    'sale_contract/index': { controller: SaleContract, method: 'index', name: 'sale_contract_index' },
    'sale_contract/:Id/show': { controller: SaleContract, method: 'show', name: 'sale_contract_show' },

    'commission_contract/index': { controller: CommissionContract, method: 'index', name: 'commission_contract_index' },
    'commission_contract/:Id/show': {
        controller: CommissionContract, method: 'show', name: 'commission_contract_show' },

    'commissioner/index': { controller: Commissioner, method: 'index', name: 'commissioner_index' },
    'commissioner/create': { controller: Commissioner, method: 'create', name: 'commissioner_create' },
    'commissioner/:Id/update': { controller: Commissioner, method: 'update', name: 'commissioner_update' },
    'commissioner/:Id/delete': { controller: Commissioner, method: 'delete', name: 'commissioner_delete' },

    'commissioner/:CommissionerId/balance_operation/index': {
        controller: CommissionerBalanceOperation, method: 'index', name: 'commissioner_balance_operation_index' },
    'commissioner/:CommissionerId/balance_operation/create': {
        controller: CommissionerBalanceOperation, method: 'create', name: 'commissioner_balance_operation_create' },
    'commissioner/:CommissionerId/balance_operation/:Id/update': {
        controller: CommissionerBalanceOperation, method: 'update', name: 'commissioner_balance_operation_update' },

    'calendar/update': { controller: Calendar, method: 'update', name: 'calendar_update' },

    'registry_report/index': { controller: RegistryReport, method: 'index', name: 'registry_report_index' }
};
